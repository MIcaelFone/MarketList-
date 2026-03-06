# Story 2.3: Navigate to List Detail Page

Status: ready-for-dev

## Story

As a user,
I want to open a specific list to see its items and details,
So that I can manage items within that list.

**FR Traceability:** FR-01

## Acceptance Criteria

1. **Given** one or more lists exist on the dashboard
2. **When** the user clicks "Open" on a list row
3. **Then** the app navigates to `/lists/{listId}` route
4. **And** the list detail page renders showing the list name in the header
5. **And** a "Back to Dashboard" navigation link is visible
6. **And** the page shows an empty items state if the list has no items yet
7. **And** an "Add Item" button is visible
8. **Given** the user navigates to `/lists/{listId}` for a non-existent list
9. **When** the page loads
10. **Then** the not-found page is displayed

## Tasks / Subtasks

- [ ] Implement core behavior and UI flow for story 2.3 (AC: 1+)
- [ ] Implement validation, edge-case handling, and error feedback (AC: relevant)
- [ ] Add or update unit and integration tests aligned to acceptance criteria
- [ ] Verify responsive and accessibility impact where applicable

## Dev Notes

- Epic context: Epic 2 - Market List Management
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

- 2-3-navigate-to-list-detail-page.md

