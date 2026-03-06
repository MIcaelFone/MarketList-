---
stepsCompleted:
  - 1
  - 2
  - 3
  - 4
  - 5
  - 6
  - 7
  - 8
workflowType: 'architecture'
lastStep: 8
status: 'complete'
completedAt: '2026-03-06T15:13:54-03:00'
project_name: 'project'
user_name: 'Micael Fone'
date: '2026-03-06T15:01:03-03:00'
---

# Architecture Decision Document

_This document builds collaboratively through step-by-step discovery. Sections are appended as we work through each architectural decision together._
## Project Context Analysis

### Requirements Overview

**Functional Requirements:**
The system centers on market list lifecycle management (create/rename/delete lists), item CRUD with validation constraints, deterministic subtotal/total calculations, budget configuration (monthly/yearly), budget status evaluation (within/over), persistent local state restore, and responsive operation across mobile/desktop. Architecturally, this requires clear separation between:
- Domain rules (validation, calculations, budget status)
- Application state orchestration (list + budget flows)
- UI interaction layer (forms, feedback, responsive layouts)

**Non-Functional Requirements:**
Key drivers are low-latency interactions (95p <= 200ms for core updates), high restore reliability (99% refresh recovery), WCAG 2.1 AA accessibility expectations, and strict BRL locale formatting consistency. These requirements imply:
- Lightweight in-memory state updates before persistence
- Deterministic and centrally tested calculation/formatting utilities
- UI component patterns that enforce accessibility by default
- Performance-aware rendering strategy for item list operations up to 200 items

**Scale & Complexity:**
The project is a bounded MVP but with quality-sensitive behavior (speed, reliability, accessibility) that raises architectural rigor above a basic CRUD app.

- Primary domain: responsive web application for grocery planning and budget control
- Complexity level: medium
- Estimated architectural components: 20-30 (domain services, store modules, UI composites, form modules, persistence adapters, utility modules)

### Technical Constraints & Dependencies

- Local persistence is required as a first-class capability (session restore in <= 2 seconds)
- No account system or backend integration in MVP scope
- Responsive support required from 360px to 1440px
- Monetary display must follow `pt-BR` + BRL conventions everywhere
- Stack direction from project artifacts: Next.js App Router + TypeScript + Tailwind CSS
- Core utility capabilities required:
  - item subtotal calculation
  - list total aggregation
  - budget status evaluation

### Cross-Cutting Concerns Identified

- Input and business-rule validation (list names, quantity, unit price, budget)
- Calculation correctness and consistency across screens
- Persistence synchronization and data integrity after mutations
- Localization and currency formatting consistency
- Accessibility compliance in controls, forms, and status indicators
- Responsive behavior and layout stability across breakpoints
- UI feedback consistency for within-budget vs over-budget states
## Starter Template Evaluation

### Primary Technology Domain

Web application (front-end heavy, local persistence-first) based on project requirements analysis.

### Starter Options Considered

- create-next-app (official Next.js starter): best alignment with App Router, TypeScript, Tailwind, and deployment-ready defaults.
- create-t3-app: strong full-stack option, but introduces unnecessary backend stack decisions for current MVP scope.
- create-vite: excellent for SPA speed, but diverges from App Router architecture and SSR/SEO-friendly conventions.

### Selected Starter: create-next-app

**Rationale for Selection:**
This project already specifies Next.js + TypeScript + Tailwind and requires responsive UX, SEO readiness, and clean file-based routing. `create-next-app` provides these conventions with minimal setup friction and current best-practice defaults.

**Initialization Command:**

```bash
pnpm create next-app@latest market-list --yes --ts --tailwind --eslint --app --src-dir --import-alias "@/*"
```

**Architectural Decisions Provided by Starter:**

**Language & Runtime:**
- TypeScript-first project setup
- React + Next.js App Router conventions

**Styling Solution:**
- Tailwind CSS preconfigured

**Build Tooling:**
- Next.js build pipeline with Turbopack-enabled development defaults

**Testing Framework:**
- No dedicated test runner by default (to be decided in architecture decisions step)

**Code Organization:**
- App Router file-system routing
- `src`-based structure with clean aliasing (`@/*`)

**Development Experience:**
- Fast local dev server
- Strong linting baseline
- Production-ready build/start scripts

**Note:** Project initialization using this command should be the first implementation story.
## Core Architectural Decisions

