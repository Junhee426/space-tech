# 주장별 근거 연결 작업 목록

데이터 판본: 1.4.0 · 검토 기준일: 2026-09-13

44개 항목은 **출처가 없는 것이 아니라**, 기존 출처(`entity.sources`)는 이미 연결되어 있지만 `evidence` 배열의 주장별 근거(구체적 주장·원문 내 위치·확인 한계)가 아직 그 출처와 연결되지 않았습니다. 즉 연결 작업(linkage)이 남은 것이지 원문 부재가 아닙니다.

편집 방법: 각 항목의 기존 출처 원문을 열어 실제 주장을 확인하고, `dist/evidence-data.js`(또는 해당 데이터 파일)에 `evidence` 항목을 추가해 주장·위치·한계·검토일을 기록하세요. 연결을 마치면 아래 체크박스를 표시하고, 줄 끝에 `— 메모: ...` 형식으로 진행 메모를 남길 수 있습니다.

이 파일은 `node scripts/generate-linkage-queue.mjs`로 재생성됩니다. 재생성해도 체크 상태와 메모는 항목 ID 기준으로 보존됩니다. 근거가 채워진 항목은 자동으로 아래 "해결됨" 목록으로 옮겨집니다.

## 진행 목록

- [ ] `amd` — AMD / Xilinx (organization, 우주반도체·탑재 AI) — 기존 출처: KP Labs — Intuition-1 · Mission and Leopard DPU (intuition); NASA — Small Spacecraft Avionics · 2026 (avionics)
- [ ] `biosentinel` — BioSentinel (mission, 열제어·열소재) — 기존 출처: NASA — 7.0 Thermal Control · 2026 (thermal-soa); NASA Ames — BioSentinel science mission, payloads and biological experiment outcome (nasa-biosentinel-program)
- [ ] `blue-canyon` — Blue Canyon Technologies (organization, 자율운용·분산 시스템) — 기존 출처: NASA — What is Starling? (starling); NASA — Small Spacecraft Communications · 2026 (comms)
- [ ] `ceiia` — CEiiA (organization, 우주반도체·탑재 AI) — 기존 출처: ESA — Introducing Φsat-2 (phi2team)
- [ ] `cesium` — CesiumAstro (organization, 자율운용·분산 시스템) — 기존 출처: NASA — What is Starling? (starling)
- [ ] `cgi` — CGI (organization, 우주반도체·탑재 AI) — 기존 출처: ESA — Introducing Φsat-2 (phi2team)
- [ ] `click-terminal` — CLICK-A 광 단말 (product, 위성 광통신) — 기존 출처: NASA — Small Spacecraft Communications · 2026 (comms)
- [ ] `clicka` — CLICK-A (mission, 위성 광통신) — 기존 출처: NASA — Small Spacecraft Communications · 2026 (comms); NASA — CubeSat Laser Infrared CrosslinK (CLICK) · Mission architecture (nasa-click-project)
- [ ] `cosine` — cosine (organization, 우주반도체·탑재 AI) — 기존 출처: ESA — Φsat · Mission overview (phi1); ESA — Artificial Intelligence for Earth observation (phi1ai)
- [ ] `cpod` — CPOD (mission, 근접운용·도킹) — 기존 출처: NASA — CubeSat Proximity Operations Demonstration (cpod-source); NASA — CubeSat Proximity Operations Demonstration · Project and outcome (nasa-cpod-project)
- [ ] `cyclone` — Cyclone V SoC (product, 우주반도체·탑재 AI) — 기존 출처: ESA — OPS-SAT · Mission and payload (opssat)
- [ ] `dsa` — DSA (product, 자율운용·분산 시스템) — 기존 출처: NASA — What is Starling? (starling); NASA — Starling Completes Primary Mission (starlingresult)
- [ ] `emergent` — Emergent Space Technologies (organization, 자율운용·분산 시스템) — 기존 출처: NASA — What is Starling? (starling)
- [ ] `esa` — ESA (organization, 우주반도체·탑재 AI) — 기존 출처: ESA — Introducing Φsat-2 (phi2team); ESA — OPS-SAT · Mission and payload (opssat); ESA — Proba-3 · Mission overview (proba)
- [ ] `fep-tape` — 은 코팅 FEP 열제어 테이프 (product, 열제어·열소재) — 기존 출처: NASA — 7.0 Thermal Control · 2026 (thermal-soa)
- [ ] `flight-sw` — 재구성형 비행 소프트웨어 (technology, 우주반도체·탑재 AI) — 기존 출처: ESA — OPS-SAT · Mission and payload (opssat); NASA — Small Spacecraft Avionics · 2026 (avionics)
- [ ] `flls` — FLLS 정밀 계측센서 (product, 자율운용·분산 시스템) — 기존 출처: ESA — Proba-3 Technologies (probatech)
- [ ] `geok` — GEO-K (organization, 우주반도체·탑재 AI) — 기존 출처: ESA — Introducing Φsat-2 (phi2team)
- [ ] `intel` — Intel (organization, 우주반도체·탑재 AI) — 기존 출처: NASA — Small Spacecraft Avionics · 2026 (avionics)
- [ ] `intuition1` — Intuition-1 (mission, 우주반도체·탑재 AI) — 기존 출처: KP Labs — Intuition-1 · Mission and Leopard DPU (intuition)
- [ ] `ix10` — iX10-100A (product, 우주반도체·탑재 AI) — 기존 출처: NASA — Small Spacecraft Avionics · 2026 (avionics)
- [ ] `jpl` — NASA JPL (organization, 위성 광통신) — 기존 출처: NASA — Small Spacecraft Communications · 2026 (comms)
- [ ] `kplabs` — KP Labs (organization, 우주반도체·탑재 AI) — 기존 출처: KP Labs — Intuition-1 · Mission and Leopard DPU (intuition); ESA — Introducing Φsat-2 (phi2team)
- [ ] `l3harris` — L3Harris (organization, 자율운용·분산 시스템) — 기존 출처: NASA — What is Starling? (starling)
- [ ] `leopard` — Leopard DPU (product, 우주반도체·탑재 AI) — 기존 출처: KP Labs — Intuition-1 · Mission and Leopard DPU (intuition)
- [ ] `manet` — MANET 무선 네트워크 (product, 자율운용·분산 시스템) — 기존 출처: NASA — What is Starling? (starling); NASA — Starling Completes Primary Mission (starlingresult)
- [ ] `microchip` — Microchip (organization, 우주반도체·탑재 AI) — 기존 출처: NASA — Small Spacecraft Avionics · 2026 (avionics)
- [ ] `mit` — MIT (organization, 위성 광통신) — 기존 출처: NASA — Small Spacecraft Communications · 2026 (comms)
- [ ] `nasa-ames` — NASA Ames (organization, 자율운용·분산 시스템) — 기존 출처: NASA — What is Starling? (starling)
- [ ] `open-cosmos` — Open Cosmos (organization, 우주반도체·탑재 AI) — 기존 출처: ESA — Introducing Φsat-2 (phi2team)
- [ ] `opssat-mission` — OPS-SAT (mission, 우주반도체·탑재 AI) — 기존 출처: ESA — OPS-SAT · Mission and payload (opssat)
- [ ] `optical-modem` — 고속 광모뎀 (technology, 위성 광통신) — 기존 출처: NASA — Small Spacecraft Communications · 2026 (comms)
- [ ] `phisat1` — Φsat-1 / FSSCat (mission, 우주반도체·탑재 AI) — 기존 출처: ESA — Φsat · Mission overview (phi1); ESA — Artificial Intelligence for Earth observation (phi1ai)
- [ ] `phisat2` — Φsat-2 (mission, 우주반도체·탑재 AI) — 기존 출처: ESA — Φsat-2 · Mission overview (phi2); ESA — Introducing Φsat-2 (phi2team); ESA — Φsat-2 begins science phase for AI Earth images (phi2science)
- [ ] `pisa` — University of Pisa (organization, 우주반도체·탑재 AI) — 기존 출처: ESA — Artificial Intelligence for Earth observation (phi1ai)
- [ ] `planning` — 자율 임무·기동계획 (technology, 자율운용·분산 시스템) — 기존 출처: NASA — What is Starling? (starling); ESA — Proba-3 Technologies (probatech)
- [ ] `proba3` — Proba-3 (mission, 자율운용·분산 시스템) — 기존 출처: ESA — Proba-3 · Mission overview (proba); ESA — Proba-3 Technologies (probatech); ESA — Proba-3 ready for more science (probarecovery)
- [ ] `romeo` — ROMEO (product, 자율운용·분산 시스템) — 기존 출처: NASA — What is Starling? (starling)
- [ ] `simera` — SIMERA (organization, 우주반도체·탑재 AI) — 기존 출처: ESA — Introducing Φsat-2 (phi2team)
- [ ] `space-battery` — 우주용 배터리 (technology, 전력·에너지 저장) — 기존 출처: NASA — 3.0 Power · 2026 (power-soa)
- [ ] `tugraz` — TU Graz (organization, 우주반도체·탑재 AI) — 기존 출처: ESA — OPS-SAT · Mission and payload (opssat)
- [ ] `ubotica` — Ubotica (organization, 우주반도체·탑재 AI) — 기존 출처: ESA — Introducing Φsat-2 (phi2team)
- [ ] `unibap` — Unibap (organization, 우주반도체·탑재 AI) — 기존 출처: NASA — Small Spacecraft Avionics · 2026 (avionics)
- [ ] `upc` — UPC (organization, 우주반도체·탑재 AI) — 기존 출처: ESA — Artificial Intelligence for Earth observation (phi1ai)
