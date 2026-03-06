# Story 7.3: Performance Validation, SEO, and Error/Loading States

Status: ready-for-dev

## Story

As a user,
I want the app to load fast, be discoverable, and handle errors gracefully,
So that I have a reliable and professional experience.

**FR Traceability:** NFR-01

## Acceptance Criteria

1. **Given** any add/edit/delete/calculate action
2. **When** performed on lists with up to 200 items
3. **Then** the 95th percentile response time is under 200ms
4. **Given** the app has public-facing pages
5. **When** the pages are crawled
6. **Then** each page has a unique `<title>` and `<meta name="description">` tag
7. **And** pages use semantic heading structure (`h1` + ordered `h2/h3`)
8. **And** a `sitemap.xml` and `robots.txt` are present
9. **And** Lighthouse SEO score is >= 90
10. **Given** a page is loading data
11. **When** the user sees the page
12. **Then** `app/loading.tsx` renders a meaningful loading state (not a blank page)
13. **Given** a runtime error occurs
14. **When** the error boundary catches it
15. **Then** `app/error.tsx` renders a user-friendly error message with a retry option
16. **And** the error is logged (console in MVP)
17. **Given** the user navigates to a non-existent route
18. **When** the page loads
19. **Then** `app/not-found.tsx` renders a 404 page with navigation back to the dashboard
20. **And** global styles are loaded via `styles/globals.css` with Tailwind directives
21. **And** the `manifest.webmanifest` file is present in `public/` for PWA-readiness

## Tasks / Subtasks

- [ ] Implement core behavior and UI flow for story 7.3 (AC: 1+)
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

- 7-3-performance-validation-seo-and-error-loading-states.md

