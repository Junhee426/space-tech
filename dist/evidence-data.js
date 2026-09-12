/* Primary-source evidence expansion, reviewed 2026-09-12.
 * Dates describe documents unless an explicit event is recorded.
 * A different URL or publication format is not an independent experiment.
 */
(() => {
 'use strict';
 const D=window.ATLAS, reviewed='2026-09-12';
 D.evidence=[];
 // Columns: id, title, publisher, country, type, URL, document date,
 // locator, supported claim, limitation, target entity IDs, evidence kind.
 const records=[
 [
  "telepix-flight",
  "TetraPLEX in-space demonstration",
  "TelePIX",
  "대한민국",
  "개발사 발표",
  "https://www.prnewswire.com/news-releases/telepix-successfully-demonstrates-its-satellite-ai-processor-tetraplex-in-space-302287072.html",
  "2024-10-28",
  "본문: in-orbit performance tests",
  "TetraPLEX의 약 597 km 궤도 영상 전처리·자세 추정 알고리즘 시험 성공을 개발사가 발표했습니다.",
  "개발사 배포 보도자료이며 PR Newswire의 독립 검증이 아닙니다. 원시 시험자료와 장기 신뢰성은 미확인입니다.",
  [
   "tetraplex",
   "telepix",
   "onboard-ai"
  ],
  "실증 결과"
 ],
 [
  "dorbit-tetraplex",
  "CELESTIAL BLISS mission booklet",
  "D-Orbit",
  "이탈리아",
  "임무 참여기관 자료",
  "https://www.dorbit.space/media/5/22.pdf",
  null,
  "PDF 3쪽: TetraPLEX",
  "D-Orbit 임무 소개서가 TetraPLEX와 TelePIX를 탑재 AI 처리 대상으로 소개합니다.",
  "소개서의 성능 수치는 제품 설명입니다. 임무 참여기관의 자료를 독립 성능시험으로 해석하지 않습니다.",
  [
   "tetraplex",
   "telepix"
  ],
  "임무 구성"
 ],
 [
  "xiphos-q8s",
  "Q8S Rev B specification sheet",
  "Xiphos",
  "캐나다",
  "제조사 사양서",
  "https://xiphos.com/wp-content/uploads/2020/06/XTI-2001-2025-f-Q8S-Rev-B-Spec-Sheet-1.pdf",
  "2025-11-28",
  "PDF 2쪽: CHARACTERISTICS / FLIGHT MODEL",
  "Q8S 사양서는 Zynq UltraScale+ XCZU7EG와 EDAC, 비트스트림 스크러빙 등 오류완화 구성을 명시합니다.",
  "사양서 버전별 차이가 있으므로 다른 Q8 계열이나 모든 방사선 환경으로 일반화하지 않습니다.",
  [
   "q8s",
   "xiphos",
   "fpga",
   "cots"
  ],
  "사양"
 ],
 [
  "aitech-venus",
  "S-A1760 Venus technical announcement",
  "Aitech",
  "미국",
  "개발사 발표",
  "https://aitechsystems.com/aitechs-s-a1760-venus-brings-nvidia-based-ai-supercomputing-to-next-generation-space-applications/",
  "2021-08",
  "Technical Specifications / Series 300",
  "S-A1760은 Jetson TX2i 기반이며 제조사가 단기 NEO·LEO 임무용 방사선 특성평가 제품으로 소개합니다.",
  "Series 300은 제조사 설명의 검증 범위입니다. 심우주·장기 임무의 적합성 또는 실제 탑재 성공을 보장하지 않습니다.",
  [
   "sa1760",
   "aitech",
   "cots"
  ],
  "사양"
 ],
 [
  "busek-hall",
  "Hall thrusters and TacSat-2 flight heritage",
  "Busek",
  "미국",
  "개발사 발표",
  "https://www.busek.com/hall-thrusters",
  null,
  "Flight Heritage",
  "Busek은 TacSat-2에 BHT-200을 사용했고 플룸 측정과 탑재 진단으로 비행 성능을 확인했다고 설명합니다.",
  "비행 실적과 같은 페이지의 다른 추진제 시험·궤도전이 시뮬레이션은 별개입니다.",
  [
   "bht200",
   "busek",
   "tacsat2",
   "hall-thruster"
  ],
  "실증 결과"
 ],
 [
  "gomspace-p60",
  "NanoPower P60 Electrical Power System",
  "GomSpace",
  "덴마크",
  "제조사 사양서",
  "https://gomspace.com/product/nanopower-p60/",
  null,
  "Highlights / Technical insights",
  "NanoPower P60은 모듈형 전력계이며 제조사는 BPX·BP4 배터리와의 연계를 설명합니다.",
  "이 자료에서 BP4의 구체적 용량·수명이나 고객별 탑재 이력을 확정하지 않습니다.",
  [
   "gomspace",
   "nanopower-bp4",
   "nanopower-p60",
   "space-power"
  ],
  "사양"
 ],
 [
  "sheldahl-thermal",
  "Aerospace thermal control materials",
  "Sheldahl",
  "미국",
  "제조사 사양서",
  "https://www.sheldahl.com/solutions/aerospace-thermal-control/",
  null,
  "Aerospace thermal control",
  "Sheldahl은 위성·우주선용 박막 열제어 소재를 공급하는 업체입니다.",
  "기업의 일반 기술 소개이며 BioSentinel 특정 부품의 납품·시험 증명은 아닙니다.",
  [
   "sheldahl",
   "thermal-coating"
  ],
  "사양"
 ],
 [
  "sheldahl-redbook",
  "Red Book · Revision E",
  "Sheldahl",
  "미국",
  "제조사 사양서",
  "https://sheldahl.com/wp-content/uploads/2023/07/RedBook.pdf",
  "2020-01-24",
  "PDF 7쪽: Thermal Control Overview",
  "열제어 소재 카탈로그는 수동 열제어용 시트·롤·테이프 제품의 역할을 설명합니다.",
  "2020년 판입니다. 특정 위성에 적용된 주문품 번호 및 현재 판매 여부는 별도 확인이 필요합니다.",
  [
   "sheldahl",
   "thermal-coating",
   "thermal-control"
  ],
  "사양"
 ],
 [
  "mit-tbird",
  "TeraByte InfraRed Delivery (TBIRD)",
  "MIT Lincoln Laboratory",
  "미국",
  "연구기관 실증자료",
  "https://www.ll.mit.edu/r-d/projects/terabyte-infrared-delivery-tbird",
  null,
  "Project overview: May 2023",
  "TBIRD 개발기관은 2023년 5월 위성–지상 광링크에서 200 Gbps를 달성했다고 기록합니다.",
  "개발 참여기관의 발표입니다. 위성 간 링크·상시 가용속도·상용 서비스 성능이 아닙니다.",
  [
   "tbird-terminal",
   "tbird-mission",
   "mitll",
   "lasercom"
  ],
  "실증 결과"
 ],
 [
  "dlr-pixl",
  "PIXL-1 launch with OSIRIS4CubeSat / CubeLCT",
  "DLR",
  "독일",
  "공공기관 임무자료",
  "https://www.dlr.de/en/latest/news/2021/01/20210124_pioneering-launch-compact-satellite-with-smallest-laser-terminal",
  "2021-01-24",
  "본문: launch / marketed as CubeLCT",
  "DLR은 PIXL-1 탑재와 TESAT 협력 개발, CubeLCT라는 제품 명칭을 확인합니다.",
  "발사 발표 당시의 실증 목표와 후속 시험 결과를 구분하며 양산 실적을 추정하지 않습니다.",
  [
   "osiris",
   "cubelct",
   "pixl1",
   "dlr",
   "tesat"
  ],
  "임무 구성"
 ],
 [
  "dlr-o4c-paper",
  "In-orbit demonstration of acquisition and tracking on OSIRIS4CubeSat",
  "DLR 연구팀 / Optics Express",
  "독일",
  "연구 논문",
  "https://elib.dlr.de/208615/1/In-orbit%20demonstration%20of%20acquisition%20and%20tracking%20on%20OSIRIS4CubeSat.pdf",
  "2024-10-28",
  "PDF 1쪽 초록 / DOI 10.1364/OE.537889",
  "궤도 텔레메트리 기반 포착·추적 평가에서 평균 추적오차 71 μrad, 3σ 편차 140 μrad를 보고합니다.",
  "해당 실험 조건의 지향 성능입니다. 광링크 전송률과 지향오차는 서로 다른 지표이며 개발팀 연구입니다.",
  [
   "osiris",
   "pixl1",
   "pat"
  ],
  "실증 결과"
 ],
 [
  "nict-sota",
  "Space quantum communication using SOTA",
  "NICT",
  "일본",
  "공공기관 실증자료",
  "https://www.nict.go.jp/en/quantum/topics/20170711.html",
  "2017-07-11",
  "본문: SOTA / 10 million bits per second",
  "NICT는 SOCRATES의 SOTA에서 지상으로 10 Mbit/s 광신호 전송과 단일광자 영역 수신 실험을 설명합니다.",
  "광신호 전송률을 비밀키 생성률로 해석하지 않습니다. 상용 양자통신 서비스의 실적이 아닙니다.",
  [
   "sota-terminal",
   "socrates",
   "nict",
   "lasercom"
  ],
  "실증 결과"
 ],
 [
  "sota-paper",
  "LEO-to-ground optical communications using SOTA",
  "NICT 연구팀",
  "일본",
  "연구 논문",
  "https://arxiv.org/abs/1708.01592",
  "2017",
  "초록: payload verification results",
  "SOTA 연구팀은 100회 이상 성공한 링크와 포착·추적·오류정정 실험을 보고합니다.",
  "arXiv 연구 원고이며 해당 연구팀의 결과입니다. 별도 독립 재현으로 집계하지 않습니다.",
  [
   "sota-terminal",
   "socrates",
   "pat"
  ],
  "실증 결과"
 ],
 [
  "starfox-paper",
  "Starling Formation-Flying Optical Experiment: Initial Operations and Flight Results",
  "Stanford / NASA Ames 연구팀",
  "미국",
  "연구 논문",
  "https://arxiv.org/abs/2406.06748",
  "2024",
  "초록 및 Initial flight results",
  "StarFOX의 각도 기반 상대항법 결과는 단일 관측자와 다중 관측자의 상대위치 불확실성을 각각 거리의 1.3%, 0.6% (1σ)로 보고합니다.",
  "초기 시험 조건의 수치입니다. 지상 후처리와 탑재 실행을 구분해야 하며 모든 궤도에서의 정확도가 아닙니다.",
  [
   "starfox",
   "starling-mission",
   "relative-nav",
   "autonomy"
  ],
  "실증 결과"
 ],
 [
  "stanford-starfox",
  "First Flight Results from StarFOX",
  "Stanford Space Rendezvous Laboratory",
  "미국",
  "연구기관 실증자료",
  "https://slab.stanford.edu/news/news-first-flight-results-starfox",
  null,
  "본문: optical relative navigation flight results",
  "Stanford 개발팀은 위성 간 방위각만으로 여러 대상을 추적하는 초기 비행 결과를 설명합니다.",
  "같은 StarFOX 연구팀의 논문과 기관 소개는 서로 독립된 검증이 아닙니다.",
  [
   "starfox",
   "stanford",
   "relative-nav"
  ],
  "실증 결과"
 ],
 [
  "asi-prisma",
  "PRISMA mission and hyperspectral instrumentation",
  "ASI",
  "이탈리아",
  "공공기관 임무자료",
  "https://www.asi.it/en/earth-science/prisma/",
  null,
  "본문: imaging spectrometer / satellite manufacture",
  "PRISMA는 VNIR·SWIR 분광기와 전정색 카메라를 사용하며 ASI는 Leonardo의 광학 장비 제작 역할을 명시합니다.",
  "설계·기관 소개상의 공간해상도와 개별 관측 영상의 유효 품질은 구분합니다.",
  [
   "prisma",
   "prisma-imager",
   "asi",
   "leonardo",
   "hyperspectral"
  ],
  "임무 구성"
 ],
 [
  "asi-prisma-data",
  "The PRISMA Mission opens to the community",
  "ASI",
  "이탈리아",
  "공공기관 관측자료",
  "https://www.asi.it/en/2020/05/the-prisma-mission-opens-to-the-community/",
  "2020-05",
  "본문: PRISMA archive",
  "ASI는 PRISMA 관측 아카이브의 공개 이용 개시를 발표했습니다.",
  "당시 데이터 제공 사실을 기록합니다. 2020년의 이용 조건을 현재 정책으로 안내하지 않습니다.",
  [
   "prisma",
   "hyperspectral"
  ],
  "관측 자료"
 ],
 [
  "enmap-instrument",
  "EnMAP Space Segment",
  "EnMAP / OHB System",
  "독일",
  "임무 참여기관 자료",
  "https://www.enmap.org/mission/spacesegment/",
  null,
  "Instrument",
  "EnMAP의 VNIR·SWIR 분광기와 SWIR 검출기 능동 냉각 구성을 설명합니다.",
  "임무 공식 사이트에 수록된 OHB 설계 설명이며 검출기 온도 목표를 궤도 실측값으로 간주하지 않습니다.",
  [
   "enmap-imager",
   "ohb-system",
   "hyperspectral",
   "thermal-control"
  ],
  "사양"
 ],
 [
  "isro-hysis",
  "PSLV-C43 / HysIS Mission",
  "ISRO",
  "인도",
  "공공기관 임무자료",
  "https://www.isro.gov.in/ISRO_EN/PSLV_C43_HysIS_Mission.html",
  null,
  "본문: HysIS primary satellite",
  "ISRO는 2018년 11월 29일 HysIS 발사와 가시광·근적외·단파적외 관측 목표를 설명합니다.",
  "발사 기록과 관측 목표이며 현재 운용 상태나 전체 센서 성능 검증을 뜻하지 않습니다.",
  [
   "hysis",
   "isro",
   "hyperspectral"
  ],
  "임무 구성"
 ],
 [
  "isro-hysis-image",
  "HysIS First day Image",
  "ISRO",
  "인도",
  "공공기관 관측자료",
  "https://www.isro.gov.in/HYsIS_First_day_Image.html",
  null,
  "본문: acquired on 02 December 2018",
  "2018년 12월 2일 획득한 HysIS의 VNIR 밴드 합성 영상이 공개됐습니다.",
  "첫 영상의 존재를 확인한 것으로 모든 밴드의 방사·기하 보정 성능을 검증한 것은 아닙니다.",
  [
   "hysis",
   "hyperspectral"
  ],
  "관측 자료"
 ],
 [
  "kari-kompsat3a",
  "다목적실용위성 아리랑 3A호",
  "KARI",
  "대한민국",
  "공공기관 임무자료",
  "https://www.kari.re.kr//kor/contents/35",
  null,
  "제원 / 국내 최초 적외선 센서 탑재 위성",
  "아리랑 3A호는 2015년 3월 26일 발사됐으며 AEISS-A 전자광학카메라와 적외선 센서를 탑재했습니다.",
  "55 cm는 전자광학 관측 해상도입니다. 이를 적외선 센서 해상도나 초분광 관측 성능으로 해석하지 않습니다.",
  [
   "kompsat3a",
   "aeiss-a",
   "kari",
   "eo-ir"
  ],
  "임무 구성"
 ],
 [
  "jaxa-ikaros",
  "IKAROS solar power sail mission",
  "JAXA",
  "일본",
  "공공기관 임무자료",
  "https://global.jaxa.jp/projects/sas/ikaros/index.html",
  null,
  "Characteristics / About IKAROS",
  "IKAROS는 태양돛 막에 박막 태양전지를 결합한 태양광 발전·광압 추진 실증기입니다.",
  "향후 이온추진과 결합하는 구상은 IKAROS에 이온엔진을 탑재했다는 뜻이 아닙니다.",
  [
   "ikaros",
   "jaxa",
   "solar-sail",
   "solar-array"
  ],
  "임무 구성"
 ],
 [
  "jaxa-ikaros-deploy",
  "IKAROS successful solar sail deployment",
  "JAXA",
  "일본",
  "공공기관 실증자료",
  "https://www.jaxa.jp/press/2010/06/20100611_ikaros_e.html",
  "2010-06-11",
  "본문: confirmed on June 10",
  "JAXA는 2010년 6월 10일 IKAROS 돛 전개와 박막 태양전지 발전을 확인했다고 발표했습니다.",
  "돛 전개·발전 확인 기록으로, 이 자료만으로 추진 가속도나 장기 발전효율을 확정하지 않습니다.",
  [
   "ikaros",
   "solar-array",
   "space-power"
  ],
  "실증 결과"
 ],
 [
  "jaxa-crd2",
  "Commercial Removal of Debris Demonstration project",
  "JAXA",
  "일본",
  "공공기관 임무자료",
  "https://www.ard.jaxa.jp/eng/crd2/project/",
  null,
  "Phase I / Phase II",
  "CRD2는 1단계 접근·관측과 2단계 제거·재진입 실증을 분리합니다.",
  "프로그램 목표입니다. ADRAS-J의 접근 실적이 제거·도킹 성공을 뜻하지 않습니다.",
  [
   "adras-j",
   "jaxa",
   "rpod"
  ],
  "개발 목표"
 ],
 [
  "astroscale-adras",
  "ADRAS-J 15-meter approach report",
  "Astroscale",
  "일본",
  "개발사 발표",
  "https://www.astroscale.com/en/news/astroscales-adras-j-achieves-historic-15-meter-approach-to-space-debris",
  "2024-12-11",
  "본문: 15 meters / autonomous abort",
  "Astroscale은 ADRAS-J가 약 15 m까지 접근했으나 상대자세 이상으로 자동 중단·안전 이탈했다고 발표했습니다.",
  "목표 최종 거리에는 도달하지 않았으며 포획·제거를 수행한 것은 아닙니다. 개발사의 결과 발표입니다.",
  [
   "adras-j",
   "astroscale",
   "rpod"
  ],
  "실증 결과"
 ],
 [
  "jaxa-adras-images",
  "CRD2 Phase I debris images released",
  "JAXA",
  "일본",
  "공공기관 실증자료",
  "https://www.jaxa.jp/press/2024/04/20240426-2_j.html",
  "2024-04-26",
  "본문 및 주석 2: ADRAS-J",
  "JAXA는 ADRAS-J의 궤도상 잔해 영상과 Astroscale의 개발·소유·운용 역할을 확인합니다.",
  "2024년 4월 자료는 이후 15 m 접근 수치의 확인 근거가 아닙니다. JAXA도 해당 사업 참여기관입니다.",
  [
   "adras-j",
   "astroscale",
   "jaxa"
  ],
  "실증 결과"
 ],
 [
  "spirit-commission",
  "SpIRIT commissioning: cryocooler operational",
  "University of Melbourne",
  "호주",
  "연구기관 실증자료",
  "https://spirit.research.unimelb.edu.au/2024/01/12/commissioning-update-cryocooler-is-up-running/",
  "2024-01-12",
  "Summary / commissioning update",
  "SpIRIT 팀은 TheMIS 냉각기의 궤도상 작동을 확인했습니다.",
  "초기 시운전 기록입니다. 모든 운용 모드의 장기 성능 또는 과학 관측 성공을 뜻하지 않습니다.",
  [
   "spirit",
   "themis",
   "unimelb",
   "thermal-control"
  ],
  "실증 결과"
 ],
 [
  "themis-paper",
  "TheMIS active cooling on the SpIRIT mission",
  "University of Melbourne 연구팀",
  "호주",
  "연구 논문",
  "https://arxiv.org/abs/2407.14031",
  "2024",
  "초록: design / commissioning",
  "TheMIS는 Stirling 냉각기, 전개식 방열판과 열전달 스트랩을 결합하며 초기 궤도 운용과 열모델 비교를 다룹니다.",
  "원문의 100 K 미만 도달 가능성은 원리상 능력입니다. 해당 온도의 궤도상 달성으로 기록하지 않습니다.",
  [
   "themis",
   "spirit",
   "thermal-control"
  ],
  "사양"
 ],
 [
  "spirit-paper",
  "SpIRIT Mission: In-Orbit Results and Technology Demonstrations",
  "University of Melbourne 연구팀",
  "호주",
  "연구 논문",
  "https://arxiv.org/abs/2407.14034",
  "2024",
  "초록: PMS / supercapacitor-based UPS",
  "SpIRIT의 PMS는 HERMES의 안전한 종료를 위해 슈퍼커패시터 기반 백업 전원을 제공합니다.",
  "특정 탑재체 보호용 구성으로 위성 전체 전력의 독립 운용 시간이나 배터리 대체 성능은 미확인입니다.",
  [
   "spirit",
   "spirit-pms",
   "space-power",
   "unimelb"
  ],
  "임무 구성"
 ],
 [
  "esa-iodine",
  "Iodine thruster could slow space junk accumulation",
  "ESA",
  "유럽",
  "공공기관 실증자료",
  "https://www.esa.int/Applications/Connectivity_and_Secure_Communications/Iodine_thruster_could_slow_space_junk_accumulation",
  null,
  "본문: ThrustMe / Beihangkongshi-1",
  "ESA는 ThrustMe 요오드 전기추진기를 Beihangkongshi-1에 탑재해 점화하고 궤도를 변경한 사례를 설명합니다.",
  "요오드 전기추진 사례를 요오드 홀 추력기나 다른 제품의 실적으로 합치지 않습니다.",
  [
   "iodine-propulsion",
   "thrustme",
   "beihangkongshi1",
   "electric-propulsion"
  ],
  "실증 결과"
 ],
 [
  "esa-electric",
  "What is Electric propulsion?",
  "ESA",
  "유럽",
  "공공기관 기술자료",
  "https://www.esa.int/Enabling_Support/Space_Engineering_Technology/What_is_Electric_propulsion",
  null,
  "본문: system level trade off",
  "전기추진 방식 선택에는 추력·소비전력·임무 조건·비행 이력의 비교가 필요합니다.",
  "기술 개념 자료이며 특정 제조사 제품의 성능 인증이 아닙니다.",
  [
   "electric-propulsion",
   "hall-thruster"
  ],
  "기술 개념"
 ]
];
 const entityMap=new Map(D.entities.map(e=>[e.id,e]));
 function node(id,name,type,field,summary,extra={}){
  const entity={id,name,type,field,subtitle:D.fields.find(f=>f.id===field).name,summary,sources:[],reviewed,status:'자료 확인',metrics:[],notes:'',aliases:[],...extra};
  if(entityMap.has(id))throw new Error('Duplicate evidence entity: '+id);
  D.entities.push(entity);entityMap.set(id,entity);
 }
 node('nanopower-p60','NanoPower P60','product','power','GomSpace의 모듈형 위성 전력 관리 시스템.',{status:'제조사 사양 공개'});
 node('asi','ASI','organization','sensing','PRISMA 임무를 소유하는 이탈리아 우주기관.',{aliases:['이탈리아 우주청']});
 node('leonardo','Leonardo','organization','sensing','PRISMA 초분광 광학 장비를 제작한 기업.');
 node('prisma','PRISMA','mission','sensing','VNIR·SWIR 초분광과 전정색 영상을 제공하는 ASI 지구관측 임무.',{launch:'2019-03-22',status:'기관 관측자료 공개',aliases:['프리즈마']});
 node('prisma-imager','PRISMA 초분광 관측장비','product','sensing','Leonardo의 초분광 광학 장비와 전정색 카메라 구성.');
 node('ohb-system','OHB System','organization','sensing','EnMAP 우주부문 개발과 관측장비 제작을 담당한 기업.');
 node('enmap-imager','EnMAP 초분광 관측장비','product','sensing','VNIR·SWIR 분광기와 검출기 냉각 구성을 갖춘 관측장비.',{status:'임무 구성 공개',aliases:['엔맵']});
 node('isro','ISRO','organization','sensing','HysIS 임무·발사·관측자료를 공개한 인도 우주기관.',{aliases:['인도우주연구기구']});
 node('hysis','HysIS','mission','sensing','인도의 가시광·근적외·단파적외 초분광 지구관측 위성.',{launch:'2018-11-29',status:'기관 관측자료 공개',aliases:['하이시스']});
 node('kari','한국항공우주연구원','organization','sensing','아리랑 3A호의 개발과 임무 구성을 공개한 국내 연구기관.',{aliases:['KARI','한국','대한민국','항우연']});
 node('eo-ir','전자광학·적외선 관측','technology','sensing','전자광학 카메라와 적외선 센서의 관측 기술.',{aliases:['EO','IR','적외선','광학센서'],notes:'초분광 관측과 별도 기술로 분류합니다.'});
 node('aeiss-a','AEISS-A','product','sensing','아리랑 3A호에 탑재된 고해상도 전자광학카메라.',{status:'기관 탑재 기록',notes:'적외선 센서와 별도 장비입니다.'});
 node('kompsat3a','아리랑 3A호 / KOMPSAT-3A','mission','sensing','전자광학카메라와 적외선 센서를 탑재한 한국 지구관측 위성.',{launch:'2015-03-26',status:'기관 탑재 기록',aliases:['대한민국','한국','KOMPSAT'],notes:'1,100 kg급 위성입니다. 소형 위성 사례와 크기·전력 조건을 구분해 비교합니다.'});
 node('jaxa','JAXA','organization','power','IKAROS와 CRD2의 기술·임무 근거를 공개한 일본 우주기관.',{aliases:['일본','우주항공연구개발기구']});
 node('solar-sail','태양돛 광압 추진','technology','propulsion','태양빛의 압력을 이용하는 추진 방식.',{aliases:['solar sail','광자추진'],notes:'전기추진과 별도 방식입니다.'});
 node('ikaros','IKAROS','mission','power','태양돛 전개와 박막 태양전지 발전을 실증한 JAXA 탐사기.',{launch:'2010-05-21',status:'기관 전개·발전 확인',aliases:['이카로스'],notes:'행성 간 실증 환경으로 저궤도 위성의 운용 조건과 구분합니다.'});
 node('astroscale','Astroscale','organization','servicing','ADRAS-J의 개발·소유·운용을 담당하는 기업.',{aliases:['아스트로스케일','일본']});
 node('adras-j','ADRAS-J','mission','servicing','비협력 잔해의 접근·관측을 수행한 CRD2 1단계 실증위성.',{launch:'2024-02-18',status:'근접관측 실증 발표',notes:'약 15 m 접근 후 자동 중단·안전 이탈. 포획·제거는 수행하지 않았습니다.',aliases:['아드라스','우주쓰레기','우주잔해']});
 node('unimelb','University of Melbourne','organization','thermal','SpIRIT와 TheMIS 연구개발을 수행한 호주 대학.',{aliases:['멜버른대학교','호주']});
 node('spirit','SpIRIT','mission','thermal','능동 열제어와 탑재체 전력 보호를 다루는 호주·이탈리아 6U 위성.',{launch:'2023-12',status:'초기 궤도 실증 발표',aliases:['스피릿'],notes:'수록 논문과 시운전 자료 시점의 기록으로 현재 운용 상태를 추정하지 않습니다.'});
 node('themis','TheMIS','product','thermal','Stirling 냉각기와 전개식 방열판을 결합한 열관리 시스템.',{status:'냉각기 궤도 작동 확인',aliases:['능동냉각','극저온']});
 node('spirit-pms','SpIRIT PMS','product','power','슈퍼커패시터 백업 전원으로 HERMES 탑재체의 안전 종료를 지원하는 제어장치.',{status:'연구팀 구성 보고',aliases:['UPS','슈퍼커패시터']});
 node('iodine-propulsion','요오드 전기추진','technology','propulsion','고체 요오드의 승화를 이용해 추진제를 공급하는 전기추진 기술.',{aliases:['iodine','아이오딘']});
 node('thrustme','ThrustMe','organization','propulsion','요오드 전기추진 기술을 개발한 기업.',{aliases:['프랑스','CNRS']});
 node('beihangkongshi1','Beihangkongshi-1','mission','propulsion','ThrustMe 요오드 전기추진기를 실은 상용 연구위성.',{launch:'2020-11',status:'기관 궤도변경 기록',aliases:['Spacety','중국'],notes:'ESA가 설명한 실증 범위만 수록합니다.'});
 // Component qualification missions: keep flight records separate from service missions.
 node('component-verification','부품·탑재장비 궤도 실증','technology','ai','지상 시험과 우주 환경에서의 부품·장비 동작을 비교하는 실증 기술.',{aliases:['COTS 검증','우주환경 신뢰성','on-orbit verification','OOV']});
 node('j-spacesystems','Japan Space Systems / USEF','organization','ai','SERVIS 사업의 수행기관. 원문은 과거 USEF 명칭을 함께 설명합니다.',{aliases:['J-spacesystems','일본우주시스템','일본'],notes:'임무 당시 기관명과 현재 자료 발행기관을 함께 표기합니다.'});
 node('mitsubishi-electric','Mitsubishi Electric','organization','ai','SERVIS-1·2의 주계약 기업.',{aliases:['미쓰비시전기','일본']});
 node('servis1','SERVIS-1','mission','ai','상용부품(COTS)과 탑재장비의 우주환경 신뢰성을 평가한 일본 실증위성.',{launch:'2003-10-30',status:'2년 궤도 실증 완료',aliases:['SERVIS 1','SERVIS-I','서비스 1','서비즈 1','Space Environment Reliability Verification Integrated System'],metrics:[['임무 구분','부품·장비 신뢰성 실증'],['실증 기간','2년 · 사업 수행기관 기록']],notes:'부품의 지상 방사선 시험과 궤도 SEU 관측을 비교했습니다. 결과를 모든 COTS 제품의 우주 적합성으로 일반화하지 않습니다.'});
 node('servis2','SERVIS-2','mission','ai','COTS 기반 실험장비와 부품 시험장치를 탑재한 후속 신뢰성 실증위성.',{launch:'2010-06-02',status:'2011년 6월 임무 완료',aliases:['SERVIS 2','SERVIS-II','서비스 2','서비즈 2','Space Environment Reliability Verification Integrated System'],metrics:[['임무 구분','부품·장비 신뢰성 실증'],['종료 시점','2011-06 · 일자 미기재']],notes:'SERVIS-1과 별개 임무입니다. SERVIS-3 사업 착수를 세 번째 위성의 발사로 간주하지 않습니다.'});
 node('servis-cpt','SERVIS CPT 부품 시험장치','product','ai','SERVIS에서 COTS 부품의 궤도 동작을 평가한 Commercial Parts Test Unit 장비군.',{aliases:['CPT','Commercial Parts Test Unit'],status:'기관 탑재 기록',notes:'임무별 시험장치와 부품 구성을 동일한 제품 버전으로 가정하지 않습니다.'});
 node('axelspace','Axelspace','organization','ai','RAPIS-1 개발을 담당한 일본 기업.',{aliases:['악셀스페이스','액셀스페이스','일본']});
 node('rapis1','RAPIS-1','mission','ai','7개 부품·장비 실증 과제를 수행한 JAXA 소형 실증위성.',{launch:'2019-01-18',status:'임무 종료 · 기관 성과 발표',aliases:['RAPIS 1','라피스','RAPid Innovative payload demonstration Satellite 1'],notes:'2020-06-24 운용 종료. 함께 발사된 다른 6개 위성과 구분하며, 실증 과제별 결과는 연결 근거에서 확인합니다.'});
 node('rapis-nbfpga','RAPIS-1 NBFPGA','product','ai','궤도상 재구성 동작을 시험한 NanoBridge 기반 FPGA.',{status:'기관 실증 결과 공개',aliases:['NanoBridge','원자 스위치'],notes:'시험 기간의 소프트에러 미관측은 모든 환경에서 오류가 없다는 보장이 아닙니다.'});
 node('rapis-gprcs','RAPIS-1 GPRCS','product','propulsion','HAN계 SHP163 추진약을 사용한 저독성 추진계 실증장비.',{status:'기관 궤도 분사 확인',aliases:['green propellant','그린 추진제','화학추진'],notes:'연속·펄스 분사 결과이며 전기추진 실증이 아닙니다.'});
 node('rapis-tmsap','RAPIS-1 TMSAP','product','power','박형 패널을 전개하는 경량 태양전지 패들 실증장비.',{status:'기관 전개·발전 확인',aliases:['Thin Membrane Solar Array Paddle']});
 node('tet1','TET-1','mission','ai','태양전지·항법·추진·컴퓨터 하드웨어 등 11개 실험을 탑재한 독일 OOV 위성.',{launch:'2012-07-22',status:'실험 탑재·발사 확인',aliases:['TET 1','테트','Technologieerprobungsträger','Technology Experiment Carrier','OOV'],notes:'수록한 DLR 자료는 발사 당시의 탑재 구성과 시험 계획입니다. 11개 과제 전체의 최종 성공이나 현재 운용 상태를 추정하지 않습니다.'});
 records.push(
  ['jss-servis','SERVIS: project and space verification results','Japan Space Systems','일본','임무 수행기관 자료','https://www.jspacesystems.or.jp/en/project/observation/servis-2/',null,'1. Introduction / 2. Summary / 3. SERVIS-1 Space Verification Results','SERVIS-1은 2년 궤도 운용을 완료했고 SERVIS-2는 2011년 6월 임무를 완료했습니다. CPT를 이용해 COTS 부품을 평가했습니다.','사업 수행기관의 보고입니다. SERVIS-1의 SEU 관측 결과를 SERVIS-2의 정량 결과로 옮기지 않습니다.',['servis1','servis2','servis-cpt','j-spacesystems','cots','component-verification'],'실증 결과'],
  ['melco-servis','SERVIS engineering test satellites','Mitsubishi Electric','일본','개발사 임무자료','https://www.mitsubishielectric.com/bu/space/satellite/engineering/servis.html',null,'Launch date / Client / Responsibilities','주계약사 자료는 SERVIS-1의 2003-10-30, SERVIS-2의 2010-06-02 발사와 USEF 발주를 명시합니다.','원문의 설계 수명·궤도 표를 실제 운용 결과로 사용하지 않습니다.',['servis1','servis2','mitsubishi-electric'],'임무 구성'],
  ['jaxa-rapis-outline','革新的衛星技術実証1号機 / RAPIS-1','JAXA','일본','공공기관 임무자료','https://www.kenkai.jaxa.jp/kakushin/kakushin01.html',null,'About 小型実証衛星1号機 / Theme','RAPIS-1은 Axelspace가 개발한 7개 부품·장비 실증 과제의 탑재 위성입니다.','전체 발사 사업의 7개 위성과 RAPIS-1의 7개 탑재 실험은 서로 다른 집계입니다.',['rapis1','axelspace','component-verification'],'임무 구성'],
  ['jaxa-rapis-results','RAPIS-1 operation completion and experiment results','JAXA','일본','공공기관 실증자료','https://www.jaxa.jp/press/2020/06/20200625-1_j.html','2020-06-25','본문 / 별지 NBFPGA·GPRCS·TMSAP','JAXA는 RAPIS-1의 2020-06-24 운용 종료와 NBFPGA 재구성, GPRCS 분사, TMSAP 전개·발전 성과를 발표했습니다.','과제 제안기관의 보고를 모은 결과입니다. 한 과제의 시험 성공을 다른 장비·궤도로 일반화하지 않습니다.',['rapis1','rapis-nbfpga','rapis-gprcs','rapis-tmsap','fpga','solar-array','jaxa','j-spacesystems'],'실증 결과'],
  ['dlr-tet1-launch','German TET-1 small satellite launched','DLR','독일','공공기관 임무자료','https://www.dlr.de/en/latest/news/2012/20120722_german-tet-1-small-satellite-launched_4318/@@download/file','2012-07-22','PDF 1쪽: technology testbed / 11 experiments','DLR은 2012-07-22 TET-1 발사와 태양전지·항법·추진·컴퓨터 등 11개 탑재 실험을 설명합니다.','발사 자료의 1년 시험 계획을 완료 실적으로 취급하지 않습니다.',['tet1','component-verification','solar-array','dlr'],'임무 구성']
 );
 for(const row of records){
  const [id,title,publisher,country,type,url,date,locator,claim,limitation,entities,kind]=row;
  D.sources.push({id,title,publisher,country,type,url,date,reviewed,note:limitation,access:'본문 확인'});
  D.evidence.push({id:'claim-'+id,source:id,entities,kind,claim,locator,limitation,reviewed});
  for(const entityId of entities){
   const entity=entityMap.get(entityId);
   if(!entity)throw new Error('Missing evidence target: '+entityId);
   if(!entity.sources.includes(id))entity.sources.push(id);
  }
 }
 // Extend specific relationships without creating duplicate graph edges.
 function relate(from,to,label,source,scope){
  let edge=D.links.find(l=>l.from===from&&l.to===to&&l.label===label);
  if(!edge){edge={id:from+'--'+to+'--evidence',from,to,label,source,scope};D.links.push(edge);}
  edge.sources=[...new Set([...(edge.sources||[edge.source]),source])];
 }
 const relations=[
  ['gomspace','nanopower-p60','개발','gomspace-p60','제조사 제품 소개에 명시된 P60 전력계.'],
  ['space-power','nanopower-p60','전력 관리','gomspace-p60','전력 관리 제품 분류.'],
  ['nanopower-p60','nanopower-bp4','배터리 연계','gomspace-p60','제품 페이지에서 BP4 연계 설명. 특정 임무 탑재는 미확인.'],
  ['asi','prisma','임무 소유','asi-prisma','ASI가 임무 소유기관임을 명시.'],
  ['leonardo','prisma-imager','장비 제작','asi-prisma','ASI가 광학 장비 제작 역할을 명시.'],
  ['prisma-imager','prisma','탑재 구성','asi-prisma','초분광 관측장비 탑재.'],
  ['hyperspectral','prisma','관측 임무','asi-prisma','초분광 기술 분류.'],
  ['ohb-system','enmap-imager','장비 개발','enmap-instrument','우주부문 개발에 관측장비 제조를 포함.'],
  ['hyperspectral','enmap-imager','관측 기술','enmap-instrument','VNIR·SWIR 분광 구성.'],
  ['thermal-control','enmap-imager','검출기 냉각','enmap-instrument','설계상 검출기 냉각 구성으로 궤도 실측 온도가 아님.'],
  ['isro','hysis','임무 개발','isro-hysis','ISRO의 HysIS 임무 소개.'],
  ['hyperspectral','hysis','관측 임무','isro-hysis-image','VNIR 영상 공개.'],
  ['kari','kompsat3a','임무 개발','kari-kompsat3a','KARI 국내 주도 개발 소개.'],
  ['aeiss-a','kompsat3a','탑재 구성','kari-kompsat3a','AEISS-A 전자광학카메라의 탑재.'],
  ['eo-ir','kompsat3a','관측 임무','kari-kompsat3a','전자광학·적외선 센서 구성. 초분광으로 분류하지 않음.'],
  ['eo-ir','aeiss-a','전자광학 카메라','kari-kompsat3a','적외선 센서와 별도 장비.'],
  ['jaxa','ikaros','임무 주관','jaxa-ikaros','JAXA 태양돛 실증.'],
  ['solar-sail','ikaros','돛 탑재','jaxa-ikaros','광압 추진 설계.'],
  ['solar-array','ikaros','박막 태양전지 발전','jaxa-ikaros-deploy','2010년 6월 10일 전개와 발전 확인.'],
  ['jaxa','adras-j','기술 지원','jaxa-adras-images','개발·운용 기술 지원과 CRD2 1단계 사업.'],
  ['astroscale','adras-j','개발·소유·운용','jaxa-adras-images','JAXA 자료 주석의 역할 명시.'],
  ['rpod','adras-j','접근·관측 실증','astroscale-adras','약 15 m 접근 후 중단. 도킹·제거를 뜻하지 않음.'],
  ['unimelb','themis','개발','themis-paper','Melbourne 연구팀의 열관리 시스템 개발.'],
  ['themis','spirit','탑재·시운전','spirit-commission','냉각기 궤도 작동 확인.'],
  ['thermal-control','themis','능동 냉각','themis-paper','Stirling 냉각기·방열판 설계.'],
  ['space-power','spirit-pms','탑재체 전력 보호','spirit-paper','HERMES 안전 종료를 위한 UPS.'],
  ['spirit-pms','spirit','탑재 구성','spirit-paper','임무 논문 PMS 구성.'],
  ['unimelb','spirit','임무 주관','spirit-paper','University of Melbourne 주도 임무.'],
  ['electric-propulsion','iodine-propulsion','추진제 분류','esa-iodine','요오드 전기추진으로 홀 효과 방식 여부는 별도.'],
  ['thrustme','beihangkongshi1','추진기 제공','esa-iodine','ESA가 ThrustMe 추진기 탑재를 명시.'],
  ['iodine-propulsion','beihangkongshi1','궤도변경 실증','esa-iodine','점화·궤도변경 기록.']
 ];
 for(const row of relations)relate(...row);
 for(const row of [
  ['cots','servis1','COTS 신뢰성 실증','jss-servis','지상 시험과 궤도 시험의 비교.'],
  ['cots','servis2','COTS 신뢰성 실증','jss-servis','후속 위성의 부품·장비 시험.'],
  ['component-verification','servis1','실증 플랫폼','jss-servis','상용부품 궤도 검증.'],
  ['component-verification','servis2','실증 플랫폼','jss-servis','후속 상용부품 검증.'],
  ['j-spacesystems','servis1','사업 수행','jss-servis','과거 USEF 명칭을 포함한 사업 수행기관.'],
  ['j-spacesystems','servis2','사업 수행','jss-servis','과거 USEF 명칭을 포함한 사업 수행기관.'],
  ['mitsubishi-electric','servis1','주계약자','melco-servis','제조사 공개 역할.'],
  ['mitsubishi-electric','servis2','주계약자','melco-servis','제조사 공개 역할.'],
  ['servis-cpt','servis1','부품 시험장치 탑재','jss-servis','임무별 세부 구성이 같다는 뜻은 아님.'],
  ['servis-cpt','servis2','부품 시험장치 탑재','jss-servis','임무별 세부 구성이 같다는 뜻은 아님.'],
  ['component-verification','rapis1','실증 플랫폼','jaxa-rapis-outline','7개 부품·장비 과제.'],
  ['axelspace','rapis1','위성 개발','jaxa-rapis-outline','JAXA 소개의 개발 역할.'],
  ['jaxa','rapis1','임무 주관','jaxa-rapis-results','JAXA 실증 프로그램.'],
  ['rapis-nbfpga','rapis1','탑재·실증','jaxa-rapis-results','재구성 시험 성과.'],
  ['fpga','rapis-nbfpga','관련 기술','jaxa-rapis-results','NanoBridge FPGA 기술 분류.'],
  ['rapis-gprcs','rapis1','탑재·분사 실증','jaxa-rapis-results','HAN계 화학추진 시험.'],
  ['j-spacesystems','rapis-gprcs','실증 과제 제안','jaxa-rapis-results','JAXA 별지의 과제 제안기관.'],
  ['rapis-tmsap','rapis1','탑재·발전 실증','jaxa-rapis-results','경량 패들 전개·발전 확인.'],
  ['solar-array','rapis-tmsap','관련 기술','jaxa-rapis-results','태양전지 패들 기술 분류.'],
  ['component-verification','tet1','실증 플랫폼','dlr-tet1-launch','11개 실험 탑재.'],
  ['dlr','tet1','시험 사업·운용','dlr-tet1-launch','DLR OOV 사업 및 GSOC 운용 역할.'],
  ['solar-array','tet1','실험 탑재','dlr-tet1-launch','태양전지 실험 탑재 사실이며 최종 결과 아님.']
 ])relate(...row);
 // Corroborate selected existing edges with direct development/mission sources.
 for(const [from,to,source,scope] of [
  ['busek','bht200','busek-hall','개발사의 BHT-200 제품·비행 이력'],
  ['bht200','tacsat2','busek-hall','개발사의 TacSat-2 탑재 비행 기록'],
  ['mitll','tbird-terminal','mit-tbird','개발기관의 TBIRD 임무 소개'],
  ['tbird-terminal','tbird-mission','mit-tbird','TBIRD 개발기관의 위성–지상 실증 기록'],
  ['osiris','pixl1','dlr-pixl','DLR 발사·탑재 기록'],
  ['osiris','cubelct','dlr-pixl','DLR의 CubeLCT 제품명 설명'],
  ['nict','sota-terminal','nict-sota','NICT 개발·탑재 설명'],
  ['stanford','starfox','stanford-starfox','Stanford 연구실의 개발 및 비행 결과']
 ]){
  const edge=D.links.find(l=>l.from===from&&l.to===to);
  relate(from,to,edge.label,source,scope);
 }
 for(const s of D.sources){
  s.country??=s.publisher==='NASA'?'미국':s.publisher==='ESA'?'유럽':s.publisher==='KP Labs'?'폴란드':'미분류';
  // Shared programme/team labels are disclosure, not independence scores.
  s.originGroup=s.publisher.includes('Stanford')?'StarFOX 연구팀':s.publisher.includes('Melbourne')?'SpIRIT 연구팀':s.publisher.includes('DLR')?'DLR':s.publisher.includes('NICT')?'NICT':s.publisher;
 }
 const update=entityMap.get('tetraplex');
 update.notes='NASA 조사표에 더해 개발사의 2024년 궤도 시험 발표와 D-Orbit 임무 소개서를 연결했습니다. 원시 시험자료·장기 신뢰성·세대별 동일성은 별도 확인이 필요합니다.';
 update.status='개발사 실증 발표';update.reviewed=reviewed;
 for(const [date,entity,source] of [
  ['2019-03-22','prisma','asi-prisma'],['2018-11-29','hysis','isro-hysis'],
  ['2015-03-26','kompsat3a','kari-kompsat3a'],['2010-05-21','ikaros','jaxa-ikaros-deploy'],
  ['2024-02-18','adras-j','astroscale-adras'],['2023-12','spirit','spirit-paper'],
  ['2020-11','beihangkongshi1','esa-iodine']
 ])D.events.push({id:'launch-evidence-'+entity,date,entity,source,kind:'발사',title:entityMap.get(entity).name+' 발사',summary:'출처가 명시한 발사 시점. 실증 목표의 달성을 뜻하지 않습니다.'});
 for(const [date,entity,source,title] of [
  ['2024-10-28','tetraplex','telepix-flight','TetraPLEX 개발사 궤도 시험 결과 발표'],
  ['2024-12-11','adras-j','astroscale-adras','ADRAS-J 근접 접근·자동 중단 결과 발표'],
  ['2024-01-12','themis','spirit-commission','TheMIS 냉각기 궤도 작동 발표'],
  ['2010-06-11','ikaros','jaxa-ikaros-deploy','IKAROS 돛 전개·발전 확인 발표']
 ])D.events.push({id:'release-evidence-'+source,date,entity,source,kind:'성과 발표',title,summary:D.evidence.find(e=>e.source===source).claim+' 발표 날짜와 시험 수행일은 구분합니다.'});
 for(const [entity,source] of [['servis1','melco-servis'],['servis2','melco-servis'],['rapis1','jaxa-rapis-results'],['tet1','dlr-tet1-launch']]){
  D.events.push({id:'launch-evidence-'+entity,date:entityMap.get(entity).launch,entity,source,kind:'발사',title:entityMap.get(entity).name+' 발사',summary:'부품·장비 궤도 실증 플랫폼 발사. 실험 완료와 구분합니다.'});
 }
 D.events.push({id:'servis2-completion',date:'2011-06',entity:'servis2',source:'jss-servis',kind:'임무 완료',title:'SERVIS-2 임무 완료',summary:'사업 수행기관이 명시한 완료 월. 일자는 미기재.'});
 D.events.push({id:'rapis1-completion',date:'2020-06-24',entity:'rapis1',source:'jaxa-rapis-results',kind:'임무 종료',title:'RAPIS-1 운용 종료',summary:'정파 수행일. 성과 발표일인 6월 25일과 구분합니다.'});
 D.version='1.3.0';
})();
