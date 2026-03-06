# Story 1.1: Initialize Application Shell and Navigation Baseline

Status: review

## Story

As a user,
I want the app shell and primary routes to load correctly on mobile and desktop,
So that I can start using the product without layout or navigation issues.

**FR Traceability:** FR-07, NFR-03

## Acceptance Criteria

1. **Given** no project exists yet
2. **When** the application is initialized
3. **Then** `pnpm dev` starts without runtime or type errors
4. **And** root route (`/`) and list route scaffold (`/lists/[listId]`) are reachable
5. **And** loading, error, and not-found boundaries render predictable fallback content
6. **And** the main layout has no horizontal overflow at 360px and 1440px

## Tasks / Subtasks

- [x] Implement core behavior and UI flow for story 1.1 (AC: 1+)
- [x] Implement validation, edge-case handling, and error feedback (AC: relevant)
- [x] Add or update unit and integration tests aligned to acceptance criteria
- [x] Verify responsive and accessibility impact where applicable

## Dev Notes

- Epic context: Epic 1 - First Usable Planning Slice
- Follow Clean Architecture boundaries from architecture artifact:
  - Domain logic in lib/domain
  - Use-cases in lib/use-cases
  - Persistence and formatting adapters in lib/adapters
  - State via Zustand slices and selectors in stores
- Maintain BRL formatting via centralized formatter and preserve market_list_app_v1 storage contract.

### Project Structure Notes

- Keep route composition in app/*; avoid business logic in route files.
- Reuse feature modules in components/features/* and shared primitives in components/ui/*.
- Place story-specific tests near source or under tests/ according to existing project pattern.

### References

- [Source: _bmad-output/planning-artifacts/epics/epics.md]
- [Source: _bmad-output/planning-artifacts/prd/prd.md]
- [Source: _bmad-output/planning-artifacts/architecture/architecture.md]
- [Source: _bmad-output/planning-artifacts/ux-design-specification/ux-design-specification.md]

## Dev Agent Record

### Agent Model Used

GPT-5 Codex

### Debug Log References

- `pnpm lint` (pass)
- `pnpm test` (pass, 4 files / 6 tests)
- `pnpm build` (pass, `/` + `/lists/[listId]` generated)

### Completion Notes List

- Initialized Next.js App Router project in `market-list/` using TypeScript + Tailwind + ESLint.
- Implemented application shell home route (`/`) with baseline navigation and predictable scaffold content.
- Added dynamic list route scaffold at `/lists/[listId]`.
- Added global fallback boundaries: `loading.tsx`, `error.tsx`, `not-found.tsx`.
- Added responsive overflow guard in root shell (`overflow-x-hidden`) and verified shell class coverage.
- Added route and boundary tests with Vitest + Testing Library.

### File List

- market-list/src/app/layout.tsx
- market-list/src/app/page.tsx
- market-list/src/app/globals.css
- market-list/src/app/lists/[listId]/page.tsx
- market-list/src/app/loading.tsx
- market-list/src/app/error.tsx
- market-list/src/app/not-found.tsx
- market-list/src/app/page.test.tsx
- market-list/src/app/lists/[listId]/page.test.tsx
- market-list/src/app/boundaries.test.tsx
- market-list/src/app/layout.test.tsx
- market-list/package.json
- market-list/vitest.config.ts
- market-list/vitest.setup.ts
- _bmad-output/implementation-artifacts/1-1-initialize-application-shell-and-navigation-baseline.md
- _bmad-output/implementation-artifacts/sprint-status.yaml

## Change Log

- 2026-03-06: Implemented Story 1.1 app shell baseline, route scaffolding, fallback boundaries, responsive shell protections, and automated tests.

