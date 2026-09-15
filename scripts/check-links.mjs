/** Checks every cited source URL for link rot. Read-only: makes outbound HTTP
 * requests but never touches the curated dataset (dist/data.js and friends) —
 * see the "link check vs. content review" note in README.md for why that
 * matters. Requires real internet egress (a sandboxed/offline CI runner will
 * report every URL as unreachable).
 *
 * Classification policy:
 *  - HTTP 403 and 429 are NEVER treated as evidence a source is dead. Both
 *    are common responses from publishers that block or throttle automated
 *    clients while the page is perfectly reachable in a normal browser, so
 *    flagging them would train editors to "fix" or remove sources that are
 *    actually fine. They are reported in their own category for awareness,
 *    but never contribute to the broken count or the exit code.
 *  - 5xx responses (and 429s) are retried a few times with backoff before
 *    being treated as broken, since a single 500/502/503 is frequently a
 *    transient server-side blip rather than proof the page is gone. Only a
 *    5xx that persists across every retry attempt counts as broken.
 *  - 404s, other definitive 4xx statuses, DNS failures and connection
 *    refused errors are treated as broken (after the same retry budget, in
 *    case what looks like a connection failure is itself transient) — none
 *    of those are things worth waiting out indefinitely.
 *
 * Link reachability vs. content review — these are different events and are
 * tracked as different fields on purpose:
 *  - `source.reviewed` in the dataset (dist/data.js and friends) records the
 *    date a human actually read the source and confirmed the claims it
 *    supports. Only a person editing those files by hand changes it.
 *  - `checkedAt` in this script's report (written below) records only that
 *    an automated HTTP request reached the URL and what it got back. It
 *    says nothing about whether the content still supports any claim.
 * This script never writes to dist/data.js or any other curated data file —
 * it only reads them and writes its own report under reports/. Nothing here
 * ever updates `source.reviewed`, an entity's `status`, or any claim text;
 * doing that always requires a human (or an explicit content-review step)
 * to have actually read the source. If this script is ever changed to write
 * back into the dataset, that guarantee is broken — don't do it here.
 */
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const ctx = { window: {} };
vm.runInNewContext(fs.readFileSync('dist/data.js', 'utf8'), ctx);
vm.runInNewContext(fs.readFileSync('dist/evidence-data.js', 'utf8'), ctx);
vm.runInNewContext(fs.readFileSync('dist/mission-data.js', 'utf8'), ctx);
vm.runInNewContext(fs.readFileSync('dist/mission-programs.js', 'utf8'), ctx);
const sources = ctx.window.ATLAS.sources;

const CONCURRENCY = Number(process.env.LINK_CHECK_CONCURRENCY) || 6;
const TIMEOUT_MS = Number(process.env.LINK_CHECK_TIMEOUT_MS) || 10000;
// Extra attempts after the first, only for statuses/errors worth retrying (see policy above).
const MAX_RETRIES = Number(process.env.LINK_CHECK_MAX_RETRIES) || 2;
const RETRY_DELAY_MS = Number(process.env.LINK_CHECK_RETRY_DELAY_MS) || 1500;
const UA = 'satellite-tech-atlas-link-check/1.0 (+source integrity check)';

const isRetryableStatus = status => status === 429 || (status >= 500 && status <= 599);
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

async function attempt(url, method) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    return await fetch(url, { method, redirect: 'follow', signal: controller.signal, headers: { 'User-Agent': UA } });
  } finally {
    clearTimeout(timer);
  }
}

// One HTTP round trip: HEAD, falling back to GET when the server refuses HEAD (405/501).
async function probeOnce(url) {
  let response = await attempt(url, 'HEAD');
  if (response.status === 405 || response.status === 501) response = await attempt(url, 'GET');
  return response;
}

