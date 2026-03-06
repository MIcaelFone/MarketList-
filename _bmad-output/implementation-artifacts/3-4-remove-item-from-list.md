# Story 3.4: Remove Item from List

Status: ready-for-dev

## Story

As a user,
I want to remove an item from my shopping list,
So that I can take off items I no longer need.

**FR Traceability:** FR-02

## Acceptance Criteria

1. **Given** the user is on the list detail page with items
2. **When** the user clicks "Remove" on an item row
3. **Then** a brief confirmation is requested (e.g., inline confirm or a small prompt)
4. **Given** the removal confirmation is shown
5. **When** the user confirms removal
6. **Then** the item is removed from the list
7. **And** the item count updates immediately
8. **And** if no items remain, the empty state is shown
9. **Given** the removal confirmation is shown
10. **When** the user cancels
11. **Then** the item remains in the list unchanged

## Tasks / Subtasks

- [ ] Implement core behavior and UI flow for story 3.4 (AC: 1+)
- [ ] Implement validation, edge-case handling, and error feedback (AC: relevant)
- [ ] Add or update unit and integration tests aligned to acceptance criteria
- [ ] Verify responsive and accessibility impact where applicable

## Dev Notes

- Epic context: Epic 3 - Item Management
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

- 3-4-remove-item-from-list.md

