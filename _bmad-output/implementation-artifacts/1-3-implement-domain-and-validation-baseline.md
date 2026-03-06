# Story 1.3: Implement Domain and Validation Baseline

Status: ready-for-dev

## Story

As a developer,
I want core domain models and validation rules implemented in one bounded story,
So that feature work can rely on consistent, tested business contracts.

**FR Traceability:** FR-01, FR-02, FR-04

## Acceptance Criteria

1. **Given** the app shell exists
2. **When** domain contracts are implemented
3. **Then** entities for `MarketList`, `MarketItem`, and `Budget` are defined under `lib/domain/entities/`
4. **And** Zod schemas for list, item, budget, and app state are defined under `lib/schemas/`
5. **And** list name and item field validation rules are centralized in `lib/domain/validation/`
6. **And** id generation uses list_{id} and item_{id} formats
7. **And** unit tests cover valid and invalid schema/validation scenarios

## Tasks / Subtasks

- [ ] Implement core behavior and UI flow for story 1.3 (AC: 1+)
- [ ] Implement validation, edge-case handling, and error feedback (AC: relevant)
- [ ] Add or update unit and integration tests aligned to acceptance criteria
- [ ] Verify responsive and accessibility impact where applicable

## Dev Notes

- Epic context: Epic 1 - First Usable Planning Slice
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

- 1-3-implement-domain-and-validation-baseline.md

