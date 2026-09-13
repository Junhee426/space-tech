# 실증위성 사업 내용 보강

판본 1.4.0 · 사업 원문 검토 2026-09-13

24개 임무에 사업 목적, 추진 주체·역할, 시스템 구성, 실증·검증 방법을 작성했습니다. 사실 설명 96개 문단과 임무별 설계 검토사항 3개씩, 총 72개 검토사항을 `dist/mission-programs.js`에 수록합니다.

## 읽는 기준

- 사업 설명의 각 문단과 기술 검토 항목에서 원문으로 이동할 수 있습니다.
- 기술적 고려사항은 공개된 구성에서 도출한 설계 검토 관점입니다. 해당 위성이 실제로 구현한 기능이나 성공한 시험 목록으로 읽지 않습니다.
- 계획, 탑재·발사 확인, 기관 또는 개발사의 결과 발표를 구분합니다. 출처에서 확인되지 않은 예산·계약 범위·성능값은 채우지 않았습니다.
- 관측·과학 사업과 기술 실증 전용 사업을 구분합니다. 기존 기술 적용 사례의 맥락도 함께 설명합니다.
- 사업 원문 검토일은 `demonstration.program.reviewed`에 기록합니다. 기존 출처의 검토일은 그대로 보존하며, 내용이 바뀐 BioSentinel 요약만 항목 검토일도 갱신했습니다.

## 추가한 공식 출처

기존 54개 출처에 아래 5개를 추가했습니다. 같은 연구의 PDF와 저장소 초록은 모두 DLR 발행 계열로 집계합니다.

| 출처 ID | 원문 | 발행기관 |
| --- | --- | --- |
| nasa-click-project | [CubeSat Laser Infrared CrosslinK (CLICK) · Mission architecture](https://www.nasa.gov/smallspacecraft/what-is-click/) | NASA |
| nasa-cpod-project | [CubeSat Proximity Operations Demonstration · Project and outcome](https://www.nasa.gov/smallspacecraft/cpod-project/) | NASA |
| dlr-o4c-record | [OSIRIS4CubeSat acquisition and tracking · DLR repository abstract](https://elib.dlr.de/208615/) | DLR 연구팀 / DLR electronic library |
| afrl-tacsat2-program | [TacSat-2 launch and experimental mission programme](https://www.af.mil/News/Article-Display/Article/128672/tacsat-2-launched-into-space-with-flawless-liftoff/) | U.S. Air Force / AFRL |
| nasa-biosentinel-program | [BioSentinel science mission, payloads and biological experiment outcome](https://www.nasa.gov/ames-engineering/spaceflight-division/biosentinel/) | NASA Ames |

## 원문 확인의 한계

- SERVIS 본문은 확인했지만 이미지 형태의 상세 시험표를 이번 열람에서 읽지 못했습니다. 그 표에만 의존하는 부품명·시험값은 추가하지 않았습니다.
- OSIRIS4CubeSat 논문의 PDF는 이번 열람에서 접근하지 못했습니다. 새 사업 설명은 별도로 읽은 DLR 저장소 초록에 근거하며, 기존 PDF와 독립된 검증으로 세지 않습니다.
- TET-1은 발사 당시 자료가 제시한 시험 계획의 범위로 설명합니다. 후속 과제별 성적표를 확보한 것으로 표시하지 않습니다.
- 개발기관·제조사 자료를 수록한 것은 독립적인 재현이나 인증을 뜻하지 않습니다. 논문 초록만 읽은 경우에는 초록에 공개된 내용만 사용했습니다.
- TBIRD 자료 사이에서 데이터량 단위가 상충하는 부분은 MIT 원문을 기준으로 작성했습니다. CPOD 자료 간 종료일 차이는 그대로 미확정으로 남겼습니다.

## 화면과 검증

카드는 사업 목적과 기술 검토 주제를 미리 보여주고, 상세 화면은 사업 사실·확인 결과·설계 검토 관점을 나눠 표시합니다. 사업 내용과 기술 검토 문구는 검색 및 WebMCP 항목 조회에 포함됩니다. CSV는 사업 설명과 설계 검토사항을 별도 열로 내보내며 원문 URL도 보존합니다.

`node scripts/validate.mjs`는 전체 임무의 설명·검토사항·출처 연결, 사업 검색, WebMCP 조회를 검사합니다. `node scripts/browser-check.mjs`는 데스크톱·모바일 화면에서 24개 상세창의 구성과 가로 넘침, 출처 링크, CSV를 확인합니다.
