# Story 7.2: WCAG 2.1 AA Accessibility Compliance

Status: ready-for-dev

## Story

As a user,
I want the app to be accessible via keyboard and screen readers,
So that I can use it regardless of my abilities.

**FR Traceability:** NFR-03

## Acceptance Criteria

1. **Given** any interactive control in a core flow
2. **When** the control is rendered
3. **Then** it has a minimum touch/click target size of 44px Ã— 44px
4. **Given** the user navigates using only the keyboard
5. **When** they Tab through the dashboard and list detail pages
6. **Then** focus order follows a logical sequence
7. **And** all interactive elements (buttons, inputs, links) are reachable
8. **And** focus indicators are clearly visible
9. **Given** budget status uses color (green/red)
10. **When** status is displayed
11. **Then** a text label ("Within budget" / "Over budget") always accompanies the color
12. **And** color is never the sole status indicator
13. **Given** any text and background color combination in the UI
14. **When** contrast is measured
15. **Then** it meets WCAG 2.1 AA minimum contrast ratios (4.5:1 for normal text, 3:1 for large text)
16. **Given** form fields have validation errors
17. **When** errors are displayed
18. **Then** error messages are associated with their fields via `aria-describedby` or equivalent
19. **And** screen readers announce the error context
20. **And** all images and icons have appropriate `alt` text or `aria-label`
21. **And** modals trap focus while open and return focus on close
22. **And** the page has proper semantic heading structure (`h1`, `h2`, `h3` in order)

## Tasks / Subtasks

- [ ] Implement core behavior and UI flow for story 7.2 (AC: 1+)
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

- 7-2-wcag-2-1-aa-accessibility-compliance.md

