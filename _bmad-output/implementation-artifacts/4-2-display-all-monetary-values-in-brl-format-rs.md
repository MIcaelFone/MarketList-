# Story 4.2: Display All Monetary Values in BRL Format (R$)

Status: ready-for-dev

## Story

As a user,
I want all money values shown in Brazilian Real format (R$),
So that I can read prices naturally in my local currency.

**FR Traceability:** FR-03, NFR-04

## Acceptance Criteria

1. **Given** any monetary value is displayed in the UI
2. **When** the value is rendered
3. **Then** it uses the centralized BRL formatter: `Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" })`
4. **And** values display like `R$ 28,50`, `R$ 1.200,00`, `R$ 0,00`
5. **Given** the formatter is implemented
6. **When** used across all screens
7. **Then** the following display BRL-formatted values:
8. - Item unit price in list rows
9. - Item subtotal in list rows
10. - List total in the summary panel
11. - Budget amount on dashboard Budget Card
12. - Total spent on dashboard Total Spent Card
13. - Remaining balance on dashboard Remaining Card
14. **And** the formatter lives in `lib/adapters/formatters/brl-currency.ts`
15. **And** the `useCurrencyFormatter` hook provides convenient access from components
16. **And** 100% of monetary displays use this formatter (no inline formatting)

## Tasks / Subtasks

- [ ] Implement core behavior and UI flow for story 4.2 (AC: 1+)
- [ ] Implement validation, edge-case handling, and error feedback (AC: relevant)
- [ ] Add or update unit and integration tests aligned to acceptance criteria
- [ ] Verify responsive and accessibility impact where applicable

## Dev Notes

- Epic context: Epic 4 - Cost Calculation & Currency Display
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

- 4-2-display-all-monetary-values-in-brl-format-rs.md


