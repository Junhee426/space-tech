/* Verification-satellite expansion, reviewed 2026-09-23.
 * Adds seven technology and performance verification missions with their own
 * sources, claim-level evidence, mission profiles and program descriptions.
 * Existing entity, source and claim review dates are preserved.
 */
(() => {
 'use strict';
 const D=window.ATLAS,reviewed='2026-09-23';
 // Load-order guard: this file reads the finished claim review and adds whole
 // mission records, so every earlier data file must already have run.
 if(!D||D.claimEvidenceReady!==true||!Array.isArray(D.evidence))throw new Error('mission-expansion.js requires claim-evidence.js to run first (window.ATLAS.claimEvidenceReady missing).');
 const entityMap=new Map(D.entities.map(e=>[e.id,e]));
 const fieldName=id=>{const f=D.fields.find(field=>field.id===id);if(!f)throw new Error('Unknown field: '+id);return f.name;};
 const attach=(entityId,sourceId)=>{
  const entity=entityMap.get(entityId);
  if(!entity)throw new Error('Missing expansion target: '+entityId);
  if(!entity.sources.includes(sourceId))entity.sources.push(sourceId);
 };

 // Columns: id, title, publisher, country, type, URL, document date, origin group, note.
 const sources=[
  ['kari-pvsat-complete','누리호 2차 발사 성능검증위성(PVSAT) 성공적 임무 완수','KARI','대한민국','공공기관 성과발표','https://www.kari.re.kr/kor/article/ATCL87374b48c/18161','2024-08-14','KARI','발사체 궤도 투입 성능 확인과 검증탑재체 3종의 약 2년 우주검증 결과. "세계 3번째" 평가는 기관 발표 표현입니다.'],
  ['kaist-nextsat1-workshop','우주과학과 핵심기술을 품은 소형위성 워크숍 개최','KAIST','대한민국','개발기관 발표','https://news.kaist.ac.kr/news/html/news/?mng_no=2424&mode=V','2019-04-24','KAIST','차세대소형위성 1호의 약 4개월 초기운영 점검 결과와 핵심 부품별 개발기관. 부품별 정량값은 없습니다.'],
  ['kaist-nextsat2-initial','차세대소형위성 2호 성공적 관측영상 공개','KAIST','대한민국','개발기관 발표','https://news.kaist.ac.kr/news/html/news/?mng_no=31250&mode=V','2023-09-05','KAIST','3개월 초기운영의 SAR 시험 관측, LEO-DOS, 핵심기술검증 탑재체 4종 기능 점검 결과.'],
  ['kaist-nextsat2-complete','차세대소형위성2호 2년 임무 완수','KAIST','대한민국','개발기관 발표','https://news.kaist.ac.kr/news/html/news/?mng_no=47050&mode=V','2025-05-29','KAIST','영상레이다 2년 궤도 기술검증 완료와 관측 활용 발표. 해상도·검보정 지표는 제시되지 않았습니다.'],
  ['kasi-snipe-overview','나노위성 도요샛 관련 개요 및 참고 영상','한국천문연구원','대한민국','공공기관 임무자료','https://www.kasi.re.kr/kor/publication/post/newsMaterial/29600','2023-05-23','한국천문연구원','발사 직전의 임무 개요와 설계 사양. 편대 유지 방식과 거리 정확도는 제시되지 않았습니다.'],
  ['kasi-snipe-top10','KASI 올해의 10대 뉴스 선정 결과 발표','한국천문연구원','대한민국','공공기관 성과발표','https://www.kasi.re.kr/kor/publication/post/newsMaterial/29886','2023-12-28','한국천문연구원','2023년 결산 발표의 도요샛 항목. 다솔 사출 실패와 3기 편대비행 관측을 기관 표현대로 수록합니다.'],
  ['kasi-snipe-storm','누리호 발사 큐브위성 도요샛, 슈퍼태양폭풍 속에서 우주날씨 관측 성공','한국천문연구원','대한민국','공공기관 성과발표','https://www.kasi.re.kr/kor/publication/post/newsMaterial/32065','2025-08-04','한국천문연구원','2024년 5월 태양폭풍 관측 논문 발표와 위성별 운영 상태. 이후 운영 상태는 추정하지 않습니다.'],
  ['astroscale-elsad-conclusion','ELSA-d Finalizes De-Orbit Operations Marking Successful Mission Conclusion','Astroscale','일본','개발사 발표','https://www.astroscale.com/en/news/astroscales-elsa-d-finalizes-de-orbit-operations-marking-successful-mission-conclusion','2024-01-24','Astroscale','자기 포획·랑데부 실증과 자율 포획 중단, 추력기 손실, 궤도 강하 운용을 함께 설명하는 개발사 발표.'],
  ['astroscale-elsad-mission','ELSA-d · Mission overview and timeline','Astroscale','일본','개발사 임무자료','https://www.astroscale.com/en/missions/elsa-d',null,'Astroscale','발사일, 2기 적층 구성, 협력·허가 기록. SSTL의 제작 범위는 확정하지 않습니다.'],
  ['nasa-ocsd-project','Optical Communications and Sensor Demonstration (OCSD)','NASA','미국','공공기관 임무자료','https://www.nasa.gov/smallspacecraft/ocsd-project/','2023-07-26','NASA','본체 고정 레이저의 위성→지상 200 Mbps 실증과 근접 기동 기록. 문서 날짜는 페이지 갱신일입니다.'],
  ['jaxa-raise2-outline','革新的衛星技術実証2号機 / RAISE-2 実証テーマ','JAXA','일본','공공기관 임무자료','https://www.kenkai.jaxa.jp/kakushin/kakushin02.html',null,'JAXA','6개 실증 테마와 제안기관, 운용 단계 기록. 테마별 성과 수치는 포함하지 않습니다.'],
  ['jaxa-raise2-end','小型実証衛星2号機（RAISE-2）の運用終了について','JAXA','일본','공공기관 실증자료','https://www.jaxa.jp/press/2023/04/20230407-1_j.html','2023-04-07','JAXA','약 1년 궤도 실증 완료와 정파 발표. 테마별 성과는 별지 이미지로 제공됩니다.'],
  ['jaxa-raise2-phase','小型実証衛星2号機（RAISE-2）定常運用フェーズ移行！','JAXA','일본','공공기관 운용발표','https://fanfun.jaxa.jp/topics/detail/19938.html','2022-02-24','JAXA','JAXA 개발 100 kg급 위성 소개와 정상운용 전환 소식. 실증 성과 발표가 아닙니다.']
 ];
 const knownUrls=new Set(D.sources.map(s=>s.url));
 for(const [id,title,publisher,country,type,url,date,originGroup,note] of sources){
  if(D.sources.some(s=>s.id===id)||knownUrls.has(url))throw new Error('Duplicate expansion source: '+id);
  D.sources.push({id,title,publisher,country,type,url,date,reviewed,originGroup,note,access:'본문 확인'});
 }

 const add=(id,name,type,field,summary,extra={})=>{
  if(entityMap.has(id))throw new Error('Duplicate expansion entity: '+id);
  const entity={id,name,type,field,subtitle:fieldName(field),summary,sources:[],reviewed,status:'자료 확인',metrics:[],notes:'',aliases:[],...extra};
  D.entities.push(entity);entityMap.set(id,entity);
 };
 add('kaist-satrec','KAIST 인공위성연구소','organization','ai','차세대소형위성 1·2호를 주관 개발한 KAIST 연구조직. 2025년 자료는 KAIST 우주연구원 명의로 발표됐습니다.',{aliases:['KAIST','SaTReC','카이스트','우주연구원','대한민국','한국']});
 add('kasi','한국천문연구원','organization','autonomy','도요샛을 공동 개발하고 차세대소형위성 과학 탑재체 개발에 참여한 연구기관.',{aliases:['KASI','천문연','대한민국','한국']});
 add('ap-satellite','AP위성','organization','power','항우연의 지원으로 누리호 성능검증위성을 개발하고 공동 운영한 기업.',{aliases:['AP Satellite','AP위성(주)','대한민국','한국']});
 add('kaeri','한국원자력연구원','organization','power','성능검증위성에 실린 발열전지(소형 모의 원자력전지)를 개발한 연구기관.',{aliases:['KAERI','원자력연','대한민국','한국']});
 add('aerospace-corp','The Aerospace Corporation','organization','optical','NASA OCSD 위성을 개발·운용한 미국 기관.',{aliases:['Aerospace Corp','에어로스페이스','미국']});
 add('pvsat-heat-cell','성능검증위성 발열전지','product','power','열출력 10 W급 소형 모의 원자력전지로 우주검증을 수행한 전력 장치.',{status:'기관 우주검증 발표',aliases:['발열전지','모의 원자력전지','원자력전지','RTG'],notes:'기관 발표의 "모의" 표현을 유지합니다. 실제 방사성 동위원소 열원의 탑재 여부는 이 자료로 확정하지 않습니다.'});
 add('sar','영상레이다(SAR) 관측','technology','sensing','전파를 송수신해 주야간·기상 조건과 관계없이 지표 영상을 얻는 능동 관측 기술.',{aliases:['SAR','Synthetic Aperture Radar','합성개구레이다','영상레이더'],notes:'광학·적외선·초분광 관측과 별도 기술로 분류합니다.'});
 add('nextsat2-sar','차세대소형위성 2호 영상레이다','product','sensing','KAIST가 설계·제작·지상 시험을 거쳐 국산화한 소형위성용 영상레이다.',{status:'개발기관 2년 궤도검증 발표',aliases:['SAR','영상레이다','합성개구레이다'],notes:'2년 기술검증 완료는 개발기관 발표입니다. 해상도·방사 정확도 같은 영상 품질 지표는 수록 자료에 없습니다.'});

 // Each mission: entity fields, demonstration, program (with grounded developers) and events.
 const missions=[
  {
   id:'pvsat',name:'누리호 성능검증위성 / PVSAT',field:'power',launch:'2022-06-21',status:'임무 완수 · 기관 발표',
   summary:'누리호 2차 발사의 궤도 투입 성능을 확인하고 국산 발열전지·제어모멘트자이로·S대역 안테나를 우주검증한 위성.',
   aliases:['성능검증위성','PVSAT','Performance Verification Satellite','누리호 2차','검증위성','대한민국','한국'],
   notes:'약 2년의 부임무 운용을 마쳤다는 기관 발표 기준입니다. 발열전지는 "소형 모의 원자력전지"로 발표됐으며 실제 방사성 동위원소 전지의 우주 운용 실적으로 해석하지 않습니다.',
   metrics:[['운용','약 2년 · 부임무'],['검증탑재체','3종']],
   demonstration:{
    objective:'누리호 궤도 투입 성능 확인과 국산 검증탑재체 3종의 우주검증',
    result:'KARI는 누리호 탑재체 궤도 투입 성능 확인과 큐브위성 궤도 투입을 완수하고, 약 2년간 발열전지·S대역 안테나·제어모멘트자이로의 우주검증을 수행했다고 발표했습니다.',
    conditions:'누리호 2차 발사 탑재 · 검증탑재체 3종',
    source:'kari-pvsat-complete',
    tests:[
     ['발열전지 (한국원자력연구원)','열출력 10 W급 소형 모의 원자력전지가 전기 출력 120 mW를 출력 감소나 부품 고장 없이 장기간 유지했다고 발표했습니다.'],
     ['S대역 안테나 (케스피온)','장착 용이성과 가격 경쟁력을 위해 소형화한 안테나의 안정적인 성능을 검증했다고 발표했습니다.'],
     ['제어모멘트자이로 (져스텍)','최대 중량 9.5 kg의 고기동 자세제어용 구동기를 탑재해 검증했습니다. 정량 기동 성능값은 이 화면에 수록하지 않았습니다.'],
     ['누리호 연결·분리 데이터','위성–발사체 연결 인터페이스 검증, 발사·분리 과정의 진동 정보, 궤도 투입 정보를 제공했습니다.']
    ]
   },
   program:{
    purpose:{text:'누리호 2차 발사에서 발사체가 탑재체를 목표 궤도에 올리는 성능을 확인하고, 국내 기관·기업이 개발한 부품을 실제 우주환경에서 시험해 우주검증이력(Heritage)을 확보하는 사업입니다.',sources:['kari-pvsat-complete']},
    organization:{text:'성능검증위성은 한국항공우주연구원의 지원으로 AP위성이 개발했으며 두 기관이 공동으로 운영했습니다. 검증탑재체는 한국원자력연구원(발열전지), 케스피온(S대역 안테나), 져스텍(제어모멘트자이로)이 각각 개발했습니다.',sources:['kari-pvsat-complete']},
    architecture:{text:'발사체–위성 연결 인터페이스, 발사·분리 과정의 진동, 궤도 투입 정보를 확인하는 기능에 큐브위성 궤도 투입 임무와 검증탑재체 3종(발열전지·S대역 안테나·제어모멘트자이로)을 결합한 구성입니다.',sources:['kari-pvsat-complete']},
    verification:{text:'발사 당시에는 발사체 궤도 투입 성능 데이터를 제공하고 큐브위성을 궤도에 투입했으며, 이후 약 2년의 부임무 기간에 검증탑재체의 작동을 우주환경에서 확인했습니다. 결과는 KARI의 임무 완수 발표를 기준으로 정리했습니다.',sources:['kari-pvsat-complete']},
    considerations:[
     {topic:'발열전지 출력의 장기 추세 해석',detail:'120 mW 출력 유지는 발표된 시험 조건과 운용 기간에 대한 기록입니다. 실제 동위원소 열원의 붕괴에 따른 열출력 감소, 열전 소자 열화, 방열 조건 변화를 포함한 장기 출력 예측은 별도로 검토해야 합니다.',sources:['kari-pvsat-complete']},
     {topic:'제어모멘트자이로의 적용 범위',detail:'CMG는 특이점 회피 조향 법칙과 미소 진동 억제가 적용 위성의 성능을 좌우합니다. 검증위성에서의 작동 확인을 대형 고기동 위성의 지향 정확도·안정도로 옮기려면 관성 크기와 기동 프로파일별 시험이 필요합니다.',sources:['kari-pvsat-complete']},
     {topic:'발사체 계측과 부임무의 구분',detail:'성능검증위성의 주 임무는 발사체 궤도 투입 성능 확인이며 부품 검증은 부임무입니다. 부품 검증 결과를 발사체 성능 지표와 섞어 해석하지 않도록 두 결과를 구분해 읽어야 합니다.',sources:['kari-pvsat-complete']}
    ],
    developers:[['AP위성','위성 개발·공동 운영'],['한국항공우주연구원','개발 지원·공동 운영']]
   },
   events:[['2022-06-21','발사','누리호 성능검증위성 발사','누리호 2차 발사 탑재. 검증탑재체의 우주검증 완료를 뜻하지 않습니다.','kari-pvsat-complete'],['2024-08-14','성과 발표','성능검증위성 임무 완수 발표','약 2년의 부임무와 검증탑재체 결과 발표. 발표일과 개별 시험일은 구분합니다.','kari-pvsat-complete']]
  },
  {
   id:'nextsat1',name:'차세대소형위성 1호 / NEXTSat-1',field:'ai',launch:'2018-12-04',status:'초기운영 점검 발표',
   summary:'국산 우주 핵심기술 7종과 우주과학 탑재체를 실은 KAIST 인공위성연구소의 100 kg급 위성.',
   aliases:['차세대소형위성1호','차세대 1호','NEXTSat-1','넥스트샛','KAIST','대한민국','한국'],
   notes:'수록한 KAIST 자료는 발사 후 약 4개월 초기운영 점검 결과입니다. 2년 임무 기간의 최종 성과나 부품별 정량 성능은 이 자료로 확정하지 않습니다.',
   metrics:[['위성 규모','100 kg급'],['핵심기술','7종 · 초기운영 점검']],
   demonstration:{
    objective:'국산 우주 핵심기술 7종의 우주검증과 우주과학 관측',
    result:'KAIST는 약 4개월 초기운영에서 위성 상태, 자세제어·기동, 태양전지판 전개·전력, 방사선·플라즈마 측정과 7개 핵심기술 전반의 기능이 정상임을 확인했다고 발표했습니다.',
    conditions:'100 kg급 소형위성 · Falcon 9 발사',
    source:'kaist-nextsat1-workshop',
    tests:[
     ['3차원 적층형 메모리 · S대역 디지털 송수신기 (KAIST)','초기운영 기능 점검 대상입니다. 부품별 성능검증 결과는 워크숍 발표로 공개됐습니다.'],
     ['표준형 탑재 컴퓨터 · 고속 자료처리장치 (AP우주)','초기운영 기능 점검 대상입니다.'],
     ['반작용 휠 (져스텍) · 광학형 자이로 (파이버프로)','자세 관련 부품의 기능 점검 대상이며, 차세대소형위성 2호 적용을 위한 국산화 진행이 언급됐습니다.'],
     ['고속·고정밀 별 추적기 (세트렉아이)','초기운영 기능 점검 대상입니다.']
    ]
   },
   program:{
    purpose:{text:'국내 산·학·연이 개발한 우주 핵심 부품을 실제 궤도에서 검증하고, 우주 플라즈마·태양폭풍 방사선 등 우주과학 관측을 함께 수행하는 한국형 우주과학연구용 소형위성 사업입니다.',sources:['kaist-nextsat1-workshop']},
    organization:{text:'KAIST 인공위성연구소가 주관하고 한국천문연구원 등 국내 산·학·연구기관이 참여해 개발했습니다. 핵심 부품은 KAIST(3차원 적층형 메모리·S대역 디지털 송수신기), AP우주(표준형 탑재 컴퓨터·고속 자료처리장치), 져스텍(반작용 휠), 세트렉아이(별 추적기), 파이버프로(광학형 자이로)가 개발했습니다.',sources:['kaist-nextsat1-workshop']},
    architecture:{text:'소형화·모듈화·표준화한 100 kg급 위성에 7개 우주 핵심기술과 우주과학 탑재체를 실었습니다. KAIST는 기술시험을 위해 국내 위성 최초로 관성항법장치를 탑재했다고 설명합니다.',sources:['kaist-nextsat1-workshop']},
    verification:{text:'2018년 12월 4일 Falcon 9으로 발사한 뒤 약 4개월 초기운영에서 본체·탑재체 기능을 점검하고, 2019년 4월 중순부터 2년 임무에 들어갔습니다. 부품별 성능검증 결과는 워크숍 발표 형식으로 공개됐습니다.',sources:['kaist-nextsat1-workshop']},
    considerations:[
     {topic:'기능 점검과 장기 신뢰성의 구분',detail:'초기운영 정상 확인은 기능 점검 결과입니다. 방사선 누적에 따른 성능 저하나 장기 오류율을 판단하려면 운용 기간 전체의 부품별 자료와 지상 방사선 시험 결과를 함께 비교해야 합니다.',sources:['kaist-nextsat1-workshop']},
     {topic:'자세 센서 조합의 교차 검증',detail:'별 추적기·광학형 자이로·반작용 휠이 한 위성에서 함께 동작하므로, 개별 부품의 정확도를 분리해 평가할 기준 센서와 비교 방법이 필요합니다.',sources:['kaist-nextsat1-workshop']},
     {topic:'후속 위성 적용 시 조건 차이',detail:'KAIST는 일부 부품의 차세대소형위성 2호·차세대중형위성 적용을 언급합니다. 궤도·수명·전력 조건이 다른 위성에 옮길 때는 차세대 1호의 검증 범위를 넘는 조건을 추가로 확인해야 합니다.',sources:['kaist-nextsat1-workshop']}
    ],
    developers:[['KAIST 인공위성연구소','주관 개발'],['한국천문연구원','개발 참여']]
   },
   events:[['2018-12-04','발사','차세대소형위성 1호 발사','Falcon 9으로 발사. 핵심기술 검증 완료를 뜻하지 않습니다.','kaist-nextsat1-workshop']]
  },
  {
   id:'nextsat2',name:'차세대소형위성 2호 / NEXTSat-2',field:'sensing',launch:'2023-05-25',status:'2년 기술검증 완료 발표',
   summary:'국산 영상레이다(SAR)와 핵심기술검증 탑재체 4종을 실은 KAIST의 100 kg급 위성.',
   aliases:['차세대소형위성2호','차세대 2호','NEXTSat-2','영상레이다','누리호 3차','KAIST','대한민국','한국'],
   notes:'2년 기술검증 완료와 1,200회 이상 관측은 개발기관 발표 기준입니다. SAR 해상도·영상 품질의 정량 지표는 수록 자료에 없어 기재하지 않았습니다.',
   metrics:[['궤도 고도','550 km'],['관측','1,200회 이상 · 2025-05 발표']],
   demonstration:{
    objective:'국산 우주용 영상레이다의 궤도 기술검증과 국산화 핵심기술 4종 시험',
    result:'KAIST는 2025년 5월 25일 자로 2년간의 SAR 궤도상 기술검증 임무를 완료하고 1,200회 이상 지구관측을 수행했다고 발표했습니다. 초기운영에서는 핵심기술검증 탑재체 4종의 정상 작동도 확인했습니다.',
    conditions:'고도 550 km 궤도 · 누리호 3차 주탑재 위성',
    source:'kaist-nextsat2-complete',
    conditionSource:'kaist-nextsat2-initial',
    tests:[
     ['영상레이다 (KAIST)','하루 평균 3~4회 촬영으로 기능점검·기술검증을 진행했고, 극지연구소·국립공원연구원과 북극 해빙·산림 변화 관측에 활용했습니다.'],
     ['GPS·Galileo 복합 항법 수신기 (두시텍)','궤도상 위치·속도 측정 기능이 정상임을 확인했습니다.'],
     ['상변환 물질 열제어장치 (한국공학대)','등온 축열로 위성 내부 고발열 유닛 온도를 일정하게 유지하는 기능이 정상 작동했습니다.'],
     ['X대역 GaN 전력증폭기 (한국전자통신연구원)','X대역 시험 신호를 지상 추적안테나로 수신해 정상 작동을 확인했습니다.'],
     ['태양전지배열기 (KAIST)','궤도 전압·전류 검침으로 정상 발전을 확인했습니다.'],
     ['LEO-DOS (한국천문연구원)','시험 운영 기간의 전 지구 우주방사선 등가선량 지도를 공개했습니다.']
    ]
   },
   program:{
    purpose:{text:'KAIST가 국내 최초로 설계·제작·지상 시험을 거쳐 국산화한 우주용 영상레이다를 100 kg급 소형위성에 실어 궤도에서 검증하고, 주야간·기상 조건에 관계없는 지구관측 자료를 확보하는 사업입니다.',sources:['kaist-nextsat2-complete']},
    organization:{text:'KAIST 인공위성연구소(2025년 발표는 KAIST 우주연구원 명의)가 위성과 영상레이다를 개발했습니다. 한국천문연구원은 우주방사선 관측장비 LEO-DOS를, 두시텍·한국공학대·한국전자통신연구원은 핵심기술검증 탑재체를 개발했으며, 극지연구소와 국립공원연구원은 관측 자료 활용에 협력했습니다.',sources:['kaist-nextsat2-initial','kaist-nextsat2-complete']},
    architecture:{text:'주탑재체인 영상레이다와 과학 탑재체 LEO-DOS, 국산화 핵심기술검증 탑재체 4종(GPS·Galileo 복합 항법 수신기, 상변환 물질 열제어장치, X대역 GaN 전력증폭기, 태양전지배열기)으로 구성됩니다. KAIST는 위성 본체와 탑재체 대부분이 국내 독자 기술로 개발됐다고 설명합니다.',sources:['kaist-nextsat2-initial']},
    verification:{text:'발사 후 3개월 초기운영에서 본체·탑재체·지상국 기능 점검과 SAR 시험 관측을 수행했고, 이후 SAR 기술 시험 운영과 검보정을 거쳐 정상 임무로 전환하는 계획이었습니다. KAIST는 2025년 5월 25일 자로 2년간의 궤도상 기술검증 임무를 완료했다고 발표했습니다.',sources:['kaist-nextsat2-initial','kaist-nextsat2-complete']},
    considerations:[
     {topic:'검보정과 영상 품질 지표',detail:'공개 자료는 관측 횟수와 활용 사례를 제시하지만 해상도·방사 정확도 같은 정량 지표는 담고 있지 않습니다. 다른 SAR 자료와 융합하려면 검보정 결과와 영상 품질 지표를 따로 확인해야 합니다.',sources:['kaist-nextsat2-complete']},
     {topic:'소형위성의 SAR 전력·열 부담',detail:'SAR는 촬영 중 큰 전력을 쓰고 송신부 발열이 큽니다. 100 kg급 위성에서 하루 3~4회 촬영이 전력 저장과 열제어 여유 안에서 어떻게 유지되는지 설계 검토가 필요합니다.',sources:['kaist-nextsat2-initial','kaist-nextsat2-complete']},
     {topic:'임무 수명 이후 성능 추세',detail:'KAIST는 임무 수명 이후에도 영상레이다 성능이 양호하다고 설명합니다. 장기 운용 자료로 송수신 성능 변화와 궤도 변화에 따른 관측 기하 변화를 추적하면 후속 위성 설계에 활용할 수 있습니다.',sources:['kaist-nextsat2-complete']}
    ],
    developers:[['KAIST 인공위성연구소','위성·영상레이다 개발'],['한국천문연구원','LEO-DOS 개발']]
   },
   events:[['2023-05-25','발사','차세대소형위성 2호 발사','누리호 3차 주탑재 위성으로 발사.','kaist-nextsat2-initial'],['2025-05-25','임무 완료','차세대소형위성 2호 2년 기술검증 완료','개발기관이 밝힌 2년 궤도 기술검증 완료 기준일. 발표일(2025-05-29)과 구분합니다.','kaist-nextsat2-complete']]
  },
  {
   id:'snipe',name:'도요샛 / SNIPE',field:'autonomy',launch:'2023-05-25',status:'2기 정상 운영 · 기관 발표',
   summary:'위성 간 거리와 비행 형태를 조절하는 편대비행으로 전리권 플라즈마를 관측하는 10 kg 이하 큐브위성 4기.',
   aliases:['도요샛','SNIPE','Small scale magNetospheric and Ionospheric Plasma','가람','나래','다솔','라온','편대비행','큐브위성','대한민국','한국'],
   notes:'4기 중 다솔은 발사체에서 사출되지 못했고, 가람은 전력 부족으로 교신 외 임무가 어렵다고 천문연이 2025년에 설명했습니다. "큐브위성 최초 편대비행"은 기관 발표 표현이며 편대 거리·유지 정확도의 정량값은 수록 자료에 없습니다.',
   metrics:[['구성','4기 · 3기 사출'],['정상 운영','2기 · 2025-08 발표']],
   demonstration:{
    objective:'큐브위성 편대비행을 이용한 근지구 우주환경(전리권 플라즈마) 정밀 관측',
    result:'천문연은 도요샛 3기와 교신하며 편대비행으로 우주환경을 관측했다고 발표했고, 2024년 5월 슈퍼태양폭풍 기간 약 60시간의 연속 관측 결과를 Space Weather에 게재했습니다. 2025년 8월 기준 나래·라온 2기가 정상 운영 중입니다.',
    conditions:'고도 500 km 태양동기궤도 · 10 kg 이하 위성 4기',
    source:'kasi-snipe-storm',
    conditionSource:'kasi-snipe-overview',
    tests:[
     ['랑뮈어 탐침','전리권 플라즈마 밀도·온도를 약 60시간 연속 관측했고, DMSP·Swarm 자료와 비교해 신뢰성을 확인했다고 발표했습니다.'],
     ['편대비행','위성 간 거리와 비행 형태를 조절하는 기능을 목표로 했습니다. 편대 유지 방식과 정확도의 정량값은 수록 자료에 없습니다.'],
     ['궤도 고도 변화','태양폭풍 기간 도요샛들의 평균 고도가 약 200~500 m 하강한 것으로 나타났습니다.']
    ]
   },
   program:{
    purpose:{text:'저비용 나노위성 여러 대를 동시에 발사해 지상에서 관측할 수 없는 우주 플라즈마 분포의 미세 구조를 입체적으로 관측하는 사업입니다. 기존 근지구 우주환경 위성의 지구 규모 거시 관측을 편대비행으로 보완하려 했습니다.',sources:['kasi-snipe-overview','kasi-snipe-top10']},
    organization:{text:'한국천문연구원과 한국항공우주연구원이 공동으로 개발해 2023년 5월 25일 누리호로 발사했습니다. 슈퍼태양폭풍 관측 논문에는 천문연·충남대·경상대·항우연·부산대·국방과학연구소 연구진이 참여했습니다.',sources:['kasi-snipe-storm']},
    architecture:{text:'가람·나래·다솔·라온 4기는 각각 10 kg 이하이며 고에너지 입자 검출기·랑뮈어 탐침·정밀 지구 자기장 측정기를 싣고 UHF·S대역으로 통신합니다. 설계 임무 수명은 1년, 소비 전력은 12 W입니다.',sources:['kasi-snipe-overview']},
    verification:{text:'누리호 3차 발사에서 3기가 사출됐고 편대비행과 함께 우주환경 관측을 수행했습니다. 2024년 5월 태양폭풍 관측 자료를 DMSP·Swarm 등 해외 위성 자료와 비교해 신뢰성을 확인했으며, 설계 수명 1년을 넘어 나래·라온이 2년 넘게 운용됐다고 발표했습니다.',sources:['kasi-snipe-top10','kasi-snipe-storm']},
    considerations:[
     {topic:'위성 손실 시 편대 구성의 여유',detail:'4기 중 1기가 사출되지 못하고 1기가 전력 문제를 겪으면서 실질 관측은 2기 중심이 됐습니다. 편대 임무는 일부 위성을 잃어도 과학 목표를 유지할 수 있는 최소 기수와 배치 대안을 설계 단계에서 검토해야 합니다.',sources:['kasi-snipe-storm','kasi-snipe-top10']},
     {topic:'편대 유지 성능의 정량화',detail:'공개 자료는 편대비행 수행을 기술하지만 위성 간 거리 제어 정확도나 유지 방식은 제시하지 않습니다. 다점 관측의 공간 분해능을 해석하려면 시점별 위성 간 거리 자료가 함께 필요합니다.',sources:['kasi-snipe-overview','kasi-snipe-top10']},
     {topic:'초소형 위성의 전력 여유',detail:'가람의 전력 부족 사례는 10 kg급 위성의 발전·저장 여유가 임무 지속성을 좌우함을 보여줍니다. 12 W급 전력 예산 안에서 편대 기동과 과학 관측이 겹치는 운용 시나리오를 따로 검토할 필요가 있습니다.',sources:['kasi-snipe-overview','kasi-snipe-storm']}
    ],
    developers:[['한국천문연구원','공동 개발·연구 책임'],['한국항공우주연구원','공동 개발']]
   },
   events:[['2023-05-25','발사','도요샛 4기 발사','누리호 3차 발사. 4기 중 다솔은 사출되지 못했습니다.','kasi-snipe-storm'],['2025-08-04','성과 발표','도요샛 슈퍼태양폭풍 관측 성과 발표','Space Weather 게재(2025-07-26) 논문을 소개한 기관 발표. 관측 기간은 2024년 5월입니다.','kasi-snipe-storm']]
  },
  {
   id:'elsa-d',name:'ELSA-d',field:'servicing',launch:'2021-03-22',status:'임무 종료 · 개발사 발표',
   summary:'서비서와 모의 잔해 역할의 클라이언트 위성으로 자기 포획과 랑데부·근접운용을 시험한 Astroscale의 상용 실증 임무.',
   aliases:['ELSA-d','엘사','End-of-Life Services by Astroscale','자기 도킹','magnetic capture','우주쓰레기','일본','영국'],
   notes:'수동 자기 도킹은 성공했지만 자율 포획 시도는 이상 징후로 진행하지 않았고, 서비서는 추력기 8개 중 4개를 쓸 수 없게 됐습니다. 클라이언트는 모의 잔해이며 비협력 실제 잔해 포획과 구분합니다.',
   metrics:[['구성','서비서 + 클라이언트'],['종료','2024-01 · 궤도 강하 운용']],
   demonstration:{
    objective:'궤도상 서비스에 필요한 자기 포획과 랑데부·근접운용 실증',
    result:'Astroscale은 수동 자기 도킹으로 포획 장치·센서·카메라를 검증하고 반복 자기 포획과 근접 랑데부를 수행했다고 발표했습니다. 자율 포획은 이상 징후로 시도하지 않았고, 2024년 1월 서비서 궤도 강하 운용으로 임무를 마쳤습니다.',
    conditions:'서비서·클라이언트 2기 적층 발사 · 저궤도',
    source:'astroscale-elsad-conclusion',
    conditionSource:'astroscale-elsad-mission',
    tests:[
     ['자기 포획 장치','클라이언트를 분리한 뒤 수동 자기 도킹으로 포획 장치와 탑재 센서·카메라를 검증했습니다.'],
     ['자율 상대항법','클라이언트 분리 후 7시간 넘게 "home position"을 유지했으나 이상 징후로 포획 시도를 중단했습니다.'],
     ['절대→상대 항법 전환','GPS·지상 관측 기반 절대항법으로 약 1,600 km에서 160 m 이내까지 접근한 뒤 탑재 LPR 센서의 상대항법으로 전환했습니다.'],
     ['궤도 강하','남은 추력기로 서비서를 약 500 km 고도로 낮췄고, 약 3.5년 안에 재진입할 것으로 예측했습니다.']
    ]
   },
   program:{
    purpose:{text:'수명이 끝난 위성과 잔해를 제거하는 서비스에 필요한 포획·랑데부·근접운용 핵심기술을 저궤도에서 상용 자금으로 실증하는 임무입니다.',sources:['astroscale-elsad-conclusion']},
    organization:{text:'Astroscale이 수행·운용한 상용 임무이며, 임무 페이지는 SSTL과의 협력과 영국우주청(UK Space Agency)의 임무 허가를 기록합니다. SSTL의 구체적인 제작 범위는 이 자료로 확정하지 않습니다.',sources:['astroscale-elsad-mission','astroscale-elsad-conclusion']},
    architecture:{text:'잔해 제거를 맡는 서비서와 모의 잔해 역할의 클라이언트 2기를 적층해 발사했습니다. 서비서는 RPO 기술과 자기 도킹 메커니즘을 갖추고, 임무 페이지는 적용 솔루션으로 RPO와 도킹판(Docking Plate)을 제시합니다.',sources:['astroscale-elsad-mission','astroscale-elsad-conclusion']},
    verification:{text:'2021년 3월 22일 바이코누르에서 발사된 뒤 클라이언트 분리·수동 포획, 자율 포획 시도, 근접 랑데부를 단계적으로 수행했습니다. 2024년 1월 24일 서비서 궤도 강하 운용 완료와 임무 종료를 발표했습니다.',sources:['astroscale-elsad-mission','astroscale-elsad-conclusion']},
    considerations:[
     {topic:'모의 잔해와 실제 잔해의 차이',detail:'클라이언트는 개발사가 준비한 모의 잔해입니다. 포획 인터페이스가 없는 비협력 잔해나 회전하는 물체로 결과를 옮기려면 대상 특성별 추가 시험이 필요합니다.',sources:['astroscale-elsad-conclusion']},
     {topic:'추진계 고장 시 운용 여유',detail:'추력기 8개 중 4개를 잃은 상태에서도 근접 랑데부와 궤도 강하를 수행했습니다. 근접운용 임무는 추력기 일부 손실 시의 제어 권한과 안전 이탈 경로를 설계 요구로 명시할 필요가 있습니다.',sources:['astroscale-elsad-conclusion']},
     {topic:'자율 중단 판단 기준',detail:'자율 포획은 이상 징후로 시도하지 않았습니다. 자율 근접운용에서는 중단 판단 조건과 지상 개입 시점을 사전에 정의하고, 중단 후 안전 거리 확보 절차를 검증해야 합니다.',sources:['astroscale-elsad-conclusion']}
    ],
    developers:[['Astroscale','임무 수행·운용'],['SSTL','협력 기록 · 제작 범위 미확정']]
   },
   events:[['2021-03-22','발사','ELSA-d 발사','서비서·클라이언트 적층 발사. 포획 실증 성공을 뜻하지 않습니다.','astroscale-elsad-mission'],['2024-01-24','임무 종료','ELSA-d 궤도 강하 운용 완료 발표','서비서 궤도 강하 운용 완료와 임무 종료 발표. 재진입은 이후 예측입니다.','astroscale-elsad-conclusion']]
  },
  {
   id:'ocsd',name:'OCSD / AeroCube-7B·C',field:'optical',launch:'2017-11-12',status:'기관 실증 기록',
   summary:'레이저를 위성 본체에 고정하고 자세제어로 빔을 지향한 큐브위성 2기의 광통신·근접운용 실증.',
   aliases:['OCSD','Optical Communications and Sensor Demonstration','AeroCube-7','AeroCube-7B','AeroCube-7C','에어로큐브','레이저','미국'],
   notes:'200 Mbps는 지상 30 cm 망원경으로의 하향링크 실적입니다. 위성 간 광링크 실증이 아니며, 근접운용은 두 위성이 약 20피트 이내로 접근한 기록입니다.',
   metrics:[['링크 구분','위성 → 지상'],['실증 전송속도','200 Mbps']],
   demonstration:{
    objective:'짐벌 없이 본체 지향으로 운용하는 소형 레이저통신과 근접운용 시험',
    result:'NASA는 OCSD가 지상 30 cm 망원경으로 200 Mbps 광통신을 실증했고, 추력기로 두 위성을 약 20피트(약 6 m) 이내까지 접근시켰다고 기록합니다.',
    conditions:'큐브위성 2기 · 위성→지상 광 링크',
    source:'nasa-ocsd-project',
    tests:[
     ['본체 고정 레이저','레이저를 본체에 고정하고 위성 전체의 자세로 빔을 지향했습니다.'],
     ['광 하향링크','지상 30 cm 망원경으로 200 Mbps 전송을 실증했습니다.'],
     ['물 기반 추진계','두 위성을 약 20피트 이내로 접근시키는 기동에 사용했습니다. 상세 추진 성능은 수록 자료에 없습니다.']
    ]
   },
   program:{
    purpose:{text:'소형 우주선에서 고속 광 데이터 전송과 근접운용 기술을 시험하는 NASA Small Spacecraft Technology 프로그램 임무입니다.',sources:['nasa-ocsd-project']},
    organization:{text:'NASA 우주기술임무국의 Small Spacecraft Technology Program이 관리·지원하고, The Aerospace Corporation이 OCSD 위성을 개발·운용했습니다.',sources:['nasa-ocsd-project']},
    architecture:{text:'각 위성은 약 10×10×17 cm, 2.5 kg이며 저전력 레이저통신 시스템, 근접 센서, 물 기반 추진계를 갖춥니다. 레이저를 본체에 고정해 짐벌 없이 자세제어로 지향합니다.',sources:['nasa-ocsd-project']},
    verification:{text:'위성 2기로 구성된 두 번째 OCSD 임무로, 2017년 11월 12일 월롭스에서 Cygnus 보급 임무(OA-8)로 발사됐습니다. 지상 망원경 수신으로 광 하향링크 속도를 확인하고, 추진계로 두 위성 간 근접 기동을 수행했습니다.',sources:['nasa-ocsd-project']},
    considerations:[
     {topic:'본체 지향 방식의 자세제어 요구',detail:'짐벌을 없애면 단말이 작아지지만 빔 지향 정확도가 위성 자세제어 성능에 직접 좌우됩니다. 링크 중에는 다른 임무를 위한 자세 변경이 제한되므로 운용 시간 배분을 함께 설계해야 합니다.',sources:['nasa-ocsd-project']},
     {topic:'지상 수신 조건 의존성',detail:'200 Mbps는 특정 지상 망원경과 운용 조건에서 얻은 결과입니다. 구름·대기 난류에 따른 가용성과 여러 지상국 운용을 포함한 실효 전송량은 별도로 산정해야 합니다.',sources:['nasa-ocsd-project']},
     {topic:'근접 기동 기록의 해석',detail:'약 20피트 접근은 두 위성 간 기동 결과입니다. 상대항법 정확도, 충돌 회피 기준, 도킹 가능성은 이 기록에서 확인되지 않으므로 RPOD 실증과 구분해야 합니다.',sources:['nasa-ocsd-project']}
    ],
    developers:[['The Aerospace Corporation','위성 개발·운용'],['NASA','관리·지원']]
   },
   events:[['2017-11-12','발사','OCSD 2기 발사','Cygnus 보급 임무(OA-8)로 발사. 광통신 실증 일자와 구분합니다.','nasa-ocsd-project']]
  },
  {
   id:'raise2',name:'RAISE-2',field:'ai',launch:'2021-11-09',status:'운용 종료 · 기관 발표',
   summary:'공모로 선정된 6개 부품·장비 실증 테마를 약 1년간 궤도에서 시험한 JAXA의 100 kg급 소형실증위성.',
   aliases:['RAISE 2','小型実証衛星2号機','소형실증위성 2호기','革新的衛星技術実証2号機','혁신적 위성기술 실증 2호기','SPRESENSE','일본'],
   notes:'테마별 주요 성과는 JAXA 발표의 별지 이미지로 제공되어 이 데이터셋에는 테마별 결과값을 수록하지 않았습니다. RAPIS-1과 별개 임무입니다.',
   metrics:[['위성 규모','100 kg급'],['실증 테마','6개']],
   demonstration:{
    objective:'공모로 선정된 부품·장비 6개 실증 테마의 궤도 시험',
    result:'JAXA는 약 1년간 6개 실증 테마의 궤도상 실증을 마치고 2023년 4월 7일 정파했다고 발표했습니다. 테마별 주요 성과는 제안기관 보고를 모은 별지로 공개됐습니다.',
    conditions:'100 kg급 위성 · 엡실론 5호기 발사',
    source:'jaxa-raise2-end',
    conditionSource:'jaxa-raise2-phase',
    tests:[
     ['SPR (Sony Semiconductor Solutions)','소형·저전력 마이컴 보드 SPRESENSE의 내우주환경 성능 평가 테마.'],
     ['I-FOG (Tamagawa Seiki)','폐루프식 광섬유 자이로 궤도 실증 테마.'],
     ['ASC (天の技)','큐브샛용 소형 국산 별추적기의 상용화를 위한 궤도 실증 테마.'],
     ['3D-ANT (Mitsubishi Electric)','3D 프린터로 제작한 텔레메트리·커맨드 수신 안테나의 궤도 평가 테마.'],
     ['ATCD (도호쿠대학)','경량·무전력형 열제어 디바이스 궤도 실증 테마.'],
     ['MARIN (JAXA)','이중화 MEMS IMU의 궤도 방사선 환경 비행 실증 테마.']
    ]
   },
   program:{
    purpose:{text:'기업·대학·연구기관이 개발한 부품과 장비에 궤도 실증 기회를 제공하는 JAXA 혁신적 위성기술 실증 프로그램의 두 번째 실증 기회입니다.',sources:['jaxa-raise2-end','jaxa-raise2-outline']},
    organization:{text:'JAXA가 100 kg급 RAISE-2를 개발해 운용하고 공모로 선정된 6개 실증 테마를 탑재했습니다. 제안기관은 Sony Semiconductor Solutions, Tamagawa Seiki, 天の技, Mitsubishi Electric, 도호쿠대학, JAXA입니다.',sources:['jaxa-raise2-phase','jaxa-raise2-outline']},
    architecture:{text:'실증 테마 제안자의 요구에 따라 위성을 운용하고 실험 데이터와 실험 시점의 환경 데이터를 제공하는 구조입니다. 혁신적 위성기술 실증 2호기는 RAISE-2와 초소형위성·큐브샛 8기 등 9기로 구성됐습니다.',sources:['jaxa-raise2-outline']},
    verification:{text:'2021년 11월 9일 엡실론 5호기로 발사한 뒤 2022년 2월 3일 정상운용으로 전환했고, 약 1년간 실증을 거쳐 2023년 4월 7일 정파했습니다. 테마별 성과는 각 제안기관이 JAXA에 보고한 내용입니다.',sources:['jaxa-raise2-phase','jaxa-raise2-end']},
    considerations:[
     {topic:'공용 버스의 실증 환경 기록',detail:'여러 테마가 한 위성을 공유하므로 각 장비의 결과를 해석하려면 실험 시점의 온도·방사선·전력 조건을 함께 확인해야 합니다. JAXA가 실험 데이터와 함께 환경 데이터를 제공하는 구조도 이 때문입니다.',sources:['jaxa-raise2-outline']},
     {topic:'상용 부품의 방사선 내성 평가 기간',detail:'상용 마이컴 보드와 MEMS IMU의 약 1년 저궤도 시험은 누적 선량과 단일사건 효과의 표본이 제한적입니다. 다른 궤도·수명 조건에 적용하려면 지상 방사선 시험과 함께 판단해야 합니다.',sources:['jaxa-raise2-outline','jaxa-raise2-end']},
     {topic:'제안기관 보고의 독립성',detail:'테마별 성과는 각 제안기관의 보고를 JAXA가 정리한 것입니다. 독립 시험으로 집계하지 않고 테마별 원자료나 후속 발표로 확인할 필요가 있습니다.',sources:['jaxa-raise2-end']}
    ],
    developers:[['JAXA','위성 개발·운용']]
   },
   events:[['2021-11-09','발사','RAISE-2 발사','엡실론 5호기로 발사. 실증 테마 완료를 뜻하지 않습니다.','jaxa-raise2-end'],['2023-04-07','임무 종료','RAISE-2 운용 종료','약 1년 궤도 실증 후 정파 작업 수행.','jaxa-raise2-end']]
  }
 ];
 for(const m of missions){
  const {program}=m;
  const developers=program.developers.map(([name,role])=>{
   if(!program.organization.text.includes(name))throw new Error('Developer not named in organization text: '+m.id+' / '+name);
   return {name,role};
  });
  add(m.id,m.name,'mission',m.field,m.summary,{launch:m.launch,status:m.status,aliases:m.aliases,notes:m.notes,metrics:[['발사',m.launch],['자료상 상태',m.status],...m.metrics]});
  const entity=entityMap.get(m.id);
  entity.demonstration={...m.demonstration,program:{...program,developers,reviewed}};
  const entries=[program.purpose,program.organization,program.architecture,program.verification,...program.considerations];
  for(const id of [m.demonstration.source,m.demonstration.conditionSource,...entries.flatMap(entry=>entry.sources)].filter(Boolean))attach(m.id,id);
  m.events.forEach(([date,kind,title,summary,source],index)=>{
   attach(m.id,source);
   D.events.push({id:'expansion-'+m.id+'-'+index,date,title,entity:m.id,kind,summary,source});
  });
 }

 // Relations: from, to, label, source.
 const scope='해당 출처가 설명하는 관계만 수록합니다. 참여·개발 역할은 공급계약이나 독립 성능검증을 뜻하지 않습니다.';
 for(const [from,to,label,source] of [
  ['ap-satellite','pvsat','위성 개발·공동 운영','kari-pvsat-complete'],
  ['kari','pvsat','개발 지원·공동 운영','kari-pvsat-complete'],
  ['kaeri','pvsat-heat-cell','개발','kari-pvsat-complete'],
  ['pvsat-heat-cell','pvsat','탑재·우주검증','kari-pvsat-complete'],
  ['space-power','pvsat-heat-cell','관련 기술','kari-pvsat-complete'],
  ['component-verification','pvsat','실증 플랫폼','kari-pvsat-complete'],
  ['kaist-satrec','nextsat1','주관 개발','kaist-nextsat1-workshop'],
  ['kasi','nextsat1','개발 참여','kaist-nextsat1-workshop'],
  ['component-verification','nextsat1','실증 플랫폼','kaist-nextsat1-workshop'],
  ['kaist-satrec','nextsat2','위성 개발','kaist-nextsat2-complete'],
  ['kaist-satrec','nextsat2-sar','개발','kaist-nextsat2-complete'],
  ['nextsat2-sar','nextsat2','탑재·궤도검증','kaist-nextsat2-complete'],
  ['sar','nextsat2-sar','관련 기술','kaist-nextsat2-complete'],
  ['kasi','nextsat2','LEO-DOS 개발','kaist-nextsat2-initial'],
  ['component-verification','nextsat2','핵심기술검증 탑재체','kaist-nextsat2-initial'],
  ['thermal-control','nextsat2','상변환 열제어장치 시험','kaist-nextsat2-initial'],
  ['kasi','snipe','공동 개발','kasi-snipe-storm'],
  ['kari','snipe','공동 개발','kasi-snipe-storm'],
  ['relative-nav','snipe','편대비행','kasi-snipe-overview'],
  ['astroscale','elsa-d','임무 수행·운용','astroscale-elsad-conclusion'],
  ['rpod','elsa-d','자기 포획·랑데부 실증','astroscale-elsad-conclusion'],
  ['relative-nav','elsa-d','절대→상대항법 전환','astroscale-elsad-conclusion'],
  ['aerospace-corp','ocsd','개발·운용','nasa-ocsd-project'],
  ['lasercom','ocsd','관련 기술','nasa-ocsd-project'],
  ['rpod','ocsd','근접 기동 시험','nasa-ocsd-project'],
  ['jaxa','raise2','개발·운용','jaxa-raise2-phase'],
  ['component-verification','raise2','실증 플랫폼','jaxa-raise2-outline'],
  ['mitsubishi-electric','raise2','실증 테마 제안 (3D-ANT)','jaxa-raise2-outline']
 ]){
  if(!entityMap.has(from)||!entityMap.has(to))throw new Error('Broken expansion relation: '+from+' → '+to);
  D.links.push({id:from+'--'+to+'--'+D.links.length,from,to,label,source,scope});
 }

 // Claim-level evidence: source, targets, kind, locator, claim, limitation.
 for(const [source,targets,kind,locator,claim,limitation] of [
  ['kari-pvsat-complete',['pvsat','ap-satellite','kari','kaeri','pvsat-heat-cell','component-verification','space-power'],'실증 결과','본문: 임무 완수 / 검증탑재체별 결과',
   'KARI는 항우연 지원으로 AP위성이 개발한 성능검증위성이 누리호 궤도 투입 성능 확인·큐브위성 투입과 약 2년의 부임무를 마쳤으며, 발열전지가 전기 출력 120 mW를 출력 감소나 부품 고장 없이 장기간 유지했다고 발표했습니다.',
   '기관 성과 발표입니다. "모의 원자력전지"의 열원 구성, 제어모멘트자이로의 정량 기동 성능, 발표문의 "세계 3번째" 평가는 이 자료로 독립 확인하지 않습니다.'],
  ['kaist-nextsat1-workshop',['nextsat1','kaist-satrec','kasi','component-verification'],'실증 결과','본문 2~4문단: 개발 체계 / 초기운영 점검 / 핵심 부품 목록',
   'KAIST는 인공위성연구소 주관·한국천문연구원 등 참여로 개발한 차세대소형위성 1호의 약 4개월 초기운영에서 7개 우주 핵심기술을 포함한 기능 전반이 정상임을 확인했다고 밝혔습니다.',
   '초기운영 기능 점검 발표입니다. 부품별 정량 성능과 2년 임무의 최종 결과는 이 자료에 없습니다.'],
  ['kaist-nextsat2-initial',['nextsat2','kaist-satrec','kasi','component-verification','thermal-control'],'실증 결과','본문: 초기 운영 완수 / 핵심기술검증 탑재체 4종 / LEO-DOS',
   'KAIST는 차세대소형위성 2호의 3개월 초기운영에서 SAR 시험 촬영과 LEO-DOS 작동, GPS·Galileo 수신기·상변환 열제어장치·X대역 GaN 전력증폭기·태양전지배열기의 정상 작동을 확인했다고 발표했습니다.',
   '기능 점검 결과이며 SAR 해상도나 탑재체별 정량 성능은 제시되지 않았습니다.'],
  ['kaist-nextsat2-complete',['nextsat2','nextsat2-sar','kaist-satrec','sar'],'실증 결과','본문 1~5문단: 2년 기술검증 완료 / 관측 횟수',
   'KAIST는 차세대소형위성 2호 영상레이다가 2025년 5월 25일 자로 2년간의 궤도상 기술검증 임무를 완료했고 1,200회 이상 지구관측을 수행했다고 발표했습니다.',
   '개발기관 발표입니다. 영상 품질·검보정 지표는 제시되지 않았으며, 극지연구소의 빙붕 분석은 Sentinel-1 자료와 융합한 결과입니다.'],
  ['kasi-snipe-overview',['snipe','kasi','relative-nav'],'임무 구성','도요샛 프로젝트 개요 / 상세 사양',
   '도요샛은 10 kg 이하 위성 4기로 500 km 태양동기궤도에서 위성 간 거리와 비행 형태를 조절하는 편대비행 기능을 갖추고 전리권 플라즈마 미세 구조를 관측하도록 설계됐습니다.',
   '발사 전 개요 자료입니다. 편대 유지 방식과 거리 정확도는 제시되지 않았고 사양은 설계값입니다.'],
  ['kasi-snipe-top10',['snipe','kasi'],'실증 결과','2위: 누리호 3차 발사로 우주로 날아간 도요샛 위성',
   '천문연은 3호기 다솔이 사출되지 못했으며, 도요샛 3기와 교신하며 큐브위성 최초로 편대비행을 하면서 우주환경 변화를 관측하고 있다고 발표했습니다.',
   '"큐브위성 최초" 평가는 기관 발표 표현으로 독립 검증하지 않았습니다. 편대 거리와 유지 기간은 제시되지 않았습니다.'],
  ['kasi-snipe-storm',['snipe','kasi','kari'],'실증 결과','본문 3~6문단 / "한편" 문단',
   '천문연은 도요샛 랑뮈어 탐침으로 2024년 5월 슈퍼태양폭풍 기간 전리권 플라즈마 밀도·온도를 약 60시간 연속 관측해 Space Weather에 게재했고, 2025년 8월 기준 4기 중 나래·라온 2기가 정상 운영 중이라고 밝혔습니다.',
   '관측 자료의 신뢰성은 DMSP·Swarm과의 비교에 근거한 연구진 평가입니다. 발표 이후의 운영 상태는 추정하지 않습니다.'],
  ['astroscale-elsad-conclusion',['elsa-d','astroscale','rpod','relative-nav'],'실증 결과','본문: demonstrations / thrusters / de-orbit',
   'Astroscale은 ELSA-d가 수동 자기 도킹과 반복 자기 포획, 근접 랑데부를 수행했고 자율 포획은 이상 징후로 진행하지 않았으며, 2024년 1월 서비서 궤도 강하 운용으로 임무를 마쳤다고 발표했습니다.',
   '개발사 발표입니다. 클라이언트는 모의 잔해이므로 비협력 실제 잔해의 포획 성능으로 일반화하지 않습니다.'],
  ['astroscale-elsad-mission',['elsa-d','astroscale'],'임무 구성','Mission overview / Timeline',
   'Astroscale 임무 페이지는 ELSA-d의 2021-03-22 발사, 서비서·클라이언트 2기 적층 구성, RPO 기술과 자기 도킹 메커니즘, SSTL 협력과 영국우주청 임무 허가를 기록합니다.',
   'SSTL의 구체적 제작 범위는 이 페이지로 확정하지 않습니다.'],
  ['nasa-ocsd-project',['ocsd','aerospace-corp','lasercom','rpod'],'실증 결과','본문: mission overview / optical communications / proximity operations',
   'NASA는 The Aerospace Corporation이 개발·운용한 OCSD가 지상 30 cm 망원경으로 200 Mbps 광통신을 실증하고, 추력기로 두 위성을 약 20피트 이내로 접근시켰다고 설명합니다.',
   '위성→지상 링크 실적이며 위성 간 광링크가 아닙니다. 근접 기동 기록을 도킹 실증으로 해석하지 않습니다.'],
  ['jaxa-raise2-outline',['raise2','mitsubishi-electric','component-verification'],'임무 구성','Outline / Theme 01~06',
   'JAXA는 RAISE-2가 공모로 선정된 6개 부품·장비 실증 테마를 궤도에서 실증하고 실험·환경 데이터를 제공하는 위성이라고 설명합니다.',
   '테마 소개와 사양입니다. 테마별 실증 성과는 이 페이지로 확정하지 않습니다.'],
  ['jaxa-raise2-end',['raise2','jaxa'],'실증 결과','본문: 운용 종료',
   'JAXA는 RAISE-2가 약 1년간 6개 실증 테마의 궤도상 실증을 마치고 2023-04-07 09:41(일본 표준시)에 정파했다고 발표했습니다.',
   '테마별 주요 성과는 제안기관 보고를 모은 별지 이미지이며 이 데이터셋에 개별 수치로 옮기지 않았습니다.'],
  ['jaxa-raise2-phase',['raise2','jaxa'],'운용 기록','본문',
   'JAXA는 RAISE-2를 기업·대학·연구기관의 부품 실증을 위해 JAXA가 개발한 100 kg급 위성으로 소개하고 2022-02-03 정상운용 전환을 알렸습니다.',
   '운용 단계 전환 소식이며 실증 성과 발표가 아닙니다.']
 ]){
  for(const target of targets)attach(target,source);
  D.evidence.push({id:'claim-expansion-'+source,source,entities:targets,kind,locator,claim,limitation,reviewed});
 }
 D.reviewed=reviewed;
 D.version='1.6.0';
 D.missionExpansionReady=true;
})();
