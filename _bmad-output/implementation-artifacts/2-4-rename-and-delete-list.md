# Story 2.4: Rename and Delete List

Status: ready-for-dev

## Story

As a user,
I want to rename or delete an existing list,
So that I can keep my lists organized or remove ones I no longer need.

**FR Traceability:** FR-01

## Acceptance Criteria

1. **Given** the user is on the list detail page
2. **When** the user initiates a rename action on the list
3. **Then** the list name becomes editable
4. **And** the user can enter a new name (1-60 characters, non-empty)
5. **And** validation errors show for invalid names
6. **And** the rename is applied and the UI updates within 1 second
7. **Given** the user is on the list detail page
8. **When** the user clicks "Delete List"
9. **Then** a confirmation prompt appears warning that this action cannot be undone
10. **Given** the delete confirmation is shown
11. **When** the user confirms deletion
12. **Then** the list and all its items are removed from the store
13. **And** the user is redirected to the dashboard
14. **And** the deleted list no longer appears in the dashboard
15. **Given** the delete confirmation is shown
16. **When** the user cancels
17. **Then** the list remains unchanged

## Tasks / Subtasks

- [ ] Implement core behavior and UI flow for story 2.4 (AC: 1+)
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

- 2-4-rename-and-delete-list.md

