# Story 2.1: Dashboard Page with Empty State and List Overview

Status: ready-for-dev

## Story

As a user,
I want to see a dashboard with my shopping lists when I open the app,
So that I can quickly access my lists or know to create one if none exist.

**FR Traceability:** FR-01

## Acceptance Criteria

1. **Given** no lists exist in the store
2. **When** the user opens the app at the root route
3. **Then** the dashboard shows an empty state with a clear CTA message and a prominent "Create List" button
4. **And** the page has proper heading structure (`h1` for "Market List")
5. **And** the layout renders without horizontal scroll at 360px and 1440px viewport widths
6. **Given** one or more lists exist in the store
7. **When** the user opens the dashboard
8. **Then** each list is displayed as a row showing list name and an "Open" action
9. **And** a "Create List" (or `[+ New]`) button is visible
10. **And** lists are rendered using `components/features/market-list/MarketListDashboard.tsx` and `MarketListRow.tsx`

## Tasks / Subtasks

- [ ] Implement core behavior and UI flow for story 2.1 (AC: 1+)
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

- 2-1-dashboard-page-with-empty-state-and-list-overview.md

