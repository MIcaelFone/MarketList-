# Story 6.2: Hydrate State from localStorage on Page Load

Status: ready-for-dev

## Story

As a user,
I want my previously saved data restored when I open the app,
So that I can continue where I left off.

**FR Traceability:** FR-06, NFR-02

## Acceptance Criteria

1. **Given** saved data exists in localStorage under key `market_list_app_v1`
2. **When** the app loads
3. **Then** the stored data is read, validated against Zod schemas, and committed to the Zustand stores
4. **And** the dashboard displays the restored lists and budget within 2 seconds
5. **And** `stores/app-ui.store.ts` sets `isHydrating: true` during load and `false` after completion
6. **Given** saved data exists but fails schema validation
7. **When** the app loads
8. **Then** the invalid data is discarded
9. **And** the app starts with default empty state
10. **And** the user is not shown a blocking error (graceful degradation)
11. **Given** no saved data exists in localStorage
12. **When** the app loads
13. **Then** the app starts with empty default state (no lists, no budget)
14. **And** hydration completes successfully within 2 seconds
15. **Given** the app is hydrating
16. **When** the user views the page during hydration
17. **Then** a loading state is shown (not a flash of empty then populated content)

## Tasks / Subtasks

- [ ] Implement core behavior and UI flow for story 6.2 (AC: 1+)
- [ ] Implement validation, edge-case handling, and error feedback (AC: relevant)
- [ ] Add or update unit and integration tests aligned to acceptance criteria
- [ ] Verify responsive and accessibility impact where applicable

## Dev Notes

- Epic context: Epic 6 - Data Persistence & Recovery
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

- N/A

### Completion Notes List

- Story context file generated from updated epic decomposition.
- Ready for dev-story execution.

### File List

- 6-2-hydrate-state-from-localstorage-on-page-load.md