### Decision Priority Analysis

**Critical Decisions (Block Implementation):**
- Use Clean Architecture boundaries inside a Next.js App Router project.
- Define store strategy for deterministic UI updates + persistence.
- Define domain validation and calculation ownership.
- Define folder contract for consistent AI implementation.

**Important Decisions (Shape Architecture):**
- Versioned local persistence with migration hooks.
- Accessibility and formatting enforcement in shared UI/domain utilities.
- Deployment and environment strategy.

**Deferred Decisions (Post-MVP):**
- Authentication and authorization (out of MVP scope).
- External API integration and cloud sync.
- Multi-user collaboration/conflict resolution.

### Data Architecture

- Persistence model: local-first using browser `localStorage` with versioned key (`market_list_app_v1`) and migration map by version.
- Domain entities:
  - `MarketList` (id, name, createdAt, items[])
  - `MarketItem` (id, name, quantity, unitPrice, category?)
  - `Budget` (amount, period)
- Validation strategy: schema validation at boundaries using Zod v4.
- Calculation ownership: pure domain functions only (no UI calculations):
  - `calculateItemSubtotal`
  - `calculateListTotal`
  - `calculateBudgetStatus`
- Caching strategy: in-memory store as source of truth; `localStorage` as durability layer.
- Hydration/write strategy: hydrate store on app load, debounce writes after mutations, apply migration function when storage version changes.

### Authentication & Security

- Authentication: not implemented in MVP.
- Authorization: not applicable for single-user local mode.
- Security baseline:
  - strict input validation and normalization
  - safe number parsing and currency guards
  - no unsafe HTML rendering
  - secure headers managed by platform defaults + app-level hardening when needed

### API & Communication Patterns

- MVP communication pattern: no external API required.
- Internal architecture contract:
  - UI -> use-cases/services -> domain utilities -> persistence adapter
- Future-ready API decision (deferred): REST endpoints under `app/api/*` if cloud sync is introduced.
- Error handling standard:
  - typed domain errors in `lib/errors`
  - UI-safe messages mapped in presentation layer

### Frontend Architecture

- State management: Zustand v5 (modular stores + selectors).
- Routing: Next.js App Router (`app/*`) with route-level composition.
- Component architecture:
  - `components/ui` for reusable primitives
  - `components/features` for market-list and budget feature composites
- Performance strategy:
  - selector-driven rendering
  - memoized derived values for totals/status
  - avoid persistence writes on every keystroke (debounced persistence)

#### Clean Architecture Folder Contract (requested structure)

- `app/`
  - route entry points, layouts, pages, route handlers
  - no business rules inside route files
- `components/`
  - `ui/`: shared presentational primitives
  - `features/`: feature composites (list, item, budget)
- `lib/`
  - `domain/`: entities, value objects, pure business rules
  - `use-cases/`: orchestration of user actions
  - `adapters/`: persistence, formatting, IO boundaries
  - `schemas/`: zod schemas
  - `errors/`: typed error contracts
- `hook/`
  - custom hooks for feature interactions, selectors, side-effects
- `stores/`
  - Zustand store slices, selectors, actions, hydration/persistence wiring
- `styles/`
  - global styles, design tokens, Tailwind layering and theme variables
- `public/`
  - static assets only (icons, manifest, images)

### Infrastructure & Deployment

- Hosting strategy: Vercel-first deployment for Next.js compatibility.
- Environment strategy:
  - minimal env surface for MVP
  - typed env access wrapper in `lib/adapters/env`
- Monitoring/logging:
  - client error capture + console fallback in MVP
  - production telemetry hooks added before scale-up
- CI baseline:
  - lint + typecheck + tests as required status checks

### Decision Impact Analysis

**Implementation Sequence:**
1. Bootstrap with create-next-app baseline
2. Create folder contract and boundary lint rules
3. Implement domain models + schema validation
4. Implement Zustand stores and localStorage adapter
5. Build feature components and hooks
6. Add accessibility/performance checks
7. Finalize deployment pipeline

**Cross-Component Dependencies:**
- `components/features` depends on `hook` and store selectors.
- `hook` depends on `stores` and `lib/use-cases`.
- `stores` depend on `lib/domain`, `lib/schemas`, `lib/adapters`.
- `app` depends on feature components only, not directly on domain internals.
## Implementation Patterns & Consistency Rules

### Pattern Categories Defined

