# Story 4.3: Real-Time Recalculation on Item Changes

Status: ready-for-dev

## Story

As a user,
I want totals to update instantly when I add, edit, or remove an item,
So that I always see accurate costs without delay.

**FR Traceability:** FR-03, NFR-01

## Acceptance Criteria

1. **Given** a list has items and the user adds a new item
2. **When** the item is saved
3. **Then** the list total and item count update within 200ms
4. **Given** a list has items and the user edits an item's quantity or price
5. **When** the change is saved
6. **Then** that item's subtotal recalculates and the list total updates within 200ms
7. **Given** a list has items and the user removes an item
8. **When** the removal is confirmed
9. **Then** the list total recalculates and item count decreases within 200ms
10. **Given** a list has up to 200 items
11. **When** any item changes
12. **Then** 95th percentile recalculation time remains under 200ms
13. **And** recalculation is driven by Zustand selectors with memoized derived values
14. **And** dashboard total spent reflects the sum across all lists

## Tasks / Subtasks

- [ ] Implement core behavior and UI flow for story 4.3 (AC: 1+)
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

- 4-3-real-time-recalculation-on-item-changes.md

