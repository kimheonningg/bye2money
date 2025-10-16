# bye2money

전기정보공학부 김희원 웹가계부 프로젝트

## How to run this project

```bash
# move to the project directory
cd vite-bye2money

# install dependencies if needed
npm install

# run this project
npm run dev
```

This project will open at `http://localhost:5173`

## Project Structure

- `src`
  - `assets`
  - `components`
    - `Button`
    - `CategoryTag`
    - `CheckBox`
    - `Modal`
    - `TextInput`
  - `constants`
  - `hooks`
  - `pages`
  - `styles`
  - `ui`
  - `utils`

* `components` directory contains reusable common components, and `ui` directory contains larger, feature-specific ui components for the main page.

## Color system

Defined at [`colors.css`](/vite-bye2money/src/styles/colors.css)

## Icons

Using Material UI

## Code Convention

- Handler: name starts with `handle`
- Each component directory (total 5) consists of:
  - `<component name>.tsx` : TSX component (Component defined in this file is imported from other files)
  - `<component name>.module.css` : CSS file
    - CSS file variable naming convention:
      - Common:
        - `--c-fg`, `--c-bg`, `--c-danger`, `--ring`
        - `.root`
        - `.input`
        - `.label`
        - `.icon`
        - `.iconOnlyBox`
        - `.iconTextRow`
      - `type_*`
      - `pattern_*`
      - `size_*`
      - `state_*`
      - `typing_*` : if user is currently typing something

## Notes

- 공통 변수는 `App.tsx`에서 관리

## Component Testing

5 common components' UI & features are tested using `ComponentTestPage.tsx`. This page can be accessed by: `http://localhost:5173/component-test`

## Checklist (개발 순서)

- 기본 컴포넌트 5가지 먼저 개발 (테스트는 `App.tsx`에 import하여 확인)- 큰 틀만 V
- Figma 확인하여 컴포넌트들의 세부 디자인 디테일 구현 V
- Color system 정의하기 V, 적용하도록 코드 수정
- 메인 페이지 컴포넌트 생성
  - Header V
