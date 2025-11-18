# Frontend Project Agents

## 목표

요구사항 문서에서 시작하여 최종 e2e 테스트 실행까지 자동화된 워크플로우를 구성합니다.

## 프로세스 흐름

```
요구사항.md
    ↓
[Agent 1: 요구사항 분석기] → 요구사항 파싱
    ↓
[Agent 2: Playwright 검증기] → 기능 검증 + 명령어 수집
    ↓
[Agent 3: 테스트 스펙 생성기] → e2e 테스트 스펙 작성
    ↓
[Agent 4: 테스트 실행기] → 테스트 실행 및 결과 보고
```

---

## Agent 1: 요구사항 분석기

### 목적

`요구사항.md` 문서를 분석하여 검증 가능한 요구사항으로 변환합니다.

### 입력

- 파일: `요구사항.md`

### 프로세스

1. 문서 파일 읽기
2. 요구사항을 구조화된 형식으로 파싱

- 기능명
- 시나리오 (Given-When-Then)
- 예상 결과
- 우선순위

### 출력

```json
{
  "requirements": [
    {
      "id": "REQ-001",
      "feature": "사용자 로그인",
      "scenarios": [
        {
          "title": "정상 로그인",
          "given": "로그인 페이지에 접속",
          "when": "유효한 이메일과 비밀번호 입력",
          "then": "대시보드 페이지로 리다이렉트"
        }
      ],
      "priority": "high"
    }
  ]
}
```

---

## Agent 2: Playwright 검증기

### 목적

Agent 1에서 생성한 요구사항을 Playwright MCP를 사용하여 자동으로 검증합니다.

### 입력

- 파일: `requirements.json`
- MCP 도구: `playwright-mcp`

### 프로세스

1. 각 요구사항별로 검증 스크립트 생성
2. Playwright 테스트 환경 실행
3. 시나리오에 따라 브라우저 조작
4. **실행된 Playwright 명령어 기록**
5. 검증 결과 저장

### 실행 흐름 예시

```
REQ-001 검증:
  → browser.goto('http://localhost:3000/login')
  → page.fill('[name="email"]', 'test@example.com')
  → page.fill('[name="password"]', 'password123')
  → page.click('button[type="submit"]')
  → page.waitForNavigation()
  → expect(page.url()).toContain('/dashboard')
```

### 출력

```json
{
  "requirement_id": "REQ-001",
  "status": "passed",
  "executed_commands": [
    {
      "step": 1,
      "action": "goto",
      "selector": "http://localhost:3000/login"
    },
    {
      "step": 2,
      "action": "fill",
      "selector": "[name=\"email\"]",
      "value": "test@example.com"
    },
    {
      "step": 3,
      "action": "click",
      "selector": "button[type=\"submit\"]"
    },
    {
      "step": 4,
      "action": "waitForNavigation"
    },
    {
      "step": 5,
      "action": "assertion",
      "assertion": "page.url().includes('/dashboard')"
    }
  ],
  "duration_ms": 2541
}
```

---

## Agent 3: 테스트 스펙 생성기

### 목적

Agent 2의 실행 기록을 바탕으로 재사용 가능한 e2e 테스트 스펙을 생성합니다.

### 입력

- 파일: `validation-results.json`
- 설정: 테스트 프레임워크 선택 (Playwright Test, Jest, Vitest 등)

### 프로세스

1. 각 요구사항의 실행 명령어를 분석
2. 테스트 케이스로 변환
3. 테스트 코드 템플릿 생성
4. POM(Page Object Model) 또는 유틸리티 함수 자동 생성
5. 테스트 파일 작성

### 출력

```typescript
// tests/e2e/login.spec.ts
import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";

test.describe("로그인 기능", () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test("REQ-001: 정상 로그인", async ({ page }) => {
    // Agent 2에서 수집한 명령어 기반
    await loginPage.fillEmail("test@example.com");
    await loginPage.fillPassword("password123");
    await loginPage.clickSubmit();

    await expect(page).toHaveURL(/.*dashboard/);
  });
});
```

---

## Agent 4: 테스트 실행기

### 목적

Agent 3에서 생성한 e2e 테스트를 실행하고 결과를 보고합니다.

### 입력

- 디렉토리: `tests/e2e/`
- 설정: 테스트 환경, 브라우저, 병렬 실행 여부

### 프로세스

1. 애플리케이션 빌드 (필요시)
2. 개발 서버 시작 (필요시)
3. 테스트 실행
4. 결과 수집 및 분석
5. 리포트 생성

