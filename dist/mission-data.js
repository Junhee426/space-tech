/* Mission reading guide. Results describe the cited record, not present-day operation. */
(() => {
 const rows = [
  ['phisat1','탑재 AI로 구름 영상을 선별해 지상 전송량을 줄이는 기술','AI 영상 선별 실험 탑재와 궤도 투입이 확인됩니다. 정량적인 선별 성능은 이 기록에서 확정하지 않습니다.','FSSCat 실증 플랫폼','phi1ai'],
  ['phisat2','지구관측 영상을 위성 안에서 AI로 처리','2025년 초기운용 종료와 과학자료 제공 발표를 확인했습니다. 개별 AI 응용의 성능은 별도 확인이 필요합니다.','탑재 AI 지구관측 위성','phi2science'],
  ['opssat-mission','새로운 탑재·운용 소프트웨어를 궤도에서 시험','궤도 소프트웨어 실험을 수행했고 2024년 5월 22–23일 밤(CEST) 임무가 종료됐습니다.','재구성 가능한 궤도 소프트웨어 실험실','opssat'],
  ['intuition1','Leopard 처리장치로 초분광 영상을 위성에서 처리','개발사가 궤도 영상 처리 성과를 공개했습니다. 독립 검증 결과와 구분합니다.','6U 위성 · Leopard DPU','intuition'],
  ['tbird-mission','위성에서 지상으로 대용량 데이터를 광통신으로 전송','MIT Lincoln Laboratory가 2023년 5월 200 Gbps 전송 실증을 발표했습니다.','PTD-3 탑재 · 위성–지상 링크','mit-tbird'],
  ['pixl1','소형 위성용 OSIRIS4CubeSat 광통신 단말 시험','DLR 자료와 논문에 광통신 실증 기록이 있습니다. 후속 CubeLCT 제품의 모든 사양과 동일시하지 않습니다.','PIXL-1 · OSIRIS4CubeSat','dlr-pixl'],
  ['socrates','SOTA 단말로 위성–지상 광통신 시험','NICT 자료에서 10 Mbps급 위성–지상 광통신 기록을 확인합니다.','SOCRATES 탑재 · SOTA','nict-sota'],
  ['clicka','광통신에 필요한 미세 지향 기술 시험','NASA 기술조사에 CLICK-A 실증이 수록돼 있습니다. 후속 CLICK-B/C의 목표는 포함하지 않습니다.','큐브위성 · 미세 지향 광통신','comms'],
  ['starling-mission','여러 위성의 분산 자율운용과 상대항법 시험','NASA의 실험 성과 발표와 StarFOX 상대항법 논문을 연결했습니다. 실험별 달성 범위는 주장별 근거에서 확인합니다.','4기 큐브위성 · DSA / StarFOX / ROMEO / MANET','starlingresult'],
  ['proba3','두 위성의 정밀 편대비행 시험','2026년 이상 복구 후 편대비행 재수행이 발표됐습니다.','2기 위성의 편대비행','probarecovery'],
  ['tacsat2','BHT-200 전기추진기의 비행 적용','기술조사와 개발사 자료에 비행 이력이 기록돼 있습니다. 상세 궤도 시험 성능은 미확인입니다.','BHT-200 전기추진','propulsion-soa'],
  ['biosentinel','소형 위성에 열제어 소재 적용','NASA 기술조사에서 열소재 적용을 확인합니다. 생물학 실험의 성과를 의미하지 않습니다.','6U · Artemis I 발사 편승','thermal-soa'],
  ['cpod','두 위성의 접근·근접운용·도킹(RPOD) 시험','추진제 소진으로 종료했으며 계획한 RPOD 실증을 달성하지 못했습니다.','3U 위성 2기','cpod-source'],
  ['prisma','VNIR·SWIR 초분광 및 전정색 영상 관측','ASI가 관측자료 아카이브를 공개했습니다.','초분광 센서와 전정색 영상','asi-prisma-data'],
  ['hysis','가시광·근적외·단파적외 초분광 관측','ISRO가 2018-12-02 촬영한 첫 VNIR 영상을 공개했습니다.','VNIR / SWIR 관측','isro-hysis-image'],
  ['kompsat3a','전자광학카메라와 적외선 센서를 이용한 관측','KARI가 탑재 구성을 공개했습니다. 55 cm 수치를 적외선 해상도 또는 초분광 성능으로 읽지 않습니다.','1,100 kg급 · 전자광학 / 적외선','kari-kompsat3a'],
  ['ikaros','태양돛 전개와 박막 태양전지 발전 시험','JAXA가 2010-06-10 태양돛 전개와 발전 확인을 발표했습니다.','행성 간 환경 · 박막 태양전지','jaxa-ikaros-deploy'],
  ['adras-j','비협력 우주잔해에 접근해 근접 관측','약 15 m까지 접근한 뒤 상대 자세 이상으로 자동 중단·안전 이탈했습니다. 포획이나 제거는 수행하지 않았습니다.','CRD2 1단계 · 비협력 잔해','astroscale-adras'],
  ['spirit','능동 열제어와 탑재체 전력 보호 시험','시운전 자료와 논문에 초기 궤도 기록이 있습니다. 장기 운용 성능은 별도 확인이 필요합니다.','6U · TheMIS 냉각기 / 전개형 방열판','spirit-commission'],
  ['beihangkongshi1','요오드 전기추진기로 궤도 변경','ESA 자료에 요오드 전기추진을 이용한 궤도 변경이 기록돼 있습니다.','ThrustMe 요오드 전기추진 · Hall 방식과 구분','esa-iodine'],
  ['servis1','상용부품(COTS)과 장비의 우주환경 신뢰성 평가','사업 수행기관이 2년간의 궤도 실증 완료를 기록했습니다. 지상 방사선 시험과 궤도 SEU 관측을 비교합니다.','부품 시험장치(CPT) · 지상 시험과 궤도 관측 비교','jss-servis'],
  ['servis2','COTS 기반 장비와 부품 시험장치의 후속 신뢰성 평가','2011년 6월 임무 완료가 기록돼 있습니다. 완료 일자와 개별 부품의 정량 시험값은 이 정리에 포함되지 않습니다.','COTS 실험장비 · CPT','jss-servis'],
  ['rapis1','7개 부품·장비 실증 과제를 한 위성에서 시험','JAXA는 과제 제출자의 평가를 바탕으로 7개 실증 성공과 2020-06-24 운용 종료를 발표했습니다.','500 ± 20 km 태양동기궤도 계획 · 최대 200 kg급','jaxa-rapis-results'],
  ['tet1','컴퓨터·항법·태양전지·추진 등 11개 실험을 궤도에서 시험','발사와 실험 탑재를 확인했습니다. 수록 출처가 발사 당시 자료여서 11개 과제의 최종 성과는 미확인입니다.','120 kg · 520 km 저궤도 · 1년 시험 계획','dlr-tet1-launch']
 ];
 for (const [id,objective,result,conditions,source] of rows) {
  const e=window.ATLAS.entities.find(e=>e.id===id);
  e.demonstration={objective,result,conditions,source,tests:[]};
 }
 const mission=id=>window.ATLAS.entities.find(e=>e.id===id).demonstration;
 mission('rapis1').tests=[
  ['NBFPGA','궤도 재프로그래밍 성공, 관측 기간에 소프트 오류 미관측. 모든 환경에서 오류가 없다는 뜻은 아닙니다.'],
  ['GPRCS','HAN 계열 SHP163 추진제의 연속·펄스 연소 실증.'],
  ['TMSAP','박막 태양전지 패널 5장 전개와 약 1년 발전 유지.'],
  ['DLAS','딥러닝 영상 인식과 3축 자세 추정 실증.'],
  ['HXTX / XMGA','X대역 2.65 Gbps 전송. 광통신 성과와 구분합니다.'],
  ['SPM','우주 방사선 환경 계측.'],
  ['Fireant','초소형·저전력 GNSS 수신기의 궤도 실증 성공을 보고했습니다. 비교 대상별 정량 시험값은 이 화면에 수록하지 않았습니다.']
 ];
 mission('rapis1').conditionSource='jaxa-rapis-outline';
 mission('servis1').tests=[['COTS / CPT','지상 방사선 시험과 궤도 단일사건 업셋(SEU) 관측을 비교해 부품 신뢰성 평가에 활용.']];
 mission('servis2').tests=[['COTS / CPT','상용부품을 이용한 실험장비와 부품 시험장치의 후속 궤도 평가. 부품별 시험 조건과 결과값은 원문 추가 확인이 필요합니다.']];
})();