**Critical Conflict Points Identified:**
5 areas where AI agents could make different choices (naming, structure, formats, communication/state, process behavior).

### Naming Patterns

**Database Naming Conventions:**
- No DB tables in MVP (localStorage only).
- Storage key: `market_list_app_v{n}`.
- Persisted JSON fields: `camelCase` (`createdAt`, `unitPrice`, `budgetPeriod`).
- IDs: `list_{id}` and `item_{id}` string format.

**API Naming Conventions:**
- For future APIs: plural REST resources (`/lists`, `/items`, `/budget`).
- Route segment names: kebab-case.
- Query params: camelCase.

**Code Naming Conventions:**
- React components: PascalCase (`BudgetCard.tsx`).
- Hooks: `useX` pattern in camelCase (`useBudgetStatus.ts`).
- Utility/domain functions: camelCase (`calculateListTotal`).
- Files (non-component): kebab-case (`budget-status.ts`).
- Store files: `{feature}.store.ts` (`market-list.store.ts`).

### Structure Patterns

**Project Organization:**
- `app/`: route composition only (no business calculations).
- `components/ui`: reusable presentational primitives only.
- `components/features`: feature-level composites and view wiring.
- `lib/domain`: pure business logic and entities.
- `lib/use-cases`: orchestration and application actions.
- `lib/adapters`: IO boundaries (localStorage, formatter, env).
- `lib/schemas`: Zod schemas and parsing contracts.
- `hook/`: hooks that bind UI to use-cases/stores.
- `stores/`: Zustand slices, selectors, hydration/persistence logic.
- `styles/`: global + tokens + Tailwind composition.

**File Structure Patterns:**
- Tests co-located with source: `*.test.ts` / `*.test.tsx`.
- Feature folders mirror domain terms: `market-list`, `budget`, `item`.
- Avoid cross-feature imports except via `lib/*` shared contracts.

### Format Patterns

**API Response Formats (future-ready):**
- Success: `{ data, meta? }`
- Error: `{ error: { code, message, details? } }`
- Dates: ISO-8601 strings.
- Money in persistence/domain: number (BRL decimal), formatting only at UI boundary.

**Data Exchange Formats:**
- JSON keys: camelCase always.
- Boolean: `true/false` only.
- Null handling: explicit `null` allowed only when schema declares nullable.
- Single entity retrieval returns object, collections return arrays.

### Communication Patterns

**Event System Patterns:**
- Internal app events (if used): `feature.action` naming (`list.created`, `item.removed`).
- Event payload shape: `{ type, timestamp, payload }`.
- Version optional for future sync: `{ version: 1 }`.

**State Management Patterns:**
- Zustand updates via actions only (no direct component mutation).
- Selectors exported per feature for stable subscriptions.
- Derived values (totals/status) computed in selectors or pure domain helpers.
- Hydration lifecycle:
  1. initialize default state
  2. read localStorage
  3. validate with schema
  4. migrate if needed
  5. commit to store

### Process Patterns

**Error Handling Patterns:**
- Domain errors are typed (`ValidationError`, `PersistenceError`).
- UI maps domain errors to user-safe messages.
- No raw exception text shown to users.
- Logging format: `[scope] code - message`.

**Loading State Patterns:**
- Async actions expose `isLoading` + `error` per feature slice.
- Do not use one global loading flag for unrelated features.
- Persisted hydration has dedicated `isHydrating` state.
- Disable submit buttons while action-specific loading is true.

### Enforcement Guidelines

**All AI Agents MUST:**
- Keep business rules in `lib/domain` and never inside `app/*` pages.
- Validate persisted input with Zod before store commit.
- Use shared selectors/actions from `stores/*` instead of ad-hoc state logic.

**Pattern Enforcement:**
- PR checklist includes boundary checks and naming compliance.
- Lint + typecheck + tests run in CI for all PRs.
- Violations documented as ADR notes in architecture artifacts.

### Pattern Examples

**Good Examples:**
- `lib/domain/budget/calculate-budget-status.ts`
- `stores/market-list.store.ts`
- `hook/use-market-list.ts`
- `components/features/market-list/market-list-table.tsx`

**Anti-Patterns:**
- `app/page.tsx` containing subtotal calculation logic.
- `components/ui` importing `localStorage` directly.
- Persisting unvalidated JSON directly into store state.
## Project Structure & Boundaries

