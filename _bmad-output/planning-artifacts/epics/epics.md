---
stepsCompleted:
  - 1
  - 2
  - 3
  - 4
inputDocuments:
  - _bmad-output/planning-artifacts/prd/prd.md
  - _bmad-output/planning-artifacts/architecture/architecture.md
  - _bmad-output/planning-artifacts/ux-design-specification/ux-design-specification.md
  - _bmad-output/planning-artifacts/wireframes/market-list-ui-wireframes.md
status: complete
date: '2026-03-06'
project_name: Market List
user_name: Micael Fone
---

# Market List - Epic Breakdown

## Overview

This document provides the complete epic breakdown for **Market List**, consolidating requirements from the PRD, UX Design Specification, UI Wireframes, and Architecture into implementation-focused product increments. Market List is a responsive web application for grocery shopping planning with budget control, built with Next.js (App Router), TypeScript, and Tailwind CSS using local persistence.

## Requirements Inventory

### Functional Requirements

- **FR-01 - List Management:** Users can create, rename, and delete market lists with non-empty names (1-60 characters), and each operation updates the visible list state within 1 second.
- **FR-02 - Item Management:** Users can add, edit, and delete list items with `name`, `quantity`, and `unitPrice`; `name` is required (1-80 characters), `quantity` must be > 0, and `unitPrice` must be >= 0 with up to 2 decimal places.
- **FR-03 - Cost Calculation:** The product recalculates item subtotal and list total within 200ms (95th percentile) after any item quantity or price change for lists with up to 200 items.
- **FR-04 - Budget Management:** Users can set a budget amount (> 0) and period (`monthly` or `yearly`), and the selected values persist for future sessions with restore time <= 2 seconds after page load.
- **FR-05 - Budget Validation:** The product compares list total with budget and shows `Within budget` when total <= budget and `Over budget` when total > budget. Status updates must occur within 200ms after total or budget changes.
- **FR-06 - Data Persistence:** After each create/edit/delete item or budget update, the product persists latest list and budget state within 1 second, and restores that state within 2 seconds after page load.
- **FR-07 - Responsive UI:** Core flows (create list, add item, save budget, delete list) work without layout break or horizontal scroll at viewport widths from 360px to 1440px in portrait and landscape orientations.

### Non-Functional Requirements

- **NFR-01 - Performance Targets:** 95th percentile response time for add/edit/delete/calculate actions is under 200ms, measured via production telemetry over rolling 24-hour windows.
- **NFR-02 - Reliability Targets:** In automated refresh tests (minimum 1,000 runs per release), at least 99% of runs restore saved state without data loss.
- **NFR-03 - Accessibility and Usability:** Interactive controls in core flows have a minimum target size of 44px by 44px. Core user flows conform to WCAG 2.1 AA contrast and keyboard navigation criteria.
- **NFR-04 - Localization and Currency:** 100% of displayed monetary values use Brazilian Real formatting via `pt-BR` locale conventions.

### Additional Requirements

**From Architecture:**
- Clean Architecture boundaries: domain logic in `lib/domain`, use-cases in `lib/use-cases`, persistence in `lib/adapters`
- Zustand v5 for state management with modular store slices and selectors
- Zod v4 for schema validation at persistence boundaries
- Versioned localStorage with migration support (`market_list_app_v1`)
- Debounced persistence writes (not on every keystroke)
- Domain entities: `MarketList`, `MarketItem`, `Budget`
- Pure domain functions: `calculateItemSubtotal`, `calculateListTotal`, `calculateBudgetStatus`
- Centralized BRL currency formatter using `Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" })`
- ID format: `list_{id}` and `item_{id}`

**From UX Design:**
- Dashboard with Budget Card, Total Spent Card, Remaining Balance Card
- Create List Modal with name validation
- List Detail page with items table, summary panel, and Add Item action
- Add/Edit Item Drawer with inline validation
- Budget Edit Modal with preview of impact
- Status indicators: green badge + label for within budget, red badge + label for over budget
- Empty state with clear CTA
- Error states: inline field errors + non-blocking top alert

**From UI Wireframes:**
- Component inventory: `BudgetCard`, `TotalCard`, `RemainingCard`, `ListRow`, `ListActions`, `ListSelector`, `ListForm`, `ItemForm`, `BudgetForm`, `BudgetBadge`, `InlineValidation`, `ToastAlert`
- Desktop layout: 3-column budget summary cards, list table with Open actions
- Mobile layout: stacked cards, compact list rows
- List Detail desktop: 2-panel layout (items table + summary sidebar)
- List Detail mobile: summary on top, items stacked below

### Epic Coverage Map
- **FR-01 (List Management):** Epic 1, Epic 2
- **FR-02 (Item Management):** Epic 3
- **FR-03 (Cost Calculation):** Epic 4
- **FR-04 (Budget Management):** Epic 5
- **FR-05 (Budget Validation):** Epic 5
- **FR-06 (Data Persistence):** Epic 1, Epic 6
- **FR-07 (Responsive UI):** Epic 1, Epic 7
- **NFR-01 (Performance):** Epic 4, Epic 7
- **NFR-02 (Reliability):** Epic 1, Epic 6
- **NFR-03 (Accessibility):** Epic 1, Epic 7
- **NFR-04 (Localization/Currency):** Epic 4

## Epic List
### Epic 1: First Usable Planning Slice
Users can open the app, create a first list, and return later with data restored, establishing immediate user value and trust.
**FRs covered:** FR-01, FR-06, FR-07, NFR-02, NFR-03
### Epic 2: Market List Management
Users can create, view, rename, and delete shopping lists from a dashboard, organizing their grocery purchases into separate lists.
**FRs covered:** FR-01
### Epic 3: Item Management
Users can add, view, edit, and remove items inside a shopping list, with item count display and field validation.
**FRs covered:** FR-02
### Epic 4: Cost Calculation & Currency Display
Users can see automatically calculated subtotals per item and totals per list, formatted in Brazilian Real (R$), with real-time updates.
**FRs covered:** FR-03, NFR-04
### Epic 5: Budget Management & Validation
Users can set a budget with a period (monthly/yearly) and see whether their list total is within or over budget with clear visual feedback.
**FRs covered:** FR-04, FR-05
### Epic 6: Data Persistence & Recovery
Users' lists, items, and budget settings are automatically saved and reliably restored when they return to the application.
**FRs covered:** FR-06, NFR-02
### Epic 7: Responsive UI, Accessibility & Polish
Users can use all core features seamlessly across mobile and desktop devices, with accessible controls and optimized performance.
**FRs covered:** FR-07, NFR-01, NFR-03


