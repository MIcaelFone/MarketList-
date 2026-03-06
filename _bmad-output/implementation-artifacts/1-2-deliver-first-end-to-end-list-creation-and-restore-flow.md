# Story 1.2: Deliver First End-to-End List Creation and Restore Flow

Status: ready-for-dev

## Story

As a user,
I want to create my first list and still see it after refresh,
So that I trust the app to preserve my planning progress.

**FR Traceability:** FR-01, FR-06, NFR-02

## Acceptance Criteria

1. **Given** the user opens the dashboard with no existing data
2. **When** the user creates a valid list name
3. **Then** the list appears immediately in the dashboard
4. **And** the saved list remains visible after a browser refresh
5. **And** persistence uses key `market_list_app_v1`
6. **And** invalid list names (empty or > 60 chars) are rejected with inline feedback

## Tasks / Subtasks

- [ ] Implement core behavior and UI flow for story 1.2 (AC: 1+)
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

- 1-2-deliver-first-end-to-end-list-creation-and-restore-flow.md

