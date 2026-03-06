# Story 5.2: Budget Status Calculation

Status: ready-for-dev

## Story

As a user,
I want the system to automatically determine if I'm within or over budget,
So that I can make informed shopping decisions.

**FR Traceability:** FR-05

## Acceptance Criteria

1. **Given** a budget is configured with an amount
2. **When** `calculateBudgetStatus(total, budgetAmount)` is called
3. **Then** it returns `"within"` when total <= budgetAmount
4. **And** it returns `"over"` when total > budgetAmount
5. **Given** the budget amount or any list total changes
6. **When** the budget status is recalculated
7. **Then** the status updates within 200ms
8. **Given** no budget is configured
9. **When** the status is evaluated
10. **Then** no budget status is shown (neutral state)
11. **And** `calculateBudgetStatus` is a pure domain function in `lib/domain/services/calculate-budget-status.ts`
12. **And** unit tests cover: total below budget, total equal to budget, total above budget, zero total, edge cases

## Tasks / Subtasks

- [ ] Implement core behavior and UI flow for story 5.2 (AC: 1+)
- [ ] Implement validation, edge-case handling, and error feedback (AC: relevant)
- [ ] Add or update unit and integration tests aligned to acceptance criteria
- [ ] Verify responsive and accessibility impact where applicable

## Dev Notes

- Epic context: Epic 5 - Budget Management & Validation
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

- 5-2-budget-status-calculation.md

