# Story 6.1: Persist State to localStorage After Each Mutation

Status: ready-for-dev

## Story

As a user,
I want my data to be saved automatically whenever I make changes,
So that I don't lose my lists or budget if I close the browser.

**FR Traceability:** FR-06

## Acceptance Criteria

1. **Given** the user creates, renames, or deletes a list
2. **When** the mutation completes
3. **Then** the full app state (lists + budget) is persisted to localStorage under key `market_list_app_v1` within 1 second
4. **Given** the user adds, edits, or removes an item
5. **When** the mutation completes
6. **Then** the state is persisted to localStorage within 1 second
7. **Given** the user saves a budget
8. **When** the mutation completes
9. **Then** the state is persisted to localStorage within 1 second
10. **And** persistence writes are debounced (not triggered on every keystroke, only after mutation completes)
11. **And** the persisted JSON follows the data model structure from the PRD (Section 9.2)
12. **And** `stores/hydration/persist-state.ts` handles serialization and writing
13. **And** `lib/adapters/storage/local-storage-adapter.ts` wraps all localStorage access

## Tasks / Subtasks

- [ ] Implement core behavior and UI flow for story 6.1 (AC: 1+)
- [ ] Implement validation, edge-case handling, and error feedback (AC: relevant)
- [ ] Add or update unit and integration tests aligned to acceptance criteria
- [ ] Verify responsive and accessibility impact where applicable

## Dev Notes

- Epic context: Epic 6 - Data Persistence & Recovery
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

- 6-1-persist-state-to-localstorage-after-each-mutation.md

