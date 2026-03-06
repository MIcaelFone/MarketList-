# Story 2.2: Create New List via Modal

Status: ready-for-dev

## Story

As a user,
I want to create a new shopping list by entering a name,
So that I can start organizing a new set of purchases.

**FR Traceability:** FR-01

## Acceptance Criteria

1. **Given** the user is on the dashboard
2. **When** the user clicks "Create List"
3. **Then** a modal appears with a text input for list name, a "Cancel" button, and a "Create List" submit button
4. **Given** the create list modal is open
5. **When** the user enters a valid name (1-60 characters, non-empty) and clicks "Create List"
6. **Then** a new list is created with a unique `list_{id}` identifier and current timestamp
7. **And** the modal closes
8. **And** the new list appears in the dashboard list within 1 second
9. **Given** the create list modal is open
10. **When** the user submits an empty name or a name exceeding 60 characters
11. **Then** an inline validation error is shown
12. **And** the list is NOT created
13. **Given** the create list modal is open
14. **When** the user clicks "Cancel" or the close (X) button
15. **Then** the modal closes without creating a list

## Tasks / Subtasks

- [ ] Implement core behavior and UI flow for story 2.2 (AC: 1+)
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

- 2-2-create-new-list-via-modal.md

