/** Generates an editable worklist of entities that already cite at least one
 * source (in `entity.sources`) but have no claim-level evidence entry yet
 * (an item in ATLAS.evidence linking a specific claim to a locator and
 * limitation within that source). This is NOT a "no source" list — every
 * entity listed here already has a source attached; what's missing is the
 * claim-by-claim linkage. See docs/EVIDENCE_COVERAGE.md for the aggregate
 * count and docs/EVIDENCE_LINKAGE_QUEUE.md (this script's output) for the
 * per-item worklist editors check off by hand while doing that linking.
 *
 * Regenerating this file preserves any checkbox state and free-text notes
 * editors have already entered, keyed by entity id, so reruns never discard
 * progress. Entities that gain evidence coverage since the last run move to
 * a resolved log instead of silently disappearing.
 */
import fs from 'node:fs';
import vm from 'node:vm';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const ctx = { window: {} };
for (const file of ['data.js', 'evidence-data.js', 'mission-data.js', 'mission-programs.js', 'research.js']) {
  vm.runInNewContext(fs.readFileSync(path.join(root, 'dist', file), 'utf8'), ctx);
}
const d = ctx.window.ATLAS;
const research = ctx.window.createAtlasResearch(d);

const outputPath = path.join(root, 'docs/EVIDENCE_LINKAGE_QUEUE.md');
const fieldName = id => d.fields.find(f => f.id === id)?.name || id;
const sourceLabel = id => {
  const s = d.sources.find(s => s.id === id);
  return s ? `${s.publisher} — ${s.title} (${s.id})` : id;
};

// Ground truth: entities with sources attached but zero claim-level evidence entries.
const missing = d.entities
  .filter(e => research.evidenceFor(e.id).length === 0)
  .sort((a, b) => a.id.localeCompare(b.id));

// --- parse the previous file, if any, to preserve checkbox/notes state and the resolved log ---
const idOnlyLine = /^- \[( |x)\] `([^`]+)`/;
const resolvedLine = /^- `([^`]+)`/;
const previous = { checked: new Map(), notes: new Map(), resolved: new Set() };
if (fs.existsSync(outputPath)) {
  const text = fs.readFileSync(outputPath, 'utf8');
  let inResolved = false;
  for (const line of text.split('\n')) {
    if (line.startsWith('## 해결됨')) { inResolved = true; continue; }
    if (inResolved) {
      const m = resolvedLine.exec(line);
      if (m) previous.resolved.add(m[1]);
      continue;
    }
    const idMatch = idOnlyLine.exec(line);
    if (idMatch) {
      previous.checked.set(idMatch[2], idMatch[1] === 'x');
      const noteMatch = /— 메모: (.*)$/.exec(line);
      if (noteMatch) previous.notes.set(idMatch[2], noteMatch[1]);
    }
  }
}

const missingIds = new Set(missing.map(e => e.id));
// Anything we tracked before that no longer needs linking has been resolved since the last run.
const newlyResolved = [...previous.checked.keys()].filter(id => !missingIds.has(id) && !previous.resolved.has(id));
const resolvedIds = new Set([...previous.resolved, ...newlyResolved]);

const rows = missing.map(e => {
  const existingSources = e.sources.map(sourceLabel).join('; ');
  const checked = previous.checked.get(e.id) ? 'x' : ' ';
  const note = previous.notes.get(e.id);
  const noteSuffix = note ? ` — 메모: ${note}` : '';
  return `- [${checked}] \`${e.id}\` — ${e.name} (${e.type}, ${fieldName(e.field)}) — 기존 출처: ${existingSources || '없음'}${noteSuffix}`;
});

const resolvedRows = [...resolvedIds].sort().map(id => `- \`${id}\``);

const content = [
  '# 주장별 근거 연결 작업 목록',
  '',
  `데이터 판본: ${d.version} · 검토 기준일: ${d.reviewed}`,
  '',
  `${missing.length}개 항목은 **출처가 없는 것이 아니라**, 기존 출처(\`entity.sources\`)는 이미 연결되어 있지만 \`evidence\` 배열의 주장별 근거(구체적 주장·원문 내 위치·확인 한계)가 아직 그 출처와 연결되지 않았습니다. 즉 연결 작업(linkage)이 남은 것이지 원문 부재가 아닙니다.`,
  '',
  '편집 방법: 각 항목의 기존 출처 원문을 열어 실제 주장을 확인하고, `dist/evidence-data.js`(또는 해당 데이터 파일)에 `evidence` 항목을 추가해 주장·위치·한계·검토일을 기록하세요. 연결을 마치면 아래 체크박스를 표시하고, 줄 끝에 `— 메모: ...` 형식으로 진행 메모를 남길 수 있습니다.',
  '',
  '이 파일은 `node scripts/generate-linkage-queue.mjs`로 재생성됩니다. 재생성해도 체크 상태와 메모는 항목 ID 기준으로 보존됩니다. 근거가 채워진 항목은 자동으로 아래 "해결됨" 목록으로 옮겨집니다.',
  '',
  '## 진행 목록',
  '',
  ...rows,
];
if (resolvedRows.length) {
  content.push('', '## 해결됨', '', ...resolvedRows);
}
content.push('');
fs.mkdirSync(path.join(root, 'docs'), { recursive: true });
fs.writeFileSync(outputPath, content.join('\n'));
console.log(`Updated docs/EVIDENCE_LINKAGE_QUEUE.md: ${missing.length} open, ${resolvedRows.length} resolved.`);
