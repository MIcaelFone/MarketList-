# Story 3.3: Edit Existing Item

Status: ready-for-dev

## Story

As a user,
I want to edit an item's name, quantity, price, or category,
So that I can update my list as my shopping needs change.

**FR Traceability:** FR-02

## Acceptance Criteria

1. **Given** the user is on the list detail page with items
2. **When** the user clicks "Edit" on an item row
3. **Then** the item form/drawer opens pre-populated with the item's current values
4. **Given** the edit item form is open
5. **When** the user modifies any field with valid data and clicks "Save Item"
6. **Then** the item is updated in the store
7. **And** the updated values are immediately reflected in the list
8. **And** the form closes
9. **Given** the edit item form is open
10. **When** the user enters invalid data (empty name, quantity <= 0, unitPrice < 0)
11. **Then** inline validation errors are shown
12. **And** the item is NOT updated
13. **Given** the edit item form is open
14. **When** the user clicks "Cancel"
15. **Then** the form closes and the item retains its original values

## Tasks / Subtasks

- [ ] Implement core behavior and UI flow for story 3.3 (AC: 1+)
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

- 3-3-edit-existing-item.md

