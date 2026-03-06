# Story 5.3: Dashboard Budget Cards with Status Indicators

Status: ready-for-dev

## Story

As a user,
I want to see my budget, total spent, and remaining balance on the dashboard with clear within/over budget indicators,
So that I can quickly understand my financial position.

**FR Traceability:** FR-04, FR-05

## Acceptance Criteria

1. **Given** a budget is set and lists exist with items
2. **When** the user views the dashboard
3. **Then** three summary cards are displayed:
4. - **Budget Card:** shows budget amount in R$ and period (Monthly/Yearly) with "Edit Budget" action
5. - **Total Spent Card:** shows sum of all list totals in R$ with label "This cycle"
6. - **Remaining Balance Card:** shows (budget - total spent) in R$ with budget status
7. **Given** total spent is less than or equal to budget
8. **When** the dashboard renders
9. **Then** the Remaining Balance Card shows a green badge with label "Within budget"
10. **And** the remaining amount is displayed as a positive value
11. **Given** total spent exceeds the budget
12. **When** the dashboard renders
13. **Then** the Remaining Balance Card shows a red badge with label "Over budget"
14. **And** the over-budget amount is displayed clearly
15. **Given** the status is shown with color
16. **When** color is used for budget indicators
17. **Then** a text label always accompanies the color (color is never the sole indicator)
18. **And** badges use the `BudgetBadge` component from `components/ui/badge/`
19. **Given** budget cards are viewed on desktop (>= 1024px)
20. **When** the dashboard renders
21. **Then** the three cards display in a horizontal row
22. **Given** budget cards are viewed on mobile (< 768px)
23. **When** the dashboard renders
24. **Then** the cards stack vertically in a compact layout

## Tasks / Subtasks

- [ ] Implement core behavior and UI flow for story 5.3 (AC: 1+)
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

- 5-3-dashboard-budget-cards-with-status-indicators.md

