# Render 배포 안내

이 패키지는 인공위성 첨단기술 지도의 실행 소스와 Render 설정을 포함합니다. Render에서 실제 배포하려면 본인의 GitHub와 Render 계정으로 저장소를 연결해야 합니다.

## 1. GitHub에 소스 올리기

1. 받은 ZIP 파일의 압축을 풉니다.
2. GitHub에서 `satellite-tech-atlas`라는 새 저장소를 만듭니다. 저장소 이름은 바꿔도 됩니다.
3. 압축을 푼 폴더 **안의 파일과 하위 폴더**를 저장소 최상위에 올리고 커밋합니다. ZIP 자체를 올리지 마세요. 웹에서 업로드한다면 폴더 구조를 유지하세요.
4. 저장소 첫 화면에 `render.yaml`, `README.md`, `DEPLOY_RENDER.md`, `dist/`, `scripts/`가 보이는지 확인합니다. `dist/index.html`과 `scripts/validate.mjs`가 있어야 합니다.

GitHub 저장소는 비공개로 만들어도 됩니다. Render 연결 시 해당 저장소의 읽기 권한을 허용하세요. 소스 저장소의 공개 여부와 배포된 웹사이트의 접근 권한은 별개입니다.

## 2. Render에 연결하기

아래 두 방법 중 하나만 사용합니다.

### 방법 A: Static Site로 만들기

1. [Render 대시보드](https://dashboard.render.com)에 로그인합니다.
2. **New → Static Site**를 선택합니다.
3. GitHub 계정을 연결하고 위에서 만든 저장소를 선택합니다.
4. 다음 값을 입력한 뒤 **Create Static Site**를 누릅니다.

| 설정 항목 | 값 |
| --- | --- |
| Name | `satellite-tech-atlas` 또는 원하는 이름 |
| Branch | 소스를 업로드한 브랜치, 보통 `main` |
| Root Directory | 비워 두기 |
| Build Command | `node scripts/validate.mjs` |
| Publish Directory | `dist` |
| Environment Variables | 추가하지 않음 |

별도 Start Command가 필요하지 않습니다. 이 앱은 HTML·CSS·JavaScript 정적 파일로 동작합니다. 메뉴 전환은 `#` 뒤의 주소를 사용하므로 별도 SPA rewrite 규칙도 필요하지 않습니다.

공식 절차: [Render Static Sites](https://render.com/docs/static-sites).

### 방법 B: 포함된 설정 파일로 만들기

1. Render 대시보드에서 **New → Blueprint**를 선택합니다.
2. 위 GitHub 저장소를 연결하고 소스를 올린 브랜치를 선택합니다.
3. Blueprint Path는 `render.yaml`을 사용합니다.
4. 생성될 정적 사이트와 설정을 확인한 뒤 **Deploy Blueprint**를 누릅니다.

`render.yaml`에는 정적 사이트 하나만 정의되어 있습니다. 별도 서버나 데이터베이스를 생성하지 않습니다. 파일의 `type: web`과 `runtime: static`은 Render에서 정적 사이트를 선언하는 조합입니다.

공식 절차: [Render Blueprints](https://render.com/docs/infrastructure-as-code), [Blueprint 설정 명세](https://render.com/docs/blueprint-spec).

## 3. 배포 완료 확인

Render의 배포 로그에서 검증 결과 `"status": "passed"`와 배포 성공을 확인한 뒤, 대시보드에 표시된 `onrender.com` 주소를 엽니다. 주소는 Render가 실제로 부여한 값을 사용하세요.

첫 화면에서 기술 지도가 보이는지 확인하고, 검색·임무 비교·관심 목록 저장·CSV 다운로드를 한 번씩 사용해 보세요. 이 패키지는 로컬 데이터·연결 무결성·JavaScript 구문·정적 파일 검증을 수행했으며, 사용자 Render 계정에서의 실제 배포는 수행하지 않았습니다.

Render는 기본적으로 연결된 브랜치에 변경 사항을 푸시하면 자동으로 배포합니다. 이후 `dist/data.js` 등 필요한 파일을 수정하고 GitHub에 커밋하면 됩니다. [Render 자동 업데이트 설명](https://render.com/docs/static-sites).

## 운영 특성

- 이 구성으로 배포하면 웹사이트는 공개 주소에서 열립니다. 기존 ChatGPT 사이트의 로그인·접근 권한은 적용되지 않습니다. GitHub 저장소를 비공개로 두어도 배포된 앱에는 별도 로그인 기능이 생기지 않습니다.
- 관심 목록은 브라우저의 해당 사이트 주소에 저장됩니다. 기존 사이트에서 저장한 관심 목록은 새 Render 주소로 자동 이전되지 않습니다.
- 데이터는 공개자료를 정리한 스냅샷입니다. 실시간 수집이나 자동 데이터 갱신 기능은 없습니다.
- 서버 프로세스, API 키, 데이터베이스 설정은 필요하지 않습니다.

## 문제 해결

| 증상 | 확인할 사항 |
| --- | --- |
| `Cannot find module .../scripts/validate.mjs` | 저장소 최상위에 `scripts/`가 있는지, Root Directory를 비웠는지 확인합니다. |
| `ENOENT ... dist/data.js` | `dist/` 폴더와 파일을 모두 업로드했는지 확인합니다. |
| 배포 후 404 또는 빈 화면 | Publish Directory가 `dist`이고 그 안에 `index.html`, `styles.css`, `data.js`, `app.js`, `webmcp.js`가 있는지 확인합니다. |
| Start Command 입력이나 포트 연결 오류 | Render 서비스 유형을 확인합니다. 이 패키지는 Static Site용입니다. |
| 검증의 `AssertionError` | 로그의 항목을 확인합니다. 데이터 수정 중 출처 ID, 관계 연결, 날짜 또는 필수 항목이 누락되었는지 확인하세요. |

설정 안내는 2026-09-11에 Render 공식 문서를 확인해 작성했습니다.
