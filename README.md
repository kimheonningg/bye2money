# bye2money

전기정보공학부 김희원 웹가계부 프로젝트

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
  - `utils`

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
      - `typing-*` : if user is currently typing something
  -

## Checklist (개발 순서)

- 컴포넌트 5가지 먼저 개발 (테스트는 `App.tsx`에 import하여 확인)