async function checkOne(source) {
  let lastResponse, lastError, attempts = 0;
  for (; attempts <= MAX_RETRIES; attempts++) {
    try {
      lastResponse = await probeOnce(source.url);
      lastError = undefined;
    } catch (error) {
      lastError = error;
      lastResponse = undefined;
    }
    // Network errors get the same retry budget as 5xx: a connection hiccup deserves
    // one more try before we call the source dead, same as a transient 500 would.
    const retryable = lastResponse ? isRetryableStatus(lastResponse.status) : true;
    if (!retryable || attempts === MAX_RETRIES) break;
    const retryAfterHeader = lastResponse?.headers.get('retry-after');
    const retryAfterMs = retryAfterHeader && /^\d+$/.test(retryAfterHeader) ? Number(retryAfterHeader) * 1000 : null;
    await sleep(retryAfterMs ?? RETRY_DELAY_MS * (attempts + 1));
  }

  const result = { id: source.id, url: source.url, attempts: attempts + 1 };
  if (lastResponse) {
    Object.assign(result, { status: lastResponse.status, finalUrl: lastResponse.url, ok: lastResponse.ok });
    if (lastResponse.ok) result.category = 'ok';
    else if (lastResponse.status === 403) result.category = 'blocked';
    else if (lastResponse.status === 429) result.category = 'rate-limited';
    else result.category = 'dead'; // 404s and any 5xx that stayed broken through every retry
  } else {
    Object.assign(result, { status: null, error: lastError.message, ok: false, category: 'dead' });
  }
  return result;
}

async function run() {
  const queue = [...sources];
  const results = [];
  async function worker() {
    while (queue.length) results.push(await checkOne(queue.shift()));
  }
  await Promise.all(Array.from({ length: Math.min(CONCURRENCY, sources.length) }, worker));
  results.sort((a, b) => a.id.localeCompare(b.id));

  const dead = results.filter(r => r.category === 'dead');
  const blocked = results.filter(r => r.category === 'blocked');
  const rateLimited = results.filter(r => r.category === 'rate-limited');
  const redirected = results.filter(r => r.ok && r.finalUrl && r.finalUrl !== r.url);

  console.log(`Checked ${results.length} source URLs (concurrency ${CONCURRENCY}, timeout ${TIMEOUT_MS}ms, up to ${MAX_RETRIES + 1} attempt(s) each).`);
  if (redirected.length) {
    console.log(`\n${redirected.length} redirected (update the recorded URL if this is permanent):`);
    for (const r of redirected) console.log(`  [${r.id}] ${r.url}\n    -> ${r.finalUrl}`);
  }
  if (blocked.length || rateLimited.length) {
    console.log(`\n${blocked.length + rateLimited.length} responded with a bot-block or rate-limit signal (NOT counted as dead — see the policy note at the top of this file):`);
    for (const r of blocked) console.log(`  [${r.id}] ${r.url} -> HTTP 403 blocked, ${r.attempts} attempt(s)`);
    for (const r of rateLimited) console.log(`  [${r.id}] ${r.url} -> HTTP 429 rate-limited, ${r.attempts} attempt(s)`);
  }
  if (dead.length) {
    console.log(`\n${dead.length} broken or unreachable after retries:`);
    for (const r of dead) console.log(`  [${r.id}] ${r.url} -> ${r.status !== null ? 'HTTP ' + r.status : 'ERROR: ' + r.error} (${r.attempts} attempt(s))`);
    process.exitCode = 1;
  } else {
    console.log('\nNo genuinely dead links found.');
  }

  // A separate, machine-generated report of *reachability*, not content review. `checkedAt`
  // is when this script ran, not when anyone last read the source — see the header comment.
  // Written outside dist/ and outside the curated data files, and gitignored (reports/): this
  // is a CI/monitoring artifact, never a substitute for a human updating `source.reviewed`.
  const reportDir = path.resolve('reports');
  fs.mkdirSync(reportDir, { recursive: true });
  fs.writeFileSync(path.join(reportDir, 'link-check-latest.json'), JSON.stringify({
    note: 'Link reachability check only. checkedAt is NOT a content-review date — see source.reviewed in the dataset for that. Do not copy these timestamps or statuses into dist/data.js or any curated data file.',
    checkedAt: new Date().toISOString(),
    concurrency: CONCURRENCY,
    timeoutMs: TIMEOUT_MS,
    maxRetries: MAX_RETRIES,
    summary: { total: results.length, ok: results.length - dead.length - blocked.length - rateLimited.length, dead: dead.length, blocked: blocked.length, rateLimited: rateLimited.length, redirected: redirected.length },
    results,
  }, null, 2) + '\n');

  return results;
}

run();
