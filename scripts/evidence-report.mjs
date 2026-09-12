import fs from 'node:fs';
import vm from 'node:vm';
import path from 'node:path';
const root=path.resolve(import.meta.dirname,'..');
const ctx={window:{}};
for(const file of ['data.js','evidence-data.js','research.js'])vm.runInNewContext(fs.readFileSync(path.join(root,'dist',file),'utf8'),ctx);
const D=ctx.window.ATLAS,R=ctx.window.createAtlasResearch(D);
const rows=D.fields.map(field=>{
 const list=D.entities.filter(e=>e.field===field.id),c=R.coverage(list);
 return '| '+[field.name,list.length,c.sources,c.withClaimEvidence,c.directMultiplePublishers].join(' | ')+' |';
});
const groupCounts=key=>[...new Set(D.sources.map(s=>s[key]))].sort().map(value=>'| '+value+' | '+D.sources.filter(s=>s[key]===value).length+' |');
const missing=D.entities.filter(e=>!R.evidenceFor(e.id).length);
const content=[
 '# 근거 취합 현황','',
 '데이터 판본: '+D.version+' · 검토 기준일: '+D.reviewed,
 '',D.sources.length+'개 원문 · '+D.evidence.length+'개 주장별 근거 · '+D.entities.length+'개 항목 · '+D.links.length+'개 관계.',
 '', '## 분야별 범위','',
 '항목은 주 분야 기준으로 한 번 집계합니다. 출처는 직접 관계의 근거도 포함하므로 분야 간 중복될 수 있습니다. 복수 발행 계열은 항목에 직접 연결된 출처만 집계하며 독립 실험·검증을 의미하지 않습니다.',
 '', '| 분야 | 항목 | 연결 원문 | 주장별 근거 있는 항목 | 복수 발행 계열 항목 |',
 '| --- | ---: | ---: | ---: | ---: |',...rows,
 '', '## 발행기관 국가·지역','',
 '발행기관 소재·소속 기준입니다. 위성 운용 국가나 공급망 전체를 나타내지 않습니다.',
 '', '| 국가·지역 | 원문 |','| --- | ---: |',...groupCounts('country'),
 '', '## 자료 유형','', '| 유형 | 원문 |','| --- | ---: |',...groupCounts('type'),
 '', '## 해석과 미확인 범위','',
 '- 모든 추가 원문은 주장·확인 위치·한계와 함께 코드에 수록했습니다. 개발팀 논문과 같은 팀의 보도자료는 독립 재현이 아닙니다.',
 '- 요오드 추진은 추진제 분류이며 홀 효과 방식 여부와 구분합니다. ADRAS-J 접근 실적은 포획·제거 실적이 아닙니다.',
 '- 아리랑 3A호의 55 cm 광학 해상도를 적외선 해상도로 옮기지 않습니다. EnMAP 설계 냉각 온도와 TheMIS 원리상 냉각 능력은 궤도 실측 온도가 아닙니다.',
 '- GomSpace BP4 PDF와 SpIRIT TheMIS 기술 소개 페이지는 원문 열기 오류가 발생해 추가 근거에서 제외했습니다. 각각 P60 공식 제품 설명과 연구팀 시운전 발표·논문으로 확인 가능한 내용만 반영했습니다.',
 '- 국가별 산업 전수조사와 시장 규모·수주·현재 판매 여부 조사는 포함하지 않습니다. 기존 NASA/ESA 문서 전체를 이번에 재검토한 것은 아닙니다.',
 '', '## 주장별 확인 위치가 아직 없는 기존 항목','',
 missing.length+'개 항목에는 기존 출처 연결이 있지만 새 주장별 근거 구조로 정리된 기록이 없습니다. 이 목록은 출처 없음 또는 기술 실패를 의미하지 않습니다.',
 '',...missing.map(e=>'- '+e.name+' ('+e.id+')'),
 '', '이 문서는 `node scripts/evidence-report.mjs`로 재생성합니다.',''
].join('\n');
fs.mkdirSync(path.join(root,'docs'),{recursive:true});
fs.writeFileSync(path.join(root,'docs/EVIDENCE_COVERAGE.md'),content);
console.log('Updated docs/EVIDENCE_COVERAGE.md');
