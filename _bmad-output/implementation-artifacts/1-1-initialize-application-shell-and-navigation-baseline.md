# Story 1.1: Initialize Application Shell and Navigation Baseline

Status: ready-for-dev

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

- [ ] Implement core behavior and UI flow for story 1.1 (AC: 1+)
- [ ] Implement validation, edge-case handling, and error feedback (AC: relevant)
- [ ] Add or update unit and integration tests aligned to acceptance criteria
- [ ] Verify responsive and accessibility impact where applicable

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

- N/A

### Completion Notes List

- Story context file generated from updated epic decomposition.
- Ready for dev-story execution.

### File List

- 1-1-initialize-application-shell-and-navigation-baseline.md

