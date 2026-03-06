# Story 4.1: Implement Item Subtotal and List Total Calculation

Status: ready-for-dev

## Story

As a user,
I want item subtotals and list total to be calculated automatically,
So that I know exact costs without manual math.

**FR Traceability:** FR-03

## Acceptance Criteria

1. **Given** an item has quantity and unitPrice values
2. **When** the item is created or updated
3. **Then** `calculateItemSubtotal(quantity, unitPrice)` returns `quantity * unitPrice` as a number
4. **Given** a list has one or more items
5. **When** any item quantity or price changes
6. **Then** `calculateListTotal(items)` returns the sum of all item subtotals
7. **Given** a list has no items
8. **When** the list total is calculated
9. **Then** the total is 0
10. **And** all calculation functions are pure domain functions in `lib/domain/services/`
11. **And** calculation functions have unit tests covering: single item, multiple items, zero price, empty list, boundary values

## Tasks / Subtasks

- [ ] Implement core behavior and UI flow for story 4.1 (AC: 1+)
- [ ] Implement validation, edge-case handling, and error feedback (AC: relevant)
- [ ] Add or update unit and integration tests aligned to acceptance criteria
- [ ] Verify responsive and accessibility impact where applicable

## Dev Notes

- Epic context: Epic 4 - Cost Calculation & Currency Display
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

- 4-1-implement-item-subtotal-and-list-total-calculation.md

