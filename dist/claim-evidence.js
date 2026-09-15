/* Claim-level review of previously unannotated records, 2026-09-16.
 * Existing source and entity review dates are preserved: these claims carry
 * their own review date. Each locator names the portion actually checked.
 */
(() => {
 'use strict';
 const D=window.ATLAS,reviewed='2026-09-16';
 if(!D||!Array.isArray(D.evidence)||!D.entities?.every(e=>e.type!=='mission'||e.demonstration?.program))throw new Error('claim-evidence.js requires evidence-data.js and mission-programs.js to run first.');
 // Columns: claim ID, existing source ID, target IDs, kind, locator, claim, limit.
 const rows=[
  ['phi2-team-roles','phi2team',['phisat2','esa','open-cosmos','ubotica','cgi','ceiia','geok','kplabs','simera'],'기관 역할',
   '본문 마지막 문단: ESA / Open Cosmos / industrial consortium',
   'ESA는 Φsat-2 개발기관, Open Cosmos는 주계약자로 명시됩니다. 산업 컨소시엄 명단에는 Ubotica, CGI, CEiiA, GEO-K, KP Labs, SIMERA가 포함됩니다.',
   '명단은 사업 참여 근거입니다. 각 참여사의 특정 장비 납품·알고리즘 성능·계약 규모는 이 문단으로 확정하지 않습니다.'],
  ['phi1-filtering','phi1ai',['phisat1','upc'],'개발 목표',
   '본문 첫 문단의 FSSCat 제안기관 / 구름 영상 선별 설명',
   'UPC 연구팀이 FSSCat을 제안했으며, Φsat-1은 두 CubeSat 중 한 기에 탑재하는 AI로 구름 때문에 쓸 수 없는 영상을 선별하도록 설명됩니다.',
   '발사 전 계획 문구가 남은 소개 자료입니다. 구름 선별 정확도·전송량 절감 실측값이나 실제 발사일을 이 자료로 확정하지 않습니다.'],
  ['phi1-related-institutions','phi1ai',['cosine','pisa'],'관련기관 소개',
   'Related Links: cosine Measurement Systems / University of Pisa',
   'ESA의 Φsat-1 AI 소개는 cosine Measurement Systems와 University of Pisa를 관련기관 링크로 연결합니다.',
   '관련 링크의 존재만 확인합니다. 주계약·특정 장비 제작·알고리즘 개발 역할의 증거로 확대하지 않습니다.'],
  ['opssat-processing','opssat',['opssat-mission','flight-sw','cyclone'],'임무 구성',
   'The payload → Processing platform / 본문의 bus와 payload 제어권 설명',
   'OPS-SAT은 Linux 기반 재구성 실험환경에 Altera Cyclone V SoC의 ARM Cortex-A9와 FPGA를 사용하며, 위성 버스가 실험 탑재체의 제어권을 회수할 수 있도록 구성됩니다.',
   '구성·안전 설계 설명입니다. 모든 실험 소프트웨어의 성공이나 다른 위성의 복구 가능성을 보장하지 않습니다.'],
  ['opssat-prime','opssat',['opssat-mission','tugraz','esa'],'기관 역할',
   'Project status 첫 문단: GSTP / prime contractor',
   'OPS-SAT 사업은 ESA GSTP의 지원으로 시작됐으며 Technische Universität Graz가 주계약 기관으로 명시됩니다.',
   '해당 사업의 역할이며 대학의 모든 우주사업 또는 개별 하도급 장비의 공급관계를 뜻하지 않습니다.'],
  ['opssat-end','opssat',['opssat-mission'],'운용 기록',
   '페이지 상단 임무 종료 공지',
   'ESA는 OPS-SAT 임무가 2024년 5월 22–23일 밤(CEST)에 종료됐다고 공지합니다.',
   '현지 시간 범위 그대로 기록합니다. 하단에 남은 미래형 실험 계획을 현재 운용 상태로 해석하지 않습니다.'],
  ['intuition-hardware','intuition',['intuition1','leopard','kplabs'],'사양',
   '본문 Leopard Data Processing Unit 하드웨어 설명',
   'KP Labs는 Intuition-1을 6U 초분광 위성으로 소개하며 Leopard DPU의 Zynq UltraScale+ ZU9EG 처리 노드 2개와 감독용 서브시스템을 설명합니다.',
   '개발사 공개 구성입니다. 냉간 이중화 설계를 실제 고장복구 성공이나 독립 방사선 인증과 동일시하지 않습니다.'],
  ['intuition-processing','intuition',['intuition1','leopard','kplabs'],'개발사 실증발표',
   'On-Board Data Processing / 궤도 영상 예시 / Key Achievements to Date',
   'KP Labs는 여러 지역의 초분광 영상을 Intuition-1에서 처리했고 Leopard DPU로 구름 검출과 영상 선별을 수행했다고 발표합니다.',
   '개발사 발표이며 원시 시험자료에 의한 독립 재현은 아닙니다. 페이지의 상대 기간 표현을 특정 시험일이나 현재 운용 상태로 바꾸지 않습니다.'],
  ['starling-partner-roles','starling',['nasa-ames','blue-canyon','emergent','cesium','l3harris'],'기관 역할',
   'Partners: NASA Ames / Blue Canyon / Emergent / CesiumAstro / L3Harris',
   'NASA Ames는 Starling 주관·탑재 전자·소프트웨어·운용, Blue Canyon은 본체 제작, Emergent는 ROMEO 소프트웨어, CesiumAstro는 MANET 무선기·안테나, L3Harris는 지상 항법·기동계획 소프트웨어를 담당합니다.',
   '공개된 사업 역할입니다. 지상 소프트웨어를 탑재 장비로 분류하거나 역할 명단을 독립 성능검증으로 집계하지 않습니다.'],
  ['starling-romeo','starling',['romeo','planning'],'실증 결과',
   'Starling Technology Demonstrations → phase 1.0 → ROMEO',
   'NASA는 ROMEO가 위성 위치·궤적을 추정하고 궤도 변경을 계획하며 최소 지상 개입으로 군집 유지 기동을 수행했다고 설명합니다.',
   '수록된 Starling 시험 범위의 결과입니다. 임의의 위성 군집이나 심우주에서 같은 성능을 보장하지 않습니다.'],
  ['starling-manet','starling',['manet'],'실증 결과',
   'Starling Technology Demonstrations → phase 1.0 → MANET',
   'NASA는 S대역 위성 간 네트워크를 구성했으며 한 위성의 지상 통신 고장 때 다른 위성을 통해 명령·소프트웨어를 전달했다고 기록합니다.',
   '해당 시험의 통신 우회 사례이며 모든 장애의 복구나 네트워크 가용률을 뜻하지 않습니다.'],
  ['starling-dsa','starling',['dsa'],'실증 결과',
   'Starling Technology Demonstrations → phase 1.0 → DSA',
   'NASA는 DSA가 위성 간 상태를 공유하고 전리층 관측에 사용할 GPS 신호 선택을 자율적으로 조정했다고 설명합니다.',
   '전리층 관측 조정 실험의 성과입니다. 모든 종류의 관측·임무 판단을 검증한 것은 아닙니다.'],
  ['avionics-ix10','avionics',['ix10','unibap','intel','amd'],'기술조사 사양',
   '8.2.7 / Table 8-4: Unibap iX10-100A 행',
   'NASA 조사표는 Unibap iX10-100A에 AMD Ryzen V1000 CPU·GPU와 Intel Myriad-X VPU를 기재합니다.',
   '공개 제품 정보를 모은 조사표입니다. NASA 제품 인증이나 특정 임무의 전체 성능 실증을 의미하지 않습니다.'],
  ['avionics-polarfire','avionics',['microchip','tetraplex'],'기술조사 사양',
   '8.2.7 / Table 8-4: TelePIX TetraPLEX OBP 행',
   'NASA 조사표는 TetraPLEX OBP의 구성에 Microchip PolarFire SoC MPFS250T와 NVIDIA Jetson ORIN NX를 명시합니다.',
   '수록 제품 구성에 한정됩니다. 이 사양을 과거 궤도 시험 제품의 동일 버전으로 단정하지 않습니다.'],
  ['avionics-zynq','avionics',['amd','q8s'],'기술조사 사양',
   '8.2.7 / Table 8-4: Xiphos Q8S 행',
   'NASA 조사표는 Xiphos Q8S의 프로세서를 AMD-Xilinx Zynq UltraScale+ MPSoC 계열로 기재합니다.',
   '계열 수준의 조사표 정보입니다. 실제 주문 사양·세대별 동일성·모든 궤도의 적합성을 보증하지 않습니다.'],
  ['comms-click-pointing','comms',['clicka','click-terminal','mit','blue-canyon'],'실증 결과',
   '광통신 단말 본문: MIT CLICK-A / MEMS FSM 두 문단',
   'NASA는 MIT의 CLICK-A 단말을 Blue Canyon XB1 본체에 통합했으며 MEMS 미세 지향거울로 본체만 사용한 지향보다 개선된 지향을 실증했다고 설명합니다.',
   'CLICK-A 지향 시험의 범위입니다. CLICK-B/C의 위성 간 전송률·거리측정 목표를 A의 달성 결과로 옮기지 않습니다.'],
  ['comms-tbird-ground','comms',['jpl','optical-modem','tbird-terminal'],'임무 구성',
   '광통신 단말 본문: MIT Lincoln Laboratory TBIRD / NASA JPL OCTL 문단',
   'NASA는 TBIRD의 상용 광통신 송수신기·증폭기와 JPL OCTL의 1 m 망원경, 적응광학·광섬유 결합 수신 구성을 설명합니다.',
   'TBIRD 위성–지상 링크의 구성입니다. JPL이 비행 단말을 제작했다거나 위성 간 링크를 실증했다는 뜻이 아닙니다.'],
  ['proba-planning','probatech',['planning','proba3'],'개발 목표',
   '첫 문단 Formation Flying Management / 마지막 자율제어 문단',
   'ESA는 Proba-3의 편대비행 관리 시스템이 활동 일정·계획을 맡고 대부분의 편대비행 실험을 자동·자율 수행하도록 설계됐다고 설명합니다.',
   '2024년 발사 전 기술 설명입니다. 계획된 기능의 완전한 달성이나 운용 가용률로 해석하지 않습니다.'],
  ['proba-flls','probatech',['flls','proba3'],'사양',
   'Fine Lateral and Longitudinal Sensor 설명 문단',
   'Proba-3의 FLLS는 Occulter에서 레이저를 보내 Coronagraph의 코너큐브 반사체에서 되돌아온 빛으로 상대 위치를 측정하는 구성입니다.',
   '원문의 밀리미터 정확도는 발사 전 기술 설명입니다. 이 자료만으로 궤도 실측 오차를 확정하지 않습니다.'],
  ['proba-recovery','probarecovery',['proba3'],'운용 기록',
   'Get ready for more science: 복구 후 첫 편대비행과 ASPIICS 확인',
   'ESA는 2026-06-09 발표에서 이상 이후 첫 편대비행을 재수행했고 ASPIICS로 코로나 영상을 얻었다고 설명합니다.',
   '발표는 비행을 직전 주로 표현합니다. 발표일을 정확한 시험일로 바꾸거나 이후 무중단 운용을 추정하지 않습니다.'],
  ['phi2-science','phi2science',['phisat2'],'운용 기록',
   '본문 첫 두 문단: commissioning / delivery of science data',
   'ESA는 2025-07-15에 Φsat-2의 초기운용 종료와 과학자료 제공 시작을 발표했습니다.',
   '운용 단계의 전환입니다. 개별 AI 응용의 정확도·재현성·모든 관측환경 성능을 확정하지 않습니다.'],
  ['power-battery-selection','power-soa',['space-battery'],'기술조사',
   '3.4 State-of-the-Art – Energy Storage / 3.4.1 Secondary Li-ion Batteries',
   'NASA는 소형 위성의 충전식 배터리 선택에서 에너지 밀도뿐 아니라 안전·수명·출력·환경 내구성을 함께 고려해야 한다고 설명합니다.',
   '설계 검토 기준입니다. 조사표 제품의 특정 임무 적합성이나 비행 인증을 대신하지 않습니다.'],
  ['thermal-biosentinel-fep','thermal-soa',['fep-tape','biosentinel'],'탑재 적용',
   '수동 열제어 코팅 본문: BioSentinel / second-surface silvered FEP tapes',
   'NASA는 BioSentinel이 외부 열복사 특성과 에너지 균형을 조절하기 위해 금속화 코팅 테이프와 은 코팅 FEP 테이프를 사용했다고 설명합니다.',
   '소재 적용 근거입니다. 정확한 비행 온도·열수명이나 생물학 실험 성공을 뜻하지 않습니다.'],
  ['biosentinel-biological-outcome','nasa-biosentinel-program',['biosentinel'],'실증 결과',
   '본문: BioSensor hardware / yeast cell growth / LET mission extension',
   'NASA는 심우주에서 BioSensor 하드웨어를 작동시켰으나 효모 성장은 관측하지 못했고, LET 분광계 방사선 측정을 이어갔다고 설명합니다.',
   '장기 보관에 따른 효모 생존성 저하는 원문이 제시한 원인 추정입니다. 하드웨어 작동과 생물학 목표 달성을 구분하며 현재 운용 상태로 확대하지 않습니다.'],
  ['cpod-outcome','cpod-source',['cpod'],'실증 결과',
   '페이지 상단 결과 요약 / About → What is CPOD',
   'NASA는 두 3U 위성을 이용한 CPOD가 연료 소진으로 종료됐으며 계획한 접근·근접운용·도킹을 실증하지 못했다고 명시합니다.',
   '하단의 미래형 목표를 성과로 읽지 않습니다. 별도 사업 자료와 종료일 표기가 달라 정확한 종료일은 이 주장에 포함하지 않습니다.']
 ];
 const entities=new Map(D.entities.map(e=>[e.id,e]));
 const sources=new Map(D.sources.map(s=>[s.id,s]));
 const ids=new Set(D.evidence.map(e=>e.id));
 for(const [suffix,source,targets,kind,locator,claim,limitation] of rows){
  const id='claim-review-'+suffix;
  if(ids.has(id)||!sources.has(source))throw new Error('Invalid reviewed claim: '+id);
  for(const target of targets){
   const entity=entities.get(target);
   if(!entity)throw new Error('Missing reviewed claim target: '+target);
   if(!entity.sources.includes(source))entity.sources.push(source);
  }
  D.evidence.push({id,source,entities:targets,kind,locator,claim,limitation,reviewed});
  ids.add(id);
 }
 D.reviewed=reviewed;
 D.version='1.5.0';
 D.claimEvidenceReady=true;
})();
