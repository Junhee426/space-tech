/** Checks every cited source URL for link rot. Read-only: makes outbound HTTP
 * requests but never touches the repository. Requires real internet egress
 * (a sandboxed/offline CI runner will report every URL as unreachable). */
import fs from 'node:fs';
import vm from 'node:vm';

const ctx = { window: {} };
vm.runInNewContext(fs.readFileSync('dist/data.js', 'utf8'), ctx);
vm.runInNewContext(fs.readFileSync('dist/evidence-data.js', 'utf8'), ctx);
vm.runInNewContext(fs.readFileSync('dist/mission-data.js', 'utf8'), ctx);
vm.runInNewContext(fs.readFileSync('dist/mission-programs.js', 'utf8'), ctx);
const sources = ctx.window.ATLAS.sources;

const CONCURRENCY = Number(process.env.LINK_CHECK_CONCURRENCY) || 6;
const TIMEOUT_MS = Number(process.env.LINK_CHECK_TIMEOUT_MS) || 10000;
const UA = 'satellite-tech-atlas-link-check/1.0 (+source integrity check)';

async function attempt(url, method) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    return await fetch(url, { method, redirect: 'follow', signal: controller.signal, headers: { 'User-Agent': UA } });
  } finally {
    clearTimeout(timer);
  }
}

async function checkOne(source) {
  try {
    // Some servers reject HEAD (405/501) even when the resource is fine; retry with GET.
    let response = await attempt(source.url, 'HEAD');
    if (response.status === 405 || response.status === 501) response = await attempt(source.url, 'GET');
    return { id: source.id, url: source.url, status: response.status, finalUrl: response.url, ok: response.ok };
  } catch (error) {
    return { id: source.id, url: source.url, status: null, error: error.message, ok: false };
  }
}

async function run() {
  const queue = [...sources];
  const results = [];
  async function worker() {
    while (queue.length) results.push(await checkOne(queue.shift()));
  }
  await Promise.all(Array.from({ length: Math.min(CONCURRENCY, sources.length) }, worker));
  results.sort((a, b) => a.id.localeCompare(b.id));

  const broken = results.filter(r => !r.ok);
  const redirected = results.filter(r => r.ok && r.finalUrl && r.finalUrl !== r.url);

  console.log(`Checked ${results.length} source URLs (concurrency ${CONCURRENCY}, timeout ${TIMEOUT_MS}ms).`);
  if (redirected.length) {
    console.log(`\n${redirected.length} redirected (update the recorded URL if this is permanent):`);
    for (const r of redirected) console.log(`  [${r.id}] ${r.url}\n    -> ${r.finalUrl}`);
  }
  if (broken.length) {
    console.log(`\n${broken.length} broken or unreachable:`);
    for (const r of broken) console.log(`  [${r.id}] ${r.url} -> ${r.status !== null ? 'HTTP ' + r.status : 'ERROR: ' + r.error}`);
    process.exitCode = 1;
  } else {
    console.log('\nAll source URLs responded successfully.');
  }
}

run();