### 출력

```json
{
  "summary": {
    "total": 10,
    "passed": 9,
    "failed": 1,
    "skipped": 0,
    "duration": 45230
  },
  "details": [
    {
      "test": "REQ-001: 정상 로그인",
      "status": "passed",
      "duration_ms": 2541
    },
    {
      "test": "REQ-002: 잘못된 비밀번호",
      "status": "failed",
      "error": "Expected error message not found",
      "duration_ms": 1823
    }
  ],
  "html_report": "test-results/report.html"
}
```

---

## 전체 파이프라인 실행

파이프라인은 다음 순서로 자동 실행됩니다:

1. **요구사항 분석** (Agent 1)

- 입력: `요구사항.md`
- 출력: `requirements.json`

2. **검증 및 명령어 수집** (Agent 2)

- 입력: `requirements.json`
- 출력: `validation-results.json`

3. **테스트 스펙 생성** (Agent 3)

- 입력: `validation-results.json`
- 출력: `tests/e2e/` 테스트 파일들

4. **테스트 실행** (Agent 4)

- 입력: `tests/e2e/`
- 출력: `test-results/` 리포트

---

## 구성 파일

### 프로젝트 설정

```yaml
# agents.config.yaml
project:
  name: "Frontend Project"
  root: "./"

requirements:
  path: "요구사항.md"
  format: "markdown"

agents:
  analyzer:
    enabled: true
    output: "requirements.json"

  validator:
    enabled: true
    headless: false
    timeout: 30000
    output: "validation-results.json"
    mcp:
      provider: "playwright"
      version: "1.40+"

  test_generator:
    enabled: true
    framework: "playwright"
    pattern: "pom" # pom, hooks, utils
    output_dir: "tests/e2e"

  test_runner:
    enabled: true
    workers: 4
    timeout: 60000
    report:
      formats: ["html", "json", "junit"]
      output_dir: "test-results"

ci_cd:
  on_pr: true
  on_commit: false
  fail_fast: true
```

---

## 파일 구조

```
project-root/
├── 요구사항.md                          # 입력: 요구사항 문서
├── agents.config.yaml                   # 에이전트 설정
├── AGENTS.md                            # 이 파일
├── requirements.json                    # Agent 1 출력
├── validation-results.json              # Agent 2 출력
├── tests/
│   └── e2e/
│       ├── login.spec.ts                # Agent 3 출력 (테스트)
│       ├── pages/
│       │   └── LoginPage.ts             # Agent 3 출력 (POM)
│       └── playwright.config.ts
└── test-results/                        # Agent 4 출력
    ├── report.html
    ├── results.json
    └── junit-results.xml
```

---

## 에러 처리 및 재시도

### 검증 실패 시

- 실패한 요구사항 확인 (`validation-results.json`)
- 실패 원인 분석
- 요구사항 또는 테스트 환경 수정
- Agent 2부터 재실행

### 테스트 실패 시

- 실패한 테스트 상세 로그 확인
- 애플리케이션 코드 또는 테스트 스펙 수정
- Agent 4 재실행

---

## 주요 기능

| 기능             | Agent | 설명                                     |
| ---------------- | ----- | ---------------------------------------- |
| 요구사항 파싱    | 1     | 자연어 요구사항을 구조화된 형식으로 변환 |
| 자동 검증        | 2     | Playwright MCP로 기능 자동 검증          |
| 명령어 기록      | 2     | 검증 과정의 모든 명령어 자동 저장        |
| 테스트 코드 생성 | 3     | 기록된 명령어로 테스트 스펙 자동 생성    |
| POM 생성         | 3     | Page Object Model 자동 생성              |
| 테스트 실행      | 4     | 생성된 테스트 자동 실행                  |
| 리포팅           | 4     | 다양한 형식의 테스트 리포트 생성         |
| CI/CD 통합       | All   | GitHub Actions, GitLab CI 등 자동 통합   |

---

## 체크리스트

- [ ] `요구사항.md` 파일 작성
- [ ] `agents.config.yaml` 설정
- [ ] MCP Playwright 설정
- [ ] 테스트 프레임워크 설치 (Playwright Test 등)
- [ ] Agent 1-4 스크립트 구현
- [ ] 파이프라인 테스트 실행
- [ ] CI/CD 통합 설정
- [ ] 문서화 및 팀 공유

---

## 참고

- [Playwright Test Documentation](https://playwright.dev/docs/intro)
- [Page Object Model Pattern](https://playwright.dev/docs/pom)
