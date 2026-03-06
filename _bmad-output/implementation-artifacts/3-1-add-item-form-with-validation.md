# Story 3.1: Add Item Form with Validation

Status: ready-for-dev

## Story

As a user,
I want to add an item to my shopping list with name, quantity, price, and optional category,
So that I can track what I need to buy and how much it costs.

**FR Traceability:** FR-02

## Acceptance Criteria

1. **Given** the user is on a list detail page
2. **When** the user clicks "Add Item"
3. **Then** a drawer/form appears with fields: Name (required), Quantity (required), Unit Price in R$ (required), Category (optional)
4. **And** a "Cancel" button and "Save Item" button are visible
5. **Given** the add item form is open
6. **When** the user enters valid data (name 1-80 chars, quantity > 0, unitPrice >= 0 with up to 2 decimal places)
7. **And** clicks "Save Item"
8. **Then** a new item is created with a unique `item_{id}` identifier
9. **And** the item appears in the list
10. **And** the form closes
11. **Given** the add item form is open
12. **When** the user submits with an empty name, quantity <= 0, or unitPrice < 0
13. **Then** inline validation errors appear for each invalid field
14. **And** the item is NOT created
15. **Given** the add item form is open
16. **When** the user clicks "Cancel" or the close (X) button
17. **Then** the form closes without adding an item

## Tasks / Subtasks

- [ ] Implement core behavior and UI flow for story 3.1 (AC: 1+)
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

- 3-1-add-item-form-with-validation.md

