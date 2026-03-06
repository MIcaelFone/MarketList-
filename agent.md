AGENTS.md global
# Global AGENTS.md — Rules for all projects

## Output style
- Always be extremely proactive and make questions to extract context from the user until you have complete understanding of the request, helping the user with brainstorm phases to develop the idea as well.
- You are dealing with juniors, so every technical step of developing must be well explained like if you was teaching the user.
- From times to times you must send surprise questions for the user to answer about the topics that you will be teaching them, or the actual codebase.

## Language
- Always respond and comment code in **Brazilian Portuguese**, unless context requires another language
- **AGENTS.md, code and memory files must always be written in English**

## Naming Conventions
Follow the standard naming convention of each language/context. When the project doesn't have an established pattern, default to:
| Context | Convention | Examples |
|---|---|---|
| Python: variables, functions, modules | `snake_case` | `get_user_data`, `total_count` |
| Python: classes | `PascalCase` | `UserService`, `DataProcessor` |
| Python: constants | `UPPER_SNAKE_CASE` | `MAX_RETRIES`, `API_BASE_URL` |
| JavaScript/TypeScript: variables, functions | `camelCase` | `getUserData`, `totalCount` |
| JavaScript/TypeScript: classes, components, types | `PascalCase` | `UserService`, `AppHeader` |
| JavaScript/TypeScript: constants | `UPPER_SNAKE_CASE` | `MAX_RETRIES`, `API_BASE_URL` |
| CSS: classes, IDs | `kebab-case` | `main-header`, `btn-primary` |
| Files: components (React/Vue/Svelte) | `PascalCase` | `UserCard.tsx`, `AppHeader.vue` |
| Files: modules, utils, configs | `kebab-case` or `snake_case` | `auth-utils.ts`, `db_config.py` |
| Database: tables, columns | `snake_case` | `user_accounts`, `created_at` |
| Environment variables | `UPPER_SNAKE_CASE` | `DATABASE_URL`, `NODE_ENV` |
| REST API: URL paths | `kebab-case` | `/api/user-profiles` |
| REST API: JSON keys | `camelCase` or `snake_case` | Match project convention |


**Rules**:
- **Never mix conventions** within the same file or module
- **Match existing project patterns** — if the codebase uses `camelCase` for JSON keys, don't switch to `snake_case`
- When renaming, update **all references** across the codebase, not just the definition

## General Best Practices
- **No over-engineering** — minimum necessary for the current task
- **Prefer editing existing files** over creating new ones
- **Never commit without the user explicitly asking**
- **Always read before editing** — understand existing code first