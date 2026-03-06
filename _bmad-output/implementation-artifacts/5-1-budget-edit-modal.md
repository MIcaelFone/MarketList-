# Story 5.1: Budget Edit Modal

Status: ready-for-dev

## Story

As a user,
I want to set or update my budget amount and period,
So that I can define how much I plan to spend.

**FR Traceability:** FR-04

## Acceptance Criteria

1. **Given** the user is on the dashboard
2. **When** the user clicks "Edit Budget" on the Budget Card
3. **Then** a modal appears with:
4. - Amount (R$) input field (required, must be > 0)
5. - Period radio buttons: "Monthly" and "Yearly"
6. - Preview section showing: current total list cost, remaining amount, and status
7. - "Cancel" and "Save Budget" buttons
8. **Given** the budget modal is open
9. **When** the user enters a valid amount (> 0) and selects a period and clicks "Save Budget"
10. **Then** the budget is saved to the store
11. **And** the modal closes
12. **And** the dashboard Budget Card, Remaining Card, and status update immediately
13. **Given** the budget modal is open
14. **When** the user enters an invalid amount (<= 0 or empty)
15. **Then** an inline validation error is shown
16. **And** the budget is NOT saved
17. **Given** the budget modal is open
18. **When** the user clicks "Cancel" or close (X)
19. **Then** the modal closes without saving changes
20. **Given** no budget has been set yet
21. **When** the user views the dashboard
22. **Then** the Budget Card shows a prompt to set a budget (e.g., "Set your budget")

## Tasks / Subtasks

- [ ] Implement core behavior and UI flow for story 5.1 (AC: 1+)
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

- 5-1-budget-edit-modal.md