### Complete Project Directory Structure
```text
market-list/
+-- README.md
+-- package.json
+-- pnpm-lock.yaml
+-- next.config.ts
+-- tsconfig.json
+-- eslint.config.mjs
+-- postcss.config.mjs
+-- .env.example
+-- .gitignore
+-- .github/
¦   +-- workflows/
¦       +-- ci.yml
¦       +-- lint-typecheck-test.yml
+-- public/
¦   +-- icons/
¦   ¦   +-- icon-192.png
¦   ¦   +-- icon-512.png
¦   +-- images/
¦   ¦   +-- empty-state-list.svg
¦   +-- manifest.webmanifest
+-- styles/
¦   +-- globals.css
¦   +-- tokens.css
¦   +-- utilities.css
+-- app/
¦   +-- layout.tsx
¦   +-- page.tsx
¦   +-- lists/
¦   ¦   +-- page.tsx
¦   ¦   +-- [listId]/
¦   ¦       +-- page.tsx
¦   +-- budget/
¦   ¦   +-- page.tsx
¦   +-- error.tsx
¦   +-- loading.tsx
¦   +-- not-found.tsx
+-- components/
¦   +-- ui/
¦   ¦   +-- button/
¦   ¦   ¦   +-- Button.tsx
¦   ¦   ¦   +-- Button.test.tsx
¦   ¦   +-- input/
¦   ¦   ¦   +-- Input.tsx
¦   ¦   ¦   +-- Input.test.tsx
¦   ¦   +-- modal/
¦   ¦   ¦   +-- Modal.tsx
¦   ¦   ¦   +-- Modal.test.tsx
¦   ¦   +-- badge/
¦   ¦   ¦   +-- BudgetBadge.tsx
¦   ¦   ¦   +-- BudgetBadge.test.tsx
¦   ¦   +-- card/
¦   ¦       +-- Card.tsx
¦   ¦       +-- Card.test.tsx
¦   +-- features/
¦       +-- market-list/
¦       ¦   +-- MarketListDashboard.tsx
¦       ¦   +-- MarketListRow.tsx
¦       ¦   +-- MarketListTable.tsx
¦       ¦   +-- MarketListDashboard.test.tsx
¦       +-- item/
¦       ¦   +-- ItemForm.tsx
¦       ¦   +-- ItemRow.tsx
¦       ¦   +-- ItemList.tsx
¦       ¦   +-- ItemForm.test.tsx
¦       +-- budget/
¦           +-- BudgetCard.tsx
¦           +-- BudgetForm.tsx
¦           +-- BudgetSummary.tsx
¦           +-- BudgetForm.test.tsx
+-- hook/
¦   +-- useMarketLists.ts
¦   +-- useMarketItems.ts
¦   +-- useBudget.ts
¦   +-- useHydrationStatus.ts
¦   +-- useCurrencyFormatter.ts
+-- lib/
¦   +-- domain/
¦   ¦   +-- entities/
¦   ¦   ¦   +-- market-list.ts
¦   ¦   ¦   +-- market-item.ts
¦   ¦   ¦   +-- budget.ts
¦   ¦   +-- value-objects/
¦   ¦   ¦   +-- money.ts
¦   ¦   ¦   +-- quantity.ts
¦   ¦   +-- services/
¦   ¦   ¦   +-- calculate-item-subtotal.ts
¦   ¦   ¦   +-- calculate-list-total.ts
¦   ¦   ¦   +-- calculate-budget-status.ts
¦   ¦   +-- validation/
¦   ¦       +-- list-name-rules.ts
¦   ¦       +-- item-rules.ts
¦   +-- use-cases/
¦   ¦   +-- lists/
¦   ¦   ¦   +-- create-list.ts
¦   ¦   ¦   +-- rename-list.ts
¦   ¦   ¦   +-- delete-list.ts
¦   ¦   +-- items/
¦   ¦   ¦   +-- add-item.ts
¦   ¦   ¦   +-- update-item.ts
¦   ¦   ¦   +-- remove-item.ts
¦   ¦   +-- budget/
¦   ¦       +-- save-budget.ts
¦   +-- adapters/
¦   ¦   +-- storage/
¦   ¦   ¦   +-- local-storage-adapter.ts
¦   ¦   ¦   +-- storage-keys.ts
¦   ¦   ¦   +-- migrations.ts
¦   ¦   +-- formatters/
¦   ¦   ¦   +-- brl-currency.ts
¦   ¦   +-- env/
¦   ¦       +-- client-env.ts
¦   +-- schemas/
¦   ¦   +-- budget.schema.ts
¦   ¦   +-- item.schema.ts
¦   ¦   +-- list.schema.ts
¦   ¦   +-- app-state.schema.ts
¦   +-- errors/
¦   ¦   +-- domain-error.ts
¦   ¦   +-- validation-error.ts
¦   ¦   +-- persistence-error.ts
¦   +-- utils/
¦       +-- id.ts
¦       +-- date.ts
¦       +-- number.ts
+-- stores/
¦   +-- market-list.store.ts
¦   +-- budget.store.ts
¦   +-- app-ui.store.ts
¦   +-- selectors/
¦   ¦   +-- list.selectors.ts
¦   ¦   +-- budget.selectors.ts
¦   ¦   +-- dashboard.selectors.ts
¦   +-- hydration/
¦       +-- hydrate-state.ts
¦       +-- persist-state.ts
+-- tests/
    +-- integration/
    ¦   +-- list-flow.integration.test.ts
    ¦   +-- budget-flow.integration.test.ts
    +-- e2e/
        +-- market-list.spec.ts
```

