/* Curated public-source snapshot. See README.md for evidence and update rules. */
window.ATLAS = (() => {
  const reviewed = '2026-09-11';
  const fields = [
    {id:'ai',name:'우주반도체·탑재 AI',short:'탑재 AI',color:'#76e4ce',root:'onboard-ai',question:'어떤 컴퓨팅 기술이 실제 위성에 탑재됐을까요?'},
    {id:'optical',name:'위성 광통신',short:'광통신',color:'#8caefa',root:'lasercom',question:'광통신 단말의 개발과 궤도실증을 연결해 봅니다.'},
    {id:'autonomy',name:'자율운용·분산 시스템',short:'자율운용',color:'#c4a4ed',root:'autonomy',question:'위성이 스스로 판단하고 협력하는 기술을 살펴봅니다.'}
  ];
  const sources = [
    {id:'avionics',title:'Small Spacecraft Avionics · 2026',publisher:'NASA',date:'2026-05-19',type:'공공기관 기술조사',url:'https://www.nasa.gov/smallsat-institute/sst-soa/small-spacecraft-avionics/',note:'제품 표의 성능·비행이력은 제조사 및 공개자료를 취합한 기록. NASA의 독립적인 제품 인증을 뜻하지 않습니다.'},
    {id:'comms',title:'Small Spacecraft Communications · 2026',publisher:'NASA',date:'2026',type:'공공기관 기술조사',url:'https://www.nasa.gov/smallsat-institute/sst-soa/soa-communications/',note:'광통신 개발사·단말·실증임무를 연결하는 기술조사. 지상 링크와 위성 간 링크의 조건을 구분합니다.'},
    {id:'phi1',title:'Φsat · Mission overview',publisher:'ESA',date:null,type:'공공기관 임무소개',url:'https://www.esa.int/Applications/Observing_the_Earth/FutureEO/Phsat',note:'발사 및 임무 구성 확인.'},
    {id:'phi1ai',title:'Artificial Intelligence for Earth observation',publisher:'ESA',date:null,type:'공공기관 기술소개',url:'https://www.esa.int/Applications/Observing_the_Earth/FutureEO/Phsat/Artificial_Intelligence_for_Earth_observation',note:'AI 영상 선별 개념과 관련기관 소개. 사전 계획을 실증 결과로 해석하지 않습니다.'},
    {id:'phi2',title:'Φsat-2 · Mission overview',publisher:'ESA',date:null,type:'공공기관 임무소개',url:'https://www.esa.int/Applications/Observing_the_Earth/FutureEO/Phsat-2',note:'발사·임무 구성과 AI 응용 확인.'},
    {id:'phi2team',title:'Introducing Φsat-2',publisher:'ESA',date:null,type:'공공기관 개발체계 소개',url:'https://www.esa.int/Applications/Observing_the_Earth/FutureEO/Phsat-2/Introducing_Phsat-2',note:'주계약자와 산업 컨소시엄 명단. 컨소시엄 참여만으로 특정 장비의 공급을 확정하지 않습니다.'},
    {id:'phi2science',title:'Φsat-2 begins science phase for AI Earth images',publisher:'ESA',date:'2025-07-15',type:'공공기관 성과발표',url:'https://www.esa.int/Applications/Observing_the_Earth/FutureEO/Phsat-2/Phsat-2_begins_science_phase_for_AI_Earth_images',note:'초기운용 종료 및 과학자료 제공 단계 진입 발표.'},
    {id:'opssat',title:'OPS-SAT · Mission and payload',publisher:'ESA',date:null,type:'공공기관 임무소개',url:'https://www.esa.int/Enabling_Support/Operations/OPS-SAT',note:'프로세서·실험환경·개발 주관 및 발사와 임무 종료 기록.'},
    {id:'intuition',title:'Intuition-1 · Mission and Leopard DPU',publisher:'KP Labs',date:null,type:'개발사 공개자료',url:'https://www.kplabs.space/projects-and-missions/intuition-1',note:'임무와 장비 성능은 개발사 발표 기준. 독립 검증 결과와 구분합니다.'},
    {id:'starling',title:'What is Starling?',publisher:'NASA',date:'2026-03-19',type:'공공기관 임무·실증 소개',url:'https://www.nasa.gov/smallspacecraft/what-is-starling/',note:'갱신된 실증 설명 및 파트너 역할. 문서의 갱신일과 실험 수행일은 다릅니다.'},
    {id:'starlingresult',title:'Starling Completes Primary Mission',publisher:'NASA',date:'2024-05-29',type:'공공기관 성과발표',url:'https://www.nasa.gov/directorates/stmd/swarming-for-success-starling-completes-primary-mission/',note:'일차 임무의 주요 성과 발표. 후속 수정 문구와 초기 발행일을 구분합니다.'},
    {id:'proba',title:'Proba-3 · Mission overview',publisher:'ESA',date:null,type:'공공기관 임무소개',url:'https://www.esa.int/Enabling_Support/Space_Engineering_Technology/Proba-3',note:'발사일과 2기 정밀 편대비행 임무 개요.'},
    {id:'probatech',title:'Proba-3 Technologies',publisher:'ESA',date:'2024-11-13',type:'공공기관 기술소개',url:'https://www.esa.int/Enabling_Support/Space_Engineering_Technology/Proba_Missions/Proba-3_Technologies',note:'사전 설계 설명. 센서 목표 정확도를 실측 성능으로 간주하지 않습니다.'},
    {id:'probarecovery',title:'Proba-3 ready for more science',publisher:'ESA',date:'2026-06-09',type:'공공기관 운용발표',url:'https://www.esa.int/Enabling_Support/Space_Engineering_Technology/We_re_back_Proba-3_ready_for_more_science',note:'이상 복구 후 편대비행 재수행 및 운용 복귀 발표.'}
  ].map(s=>({...s,reviewed}));
  const entities=[]; const links=[]; const events=[];
  function node(id,name,type,field,subtitle,summary,sourceIds,extra={}) { entities.push({id,name,type,field,subtitle,summary,sources:sourceIds,reviewed,status:'자료 확인',metrics:[],notes:'',aliases:[],...extra}); }
  function link(from,to,label,source,scope='공개자료에 명시된 관계') { links.push({id:from+'--'+to+'--'+links.length,from,to,label,source,scope}); }
  function event(date,title,entity,kind,summary,source) { events.push({id:'event-'+events.length,date,title,entity,kind,summary,source}); }
  node('onboard-ai','탑재 AI 처리','technology','ai','ONBOARD INTELLIGENCE','영상 선별·압축·분류를 위성 안에서 수행하는 기술.',['avionics','phi2science'],{question:'어떤 처리기가 어느 위성에서 어떤 기능을 수행했는가?',aliases:['인공지능','AI accelerator','edge computing','우주데이터센터']});
  node('fpga','FPGA·SoC 컴퓨팅','technology','ai','RECONFIGURABLE COMPUTING','프로세서와 재구성 논리를 결합하는 탑재컴퓨팅 구조.',['avionics','opssat'],{question:'칩, 보드, 위성의 검증 이력이 각각 확인되는가?',aliases:['반도체','Zynq','칩']});
  node('cots','COTS 오류완화','technology','ai','FAULT-TOLERANT COTS','상용부품에 오류검출·복구·감시 기능을 결합하는 설계 접근.',['avionics'],{question:'시험 선량·궤도·차폐·운용기간이 적용 임무와 맞는가?',aliases:['방사선','SEE','TID','내방사선']});
  node('flight-sw','재구성형 비행 소프트웨어','technology','ai','FLIGHT SOFTWARE','궤도에서 응용 프로그램을 시험하고 변경하는 소프트웨어 환경.',['opssat','avionics'],{question:'기능 변경 중 안전한 복구와 기본 제어를 어떻게 보장하는가?'});
  node('lasercom','위성 레이저통신','technology','optical','OPTICAL COMMUNICATIONS','광 단말과 실증임무를 전송 조건별로 연결.',['comms'],{question:'위성–지상과 위성 간 링크의 실적이 분리되어 있는가?',aliases:['광통신','ISL','laser','레이저','광네트워크']});
  node('pat','광 지향·포착·추적','technology','optical','POINTING · ACQUISITION · TRACKING','미세 지향장치와 추적 제어로 광 링크를 유지.',['comms'],{question:'위성 자세제어와 단말의 미세 지향 역할은 어떻게 나뉘는가?',aliases:['PAT','FSM','정밀지향']});
  node('optical-modem','고속 광모뎀','technology','optical','HIGH-RATE OPTICAL MODEM','광 송수신기와 변복조·오류제어를 결합.',['comms'],{question:'명목 속도와 실제 수신 데이터량을 각각 확인했는가?'});
  node('autonomy','분산 위성 자율운용','technology','autonomy','DISTRIBUTED AUTONOMY','여러 위성이 관측 정보와 계획을 공유하는 운용 기술.',['starling'],{question:'자율 판단의 범위와 지상 개입 조건이 공개됐는가?',aliases:['군집','swarm','AI 운용']});
  node('relative-nav','상대항법·편대비행','technology','autonomy','RELATIVE NAVIGATION','위성 사이의 위치를 추정하고 상대 배치를 유지.',['starling','probatech'],{question:'측정 정확도와 편대 유지 정확도를 구분했는가?',aliases:['GNC','formation','GNSS','항법']});
  node('planning','자율 임무·기동계획','technology','autonomy','ONBOARD PLANNING','관측과 궤도기동의 계획을 탑재 소프트웨어에서 생성.',['starling','probatech'],{question:'계획 생성만 검증했는가, 실제 실행까지 검증했는가?'});
  const orgs=[
    ['esa','ESA','ai','유럽 · 우주기관','Φsat·OPS-SAT·Proba-3 임무를 연결하는 기관.',['phi2team','opssat','proba']],
    ['open-cosmos','Open Cosmos','ai','위성 개발 · 주계약자','Φsat-2 개발 주계약자.',['phi2team']],
    ['ubotica','Ubotica','ai','탑재 AI · 컨소시엄','Φsat-2 산업 컨소시엄 참여.',['phi2team']],
    ['cgi','CGI','ai','소프트웨어 · 컨소시엄','Φsat-2 산업 컨소시엄 참여.',['phi2team']],
    ['ceiia','CEiiA','ai','연구개발 · 컨소시엄','Φsat-2 산업 컨소시엄 참여.',['phi2team']],
    ['geok','GEO-K','ai','관측 응용 · 컨소시엄','Φsat-2 산업 컨소시엄 참여.',['phi2team']],
    ['kplabs','KP Labs','ai','탑재컴퓨팅 · 폴란드','Intuition-1·Leopard 개발 및 Φsat-2 참여.',['intuition','phi2team']],
    ['simera','SIMERA','ai','관측 탑재체 · 컨소시엄','ESA가 공개한 Φsat-2 산업팀 구성원.',['phi2team']],
    ['tugraz','TU Graz','ai','대학 · 오스트리아','OPS-SAT 개발 주계약 기관.',['opssat']],
    ['cosine','cosine','ai','광학·관측 · 관련기관','ESA Φsat 공식 소개의 관련기관.',['phi1','phi1ai']],
    ['upc','UPC','ai','대학 · 스페인','FSSCat 임무를 제안한 대학 연구팀.',['phi1ai']],
    ['pisa','University of Pisa','ai','대학 · 이탈리아','ESA Φsat 공식 소개의 관련기관.',['phi1ai']],
    ['nasa-ames','NASA Ames','autonomy','우주기관 · 미국','Starling 사업 주관과 탑재 전자·소프트웨어·운용.',['starling']],
    ['mitll','MIT Lincoln Laboratory','optical','연구기관 · 미국','TBIRD 광 단말 개발.',['comms']],
    ['mit','MIT','optical','대학 · 미국','CLICK 광 단말 개발기관.',['comms']],
    ['jpl','NASA JPL','optical','연구기관 · 미국','TBIRD 수신 실험의 광통신 지상시설.',['comms']],
    ['dlr','DLR','optical','연구기관 · 독일','OSIRIS 계열 광통신 단말 개발.',['comms']],
    ['tesat','TESAT','optical','광통신 단말 · 독일','OSIRIS4CubeSat 기술의 CubeLCT 제품화.',['comms']],
    ['nict','NICT','optical','연구기관 · 일본','SOTA 소형 광통신 실증 장비 개발.',['comms']],
    ['blue-canyon','Blue Canyon Technologies','autonomy','위성 본체 · 미국','Starling 본체와 CLICK-A 탑재 플랫폼에 참여.',['starling','comms']],
    ['stanford','Stanford Space Rendezvous Lab','autonomy','대학 · 미국','StarFOX 상대항법 실험 개발.',['starling']],
    ['cesium','CesiumAstro','autonomy','RF 장비 · 미국','Starling MANET 실험의 위성 간 무선장비 공급.',['starling']],
    ['emergent','Emergent Space Technologies','autonomy','운용 소프트웨어 · 자료상 명칭','ROMEO 군집비행 응용 소프트웨어 기여.',['starling']],
    ['l3harris','L3Harris','autonomy','운용 지원 · 미국','Starling 지상 항법·기동계획 소프트웨어 지원.',['starling']],
    ['telepix','TelePIX','ai','탑재컴퓨팅 · 대한민국','NASA 기술조사에 TetraPLEX OBP 수록.',['avionics']],
    ['unibap','Unibap','ai','탑재컴퓨팅 · 스웨덴','NASA 기술조사에 iX10-100A 수록.',['avionics']],
    ['xiphos','Xiphos','ai','탑재컴퓨팅 · 캐나다','NASA 기술조사에 Q8S 수록.',['avionics']],
    ['aitech','Aitech','ai','탑재컴퓨팅 · 미국','NASA 기술조사에 S-A1760 수록.',['avionics']],
    ['amd','AMD / Xilinx','ai','반도체 · 제품 표기 병기','Leopard·Q8S 등에 사용된 Zynq 계열.',['intuition','avionics']],
    ['microchip','Microchip','ai','반도체 · 미국','TetraPLEX 구성에 PolarFire SoC 수록.',['avionics']],
    ['intel','Intel','ai','반도체 · 미국','iX10-100A 구성에 Myriad-X 수록.',['avionics']]
  ];
  orgs.forEach(o=>node(o[0],o[1],'organization',o[2],o[3],o[4],o[5]));
  node('leopard','Leopard DPU','product','ai','KP Labs · 탑재 AI 처리장치','Intuition-1의 초분광 데이터 처리 장치.',['intuition'],{status:'개발사 실증 발표',metrics:[['플랫폼','Zynq UltraScale+ ZU9EG'],['처리 성능','최대 3 TOPS · 개발사 제시'],['적용 임무','Intuition-1']],notes:'수치와 실증 성과는 개발사 발표입니다. TOPS의 연산 정밀도·전력 조건과 임무 환경의 추가 확인이 필요합니다.',aliases:['레오파드','DPU']});
  node('tetraplex','TetraPLEX OBP','product','ai','TelePIX · 대한민국','PolarFire SoC와 Jetson Orin NX를 결합한 탑재처리장치.',['avionics'],{status:'기술조사 수록',metrics:[['구성','PolarFire SoC + Orin NX'],['기록된 비행환경','LEO (SSO)']],notes:'NASA 조사표의 기록입니다. 이 데이터셋에는 특정 실증위성·운용기간·시험성적서가 연결되지 않았습니다.',aliases:['테트라플렉스','텔레픽스','국내']});
  node('ix10','iX10-100A','product','ai','Unibap · 탑재컴퓨팅','CPU·GPU·VPU를 결합한 탑재컴퓨팅 제품.',['avionics'],{status:'기술조사 수록',metrics:[['구성','AMD Ryzen V1000 + Myriad-X'],['설계 분류','COTS + SEE 완화']],notes:'기술조사 수록과 특정 고객의 채택 계약은 별개입니다.'});
  node('q8s','Q8S','product','ai','Xiphos · 탑재컴퓨터','Zynq UltraScale+ MPSoC 기반 제품.',['avionics'],{status:'기술조사 수록',metrics:[['기록된 비행환경','LEO']],notes:'제품 세대별 시험 조건과 실증 임무를 확인해야 합니다.'});
  node('sa1760','S-A1760','product','ai','Aitech · GPU 컴퓨팅','상용 GPU 기반의 탑재컴퓨팅 제품.',['avionics'],{status:'기술조사 수록',notes:'NASA 표의 LEO 이력은 더 큰 우주선에서의 비행을 포함합니다. 독립적인 소형위성 실증과 구분합니다.'});
  node('cyclone','Cyclone V SoC','product','ai','OPS-SAT · 실험용 프로세서','OPS-SAT 실험환경의 ARM·FPGA 결합 프로세서.',['opssat'],{status:'탑재 확인',metrics:[['구성','듀얼 Cortex-A9 + FPGA']],notes:'칩 탑재 사실이 모든 응용 기능의 실증 성공을 의미하지 않습니다.'});
  node('tbird-terminal','TBIRD 광 단말','product','optical','MIT Lincoln Laboratory','고속 위성–지상 광통신 실증 단말.',['comms'],{status:'기관 실증 기록',metrics:[['링크 구분','위성 → 지상'],['실증 전송속도','200 Gbps']],notes:'200 Gbps는 위성–지상 하향링크 실적입니다. 위성 간 링크나 연속 가용속도로 일반화하지 않습니다.'});
  node('osiris','OSIRIS4CubeSat','product','optical','DLR · 소형 광송신기','PIXL-1에서 실증한 소형 광통신 단말.',['comms'],{status:'기관 실증 기록',metrics:[['링크 구분','위성 → 지상'],['실증 전송속도','100 Mbps']],notes:'해당 임무의 조건에서 얻은 실적입니다.'});
  node('cubelct','CubeLCT','product','optical','TESAT · 광통신 제품','OSIRIS4CubeSat 기술을 제품화한 광통신 단말.',['comms'],{status:'제품화 기록',notes:'제품화 기록을 확보했습니다. 이 데이터셋에 양산 수량·매출·고객 계약은 포함하지 않았습니다.'});
  node('sota-terminal','SOTA','product','optical','NICT · 광통신 실증 장비','SOCRATES 위성에 탑재된 소형 광통신 장비.',['comms'],{status:'기관 실증 기록',metrics:[['링크 구분','위성 → 지상'],['기록된 전송속도','10 Mbps']]});
  node('click-terminal','CLICK-A 광 단말','product','optical','MIT · 미세 지향 광통신','MEMS 미세 지향거울을 사용한 광통신 장비.',['comms'],{status:'기관 실증 기록',notes:'CLICK-A의 실적이며 후속 CLICK-B/C의 개발 목표와 구분합니다.'});
  node('starfox','StarFOX','product','autonomy','Stanford · 상대항법 실험','별추적기를 활용한 위성군 상대항법 실험.',['starling'],{status:'기관 실증 발표',metrics:[['실증 플랫폼','Starling · 4기'],['주요 기능','영상 기반 상대항법']],notes:'실험 범위의 성공을 모든 위성군·궤도에서의 적용성으로 확대하지 않습니다.'});
  node('dsa','DSA','product','autonomy','NASA · 분산 자율운용 실험','위성끼리 정보를 공유하고 관측 선택을 조정.',['starling','starlingresult'],{status:'기관 실증 발표',metrics:[['실증 플랫폼','Starling'],['관측 대상','전리층']],aliases:['Distributed Spacecraft Autonomy']});
  node('romeo','ROMEO','product','autonomy','Starling · 자율 기동계획','탑재 위치추정과 궤도기동 계획·실행 실험.',['starling'],{status:'기관 실증 발표',notes:'2026년 갱신 자료의 성과 설명을 사용합니다. 2024년 최초 발표 당시에는 일부 실행 검증이 후속 과제로 남아 있었습니다.'});
  node('flls','FLLS 정밀 계측센서','product','autonomy','Proba-3 · 상대위치 측정','레이저와 반사체로 상대 위치를 측정하는 센서.',['probatech'],{status:'설계·탑재 구성',metrics:[['설계 목표','밀리미터 수준 상대계측']],notes:'설계 소개에 명시된 목표 정확도이며 이 기록만으로 실측 달성을 주장하지 않습니다.'});
  node('manet','MANET 무선 네트워크','product','autonomy','Starling · 위성 간 협업','S대역 위성 간 네트워크를 통한 정보 중계 실험.',['starling','starlingresult'],{status:'기관 실증 발표',notes:'RF 위성 간 네트워크이며 광통신 실증이 아닙니다.'});
  const missions=[
    ['phisat1','Φsat-1 / FSSCat','ai','2020-09-03','궤도 투입 확인','AI 영상 선별 실험을 실은 FSSCat 임무.',['phi1','phi1ai'],'사전 목표와 실증 결과를 별도 확인해야 합니다.'],
    ['phisat2','Φsat-2','ai','2024-08-16','기관 성과 발표','탑재 AI를 활용하는 지구관측 실증위성.',['phi2','phi2team','phi2science'],'2025년 초기운용 종료와 과학자료 제공 발표를 연결했습니다.'],
    ['opssat-mission','OPS-SAT','ai','2019-12-18','임무 종료','새로운 탑재·운용 소프트웨어를 시험한 궤도 실험실.',['opssat'],'2024년 5월 22–23일 밤(CEST) 임무 종료.'],
    ['intuition1','Intuition-1','ai','2023-11','개발사 실증 발표','Leopard로 초분광 영상을 처리하는 6U 위성.',['intuition'],'궤도 처리 성과는 개발사 공개자료 기준입니다.'],
    ['tbird-mission','TBIRD / PTD-3','optical','2022','기관 실증 기록','초고속 위성–지상 광통신 실증임무.',['comms'],'NASA 기술조사에 기록된 실증을 수록. 동일 페이지의 발사 월 표기가 상충해 연도만 보존했습니다.'],
    ['pixl1','PIXL-1','optical','2021','기관 실증 기록','OSIRIS4CubeSat 광통신 장비를 실증한 위성.',['comms'],'단말과 후속 제품 CubeLCT의 관계를 확인할 수 있습니다.'],
    ['socrates','SOCRATES','optical','2014','기관 실증 기록','NICT SOTA 광통신 장비의 실증 플랫폼.',['comms'],'위성–지상 광통신 실적을 기록합니다.'],
    ['clicka','CLICK-A','optical','2022','기관 실증 기록','미세 지향 광통신 기술을 검증한 큐브위성 임무.',['comms'],'후속 B/C 임무의 목표와 별도 기록합니다.'],
    ['starling-mission','Starling','autonomy','2023-07-17','기관 실증 발표','4기 큐브위성으로 분산 자율운용을 실험.',['starling','starlingresult'],'개별 실험의 성과와 갱신 시점을 구분합니다.'],
    ['proba3','Proba-3','autonomy','2024-12-05','운용 복귀 발표','2기 위성의 정밀 편대비행 임무.',['proba','probatech','probarecovery'],'2026년 이상 복구 후 편대비행 재수행 발표를 반영했습니다.']
  ];
  missions.forEach(m=>node(m[0],m[1],'mission',m[2],m[3]+' · 발사',m[5],m[6],{launch:m[3],status:m[4],notes:m[7],metrics:[['발사',m[3]],['자료상 상태',m[4]]]}));
  for(const id of ['phisat1','phisat2','intuition1','leopard','tetraplex','ix10','sa1760'])link('onboard-ai',id,'관련 기술',id==='phisat1'?'phi1ai':id==='phisat2'?'phi2science':id==='intuition1'||id==='leopard'?'intuition':'avionics','기술 내용에 따른 분류이며 거래관계가 아닙니다.');
  for(const id of ['leopard','cyclone','q8s','tetraplex'])link('fpga',id,'기술 적용',id==='leopard'?'intuition':id==='cyclone'?'opssat':'avionics');
  for(const id of ['ix10','sa1760'])link('cots',id,'오류완화 설계','avionics');
  link('flight-sw','opssat-mission','실험 플랫폼','opssat');link('flight-sw','cyclone','실행 환경','opssat');
  link('kplabs','leopard','개발','intuition');link('leopard','intuition1','탑재·실증 발표','intuition','개발사 발표에 따른 관계');link('amd','leopard','반도체 구성','intuition','제품에 명시된 칩 계열. 직접 구매계약 여부는 미확인');
  for(const [o,p] of [['telepix','tetraplex'],['unibap','ix10'],['xiphos','q8s'],['aitech','sa1760']])link(o,p,'개발사','avionics','NASA 제품조사 표에 수록된 제조사');
  link('microchip','tetraplex','반도체 구성','avionics');link('intel','ix10','반도체 구성','avionics');link('amd','ix10','반도체 구성','avionics');link('amd','q8s','반도체 구성','avionics');
  link('cyclone','opssat-mission','탑재','opssat');link('tugraz','opssat-mission','주계약 기관','opssat');link('esa','opssat-mission','임무 주관','opssat');link('esa','phisat2','임무 주관','phi2team');link('open-cosmos','phisat2','주계약자','phi2team');
  for(const o of ['ubotica','cgi','ceiia','geok','kplabs','simera'])link(o,'phisat2','컨소시엄 참여','phi2team','참여만 확인. 특정 부품 공급 역할은 이 자료에서 확정하지 않습니다.');
  link('esa','phisat1','임무 지원','phi1');link('upc','phisat1','FSSCat 제안','phi1ai');for(const o of ['cosine','pisa'])link(o,'phisat1','관련기관 소개','phi1ai','ESA 소개에 관련기관으로 연결. 구체적 공급 역할 미확인');
  for(const p of ['tbird-terminal','osiris','sota-terminal','click-terminal','cubelct'])link('lasercom',p,'관련 기술','comms','광통신 기술 분류');for(const p of ['osiris','click-terminal'])link('pat',p,'미세 지향','comms');link('optical-modem','tbird-terminal','광 송수신','comms');
  link('mitll','tbird-terminal','개발','comms');link('tbird-terminal','tbird-mission','탑재·실증','comms');link('jpl','tbird-mission','지상 수신시설','comms');link('dlr','osiris','개발','comms');link('osiris','pixl1','탑재·실증','comms');link('osiris','cubelct','제품화','comms');link('tesat','cubelct','제품화','comms');link('nict','sota-terminal','개발','comms');link('sota-terminal','socrates','탑재·실증','comms');link('mit','click-terminal','개발','comms');link('click-terminal','clicka','탑재·실증','comms');link('blue-canyon','clicka','플랫폼 제공','comms');
  for(const p of ['dsa','romeo','manet','starling-mission'])link('autonomy',p,'관련 기술','starling');for(const p of ['starfox','flls','proba3'])link('relative-nav',p,'관련 기술',p==='starfox'?'starling':'probatech');link('planning','romeo','기동계획','starling');link('planning','dsa','관측계획','starling');
  for(const p of ['starfox','dsa','romeo','manet'])link(p,'starling-mission','탑재·실증','starling');
  link('stanford','starfox','개발','starling');link('emergent','romeo','SW 기여','starling');link('cesium','manet','RF 장비 제공','starling');link('nasa-ames','dsa','실험 주관','starling');link('nasa-ames','starling-mission','사업 주관','starling');link('blue-canyon','starling-mission','본체 개발','starling');link('l3harris','starling-mission','지상 SW 지원','starling');link('esa','proba3','임무 주관','proba');link('flls','proba3','탑재 구성','probatech');
  event('2014','SOCRATES 광통신 실증 플랫폼 발사','socrates','발사','SOTA 탑재 임무의 시작.','comms');
  event('2019-12-18','OPS-SAT 발사','opssat-mission','발사','궤도 소프트웨어 실험실의 운용 시작.','opssat');
  event('2020-09-03','Φsat-1 / FSSCat 발사','phisat1','발사','AI 영상 선별 실험을 궤도에 투입.','phi1');
  event('2021','PIXL-1 발사','pixl1','발사','OSIRIS4CubeSat 실증 플랫폼.','comms');
  event('2022','TBIRD 실증임무 발사','tbird-mission','발사','고속 광통신 장비를 궤도에 투입.','comms');
  event('2022','CLICK-A 궤도 투입','clicka','발사','미세 지향 광통신 실험을 시작.','comms');
  event('2023-07-17','Starling 4기 발사','starling-mission','발사','위성군 자율운용 실험 플랫폼 구성.','starling');
  event('2023-11','Intuition-1 발사','intuition1','발사','초분광·탑재 AI 처리 실증을 시작.','intuition');
  event('2024-05-23','OPS-SAT 임무 종료','opssat-mission','임무 종료','5월 22–23일 밤(CEST) 종료 기록.','opssat');
  event('2024-05-29','Starling 일차 임무 성과 발표','starling-mission','성과 발표','분산 자율운용과 상대항법의 주요 성과를 공개.','starlingresult');
  event('2024-08-16','Φsat-2 발사','phisat2','발사','여러 AI 응용을 탑재한 지구관측 위성.','phi2');
  event('2024-11-13','Proba-3 편대비행 기술 구성 공개','proba3','설계 공개','상대항법·정밀계측·자율제어의 설계 설명.','probatech');
  event('2024-12-05','Proba-3 발사','proba3','발사','2기 정밀 편대비행 임무의 궤도 투입.','proba');
  event('2025-07-15','Φsat-2 과학자료 제공 단계 발표','phisat2','성과 발표','초기운용 완료와 AI 처리 자료 제공을 발표.','phi2science');
  event('2026-03-19','Starling 후속 실증 설명 갱신','starling-mission','자료 갱신','기동 실행·분산 판단 등 갱신된 실증 설명. 실험 날짜는 별도 미기재.','starling');
  event('2026-05-19','탑재컴퓨팅 제품 기술조사 갱신','tetraplex','자료 갱신','TelePIX 등 제품의 구성·기록을 기술조사에서 확인. 제품 출시일을 뜻하지 않음.','avionics');
  event('2026-06-09','Proba-3 복구 후 편대비행 재수행 발표','proba3','운용 발표','이상 원인 수정과 복구 후 운용 복귀를 발표.','probarecovery');
  const koreanAliases={starling:'스타링','starling-mission':'스타링',starfox:'스타폭스',phisat1:'필사트 파이샛',phisat2:'필사트 파이샛','opssat-mission':'옵스샛 옵스사트',intuition1:'인튜이션',proba3:'프로바',mitll:'MIT 링컨연구소',telepix:'텔레픽스 국내 한국 대한민국',lasercom:'광통신',tesat:'테사트',ubotica:'유보티카',kplabs:'케이피랩스'};
  entities.forEach(e=>{if(koreanAliases[e.id])e.aliases.push(koreanAliases[e.id]);});
  return {version:'1.0.0',reviewed,fields,sources,entities,links,events,scope:'공개자료 선별 수록 · 자동 실시간 수집 없음'};
})();
