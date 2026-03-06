# Story 3.2: Display Items in List with Item Count

Status: ready-for-dev

## Story

As a user,
I want to see all items in my list with their details and a total item count,
So that I know what I have planned and how many items are in my list.

**FR Traceability:** FR-02

## Acceptance Criteria

1. **Given** a list has one or more items
2. **When** the user views the list detail page
3. **Then** each item is displayed showing: name, quantity, unit price, and subtotal (quantity Ã— unitPrice)
4. **And** each item row has "Edit" and "Remove" action buttons
5. **And** the summary panel shows the total item count (e.g., "Items: 8")
6. **Given** a list has no items
7. **When** the user views the list detail page
8. **Then** an empty state message is shown (e.g., "No items yet. Add your first item!")
9. **And** the item count shows "Items: 0"
10. **Given** items exist in the list
11. **When** viewing on desktop (>= 1024px)
12. **Then** items are displayed in a table format with columns: Name, Qty, Unit Price, Subtotal, Actions
13. **And** the summary panel appears as a sidebar
14. **Given** items exist in the list
15. **When** viewing on mobile (< 768px)
16. **Then** items are displayed in a stacked card/row format showing `name qty Ã— unitPrice = subtotal`
17. **And** the summary appears above the items list

## Tasks / Subtasks

- [ ] Implement core behavior and UI flow for story 3.2 (AC: 1+)
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

- 3-2-display-items-in-list-with-item-count.md