### Architectural Boundaries

**API Boundaries:**
- MVP has no external API requirement.
- Future API extension point: `app/api/*`, consuming `lib/use-cases/*`, never `components/*`.

**Component Boundaries:**
- `components/ui` cannot import `stores` or `localStorage`.
- `components/features` can use `hook/*` only.
- `app/*` composes feature components and route metadata only.

**Service Boundaries:**
- `lib/use-cases` orchestrates mutations and depends on `lib/domain`, `lib/schemas`, `lib/adapters`.
- `lib/domain` remains pure and dependency-free from framework/runtime APIs.
- `stores/*` call use-cases and adapters; no business formulas in stores.

**Data Boundaries:**
- `localStorage` access isolated to `lib/adapters/storage/*`.
- Persisted payload validated through `lib/schemas/*` before hydration.
- Versioned migrations run before store state commit.

### Requirements to Structure Mapping

**Feature/FR Mapping:**
- FR-01 List Management -> `lib/use-cases/lists/*`, `components/features/market-list/*`, `stores/market-list.store.ts`
- FR-02 Item Management -> `lib/use-cases/items/*`, `components/features/item/*`, `stores/market-list.store.ts`
- FR-03 Cost Calculation -> `lib/domain/services/calculate-*.ts`, `stores/selectors/dashboard.selectors.ts`
- FR-04 Budget Management -> `lib/use-cases/budget/save-budget.ts`, `components/features/budget/*`, `stores/budget.store.ts`
- FR-05 Budget Validation -> `lib/domain/services/calculate-budget-status.ts`, `components/ui/badge/BudgetBadge.tsx`
- FR-06 Persistence -> `lib/adapters/storage/*`, `stores/hydration/*`
- FR-07 Responsive UI -> `styles/*`, responsive feature components in `components/features/*`

**Cross-Cutting Concerns:**
- Accessibility (WCAG 2.1 AA) -> `components/ui/*`, `styles/tokens.css`, UI tests
- BRL formatting -> `lib/adapters/formatters/brl-currency.ts`, hooks/components consumption
- Error handling -> `lib/errors/*`, feature-level message mapping in `hook/*`

### Integration Points

**Internal Communication:**
- UI interaction: `components/features -> hook -> stores -> use-cases -> domain/adapters`
- Read path: `stores/selectors -> hook -> components/features -> app routes`

**External Integrations:**
- Browser local persistence only (`localStorage`).
- No remote service dependency in MVP.

**Data Flow:**
1. User action in feature component
2. Hook dispatches store action
3. Store invokes use-case
4. Use-case validates + applies domain rules
5. Adapter persists to `localStorage`
6. Selectors expose updated derived values
7. UI re-renders with budget/list status

### File Organization Patterns

**Configuration Files:**
- Root-level framework/tool config only.
- No feature-level config files unless feature-specific and justified.

**Source Organization:**
- Business logic in `lib/domain` and `lib/use-cases`.
- Presentation logic in `components/features`.
- Shared primitives in `components/ui`.

**Test Organization:**
- Unit tests co-located (`*.test.ts[x]`).
- Integration/E2E centralized in `tests/`.

