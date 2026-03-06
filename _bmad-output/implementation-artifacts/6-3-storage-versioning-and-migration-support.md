# Story 6.3: Storage Versioning and Migration Support

Status: ready-for-dev

## Story

As a developer,
I want versioned storage with migration hooks,
So that future data model changes don't break existing users' saved data.

**FR Traceability:** FR-06, NFR-02

## Acceptance Criteria

1. **Given** the storage key is `market_list_app_v1`
2. **When** the app reads from localStorage
3. **Then** it checks the data version before hydrating
4. **Given** a future version (e.g., v2) introduces schema changes
5. **When** the migration map in `lib/adapters/storage/migrations.ts` has a `v1 â†’ v2` migration function
6. **Then** stored v1 data is transformed to v2 format before schema validation and store commit
7. **Given** version 1 is the current version
8. **When** the migration map is initialized
9. **Then** it is an empty map (no migrations needed yet) but the structure supports adding migrations
10. **And** the version is stored alongside the data in localStorage
11. **And** the migration runner applies migrations sequentially (v1â†’v2â†’v3 if needed)
12. **And** if migration fails, the app falls back to default empty state with a logged error

## Tasks / Subtasks

- [ ] Implement core behavior and UI flow for story 6.3 (AC: 1+)
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

- 6-3-storage-versioning-and-migration-support.md

