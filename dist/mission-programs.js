/* Program facts and clearly separated engineering review questions.
 * Source review dates belong to each program; existing evidence dates are preserved.
 */
(() => {
 'use strict';
 const D=window.ATLAS;
 const extraSources=[
  {
    "id": "nasa-click-project",
    "title": "CubeSat Laser Infrared CrosslinK (CLICK) · Mission architecture",
    "publisher": "NASA",
    "country": "미국",
    "type": "공공기관 임무자료",
    "url": "https://www.nasa.gov/smallspacecraft/what-is-click/",
    "date": null,
    "reviewed": "2026-09-13",
    "originGroup": "NASA",
    "note": "CLICK-A의 정밀 지향 검증 목표와 개발기관 역할. B/C의 전송률·거리측정과 발사 일정은 계획 문구이며 A의 달성 결과로 사용하지 않습니다.",
    "access": "사업 자료 확인"
  },
  {
    "id": "nasa-cpod-project",
    "title": "CubeSat Proximity Operations Demonstration · Project and outcome",
    "publisher": "NASA",
    "country": "미국",
    "type": "공공기관 임무자료",
    "url": "https://www.nasa.gov/smallspacecraft/cpod-project/",
    "date": null,
    "reviewed": "2026-09-13",
    "originGroup": "NASA",
    "note": "2023년 6월 23일 결과 갱신 문구와 하단의 사전 설계·운용계획을 구분합니다. 별도 임무 페이지의 종료일과 달라 정확한 종료일은 확정하지 않습니다.",
    "access": "사업 자료 확인"
  },
  {
    "id": "dlr-o4c-record",
    "title": "OSIRIS4CubeSat acquisition and tracking · DLR repository abstract",
    "publisher": "DLR 연구팀 / DLR electronic library",
    "country": "독일",
    "type": "연구 논문 초록",
    "url": "https://elib.dlr.de/208615/",
    "date": "2024-10-28",
    "reviewed": "2026-09-13",
    "originGroup": "DLR",
    "note": "기존 dlr-o4c-paper와 동일 논문의 공식 저장소 초록입니다. PDF는 이번 조사에서 접근 실패해 초록에 명시된 구성·추적 수치만 사용했으며 독립 검증으로 집계하지 않습니다.",
    "access": "사업 자료 확인"
  },
  {
    "id": "afrl-tacsat2-program",
    "title": "TacSat-2 launch and experimental mission programme",
    "publisher": "U.S. Air Force / AFRL",
    "country": "미국",
    "type": "공공기관 임무자료",
    "url": "https://www.af.mil/News/Article-Display/Article/128672/tacsat-2-launched-into-space-with-flawless-liftoff/",
    "date": "2006-12-19",
    "reviewed": "2026-09-13",
    "originGroup": "U.S. Air Force / AFRL",
    "note": "AFRL의 사업 관리, 11개 실험 장비, 신속한 위성 제작·발사·운용 개념과 공동 참여기관을 확인합니다. 발사 직후의 임무 소개이며 예정된 개별 실험을 모두 완료했다는 발표가 아닙니다.",
    "access": "사업 자료 확인"
  },
  {
    "id": "nasa-biosentinel-program",
    "title": "BioSentinel science mission, payloads and biological experiment outcome",
    "publisher": "NASA Ames",
    "country": "미국",
    "type": "공공기관 임무자료",
    "url": "https://www.nasa.gov/ames-engineering/spaceflight-division/biosentinel/",
    "date": "2024-07-31",
    "reviewed": "2026-09-13",
    "originGroup": "NASA",
    "note": "BioSensor·LET 구성, Ames·Johnson 역할, 지상·ISS 대조 실험과 효모 성장 미관측 결과를 확인합니다. 발사 전 장기 보관에 따른 생존성 저하는 NASA가 제시한 원인 추정이며, 이후 LET 관측 기록을 2026년 현재 상태로 확대하지 않습니다.",
    "access": "사업 자료 확인"
  }
];
 const programs={
  "phisat1": {
    "reviewed": "2026-09-13",
    "purpose": {
      "text": "FSSCat이 수집하는 대량의 지구관측 영상에서 구름 때문에 활용하기 어려운 장면을 위성 안에서 선별하는 실증입니다. 지상으로 보내는 데이터의 유효 비율을 높여 관측정보 제공을 효율화하는 것이 사업 목적입니다.",
      "sources": [
        "phi1ai"
      ]
    },
    "organization": {
      "text": "스페인 카탈루냐 공과대학(UPC) 연구팀이 FSSCat을 제안했고, ESA는 협력기관들과 Φsat-1 AI 실험을 추가했습니다. FSSCat 전체 관측임무와 한 위성에 실린 AI 실험의 역할을 구분해서 볼 수 있습니다.",
      "sources": [
        "phi1ai"
      ]
    },
    "architecture": {
      "text": "FSSCat은 마이크로파·광학 관측을 수행하는 큐브위성 2기로 구성되며, Φsat-1은 그중 1기에 탑재됩니다. 가시광·근적외선·열적외선 초분광 카메라가 만든 영상에 AI 선별을 적용해 지상 전송 대상을 고르는 구조입니다.",
      "sources": [
        "phi1ai"
      ]
    },
    "verification": {
      "text": "ESA 기록으로 2020년 9월 3일 발사와 AI·초분광 카메라 탑재를 확인합니다. 연결된 기술소개는 구름 영상 제외 원리를 설명하지만, 오분류율이나 실제 전송량 절감률의 정량 시험결과는 제시하지 않습니다.",
      "sources": [
        "phi1",
        "phi1ai"
      ]
    },
    "considerations": [
      {
        "topic": "구름 선별의 정보 손실",
        "detail": "밝은 지표·눈·얇은 구름이 섞인 장면에서 유효 영상을 버리는 비율을 어떻게 평가할까요? 지상 판독용 표본과 탑재 판정 결과를 짝지어 확인할 필요가 있습니다.",
        "sources": [
          "phi1ai"
        ]
      },
      {
        "topic": "관측부터 전송까지의 자원",
        "detail": "영상 생성 속도에 비해 AI 처리와 저장이 충분히 빠른지, 전송량 절감이 처리 전력·발열 증가를 상쇄하는지 함께 검토해야 합니다.",
        "sources": [
          "phi1ai"
        ]
      },
      {
        "topic": "실증 성과의 판정 기준",
        "detail": "선별 전후의 데이터량뿐 아니라 지상에서 실제 활용한 장면 수와 전달 지연을 비교해야 합니다. 궤도 투입만으로 선별 알고리즘의 효과를 확정할 수는 없습니다.",
        "sources": [
          "phi1",
          "phi1ai"
        ]
      }
    ]
  },
  "phisat2": {
    "reviewed": "2026-09-13",
    "purpose": {
      "text": "구름 영상 제외, 영상 압축, 도로 지도 생성, 선박·산불·해양오염 탐지를 탑재 AI 응용으로 시험하는 지구관측 사업입니다. 관측 영상을 유용한 정보로 바꾸는 처리와 그에 필요한 운용 자원을 함께 평가합니다.",
      "sources": [
        "phi2team",
        "phi2science"
      ]
    },
    "organization": {
      "text": "ESA가 개발을 추진하고 Open Cosmos가 주계약자를 맡았으며 Ubotica·CGI·CEiiA·GEO-K·KP Labs·SIMERA가 산업팀에 참여했습니다. 지상체계는 Open Cosmos와 CGI Italy, 지상국 서비스는 KSAT가 제공합니다.",
      "sources": [
        "phi2team",
        "phi2science"
      ]
    },
    "architecture": {
      "text": "6U 위성이 가시광~근적외선 7개 다중분광 밴드와 전정색 밴드로 영상을 얻고 탑재 응용으로 처리합니다. 수신 자료는 CGI Italy의 Insula 플랫폼에서 제공되며 AI 개발·학습에 사용할 Level 1 자료도 공개합니다.",
      "sources": [
        "phi2team",
        "phi2science"
      ]
    },
    "verification": {
      "text": "ESA는 약 9개월 동안 관측기와 AI 응용의 초기운용을 수행하고 2025년 2분기에 이를 마쳤다고 발표했습니다. 여러 지역의 예시 영상과 과학자료 제공은 확인되지만 응용별 탐지 정확도·압축 손실의 종합 시험표는 이 발표에 없습니다.",
      "sources": [
        "phi2science"
      ]
    },
    "considerations": [
      {
        "topic": "응용별 정확도와 압축 손실",
        "detail": "도로 지도·선박·산불 탐지는 오류의 영향과 평가 표본이 다릅니다. 압축률을 높였을 때 작은 선박이나 도로 경계가 사라지는지 응용별로 검토해야 합니다.",
        "sources": [
          "phi2team"
        ]
      },
      {
        "topic": "처리 자료의 재현성",
        "detail": "Level 1 영상과 AI 결과를 연결할 때 관측 시각, 보정 상태, 모델 버전을 함께 추적할 수 있을까요? 탑재 결과와 지상 재처리 결과의 차이를 설명할 기준이 필요합니다.",
        "sources": [
          "phi2science"
        ]
      },
      {
        "topic": "위성과 지상체계의 병목",
        "detail": "여러 AI 응용을 함께 운용할 때 처리·저장·지상국 접속 시간을 어떻게 배분할까요? 촬영부터 사용자 제공까지의 지연과 처리 실패 후 재시도 비용을 함께 비교해야 합니다.",
        "sources": [
          "phi2science"
        ]
      }
    ]
  },
  "opssat-mission": {
    "reviewed": "2026-09-13",
    "purpose": {
      "text": "새로운 비행 소프트웨어와 관제 기법을 실제 궤도에서 시험할 수 있도록 마련한 공개 실험실입니다. 외부 실험자가 제안한 프로그램을 업로드해 더 강력한 탑재컴퓨터가 제공하는 운용 가능성을 검증하도록 설계했습니다.",
      "sources": [
        "opssat"
      ]
    },
    "organization": {
      "text": "ESA의 일반지원기술프로그램(GSTP)이 지원하고 오스트리아 TU Graz가 개발 주계약자를 맡았습니다. ESA ESOC의 전용 SMILE 관제실에서 위성을 운용하며 외부 기관·기업이 실험 프로그램을 제공하는 방식입니다.",
      "sources": [
        "opssat"
      ]
    },
    "architecture": {
      "text": "Linux 기반 Cyclone V SoC의 ARM 프로세서·FPGA가 재구성 가능한 실험 환경을 제공합니다. 실험 탑재체가 위성 제어를 맡아도 기본 버스가 감시하며 제어권을 회수할 수 있고, S대역으로 프로그램과 실험 결과를 주고받도록 구성했습니다.",
      "sources": [
        "opssat"
      ]
    },
    "verification": {
      "text": "실험자가 제공한 부팅 이미지를 사전 점검한 뒤 탑재하고, 처리부의 소비전력·온도를 감시하는 절차가 공개돼 있습니다. 2024년 5월 22~23일 밤(CEST) 임무 종료가 기록됐으며 개별 소프트웨어의 성능 판정에는 각 실험 결과가 필요합니다.",
      "sources": [
        "opssat"
      ]
    },
    "considerations": [
      {
        "topic": "제어권 회수와 복구",
        "detail": "실험 프로그램이 멈추거나 잘못된 자세 명령을 내릴 때 버스가 언제 개입할까요? 제어권 회수 시간과 정상 상태 복귀를 오류 주입 시험으로 확인할 필요가 있습니다.",
        "sources": [
          "opssat"
        ]
      },
      {
        "topic": "실험 간 격리와 자원 제한",
        "detail": "CPU·FPGA·메모리 설정을 바꾸는 실험이 다른 탑재 기능에 영향을 주지 않는지 검토해야 합니다. 전력·온도 한계에 도달했을 때 중단 및 재시작 조건도 필요합니다.",
        "sources": [
          "opssat"
        ]
      },
      {
        "topic": "프로그램 전송과 추적",
        "detail": "제한된 상향 링크에서 부팅 이미지 업로드가 끊겨도 복구할 수 있을까요? 전송 무결성, 이전 버전 복원, 실행 버전과 결과 로그의 연결을 검토해야 합니다.",
        "sources": [
          "opssat"
        ]
      }
    ]
  },
  "intuition1": {
    "reviewed": "2026-09-13",
    "purpose": {
      "text": "초분광 원시자료를 모두 지상으로 보내는 부담을 줄이기 위해 영상 보정·구름 선별·분류를 위성에서 수행하는 사업입니다. 식생·토양·환경변화 관측을 대상으로 초소형 위성의 초분광 영상과 딥러닝 처리 활용성을 시험합니다.",
      "sources": [
        "intuition"
      ]
    },
    "organization": {
      "text": "KP Labs가 6U Intuition-1과 핵심 탑재체인 초분광 센서·Leopard DPU의 개발을 설명하고 있습니다. 궤도 영상 처리 및 운용 성과 역시 KP Labs가 공개한 개발사 자료를 기준으로 정리했습니다.",
      "sources": [
        "intuition"
      ]
    },
    "architecture": {
      "text": "192개 밴드의 가시광~근적외선 센서와 Leopard DPU를 연결해 영상 보정·정합·AI 처리·CCSDS-123 압축을 수행합니다. DPU는 이중 처리 노드와 별도 감시부를 두고 S대역 상향·X대역 하향 통신을 관리한다고 설명합니다.",
      "sources": [
        "intuition"
      ]
    },
    "verification": {
      "text": "개발사는 여러 지역에서 취득한 초분광 자료의 궤도 처리와 구름 선별·영상 분할 수행을 보고했습니다. 공개 예시만으로 환경별 분류 정확도, 전력 조건을 맞춘 지속 처리량 또는 독립적인 장기 신뢰성 검증까지 확정하지 않습니다.",
      "sources": [
        "intuition"
      ]
    },
    "considerations": [
      {
        "topic": "분광 보정과 영상 정합",
        "detail": "파장별 영상 위치가 어긋나거나 센서 응답이 변할 때 토양·식생 분류가 얼마나 달라질까요? 밴드 정합 오차와 보정 잔차를 AI 정확도와 함께 평가해야 합니다.",
        "sources": [
          "intuition"
        ]
      },
      {
        "topic": "연산량보다 실제 처리량",
        "detail": "표시된 TOPS가 아닌 관측 한 장의 보정·추론·압축 시간과 소비에너지를 확인해야 합니다. 장시간 처리 중 열 제한과 저장장치 대기시간까지 포함하는 기준이 필요합니다.",
        "sources": [
          "intuition"
        ]
      },
      {
        "topic": "장애 전환과 모델 갱신",
        "detail": "처리 노드 전환이나 모델 업데이트 중 미처리 초분광 자료와 보정값을 어떻게 보존할까요? 오류 감지부터 재처리 완료까지의 데이터 손실과 복구 시간을 검토해야 합니다.",
        "sources": [
          "intuition"
        ]
      }
    ]
  },
  "servis1": {
    "reviewed": "2026-09-13",
    "purpose": {
      "text": "상용부품(COTS)을 위성에 적용해 개발비와 기간을 줄이기 위한 첫 궤도 신뢰성 실증입니다. 부품 시험자료를 축적해 평가·장비 설계 지침으로 연결하는 사업입니다.",
      "sources": [
        "jss-servis",
        "melco-servis"
      ]
    },
    "organization": {
      "text": "USEF가 발주했고 Mitsubishi Electric이 위성 개발 주계약자를 맡았습니다. 제조사는 민간 부품·장비의 우주 검증을 저비용 위성 버스 개발과 연결해 설명합니다.",
      "sources": [
        "melco-servis"
      ]
    },
    "architecture": {
      "text": "상용부품 기반 실험장비와 부품 시험장치(CPT)를 함께 탑재합니다. 장비의 정상 동작과 개별 부품의 우주환경 반응을 지상 방사선 시험자료에 연결해 평가하는 구조입니다.",
      "sources": [
        "jss-servis"
      ]
    },
    "verification": {
      "text": "수행기관은 2년 운용 완료와 사전 설정한 실증 기준 충족을 보고했습니다. 궤도 단일사건 업셋(SEU) 발생 빈도는 지상 방사선 시험에서 예측한 값보다 낮았다고 설명합니다.",
      "sources": [
        "jss-servis"
      ]
    },
    "considerations": [
      {
        "topic": "지상 시험의 궤도 환산",
        "detail": "입자 종류와 차폐 위치가 달라져도 같은 SEU 예측법을 적용할 수 있을까요? 양성자·중이온 시험 조건과 실제 노출을 대응시켜야 합니다.",
        "sources": [
          "jss-servis"
        ]
      },
      {
        "topic": "부품 오류와 장비 기능",
        "detail": "비트 오류가 발생해도 장비가 동작했다면 오류 검출·복구가 성과에 얼마나 기여했는지 구분해야 합니다.",
        "sources": [
          "jss-servis"
        ]
      },
      {
        "topic": "후속 위성으로의 적용",
        "detail": "저비용 위성에 적용할 때 부품 교체·검증 비용까지 포함했는지, 실제 운용기간에 필요한 신뢰성을 유지하는지 검토해야 합니다.",
        "sources": [
          "melco-servis"
        ]
      }
    ]
  },
  "servis2": {
    "reviewed": "2026-09-13",
    "purpose": {
      "text": "SERVIS-1에 이은 COTS 부품·장비의 후속 우주환경 평가 사업입니다. 궤도 검증을 바탕으로 부품 데이터베이스와 우주용 장비 설계 지식을 갱신하는 데 목적이 있습니다.",
      "sources": [
        "jss-servis"
      ]
    },
    "organization": {
      "text": "Mitsubishi Electric이 USEF 발주로 개발한 두 번째 SERVIS 위성으로, 2010년 6월 2일 발사가 기록돼 있습니다. 제조사 소개는 SERVIS 두 임무를 저비용 상용 위성 버스 개발과 연결합니다.",
      "sources": [
        "melco-servis"
      ]
    },
    "architecture": {
      "text": "COTS 실험장비와 CPT를 탑재해 장비·부품 수준의 우주환경 평가를 수행합니다. 시험 정보는 공개 요약과 관계자용 상세 정보로 구분된 데이터베이스 및 평가 지침으로 연결됩니다.",
      "sources": [
        "jss-servis"
      ]
    },
    "verification": {
      "text": "수행기관은 2011년 6월 임무 완료와 이후 기술지식 문서의 정비를 기록합니다. SERVIS-1의 SEU 비교 결과를 SERVIS-2 부품의 정량 성과로 전용하지 않습니다.",
      "sources": [
        "jss-servis"
      ]
    },
    "considerations": [
      {
        "topic": "임무별 시험자료 구분",
        "detail": "두 위성의 부품·시험조건·운용기간을 별도 식별해야 합니다. 동일 사업의 성공만으로 후속 부품의 내성을 추정할 수는 없습니다.",
        "sources": [
          "jss-servis"
        ]
      },
      {
        "topic": "적용 부품의 추적성",
        "detail": "채택하려는 부품 번호·제조사·스크리닝 조건이 상세 시험자료와 일치하는지 확인해야 합니다. 공개 요약만으로 설계 여유를 계산할 수 있을까요?",
        "sources": [
          "jss-servis"
        ]
      },
      {
        "topic": "설계 수명과 실제 실증",
        "detail": "제조사 표의 설계 수명을 적용 위성의 수명 보증으로 사용할 수는 없습니다. 부하 이력과 실제 운용 종료까지의 검증 범위를 확인해야 합니다.",
        "sources": [
          "melco-servis"
        ]
      }
    ]
  },
  "rapis1": {
    "reviewed": "2026-09-13",
    "purpose": {
      "text": "기업·대학이 제안한 신기술에 궤도 시험 기회를 제공하는 JAXA 혁신위성기술실증 프로그램의 첫 탑재 실증위성입니다. 공모로 선정한 7개 부품·장비 과제를 한 위성에서 시험하고 실험 결과와 당시 환경 자료를 제안자에게 제공합니다.",
      "sources": [
        "jaxa-rapis-outline",
        "jaxa-rapis-results"
      ]
    },
    "organization": {
      "text": "JAXA 사업에서 Axelspace가 위성 개발을 담당했습니다. NEC의 FPGA, 게이오기주쿠대의 X대역 통신, Japan Space Systems의 추진·입자계측 등 기관별 장비를 통합하고 제안기관별 요구에 따라 실험을 수행하는 체계입니다.",
      "sources": [
        "jaxa-rapis-outline"
      ]
    },
    "architecture": {
      "text": "위성 기능을 유지하는 버스와 실험장비를 가능한 한 독립적으로 설계했습니다. NBFPGA, HXTX/XMGA, GPRCS, SPM, DLAS, TMSAP, Fireant를 탑재해 반도체·통신·추진·방사선·자세센서·태양전지·GNSS를 시험합니다.",
      "sources": [
        "jaxa-rapis-outline"
      ]
    },
    "verification": {
      "text": "JAXA는 약 1년 실증 후 7개 과제의 목표 달성과 2020년 6월 24일 운용 종료를 발표했습니다. 제안기관 보고에는 FPGA 재구성, 추진기의 연속·펄스 분사, 태양전지 패널 전개·발전 등 서로 다른 시험 결과가 포함됩니다.",
      "sources": [
        "jaxa-rapis-results"
      ]
    },
    "considerations": [
      {
        "topic": "실험과 버스의 상호 영향",
        "detail": "추진 분사·패널 전개·고속 송신이 자세와 전력에 주는 영향을 어떻게 분리할까요? 동시 수행을 허용할 실험 조합과 중단 조건을 검토해야 합니다.",
        "sources": [
          "jaxa-rapis-outline"
        ]
      },
      {
        "topic": "환경과 오류의 시간 대응",
        "detail": "입자계측 기록과 FPGA·센서 오류 기록의 시각을 맞춰 비교할 수 있을까요? 오류 미관측 결과에는 노출기간과 시험한 동작 모드를 함께 제시해야 합니다.",
        "sources": [
          "jaxa-rapis-outline",
          "jaxa-rapis-results"
        ]
      },
      {
        "topic": "과제별 합격 기준",
        "detail": "재구성 성공, 통신 속도, 전개 후 발전량은 다른 성능 지표입니다. 각 과제의 시험 조건과 반복 횟수를 확인해 부품 채택 근거를 구분해야 합니다.",
        "sources": [
          "jaxa-rapis-results"
        ]
      }
    ]
  },
  "tet1": {
    "reviewed": "2026-09-13",
    "purpose": {
      "text": "DLR의 궤도검증(OOV) 사업에서 지상 시험을 마친 신기술에 실제 우주환경 시험 기회를 제공하는 위성입니다. 태양전지·항법·산불 관측 카메라·통신·추진·컴퓨터 등 11개 실험을 향후 우주 임무에 적용할 근거를 확보하려는 사업입니다.",
      "sources": [
        "dlr-tet1-launch"
      ]
    },
    "organization": {
      "text": "DLR이 실험을 선정하고 Kayser-Threde가 위성 개발 주계약자, Astro- und Feinwerktechnik Adlershof가 버스 제작을 맡았습니다. GSOC가 관제를 담당하고 Neustrelitz 지상국 수신 자료를 실험자에게 전달하는 운용 계획입니다.",
      "sources": [
        "dlr-tet1-launch"
      ]
    },
    "architecture": {
      "text": "DLR BIRD 계열을 바탕으로 확장한 버스에 다양한 실험장비를 통합한 120 kg 위성이며 탑재체 용량은 50 kg으로 소개됩니다. 약 520 km 저궤도에서 지상 명령으로 실험을 켜고 결과를 수신하는 1년 시험 계획입니다.",
      "sources": [
        "dlr-tet1-launch"
      ]
    },
    "verification": {
      "text": "2012년 7월 22일 DLR 발표는 발사와 첫 교신, 11개 실험의 탑재·운용 계획을 확인합니다. 해당 자료는 실험 시작 시점의 보도자료이므로 과제별 최종 시험 성적이나 1년 시험 완료까지 증명하지 않습니다.",
      "sources": [
        "dlr-tet1-launch"
      ]
    },
    "considerations": [
      {
        "topic": "탑재체 자원의 배분",
        "detail": "추진·통신·컴퓨터 실험의 전력과 열 부하를 어떤 순서로 배치할까요? 50 kg 탑재 용량과 별도로 전력·방열·전송 여유를 검토해야 합니다.",
        "sources": [
          "dlr-tet1-launch"
        ]
      },
      {
        "topic": "환경 노출과 성능 변화",
        "detail": "우주환경에 노출된 기간만으로 신뢰성을 판단할 수는 없습니다. 태양전지 출력·컴퓨터 오류·항법 오차를 온도와 운용 조건에 연결한 기록이 필요합니다.",
        "sources": [
          "dlr-tet1-launch"
        ]
      },
      {
        "topic": "실험 결과의 재사용",
        "detail": "지상국 자료를 각 실험자가 분석할 때 공통 시각·명령 이력·버스 상태를 확보할 수 있을까요? 후속 임무와 환경이 다른 부분도 함께 식별해야 합니다.",
        "sources": [
          "dlr-tet1-launch"
        ]
      }
    ]
  },
  "tbird-mission": {
    "reviewed": "2026-09-13",
    "purpose": {
      "text": "짧은 저궤도 위성 통과 시간 안에 대용량 관측자료를 지상으로 내려보내기 위한 초고속 광통신 실증입니다. 소형 탑재체에서 고속 광모뎀과 저장장치, 대기 전송 오류 제어를 결합해 실제 수신 데이터량을 높이는 것이 사업의 핵심입니다.",
      "sources": [
        "mit-tbird"
      ]
    },
    "organization": {
      "text": "NASA와 MIT Lincoln Laboratory의 협력 임무이며 Lincoln Laboratory가 TBIRD 탑재체를 개발했습니다. 지상 수신에는 NASA JPL의 Optical Communication Telescope Laboratory(OCTL)를 사용했습니다.",
      "sources": [
        "mit-tbird",
        "comms"
      ]
    },
    "architecture": {
      "text": "고속 광모뎀·대용량 저장장치·광증폭기를 결합한 탑재체를 PTD-3 6U 위성에 싣고, 가동부 없는 단말을 위성 본체 자세제어로 지향합니다. 지상의 OCTL은 1 m 망원경과 적응광학으로 수신광을 광섬유에 결합해 복조합니다.",
      "sources": [
        "mit-tbird",
        "comms"
      ]
    },
    "verification": {
      "text": "개발기관은 2022년 100 Gbps, 2023년 5월 200 Gbps 위성–지상 링크와 단일 5분 통과 중 4.8 TB 수신을 보고했습니다. 최고 전송률과 통과당 데이터량은 서로 다른 성과 지표이며, 위성 간 링크나 상시 가용속도 실적으로 해석하지 않습니다.",
      "sources": [
        "mit-tbird"
      ]
    },
    "considerations": [
      {
        "topic": "본체 지향과 광축 정렬",
        "detail": "가동부 없는 단말의 이점을 유지하려면 본체 자세오차와 진동이 광링크에 미치는 영향을 함께 평가해야 합니다. 지상국 추적 중 다른 탑재체의 관측 자세 요구와 충돌하는지도 검토할 항목입니다.",
        "sources": [
          "mit-tbird"
        ]
      },
      {
        "topic": "대기 변동과 유효 데이터량",
        "detail": "자동 재전송 요청(ARQ)의 효과는 최고 Gbps 수치보다 통과 시간 안에 오류 없이 회수한 데이터량으로 비교하는 편이 적절합니다. 수신광 변동과 재전송 횟수가 저장공간·전송 종료 시점에 주는 영향을 따져야 합니다.",
        "sources": [
          "mit-tbird",
          "comms"
        ]
      },
      {
        "topic": "지상 수신계의 재현 조건",
        "detail": "다른 지상국에 적용하려면 망원경 구경, 적응광학, 광섬유 결합 조건을 함께 비교해야 합니다. OCTL에서 확인된 성능이 단순한 수신장비에서도 유지되는지는 별도 검증 과제입니다.",
        "sources": [
          "comms",
          "mit-tbird"
        ]
      }
    ]
  },
  "pixl1": {
    "reviewed": "2026-09-13",
    "purpose": {
      "text": "초소형 위성에서도 지상으로 직접 광통신을 수행할 수 있는지 검증하고, OSIRIS4CubeSat 단말의 제품화와 통신 표준화를 지원하는 사업입니다. 전송 채널을 관측해 오류 보호 방식을 개선하는 연구도 발사 당시 목표에 포함됐습니다.",
      "sources": [
        "dlr-pixl"
      ]
    },
    "organization": {
      "text": "DLR 통신항법연구소가 TESAT와 협력해 광단말을 개발했고, TESAT는 이를 CubeLCT라는 이름으로 제품화했습니다. GSOC는 PIXL-1 운용과 단말 교정, 연구팀으로의 데이터 전달을 담당합니다.",
      "sources": [
        "dlr-pixl"
      ]
    },
    "architecture": {
      "text": "3U 위성 안에 0.3U 광단말을 탑재하고, 본체 자세오차를 보정하는 능동 미세 지향·추적 장치로 지상 광링크를 유지합니다. 발사 당시 운용계획은 초기 점검에 UHF, 정규 위성 제어에 S대역을 사용하고 광통신 실험을 별도로 수행하는 구성이었습니다.",
      "sources": [
        "dlr-o4c-record",
        "dlr-pixl"
      ]
    },
    "verification": {
      "text": "2024년 DLR 연구팀 논문 초록은 궤도 텔레메트리로 포착·추적을 평가해 평균 추적오차 71 μrad와 3σ 편차 140 μrad를 보고합니다. 이는 해당 시험 조건의 지향 성능으로, 모든 통과에서의 전송률이나 제품 양산 실적을 증명하지 않습니다.",
      "sources": [
        "dlr-o4c-record"
      ]
    },
    "considerations": [
      {
        "topic": "포착 범위와 본체 자세오차",
        "detail": "미세 지향 장치의 조향 가능 범위의 반경은 1°이므로 초기 본체 지향이 비콘을 포착 가능한 범위에 넣어주는지 검토해야 합니다. 포착 성공률과 포착 후 추적오차를 별도 지표로 관리할 필요가 있습니다.",
        "sources": [
          "dlr-o4c-record"
        ]
      },
      {
        "topic": "비콘 밝기 변화와 제어 안정성",
        "detail": "논문은 비콘 수신전력 변화에 대응하는 적응형 이득 제어를 설명합니다. 적용 임무에서는 저고도각·저수신전력 조건에서도 센서 이득 변경과 추적 루프가 안정적으로 이어지는지 확인해야 합니다.",
        "sources": [
          "dlr-o4c-record"
        ]
      },
      {
        "topic": "구름과 지상국 배치",
        "detail": "구름으로 막힌 광경로는 단말 소형화만으로 해결되지 않습니다. 후보 지상국의 구름 빈도와 위성 통과 기회를 함께 계산하고, RF 제어망을 통한 실험 일정 변경까지 운용계획에 반영할 필요가 있습니다.",
        "sources": [
          "dlr-pixl"
        ]
      }
    ]
  },
  "socrates": {
    "reviewed": "2026-09-13",
    "purpose": {
      "text": "SOCRATES에 실은 SOTA를 이용해 소형 위성용 위성–지상 광통신과 양자통신 기초 실험을 수행한 사업입니다. 고속 하향링크뿐 아니라 지상 비콘 추적, 오류정정, 국제 지상국 간 호환성까지 검증 범위에 포함했습니다.",
      "sources": [
        "sota-paper"
      ]
    },
    "organization": {
      "text": "일본 NICT가 SOTA를 개발하고 도쿄 고가네이 본부의 광지상국에서 위성 신호를 수신했습니다. NICT 연구팀은 반복 링크 운용과 탑재체 검증 결과를 논문으로 정리했습니다.",
      "sources": [
        "nict-sota",
        "sota-paper"
      ]
    },
    "architecture": {
      "text": "SOCRATES에 탑재된 약 6 kg SOTA가 고도 약 600 km에서 지상으로 광신호를 전송하고, 지상국 비콘을 이용한 거친 추적과 미세 추적을 수행했습니다. 검증에는 서로 다른 파장·개구 조건의 최대 10 Mbit/s 하향링크와 탑재 카메라 영상 전송이 포함됐습니다.",
      "sources": [
        "nict-sota",
        "sota-paper"
      ]
    },
    "verification": {
      "text": "연구팀은 100회 이상 성공한 링크와 2016년 11월 SOTA 임무 종료를 보고했고, NICT는 2017년 단일광자 영역에서 위성 신호 수신 결과를 발표했습니다. 10 Mbit/s는 광신호 전송률이며 비밀키 생성률이나 상용 양자암호 서비스 성능이 아닙니다.",
      "sources": [
        "sota-paper",
        "nict-sota"
      ]
    },
    "considerations": [
      {
        "topic": "빠른 통과와 비콘 추적",
        "detail": "약 7 km/s로 이동하는 위성을 상대로 초기 포착부터 미세 추적까지 연결해야 합니다. 실제 사용 가능한 통과 시간과 추적 중단 후 재포착 시간을 함께 평가할 필요가 있습니다.",
        "sources": [
          "nict-sota",
          "sota-paper"
        ]
      },
      {
        "topic": "광통신과 양자통신의 성과 지표",
        "detail": "일반 데이터 전송의 오류율과 단일광자 실험의 검출 성능은 별도 시험 항목입니다. 후속 양자암호 사업은 수신 신호 확인에 더해 키 생성·후처리까지 검증하는 계획을 세워야 합니다.",
        "sources": [
          "nict-sota",
          "sota-paper"
        ]
      },
      {
        "topic": "지상국 호환성과 오류정정",
        "detail": "국제 지상국 호환성 실험을 참고하되 수신 개구와 파장, 오류정정 방식이 달라진 경우를 분리해 비교해야 합니다. 성공 링크 횟수만으로 모든 지상국 조합의 성능을 일반화하기는 어렵습니다.",
        "sources": [
          "sota-paper"
        ]
      }
    ]
  },
  "clicka": {
    "reviewed": "2026-09-13",
    "purpose": {
      "text": "후속 CLICK-B/C 위성 간 광통신의 개발 위험을 줄이기 위해, 단일 3U 위성으로 정밀 지향 제어와 지상 광링크를 먼저 시험하는 사업입니다. A 단계의 핵심은 저출력 레이저를 가능하게 하는 미세 조향 거울의 지향 성능 검증입니다.",
      "sources": [
        "nasa-click-project"
      ]
    },
    "organization": {
      "text": "NASA의 Small Spacecraft Technology 프로그램이 관리·지원하고, MIT와 University of Florida가 광송수신 탑재체 개발에 참여했습니다. NASA Ames가 위성 조달을 담당하며 단말은 Blue Canyon Technologies의 XB1 본체에 통합됐습니다.",
      "sources": [
        "nasa-click-project",
        "comms"
      ]
    },
    "architecture": {
      "text": "3U 위성의 본체 지향에 MEMS 미세 조향 거울을 결합하고, 지상 비콘을 기준으로 폐루프 미세 지향을 수행하는 구조입니다. NASA 임무 소개는 약 400 km 고도에서 지상의 소형 망원경으로 10 Mbps 초과 하향링크를 수립하는 것을 설계 목표로 설명합니다.",
      "sources": [
        "comms",
        "nasa-click-project"
      ]
    },
    "verification": {
      "text": "NASA 기술조사는 2022년 ISS에서 전개된 CLICK-A가 본체 지향만 사용할 때보다 MEMS 거울을 사용할 때 개선된 지향 성능을 실증했다고 기록합니다. 해당 결과를 CLICK-B/C의 양방향 위성 간 링크나 0.5 m급 거리측정 달성으로 확대하지 않습니다.",
      "sources": [
        "comms",
        "nasa-click-project"
      ]
    },
    "considerations": [
      {
        "topic": "본체와 미세 조향의 역할 분담",
        "detail": "본체는 비콘을 포착 범위에 넣고 미세 거울은 잔여 오차를 줄여야 합니다. 본체 지향만 쓴 경우와 비교할 때 같은 자세 흔들림·수신전력 조건을 적용해야 개선 효과를 구분할 수 있습니다.",
        "sources": [
          "comms"
        ]
      },
      {
        "topic": "좁은 빔과 링크 확보 시간",
        "detail": "정밀 지향은 낮은 레이저 출력에 유리하지만 빔이 좁아질수록 정렬과 추적 유지가 중요해집니다. 최고 전송률과 함께 초기 포착 소요시간, 비콘 상실 후 복구시간을 평가해야 합니다.",
        "sources": [
          "nasa-click-project",
          "comms"
        ]
      },
      {
        "topic": "후속 위성 간 링크로의 확장",
        "detail": "B/C의 양방향 송수신과 레이저 펄스 시간에 기반한 거리측정은 A 단계와 다른 검증 과제입니다. 지향 제어 성과를 활용하더라도 양쪽 단말 동시 운용과 시간 기준의 오차를 별도로 확인해야 합니다.",
        "sources": [
          "nasa-click-project"
        ]
      }
    ]
  },
  "starling-mission": {
    "reviewed": "2026-09-13",
    "purpose": {
      "text": "4기 소형 위성이 지상 명령에 대한 의존도를 줄이고 관측·항법·기동을 협업하도록 하는 분산 자율운용 실증입니다. 여러 지점에서 과학자료를 수집하는 위성군의 운용 규모를 확장하기 위해 탑재 계획과 위성 간 정보 공유를 시험합니다.",
      "sources": [
        "starling"
      ]
    },
    "organization": {
      "text": "NASA Ames가 사업, 탑재 전자장비·소프트웨어, 통합시험과 운용을 맡고 Blue Canyon Technologies가 본체를 개발했습니다. Stanford는 StarFOX, Emergent는 ROMEO 소프트웨어, CesiumAstro는 위성 간 무선장비를 제공했으며 L3Harris는 지상 항법·기동계획 소프트웨어를 지원했습니다.",
      "sources": [
        "starling"
      ]
    },
    "architecture": {
      "text": "4기 6U 위성에 S대역 위성 간 망 MANET, 항성추적기 기반 상대항법 StarFOX, 기동계획·실행 ROMEO, 분산 관측계획 DSA를 결합했습니다. DSA는 이중대역 GPS 수신기로 전리층을 관측하고 위성 간 망으로 정보를 공유해 추적할 GPS 신호를 조정합니다.",
      "sources": [
        "starling"
      ]
    },
    "verification": {
      "text": "NASA는 2024년 일차 임무의 주요 목표 달성을 발표했고, 2026년 갱신 자료에는 ROMEO 기동 실행과 DSA의 분산 계획 성과가 명시돼 있습니다. MANET은 한 위성의 지상 통신 장애 때 다른 위성을 통해 명령과 소프트웨어를 전달하는 우회 경로도 실증했습니다.",
      "sources": [
        "starlingresult",
        "starling"
      ]
    },
    "considerations": [
      {
        "topic": "통신 단절과 분산 판단",
        "detail": "한 노드의 통신 장애를 우회한 경험은 유용하지만 위성 간 망 자체가 끊기는 경우도 따져야 합니다. 각 위성이 가진 관측·계획 정보의 시점이 달라도 안전하게 협업을 재개하는 조건이 검토 대상입니다.",
        "sources": [
          "starlingresult"
        ]
      },
      {
        "topic": "각도 항법의 관측 기하",
        "detail": "StarFOX 초기 논문은 단일 관측자와 다중 관측자의 상대위치 불확실성을 각각 거리의 1.3%, 0.6%(1σ)로 보고합니다. 적용 시에는 관측 방향과 대상 거리, 여러 위성의 측정 공유가 달라질 때 정확도가 어떻게 변하는지 검토해야 합니다.",
        "sources": [
          "starfox-paper"
        ]
      },
      {
        "topic": "계획 생성과 기동 실행의 연결",
        "detail": "궤도 변경 계획의 생성 성공에 더해 실제 실행 전후의 상대궤도와 오차를 확인해야 합니다. 다른 운영자와의 교통 조정으로 확장할 때는 기동 책임을 정하는 절차와 위성 내부 자율계획의 연결도 검토 대상입니다.",
        "sources": [
          "starling"
        ]
      }
    ]
  },
  "proba3": {
    "reviewed": "2026-09-13",
    "purpose": {
      "text": "두 위성이 약 150 m 간격에서 하나의 대형 광학장비처럼 정렬되도록 하는 정밀 편대비행 사업입니다. 한 위성이 태양을 가려 다른 위성에 인공 일식의 그림자를 만들고, 이를 이용해 희미한 태양 코로나를 관측합니다.",
      "sources": [
        "proba"
      ]
    },
    "organization": {
      "text": "ESA가 주관하는 임무이며, 차폐 위성 Occulter와 관측 위성 Coronagraph가 함께 실험을 수행합니다. 과학 탑재체 ASPIICS의 연구책임자는 벨기에 왕립천문대 소속으로, ESA의 2026년 복구 발표에서 장비 점검과 코로나 영상 확보 결과를 설명했습니다.",
      "sources": [
        "proba",
        "probatech",
        "probarecovery"
      ]
    },
    "architecture": {
      "text": "S대역 위성 간 통신과 궤도 저고도 구간의 상대 GPS 항법에 더해 카메라·LED, 레이저 계측 FLLS, 그림자 위치센서가 상대 정렬 정보를 제공합니다. Occulter의 미세 냉가스 추력기와 편대비행 관리 시스템이 이 계측을 활용해 위치와 활동 계획을 제어하는 설계입니다.",
      "sources": [
        "probatech"
      ]
    },
    "verification": {
      "text": "설계 자료는 밀리미터급 상대계측을 설명하지만 그 수치 자체가 모든 운용 조건의 실측 정확도는 아닙니다. ESA는 2026년 6월 9일 통신 상실 이상에서 복구한 뒤 편대비행을 다시 수행하고 ASPIICS로 새 코로나 영상을 얻었다고 발표했습니다.",
      "sources": [
        "probatech",
        "probarecovery"
      ]
    },
    "considerations": [
      {
        "topic": "궤도 구간별 항법 전환",
        "detail": "GPS 위성 고도를 넘는 궤도에서는 상대 GPS를 계속 사용할 수 없습니다. GPS·시각센서·레이저·그림자 센서 사이의 인계 조건과 계측 불일치 시 편대 제어의 대응을 점검해야 합니다.",
        "sources": [
          "probatech"
        ]
      },
      {
        "topic": "광축 정렬과 구조 안정성",
        "detail": "정밀 계측기와 항성추적기, 과학장비를 같은 광학 벤치에 배치한 설계를 기준으로 열변형·정렬 오차의 영향을 평가해야 합니다. 센서의 위치 정확도와 실제 코로나 영상에 필요한 그림자 중심 유지 성능을 연결해 검증할 필요가 있습니다.",
        "sources": [
          "probatech"
        ]
      },
      {
        "topic": "이상 복구 후 관측 재검증",
        "detail": "통신 복구만으로 정밀 과학 관측의 재개를 판단하기는 어렵습니다. 복구 후 센서 교정, 편대 제어 재수행, 과학 영상 품질을 단계별로 확인하는 시험 계획을 검토할 필요가 있습니다.",
        "sources": [
          "probarecovery"
        ]
      }
    ]
  },
  "cpod": {
    "reviewed": "2026-09-13",
    "purpose": {
      "text": "두 3U 큐브위성으로 랑데부, 상대 위치 유지, 주위 비행, 도킹을 시험하려던 소형 근접운용 사업입니다. 소형 위성끼리 접근하고 결합하는 데 필요한 저전력 센서와 항법·제어 기술을 검증하는 것이 목표였습니다.",
      "sources": [
        "cpod-source",
        "nasa-cpod-project"
      ]
    },
    "organization": {
      "text": "NASA Small Spacecraft Technology 프로그램이 사업을 관리·지원하고 Terran Orbital이 임무를 주도하고 운용했습니다. VACCO Industries는 위성의 추진 시스템을 제작했습니다.",
      "sources": [
        "nasa-cpod-project"
      ]
    },
    "architecture": {
      "text": "두 위성에 영상센서, 도킹 장치, 다중 냉가스 추력기와 탑재 항법·제어 소프트웨어를 구성했습니다. 위성 간 링크로 GPS 등 상태 정보를 공유하고, UHF 통신과 S대역 데이터 하향링크를 통해 지상으로 영상과 시험자료를 전달하는 계획이었습니다.",
      "sources": [
        "nasa-cpod-project"
      ]
    },
    "verification": {
      "text": "계획은 초기 점검과 분리 후 주위 비행으로 센서를 평가하고, 단계적으로 접근해 도킹하는 순서였습니다. NASA는 수차례 접근했지만 시스템 수준 유도·항법·제어 문제와 연료 소진으로 계획한 RPOD를 실증하지 못하고 임무를 종료했다고 기록합니다.",
      "sources": [
        "nasa-cpod-project",
        "cpod-source"
      ]
    },
    "considerations": [
      {
        "topic": "통합 유도·항법·제어 검증",
        "detail": "개별 알고리즘의 타당성에 더해 실제 센서 오차, 탑재 처리 지연, 추력기 응답이 결합된 접근 과정을 확인해야 합니다. CPOD의 시스템 수준 문제는 하위 장치 시험만으로 도킹 성공을 예측하기 어려움을 보여줍니다.",
        "sources": [
          "nasa-cpod-project"
        ]
      },
      {
        "topic": "연료 예산과 재시도 기준",
        "detail": "반복 랑데부에 쓰는 연료와 최종 접근·중단에 필요한 여유를 함께 배분해야 합니다. 접근 실패 후 재시도 여부를 결정할 때 남은 추진제와 회복 가능한 상대궤도를 함께 평가하는 기준이 필요합니다.",
        "sources": [
          "nasa-cpod-project",
          "cpod-source"
        ]
      },
      {
        "topic": "단계별 실증 완료 조건",
        "detail": "상대 위치 유지, 주위 비행, 최종 접근, 기계적 결합은 각각 완료 기준을 정할 필요가 있습니다. 가까워진 거리나 알고리즘 평가 결과를 전체 RPOD·도킹 성공과 동일한 성과로 집계하지 않아야 합니다.",
        "sources": [
          "nasa-cpod-project",
          "cpod-source"
        ]
      }
    ]
  },
  "adras-j": {
    "reviewed": "2026-09-13",
    "purpose": {
      "text": "JAXA CRD2 1단계에서 실제 비협력 우주잔해에 접근해 운동 상태와 손상·열화 상태를 영상으로 조사하는 사업입니다. 제거 서비스의 기반 데이터를 확보하는 단계이며, 대상 포획과 제거·재진입은 CRD2 2단계 목표로 분리됩니다.",
      "sources": [
        "jaxa-crd2"
      ]
    },
    "organization": {
      "text": "JAXA는 서비스 사양과 안전 요구를 제시하고 기술 지원을 제공하며, Astroscale이 위성을 설계·제작·시험하고 운용하는 민관 협력 구조입니다. 양측이 개발·운용 자금을 부담하고 JAXA는 위성 자체보다 서비스와 연구개발 성과를 조달합니다.",
      "sources": [
        "jaxa-crd2",
        "jaxa-adras-images"
      ]
    },
    "architecture": {
      "text": "발사 시 약 180 kg 위성에 랑데부 센서군, 가시광 카메라와 조명 장치를 구성해 H-IIA 로켓 상단을 관측합니다. 광학 상대항법으로 접근한 뒤 대상 기준 정점 관측과 주위 비행을 수행하고, 후속 포획부인 PAF 근처 접근을 추가 시험하는 구성입니다.",
      "sources": [
        "jaxa-crd2",
        "astroscale-adras"
      ]
    },
    "verification": {
      "text": "Astroscale은 JAXA 요구 관측을 완료했고 2024년 11월 30일 약 15 m까지 접근했다고 발표했습니다. 예상 밖 상대자세 이상으로 충돌회피 장치가 자동 중단·안전 이탈을 실행해 목표 최종 지점에는 도달하지 못했으며, 포획·제거를 수행한 실적은 아닙니다.",
      "sources": [
        "astroscale-adras"
      ]
    },
    "considerations": [
      {
        "topic": "비협력 대상의 자세·형상 추정",
        "detail": "잔해의 협조 신호 없이 접근하므로 거리별 광학 항법의 전환과 영상에서 얻는 상대자세의 신뢰도를 검토해야 합니다. 오래된 단열재와 대상 회전이 영상 기반 추정에 미치는 영향도 후속 임무의 시험 항목입니다.",
        "sources": [
          "jaxa-crd2",
          "astroscale-adras"
        ]
      },
      {
        "topic": "접근 성능과 안전 이탈",
        "detail": "더 가까운 접근 목표와 자동 중단 기준을 함께 설계해야 합니다. 15 m 접근 후 이탈 사례를 참고해 상대자세 오차가 커질 때 안전경로와 중단 판정이 유효한지 검증할 필요가 있습니다.",
        "sources": [
          "astroscale-adras",
          "jaxa-crd2"
        ]
      },
      {
        "topic": "관측자료를 포획 설계로 연결",
        "detail": "PAF 부위 영상은 후속 포획 설계의 입력이지만 기계적 접촉과 하중 전달의 검증을 대신하지는 않습니다. 1단계의 관측 품질·형상 추정 불확실성을 2단계의 접근·포획 허용오차와 연결해야 합니다.",
        "sources": [
          "astroscale-adras",
          "jaxa-crd2"
        ]
      }
    ]
  },
  "tacsat2": {
    "reviewed": "2026-09-13",
    "purpose": {
      "text": "위성을 신속히 제작·발사·운용하는 개념을 시험하기 위해 영상관측, 통신, 자율운용 등 11개 실험 장비를 함께 실은 AFRL 실험위성입니다. 이 중 BHT-200 추진 실험은 소형 위성의 궤도기동 능력을 높이는 기술을 우주에서 확인하는 데 초점을 두었습니다.",
      "sources": [
        "afrl-tacsat2-program",
        "busek-hall"
      ]
    },
    "organization": {
      "text": "AFRL 우주비행체 부문이 사업을 관리하고 Busek이 200 W급 홀 추력기를 제공했습니다. NASA, 미 국방부 Space Test Program, 해군연구소 등이 공동 사업에 참여했으며, 기관 참여와 개별 장비 제작 역할은 구분합니다.",
      "sources": [
        "afrl-tacsat2-program",
        "busek-hall"
      ]
    },
    "architecture": {
      "text": "2006년 발사된 위성에 BHT-200을 주추진기로 탑재하고, 추진기 배출 플룸 측정과 탑재 진단을 함께 구성했습니다. NASA 기술조사가 기록한 이 비행의 추진제는 제논이며, 같은 제품군의 요오드 지상시험과는 별도 이력입니다.",
      "sources": [
        "busek-hall",
        "propulsion-soa"
      ]
    },
    "verification": {
      "text": "Busek은 플룸 측정과 탑재 진단으로 우주에서의 추진기 성능을 확인했다고 발표했습니다. 이 자료는 비행 작동 근거이지만, TacSat-2에서 달성한 누적 작동시간·총 임펄스·궤도변경량을 제시하지 않으므로 현재 제품표의 수치를 해당 비행 실측값으로 읽지 않습니다.",
      "sources": [
        "busek-hall"
      ]
    },
    "considerations": [
      {
        "topic": "추진 전력과 실험 일정",
        "detail": "200 W급 추력기 운용을 영상관측·통신 실험과 어떻게 배분할지 검토해야 합니다. 추력기 자체 소비전력 외에 전력변환 손실과 점화·예열 부하를 포함해 일조·식 구간의 전력 여유를 계산할 필요가 있습니다.",
        "sources": [
          "busek-hall",
          "afrl-tacsat2-program",
          "propulsion-soa"
        ]
      },
      {
        "topic": "플룸과 위성 본체의 간섭",
        "detail": "플룸이 태양전지판·광학 표면에 미치는 영향과 추력기에서 본체로 전달되는 열을 함께 평가해야 합니다. 지상 진공시설의 플룸 분포와 실제 비행 측정의 차이를 비교하는 것이 이 실험의 적용성을 판단하는 기준입니다.",
        "sources": [
          "propulsion-soa",
          "busek-hall"
        ]
      },
      {
        "topic": "비행 실적의 적용 범위",
        "detail": "새 임무에 BHT-200을 적용할 때는 제논 비행 이력의 운용시간·점화 횟수·추력 방향 안정성이 요구 궤도기동과 맞는지 확인해야 합니다. 요오드 파생형은 추진제와 음극 적합성을 별도로 검증해야 합니다.",
        "sources": [
          "propulsion-soa"
        ]
      }
    ]
  },
  "biosentinel": {
    "reviewed": "2026-09-13",
    "purpose": {
      "text": "지구 저궤도 밖에서 장기간 우주방사선이 생명체에 미치는 영향을 효모로 측정하려는 6U 과학 임무입니다. 이 지도에서는 생물학 실험을 지탱하는 열제어 소재와 소형 탑재체 통합의 기술 활용 사례로 함께 다룹니다.",
      "sources": [
        "nasa-biosentinel-program",
        "thermal-soa"
      ]
    },
    "organization": {
      "text": "NASA Ames가 BioSentinel 개발을 맡고 Johnson 우주센터가 LET 방사선 분광계에 참여했습니다. 초기 사업은 NASA 탐사체계개발 조직의 Mars Campaign Office가 지원했으며, 열제어에는 Sheldahl 금속화 테이프와 은 코팅 FEP 테이프가 사용됐습니다.",
      "sources": [
        "nasa-biosentinel-program",
        "thermal-soa"
      ]
    },
    "architecture": {
      "text": "Artemis I에 편승해 2022년 발사된 뒤 달을 지나 태양 주위 궤도로 진입하며, 건조 효모를 담은 미세유체 BioSensor와 LET 분광계를 탑재했습니다. 외부 테이프로 복사 열수지를 조절하고 생물학 탑재체는 온도 피드백을 이용한 히터로 제어하며, 과학자료는 탑재 저장 후 심우주통신망으로 전송하는 구성입니다.",
      "sources": [
        "nasa-biosentinel-program",
        "thermal-soa"
      ]
    },
    "verification": {
      "text": "ISS와 지상 대조 실험을 함께 마련했지만, NASA는 심우주에서 BioSensor 하드웨어 작동에 성공한 뒤에도 효모 성장을 관측하지 못했고 발사 전 장기 보관에 따른 생존성 저하가 원인일 가능성이 높다고 설명합니다. 따라서 장비 작동·열소재 적용과 생물학 목표 달성을 구분하며, 공개 자료는 이후 LET 방사선 관측을 이어간 사실을 기록합니다.",
      "sources": [
        "nasa-biosentinel-program"
      ]
    },
    "considerations": [
      {
        "topic": "생물 시료와 발사 대기기간",
        "detail": "실제 효모 성장 미관측 사례를 고려해 보관기간별 생존성, 발사 지연 시 재검사 기준, 재수화 뒤 검출기의 정상 작동을 어떻게 구분할지 정해야 합니다.",
        "sources": [
          "nasa-biosentinel-program"
        ]
      },
      {
        "topic": "외부 열수지와 내부 온도제어",
        "detail": "FEP 테이프의 태양광 흡수·적외선 방사 특성 변화가 히터 소비전력과 시료 온도에 미치는 영향을 함께 계산해야 합니다. 심우주 자세·일조 조건과 임무 말기의 표면 열화를 반영해 히터 제어 여유를 검토할 필요가 있습니다.",
        "sources": [
          "thermal-soa"
        ]
      },
      {
        "topic": "과학자료의 해석 가능성",
        "detail": "방사선 분광계 기록과 효모 반응의 측정 시점, 지상·ISS 대조군 조건을 연결해야 합니다. 성장 신호가 없을 때 방사선 효과와 시료 생존성 문제를 분리할 수 있는 판정 기준이 필요합니다.",
        "sources": [
          "nasa-biosentinel-program"
        ]
      }
    ]
  },
  "prisma": {
    "reviewed": "2026-09-13",
    "purpose": {
      "text": "지표의 모양뿐 아니라 물질별 분광 특성으로 화학·물리적 구성을 파악해 환경변화·자원·재난 관측에 활용하는 ASI 초분광 지구관측 사업입니다. ASI가 본격 운영을 준비하는 과학 실증 임무로 소개한 개발 성격과 관측자료를 실제 제공한 활용 단계를 함께 살펴볼 수 있습니다.",
      "sources": [
        "asi-prisma",
        "asi-prisma-data"
      ]
    },
    "organization": {
      "text": "ASI가 임무를 소유하고 OHB Italia가 지상·비행·발사 부문을 총괄했으며 Leonardo가 초분광 광학 장비를 제작했습니다. Telespazio는 Fucino 관제센터를 구축했고 관측자료 수신·처리는 Matera 우주센터에서 수행하는 체계입니다.",
      "sources": [
        "asi-prisma"
      ]
    },
    "architecture": {
      "text": "약 615 km 궤도에서 VNIR·SWIR 영상분광기와 전정색 카메라로 같은 지표의 분광정보와 공간정보를 수집합니다. ASI 소개상의 공간해상도는 초분광 30 m, 전정색 5 m로, 두 관측 채널의 역할과 해상도가 다릅니다.",
      "sources": [
        "asi-prisma"
      ]
    },
    "verification": {
      "text": "ASI는 2020년 5월 시운전과 보정·검증 활동을 완료했다고 알리고 기존 관측 아카이브와 신규 촬영 요청을 사용자 공동체에 개방했습니다. 자료 제공과 보정 단계 완료는 확인되지만, 모든 장면의 물질 식별 정확도를 하나의 수치로 보장하는 발표는 아닙니다.",
      "sources": [
        "asi-prisma-data"
      ]
    },
    "considerations": [
      {
        "topic": "공간해상도와 분광정보의 결합",
        "detail": "30 m 초분광 화소에 여러 물질이 섞일 때 5 m 전정색 영상을 어떻게 보조정보로 사용할지 검토해야 합니다. 영상 융합으로 공간상세도를 높이는 과정에서 원래 분광 특성이 왜곡되지 않는지 확인할 필요가 있습니다.",
        "sources": [
          "asi-prisma"
        ]
      },
      {
        "topic": "보정 단계와 물질 식별",
        "detail": "원시 센서 신호부터 지표 물성 해석까지 필요한 방사·기하·대기 보정 단계를 구분해야 합니다. 물질 식별 성능은 구름·혼합화소·관측각 조건을 명시한 지상 참조자료와 비교해 평가할 필요가 있습니다.",
        "sources": [
          "asi-prisma",
          "asi-prisma-data"
        ]
      },
      {
        "topic": "관측자료의 활용 체계",
        "detail": "활용 사업에서는 촬영 요청부터 수신·처리·배포까지의 지연과 제공 산출물의 처리 수준을 확인해야 합니다. 2020년 개방 발표에 적힌 사용조건을 계약이나 재배포의 현재 조건으로 그대로 사용해서는 안 됩니다.",
        "sources": [
          "asi-prisma-data",
          "asi-prisma"
        ]
      }
    ]
  },
  "hysis": {
    "reviewed": "2026-09-13",
    "purpose": {
      "text": "가시광·근적외·단파적외 영역에서 지표를 관측해 분광정보를 확보하는 ISRO 지구관측 사업입니다. 초분광 기술이 실제 위성 플랫폼과 지상 영상수신으로 이어진 활용 사례로 수록합니다.",
      "sources": [
        "isro-hysis",
        "isro-hysis-image"
      ]
    },
    "organization": {
      "text": "ISRO의 IMS-2 위성 버스를 바탕으로 구성한 임무이며, PSLV-C43의 주탑재 위성으로 발사됐습니다. 첫 관측영상은 NRSC Hyderabad에서 수신했다고 ISRO가 밝혀 지상 수신기관까지 확인됩니다.",
      "sources": [
        "isro-hysis",
        "isro-hysis-image"
      ]
    },
    "architecture": {
      "text": "약 380 kg 위성에 가시광·근적외·단파적외 지표관측 기능을 구성하고 2018년 11월 29일 발사했습니다. 공개된 첫 컬러 합성영상은 VNIR 밴드를 조합한 자료이며 SWIR 관측 결과와는 구분해야 합니다.",
      "sources": [
        "isro-hysis",
        "isro-hysis-image"
      ]
    },
    "verification": {
      "text": "2018년 12월 2일 인도 구자라트 Lakhpat 일대를 촬영한 첫 VNIR 영상을 공개해 초기 촬영·수신 사실을 확인할 수 있습니다. 이 한 장의 영상으로 전체 밴드의 신호대잡음비, 파장 정확도, 방사·기하 보정 완료를 판정할 수는 없습니다.",
      "sources": [
        "isro-hysis-image"
      ]
    },
    "considerations": [
      {
        "topic": "VNIR·SWIR 채널 검증",
        "detail": "가시적인 VNIR 합성영상과 별도로 SWIR의 유효 밴드, 잡음, 파장 보정 상태를 확인해야 합니다. 두 영역을 결합하는 분석에서는 같은 지표가 동일 위치에 대응하는지도 검토할 필요가 있습니다.",
        "sources": [
          "isro-hysis",
          "isro-hysis-image"
        ]
      },
      {
        "topic": "버스와 분광 탑재체의 적합성",
        "detail": "IMS-2 기반 본체의 자세 안정도·전력·열환경·저장 용량이 분광 관측시간을 얼마나 지원하는지 검토해야 합니다. 약 380 kg이라는 위성 질량만으로 초소형 플랫폼에도 같은 장비를 적용할 수 있다고 판단해서는 안 됩니다.",
        "sources": [
          "isro-hysis"
        ]
      },
      {
        "topic": "첫 영상 이후의 데이터 품질",
        "detail": "초기 영상 확보 뒤에도 장면별 구름·대기 조건과 보정 산출물 수준을 확인해야 합니다. 실제 활용 가능성은 컬러 합성영상의 선명도와 분광값의 반복 측정 일관성을 나누어 평가할 필요가 있습니다.",
        "sources": [
          "isro-hysis-image"
        ]
      }
    ]
  },
  "kompsat3a": {
    "reviewed": "2026-09-13",
    "purpose": {
      "text": "공공안전·재해·환경감시·자원관리를 위한 정밀 지구관측과 고성능 광학·적외선 위성 기술 확보를 함께 추진한 국내 사업입니다. 1,100 kg급 실용 관측위성이므로 이 지도에서는 소형 실증위성과 조건을 비교하는 기술 활용 사례로 다룹니다.",
      "sources": [
        "kari-kompsat3a"
      ]
    },
    "organization": {
      "text": "국내 주도로 개발하면서 위성 본체 개발기술의 민간 기업체 이전을 함께 추진했습니다. 한국항공우주연구원 공개 소개는 이 개발·이전 구조를 명시하지만, 기업별 제작 범위나 개별 공급계약은 제시하지 않습니다.",
      "sources": [
        "kari-kompsat3a"
      ]
    },
    "architecture": {
      "text": "2015년 발사된 태양동기궤도 위성에 AEISS-A 전자광학카메라와 별도의 적외선 센서를 탑재했습니다. 55 cm급 수치는 전자광학 관측의 공간해상도이며 적외선 해상도나 초분광 성능을 뜻하지 않습니다.",
      "sources": [
        "kari-kompsat3a"
      ]
    },
    "verification": {
      "text": "KARI 소개에서 발사·탑재 구성과 광학·적외선 관측 활용을 확인할 수 있습니다. 다만 이 임무 소개는 센서별 궤도 보정 오차와 열적 검출성능을 수치로 평가한 시험성적서가 아니므로, 탑재 사실과 개별 성능 검증을 구분합니다.",
      "sources": [
        "kari-kompsat3a"
      ]
    },
    "considerations": [
      {
        "topic": "광학·적외선 영상의 해석",
        "detail": "두 센서는 측정 대상과 해상도가 다르므로 공동 분석 전에 촬영시각·관측각·위치 정합을 확인해야 합니다. 광학 영상의 55 cm 수치를 적외선 영상의 식별 능력에 적용하지 않도록 평가 기준을 분리해야 합니다.",
        "sources": [
          "kari-kompsat3a"
        ]
      },
      {
        "topic": "정밀 지향과 열적 안정성",
        "detail": "고해상도 광학 관측은 자세 흔들림에, 적외선 관측은 검출기·광학계의 열환경에 각각 어떤 요구를 두는지 검토해야 합니다. 야간 관측 가능 여부와 구름을 포함한 기상 조건별 유효 관측 범위도 별도로 확인할 필요가 있습니다.",
        "sources": [
          "kari-kompsat3a"
        ]
      },
      {
        "topic": "소형 플랫폼으로의 이전",
        "detail": "1,100 kg급 위성의 적용 실적을 소형 위성 사업에 이용하려면 탑재체 질량·소비전력·방열 면적·자세제어 여유를 새로 산정해야 합니다. 위성 본체 기술이전 사실과 특정 센서의 소형화·공급 가능성도 구분할 필요가 있습니다.",
        "sources": [
          "kari-kompsat3a"
        ]
      }
    ]
  },
  "ikaros": {
    "reviewed": "2026-09-13",
    "purpose": {
      "text": "태양빛의 압력으로 추진하면서 돛에 붙인 박막 태양전지로 전기도 생산하는 태양광 돛 기술을 행성 간 비행에서 시험한 JAXA 사업입니다. 돛의 전개·발전 확인을 출발점으로 광압 가속과 궤도제어 기술을 확보하는 단계적 실증을 목표로 했습니다.",
      "sources": [
        "jaxa-ikaros",
        "jaxa-ikaros-deploy"
      ]
    },
    "organization": {
      "text": "JAXA가 실증기를 주관하고 돛 전개·발전 상태를 확인했습니다. 2010년 5월 금성 탐사기 AKATSUKI와 함께 H-IIA로 발사됐으며, 두 탐사기는 별도 임무입니다.",
      "sources": [
        "jaxa-ikaros",
        "jaxa-ikaros-deploy"
      ]
    },
    "architecture": {
      "text": "한 변 약 14 m, 두께 약 7.5 μm의 폴리이미드 막에 박막 태양전지와 자세제어 장치를 결합했습니다. 본체 회전의 원심력으로 지지 붐 없이 두 단계로 돛을 전개하는 구조이며, 후속 태양광 돛 구상의 이온엔진을 IKAROS의 탑재장비로 해석하지 않습니다.",
      "sources": [
        "jaxa-ikaros"
      ]
    },
    "verification": {
      "text": "JAXA는 2010년 6월 10일 지구에서 약 770만 km 떨어진 곳에서 돛 전개와 박막 태양전지 발전을 확인했다고 발표했습니다. 그 발표에서 발전 상태 측정, 광압 가속, 궤도제어 검증은 다음 활동으로 제시했으므로 전개 확인만으로 추진·항법 목표 전체 달성을 주장하지 않습니다.",
      "sources": [
        "jaxa-ikaros-deploy"
      ]
    },
    "considerations": [
      {
        "topic": "막 전개와 회전 동역학",
        "detail": "두 단계 전개 중 막의 비대칭 펼침·주름·장력 변화가 본체 회전과 자세에 주는 영향을 확인해야 합니다. 전개 성공 영상 외에도 막 형상과 회전 상태가 허용 범위에 들어오는지 판단할 계측이 필요합니다.",
        "sources": [
          "jaxa-ikaros"
        ]
      },
      {
        "topic": "추진 방향과 발전량의 관계",
        "detail": "돛의 태양 입사각을 바꾸는 궤도제어가 박막 태양전지의 발전량에도 영향을 주므로 두 요구를 함께 검토해야 합니다. 지구 저궤도의 반복적인 식 조건과 다른 행성 간 비행 환경도 반영할 필요가 있습니다.",
        "sources": [
          "jaxa-ikaros",
          "jaxa-ikaros-deploy"
        ]
      },
      {
        "topic": "미소 가속의 성능 판정",
        "detail": "광압 추진을 평가할 때는 단순한 돛 전개 여부와 추적자료에서 추정한 가속·궤도변화를 분리해야 합니다. 막의 광학 특성 변화와 자세 오차가 추진력 추정에 미치는 영향도 검토할 필요가 있습니다.",
        "sources": [
          "jaxa-ikaros-deploy",
          "jaxa-ikaros"
        ]
      }
    ]
  },
  "spirit": {
    "reviewed": "2026-09-13",
    "purpose": {
      "text": "감마선 폭발 같은 고에너지 천체의 일시적 현상을 관측하는 HERMES와 여러 기술 실험을 한 6U 위성에 통합한 호주·이탈리아 협력 임무입니다. 특히 소형 위성에서 능동 냉각으로 관측장비 잡음을 줄이고 전원 중단 때 탑재체를 안전하게 종료하는 기술을 다룹니다.",
      "sources": [
        "spirit-paper",
        "themis-paper"
      ]
    },
    "organization": {
      "text": "멜버른대학교가 ASI와 협력해 임무를 주도하고 ASI가 HERMES 관측장비를 제공했습니다. 대학 연구팀은 TheMIS의 제어전자장치·전개형 방열판·열전달 스트랩과 여러 탑재체를 연결하는 PMS 제어장치를 개발했습니다.",
      "sources": [
        "themis-paper",
        "spirit-paper"
      ]
    },
    "architecture": {
      "text": "2023년 12월 약 510 km 태양동기궤도에 발사된 6U 본체에서 상용 Stirling 냉각기, 흑연 시트 열전달 스트랩, 전개형 방열판이 HERMES의 열환경을 제어하도록 구성됐습니다. PMS는 탑재체 인터페이스를 관리하고 슈퍼커패시터 백업 전원으로 HERMES의 안전 종료를 지원합니다.",
      "sources": [
        "themis-paper",
        "spirit-paper"
      ]
    },
    "verification": {
      "text": "연구팀은 2024년 1월 냉각기의 궤도상 기능시험과 열전달부 온도 저하를 발표했고, 후속 논문에서 초기 운용을 환경시험 기반 열모델과 비교했습니다. 논문의 100 K 미만 냉각 가능성은 냉각기 원리상 능력으로 제시돼 있으며 해당 온도의 궤도 달성이나 장기 관측 성과를 뜻하지 않습니다.",
      "sources": [
        "spirit-commission",
        "themis-paper"
      ]
    },
    "considerations": [
      {
        "topic": "냉각기 전력과 방열의 균형",
        "detail": "냉각기로 옮긴 열과 구동 전력에서 발생한 열을 전개형 방열판이 함께 배출할 수 있는지 검토해야 합니다. 궤도 열환경과 전력 가용량에 따라 HERMES 잡음 감소 효과와 냉각 운용시간을 함께 평가할 필요가 있습니다.",
        "sources": [
          "themis-paper"
        ]
      },
      {
        "topic": "전개부·열전달 경로 검증",
        "detail": "방열판 전개 상태와 흑연 스트랩 접합부의 열저항 변화가 냉각 성능에 미치는 영향을 확인해야 합니다. 지상 열모델과 궤도상 온도 차이를 센서 위치·열접촉 조건·외부 열유입으로 나누어 검토할 필요가 있습니다.",
        "sources": [
          "themis-paper",
          "spirit-commission"
        ]
      },
      {
        "topic": "전원 차단과 안전 종료 순서",
        "detail": "HERMES가 필요한 종료 절차를 마칠 때까지 슈퍼커패시터의 전압·에너지가 충분한지 검증해야 합니다. 전원 복귀 시 PMS와 관측장비의 재시작 순서까지 포함하되, 이 UPS를 위성 전체의 장시간 백업 전원으로 간주하지 않습니다.",
        "sources": [
          "spirit-paper"
        ]
      }
    ]
  },
  "beihangkongshi1": {
    "reviewed": "2026-09-13",
    "purpose": {
      "text": "상용 연구 나노위성에 요오드 전기추진기를 실어 점화와 궤도변경을 시험한 사례입니다. 소형 위성의 궤도 유지·수명 연장·임무 종료 후 궤도 이탈에 활용할 수 있는 추진 기술을 확인하는 사업 맥락을 갖습니다.",
      "sources": [
        "esa-iodine"
      ]
    },
    "organization": {
      "text": "ThrustMe가 추진 기술을 개발하고 SpaceTy Beihangkongshi-1에 탑재했습니다. ESA는 ARTES 프로그램으로 기술개발을 지원했으며, 위성을 ESA 자체 임무로 분류하지 않습니다.",
      "sources": [
        "esa-iodine"
      ]
    },
    "architecture": {
      "text": "상온에서 고체인 요오드를 가열해 기체로 공급하는 전기추진 구성을 2020년 11월 발사 위성에 적용했습니다. 저장 밀도와 공급계 단순화가 설계상의 장점으로 소개되지만, 이 ESA 자료는 홀 방식이나 세부 전력·추력 수치를 확정하지 않습니다.",
      "sources": [
        "esa-iodine"
      ]
    },
    "verification": {
      "text": "ESA는 2021년 1월 시험 점화에 이어 실제 위성 궤도를 바꿨다고 발표했습니다. 임무 종료 후 재진입이나 우주잔해 저감은 기대 활용처로 제시됐으며, 이 위성의 폐기 기동까지 실증했다는 의미는 아닙니다.",
      "sources": [
        "esa-iodine"
      ]
    },
    "considerations": [
      {
        "topic": "추진제 공급과 가열 전력",
        "detail": "고체 요오드의 승화 공급량을 필요한 작동점에 맞추면서 예열 시간과 히터 전력을 어떻게 확보할지 검토해야 합니다. 반복 점화 시 공급이 안정적으로 회복되는지도 확인할 필요가 있습니다.",
        "sources": [
          "esa-iodine"
        ]
      },
      {
        "topic": "궤도변경의 측정과 반복성",
        "detail": "시험 점화 전후의 궤도 추정으로 실제 기동량을 판정하고, 반복 운용에서 전력·추진제 소비가 요구 성능과 맞는지 검토해야 합니다. 한 차례 궤도변경 기록만으로 전체 수명 동안의 성능을 보장할 수는 없습니다.",
        "sources": [
          "esa-iodine"
        ]
      },
      {
        "topic": "임무 종료 기동의 실행 조건",
        "detail": "잔여 추진제·전력·명령 수신 능력이 임무 말기까지 확보되는지 따로 검토해야 합니다. 궤도 유지 능력과 목표 재진입을 완료할 수 있는 기동 여유는 별도의 요구조건으로 평가할 필요가 있습니다.",
        "sources": [
          "esa-iodine"
        ]
      }
    ]
  }
};
 for(const source of extraSources){
  if(D.sources.some(existing=>existing.id===source.id))throw new Error('Duplicate program source: '+source.id);
  D.sources.push(source);
 }
 D.reviewed='2026-09-13';
 D.version='1.4.0';
 const entities=new Map(D.entities.map(entity=>[entity.id,entity]));
 for(const [id,program] of Object.entries(programs)){
  const entity=entities.get(id);
  if(!entity?.demonstration)throw new Error('Missing mission profile: '+id);
  entity.demonstration.program=program;
  const entries=[program.purpose,program.organization,program.architecture,program.verification,...program.considerations];
  entity.sources=[...new Set([...entity.sources,...entries.flatMap(entry=>entry.sources)])];
 }
 // This mission now includes its science programme as well as the thermal-use case.
 const biosentinel=entities.get('biosentinel');
 Object.assign(biosentinel,{
  summary:'심우주 방사선 측정을 위해 BioSensor와 LET 분광계를 탑재한 6U 위성의 열제어 적용 사례.',
  notes:'열제어 적용과 BioSensor 하드웨어 작동은 생물학 목표 달성과 구분합니다. NASA는 효모 성장을 관측하지 못했다고 설명하며, 수록 자료 이후의 현재 운용 상태는 추정하지 않습니다.',
  reviewed:'2026-09-13'
 });
 Object.assign(biosentinel.demonstration,{
  objective:'심우주 방사선의 생물학적 영향 측정과 6U 열제어 적용',
  result:'NASA는 BioSensor 하드웨어 작동 후 효모 성장은 관측하지 못했다고 설명합니다. 열소재 적용과 이후 LET 방사선 관측 기록은 별도로 확인됩니다.',
  source:'nasa-biosentinel-program',
  conditionSource:'thermal-soa'
 });
})();