**Asset Organization:**
- Static assets in `public/`.
- Styling system centralized in `styles/`.

### Development Workflow Integration

**Development Server Structure:**
- App Router routes from `app/`.
- Feature modules load from `components/features` with store-driven state.

**Build Process Structure:**
- Next.js build compiles `app/` entrypoints.
- Type-safe boundaries enforced across `lib`, `stores`, and components.

**Deployment Structure:**
- Vercel-compatible layout with static assets in `public/`.
- Environment access centralized in `lib/adapters/env/client-env.ts`.
## Architecture Validation Results

### Coherence Validation

**Decision Compatibility:**
All selected technologies and decisions are compatible for MVP scope. Local-first persistence with `localStorage` aligns with no-auth/no-backend constraints and supports fast iteration.

**Pattern Consistency:**
Naming, structure, format, communication, and process patterns are consistent with the chosen stack and Clean Architecture boundaries.

**Structure Alignment:**
The project tree supports separation of concerns:
- `app` for route composition
- `components` for presentation
- `lib` for domain/use-cases/adapters
- `stores` + `hook` for state orchestration
- `styles` and `public` for UI assets/system

### Requirements Coverage Validation

**Feature Coverage:**
All PRD capabilities (list/item CRUD, totals, budget, status feedback, persistence, responsive behavior) are mapped to specific modules.

**Functional Requirements Coverage:**
- FR-01..FR-07 have architectural ownership and implementation locations.
- Cross-cutting requirements (validation, formatting, hydration) have dedicated shared modules.

**Non-Functional Requirements Coverage:**
- Performance: selector-driven state + pure calculation utilities + debounced persistence
- Reliability: schema validation + migration before hydration commit
- Accessibility: UI layer constraints and component standards
- Localization: centralized BRL formatter and display boundary

### Implementation Readiness Validation

**Decision Completeness:**
Critical decisions are documented, including localStorage persistence model and migration strategy.

**Structure Completeness:**
Directory tree is concrete and non-generic, with file-level guidance for core modules.

**Pattern Completeness:**
Conflict-prone areas are addressed with explicit enforceable rules and examples.

### Gap Analysis Results

**Critical Gaps:** None

**Important Gaps:**
- Exact testing stack choice (Vitest/Jest + Playwright/Cypress) should be finalized in implementation planning.
- Optional telemetry/error reporting provider can be selected before production.

**Nice-to-Have Gaps:**
- ADR index for future architecture changes
- Optional lint import-boundary automation rules

### Validation Issues Addressed

- Confirmed persistence explicitly as `localStorage`.
- Reinforced boundary rule: no business logic in `app/*` and no direct storage access from UI components.
- Ensured FR-to-structure traceability is explicit.

### Architecture Completeness Checklist

**Requirements Analysis**
- [x] Project context analyzed
- [x] Scale/complexity assessed
- [x] Technical constraints identified
- [x] Cross-cutting concerns mapped

**Architectural Decisions**
- [x] Critical decisions documented
- [x] Technology stack specified
- [x] Integration patterns defined
- [x] Performance/reliability considerations addressed

**Implementation Patterns**
- [x] Naming conventions established
- [x] Structure patterns defined
- [x] Communication/state patterns specified
- [x] Error/loading process patterns documented

**Project Structure**
- [x] Complete directory structure defined
- [x] Component/service/data boundaries established
- [x] Integration points mapped
- [x] Requirements-to-structure mapping complete

### Architecture Readiness Assessment

**Overall Status:** READY FOR IMPLEMENTATION

**Confidence Level:** High

**Key Strengths:**
- Clear Clean Architecture boundaries
- Strong consistency rules for multi-agent implementation
- Explicit local persistence strategy with schema/migration safety
- FR/NFR traceability to concrete modules

**Areas for Future Enhancement:**
- Backend sync extension under `app/api/*`
- Authentication layer if multi-user scope is added
- Observability hardening for production scale

### Implementation Handoff

**AI Agent Guidelines:**
- Follow folder boundaries and naming conventions exactly.
- Keep business rules in `lib/domain` and orchestration in `lib/use-cases`.
- Validate persisted data before store commits.
- Use shared selectors/actions from `stores/*`.

**First Implementation Priority:**
Initialize project baseline and apply the agreed structure:
`pnpm create next-app@latest market-list --yes --ts --tailwind --eslint --app --src-dir --import-alias "@/*"`