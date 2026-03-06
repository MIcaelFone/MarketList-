# Story 7.1: Responsive Layouts for Dashboard and List Detail

Status: ready-for-dev

## Story

As a user,
I want the app to look great and be fully functional on my phone and computer,
So that I can manage my shopping lists on any device.

**FR Traceability:** FR-07

## Acceptance Criteria

1. **Given** the user opens the dashboard on a desktop (>= 1024px)
2. **When** the page renders
3. **Then** budget cards display in a horizontal 3-column row
4. **And** the list overview shows as a table with list name, total, and Open action
5. **And** no horizontal scroll occurs
6. **Given** the user opens the dashboard on mobile (360px-767px)
7. **When** the page renders
8. **Then** budget section uses compact stacked layout
9. **And** lists display as compact rows
10. **And** primary actions (Create List) remain visible and tappable
11. **And** no horizontal scroll occurs
12. **Given** the user opens list detail on desktop (>= 1024px)
13. **When** the page renders
14. **Then** items display in a table with the summary panel as a sidebar
15. **Given** the user opens list detail on mobile (360px-767px)
16. **When** the page renders
17. **Then** the summary appears above the items
18. **And** items display as stacked rows with Edit/Remove actions
19. **And** the "Add Item" button stays visible
20. **And** all modals and drawers (Create List, Add/Edit Item, Budget Edit) render properly on both mobile and desktop
21. **And** the layout is validated at viewport widths: 360px, 768px, 1024px, 1440px
22. **And** landscape orientation does not break layouts

## Tasks / Subtasks

- [ ] Implement core behavior and UI flow for story 7.1 (AC: 1+)
- [ ] Implement validation, edge-case handling, and error feedback (AC: relevant)
- [ ] Add or update unit and integration tests aligned to acceptance criteria
- [ ] Verify responsive and accessibility impact where applicable

## Dev Notes

- Epic context: Epic 7 - Responsive UI, Accessibility & Polish
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

- 7-1-responsive-layouts-for-dashboard-and-list-detail.md

