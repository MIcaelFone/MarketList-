---
stepsCompleted:
  - 1
  - 2
  - 3
  - 4
inputDocuments:
  - docs/market-list-website-prd.md
  - _bmad-output/planning-artifacts/architecture.md
  - _bmad-output/planning-artifacts/ux-design-specification.md
  - docs/market-list-ui-wireframes.md
status: complete
date: '2026-03-06'
project_name: Market List
user_name: Micael Fone
---

# Market List - Epic Breakdown

## Overview

This document provides the complete epic and story breakdown for **Market List**, decomposing the requirements from the PRD, UX Design Specification, UI Wireframes, and Architecture into implementable stories. Market List is a responsive web application for grocery shopping planning with budget control, built with Next.js (App Router), TypeScript, and Tailwind CSS using local persistence.

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

### FR Coverage Map

- **FR-01 (List Management):** Epic 2 — Stories 2.1, 2.2, 2.3, 2.4
- **FR-02 (Item Management):** Epic 3 — Stories 3.1, 3.2, 3.3, 3.4
- **FR-03 (Cost Calculation):** Epic 4 — Stories 4.1, 4.2, 4.3
- **FR-04 (Budget Management):** Epic 5 — Stories 5.1, 5.2, 5.3
- **FR-05 (Budget Validation):** Epic 5 — Stories 5.2, 5.3
- **FR-06 (Data Persistence):** Epic 6 — Stories 6.1, 6.2, 6.3
- **FR-07 (Responsive UI):** Epic 7 — Stories 7.1
- **NFR-01 (Performance):** Epic 4 — Story 4.3; Epic 7 — Story 7.3
- **NFR-02 (Reliability):** Epic 6 — Stories 6.2, 6.3
- **NFR-03 (Accessibility):** Epic 7 — Story 7.2
- **NFR-04 (Localization/Currency):** Epic 4 — Story 4.2

## Epic List

### Epic 1: Project Foundation & Core Setup
Users can access a working application shell with proper architecture, domain models, and state management foundation that enables all future feature development.
**FRs covered:** Foundation for FR-01 through FR-07 (entities, schemas, stores, folder structure)

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

---

## Epic 1: Project Foundation & Core Setup

Users can access a working application shell with proper architecture, domain models, and state management foundation that enables all future feature development.

### Story 1.1: Bootstrap Next.js Project with Architecture Folder Structure

As a developer,
I want to initialize the project using the architecture-defined starter template and folder structure,
So that all future development follows consistent conventions and boundaries.

**Acceptance Criteria:**

**Given** no project exists yet
**When** the developer runs the initialization command
**Then** a Next.js project is created with TypeScript, Tailwind CSS, ESLint, App Router, and `src` directory
**And** the folder structure matches the architecture document exactly:
  - `app/` with `layout.tsx`, `page.tsx`, `lists/`, `budget/`, `error.tsx`, `loading.tsx`, `not-found.tsx`
  - `components/ui/` and `components/features/` directories
  - `lib/domain/`, `lib/use-cases/`, `lib/adapters/`, `lib/schemas/`, `lib/errors/`, `lib/utils/`
  - `hook/`, `stores/`, `styles/`, `public/`
**And** `pnpm dev` starts the dev server without errors
**And** the `@/*` import alias resolves correctly

### Story 1.2: Create Domain Entities, Value Objects, and Zod Schemas

As a developer,
I want domain entities (`MarketList`, `MarketItem`, `Budget`) and Zod validation schemas defined,
So that all features have a shared, validated data foundation.

**Acceptance Criteria:**

**Given** the project structure from Story 1.1 exists
**When** domain entities are created
**Then** `lib/domain/entities/market-list.ts` defines `MarketList` with `id` (string), `name` (string), `createdAt` (ISO string), `items` (MarketItem[])
**And** `lib/domain/entities/market-item.ts` defines `MarketItem` with `id` (string), `name` (string 1-80 chars), `quantity` (number > 0), `unitPrice` (number >= 0, max 2 decimals), `category` (optional string)
**And** `lib/domain/entities/budget.ts` defines `Budget` with `amount` (number > 0), `period` ("monthly" | "yearly")
**And** `lib/domain/value-objects/money.ts` and `quantity.ts` exist with type-safe constructors
**And** `lib/schemas/item.schema.ts`, `list.schema.ts`, `budget.schema.ts`, and `app-state.schema.ts` define Zod schemas matching entity shapes
**And** `lib/domain/validation/list-name-rules.ts` enforces 1-60 character non-empty names
**And** `lib/domain/validation/item-rules.ts` enforces item field constraints
**And** `lib/utils/id.ts` generates IDs in `list_{id}` and `item_{id}` format
**And** all schemas pass unit tests for valid and invalid inputs

### Story 1.3: Set Up Zustand Store Slices, Hydration Skeleton, and localStorage Adapter

As a developer,
I want Zustand stores, selectors, and the localStorage adapter wired up,
So that features can read/write state through a consistent mechanism.

**Acceptance Criteria:**

**Given** domain entities and schemas from Story 1.2 exist
**When** stores are created
**Then** `stores/market-list.store.ts` has actions for list and item CRUD with empty implementations (stubs)
**And** `stores/budget.store.ts` has actions for budget save with empty implementation
**And** `stores/app-ui.store.ts` has `isHydrating` state for hydration lifecycle
**And** `stores/selectors/list.selectors.ts`, `budget.selectors.ts`, `dashboard.selectors.ts` export selector functions
**And** `stores/hydration/hydrate-state.ts` reads from localStorage, validates with Zod, and commits to store
**And** `stores/hydration/persist-state.ts` serializes store state and writes to localStorage
**And** `lib/adapters/storage/local-storage-adapter.ts` wraps `localStorage` get/set/remove with key `market_list_app_v1`
**And** `lib/adapters/storage/storage-keys.ts` exports the storage key constant
**And** `lib/adapters/storage/migrations.ts` has a migration map structure (empty for v1)
**And** `lib/errors/domain-error.ts`, `validation-error.ts`, `persistence-error.ts` define typed error classes
**And** the hydration flow initializes default state → reads localStorage → validates → migrates → commits

---

## Epic 2: Market List Management

Users can create, view, rename, and delete shopping lists from a dashboard, organizing their grocery purchases into separate lists.

### Story 2.1: Dashboard Page with Empty State and List Overview

As a user,
I want to see a dashboard with my shopping lists when I open the app,
So that I can quickly access my lists or know to create one if none exist.

**Acceptance Criteria:**

**Given** no lists exist in the store
**When** the user opens the app at the root route
**Then** the dashboard shows an empty state with a clear CTA message and a prominent "Create List" button
**And** the page has proper heading structure (`h1` for "Market List")
**And** the layout renders without horizontal scroll at 360px and 1440px viewport widths

**Given** one or more lists exist in the store
**When** the user opens the dashboard
**Then** each list is displayed as a row showing list name and an "Open" action
**And** a "Create List" (or `[+ New]`) button is visible
**And** lists are rendered using `components/features/market-list/MarketListDashboard.tsx` and `MarketListRow.tsx`

### Story 2.2: Create New List via Modal

As a user,
I want to create a new shopping list by entering a name,
So that I can start organizing a new set of purchases.

**Acceptance Criteria:**

**Given** the user is on the dashboard
**When** the user clicks "Create List"
**Then** a modal appears with a text input for list name, a "Cancel" button, and a "Create List" submit button

**Given** the create list modal is open
**When** the user enters a valid name (1-60 characters, non-empty) and clicks "Create List"
**Then** a new list is created with a unique `list_{id}` identifier and current timestamp
**And** the modal closes
**And** the new list appears in the dashboard list within 1 second

**Given** the create list modal is open
**When** the user submits an empty name or a name exceeding 60 characters
**Then** an inline validation error is shown
**And** the list is NOT created

**Given** the create list modal is open
**When** the user clicks "Cancel" or the close (X) button
**Then** the modal closes without creating a list

### Story 2.3: Navigate to List Detail Page

As a user,
I want to open a specific list to see its items and details,
So that I can manage items within that list.

**Acceptance Criteria:**

**Given** one or more lists exist on the dashboard
**When** the user clicks "Open" on a list row
**Then** the app navigates to `/lists/{listId}` route
**And** the list detail page renders showing the list name in the header
**And** a "Back to Dashboard" navigation link is visible
**And** the page shows an empty items state if the list has no items yet
**And** an "Add Item" button is visible

**Given** the user navigates to `/lists/{listId}` for a non-existent list
**When** the page loads
**Then** the not-found page is displayed

### Story 2.4: Rename and Delete List

As a user,
I want to rename or delete an existing list,
So that I can keep my lists organized or remove ones I no longer need.

**Acceptance Criteria:**

**Given** the user is on the list detail page
**When** the user initiates a rename action on the list
**Then** the list name becomes editable
**And** the user can enter a new name (1-60 characters, non-empty)
**And** validation errors show for invalid names
**And** the rename is applied and the UI updates within 1 second

**Given** the user is on the list detail page
**When** the user clicks "Delete List"
**Then** a confirmation prompt appears warning that this action cannot be undone

**Given** the delete confirmation is shown
**When** the user confirms deletion
**Then** the list and all its items are removed from the store
**And** the user is redirected to the dashboard
**And** the deleted list no longer appears in the dashboard

**Given** the delete confirmation is shown
**When** the user cancels
**Then** the list remains unchanged

---

## Epic 3: Item Management

Users can add, view, edit, and remove items inside a shopping list, with item count display and field validation.

### Story 3.1: Add Item Form with Validation

As a user,
I want to add an item to my shopping list with name, quantity, price, and optional category,
So that I can track what I need to buy and how much it costs.

**Acceptance Criteria:**

**Given** the user is on a list detail page
**When** the user clicks "Add Item"
**Then** a drawer/form appears with fields: Name (required), Quantity (required), Unit Price in R$ (required), Category (optional)
**And** a "Cancel" button and "Save Item" button are visible

**Given** the add item form is open
**When** the user enters valid data (name 1-80 chars, quantity > 0, unitPrice >= 0 with up to 2 decimal places)
**And** clicks "Save Item"
**Then** a new item is created with a unique `item_{id}` identifier
**And** the item appears in the list
**And** the form closes

**Given** the add item form is open
**When** the user submits with an empty name, quantity <= 0, or unitPrice < 0
**Then** inline validation errors appear for each invalid field
**And** the item is NOT created

**Given** the add item form is open
**When** the user clicks "Cancel" or the close (X) button
**Then** the form closes without adding an item

### Story 3.2: Display Items in List with Item Count

As a user,
I want to see all items in my list with their details and a total item count,
So that I know what I have planned and how many items are in my list.

**Acceptance Criteria:**

**Given** a list has one or more items
**When** the user views the list detail page
**Then** each item is displayed showing: name, quantity, unit price, and subtotal (quantity × unitPrice)
**And** each item row has "Edit" and "Remove" action buttons
**And** the summary panel shows the total item count (e.g., "Items: 8")

**Given** a list has no items
**When** the user views the list detail page
**Then** an empty state message is shown (e.g., "No items yet. Add your first item!")
**And** the item count shows "Items: 0"

**Given** items exist in the list
**When** viewing on desktop (>= 1024px)
**Then** items are displayed in a table format with columns: Name, Qty, Unit Price, Subtotal, Actions
**And** the summary panel appears as a sidebar

**Given** items exist in the list
**When** viewing on mobile (< 768px)
**Then** items are displayed in a stacked card/row format showing `name qty × unitPrice = subtotal`
**And** the summary appears above the items list

### Story 3.3: Edit Existing Item

As a user,
I want to edit an item's name, quantity, price, or category,
So that I can update my list as my shopping needs change.

**Acceptance Criteria:**

**Given** the user is on the list detail page with items
**When** the user clicks "Edit" on an item row
**Then** the item form/drawer opens pre-populated with the item's current values

**Given** the edit item form is open
**When** the user modifies any field with valid data and clicks "Save Item"
**Then** the item is updated in the store
**And** the updated values are immediately reflected in the list
**And** the form closes

**Given** the edit item form is open
**When** the user enters invalid data (empty name, quantity <= 0, unitPrice < 0)
**Then** inline validation errors are shown
**And** the item is NOT updated

**Given** the edit item form is open
**When** the user clicks "Cancel"
**Then** the form closes and the item retains its original values

### Story 3.4: Remove Item from List

As a user,
I want to remove an item from my shopping list,
So that I can take off items I no longer need.

**Acceptance Criteria:**

**Given** the user is on the list detail page with items
**When** the user clicks "Remove" on an item row
**Then** a brief confirmation is requested (e.g., inline confirm or a small prompt)

**Given** the removal confirmation is shown
**When** the user confirms removal
**Then** the item is removed from the list
**And** the item count updates immediately
**And** if no items remain, the empty state is shown

**Given** the removal confirmation is shown
**When** the user cancels
**Then** the item remains in the list unchanged

---

## Epic 4: Cost Calculation & Currency Display

Users can see automatically calculated subtotals per item and totals per list, formatted in Brazilian Real (R$), with real-time updates.

### Story 4.1: Implement Item Subtotal and List Total Calculation

As a user,
I want item subtotals and list total to be calculated automatically,
So that I know exact costs without manual math.

**Acceptance Criteria:**

**Given** an item has quantity and unitPrice values
**When** the item is created or updated
**Then** `calculateItemSubtotal(quantity, unitPrice)` returns `quantity * unitPrice` as a number

**Given** a list has one or more items
**When** any item quantity or price changes
**Then** `calculateListTotal(items)` returns the sum of all item subtotals

**Given** a list has no items
**When** the list total is calculated
**Then** the total is 0

**And** all calculation functions are pure domain functions in `lib/domain/services/`
**And** calculation functions have unit tests covering: single item, multiple items, zero price, empty list, boundary values

### Story 4.2: Display All Monetary Values in BRL Format (R$)

As a user,
I want all money values shown in Brazilian Real format (R$),
So that I can read prices naturally in my local currency.

**Acceptance Criteria:**

**Given** any monetary value is displayed in the UI
**When** the value is rendered
**Then** it uses the centralized BRL formatter: `Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" })`
**And** values display like `R$ 28,50`, `R$ 1.200,00`, `R$ 0,00`

**Given** the formatter is implemented
**When** used across all screens
**Then** the following display BRL-formatted values:
  - Item unit price in list rows
  - Item subtotal in list rows
  - List total in the summary panel
  - Budget amount on dashboard Budget Card
  - Total spent on dashboard Total Spent Card
  - Remaining balance on dashboard Remaining Card

**And** the formatter lives in `lib/adapters/formatters/brl-currency.ts`
**And** the `useCurrencyFormatter` hook provides convenient access from components
**And** 100% of monetary displays use this formatter (no inline formatting)

### Story 4.3: Real-Time Recalculation on Item Changes

As a user,
I want totals to update instantly when I add, edit, or remove an item,
So that I always see accurate costs without delay.

**Acceptance Criteria:**

**Given** a list has items and the user adds a new item
**When** the item is saved
**Then** the list total and item count update within 200ms

**Given** a list has items and the user edits an item's quantity or price
**When** the change is saved
**Then** that item's subtotal recalculates and the list total updates within 200ms

**Given** a list has items and the user removes an item
**When** the removal is confirmed
**Then** the list total recalculates and item count decreases within 200ms

**Given** a list has up to 200 items
**When** any item changes
**Then** 95th percentile recalculation time remains under 200ms

**And** recalculation is driven by Zustand selectors with memoized derived values
**And** dashboard total spent reflects the sum across all lists

---

## Epic 5: Budget Management & Validation

Users can set a budget with a period (monthly/yearly) and see whether their list total is within or over budget with clear visual feedback.

### Story 5.1: Budget Edit Modal

As a user,
I want to set or update my budget amount and period,
So that I can define how much I plan to spend.

**Acceptance Criteria:**

**Given** the user is on the dashboard
**When** the user clicks "Edit Budget" on the Budget Card
**Then** a modal appears with:
  - Amount (R$) input field (required, must be > 0)
  - Period radio buttons: "Monthly" and "Yearly"
  - Preview section showing: current total list cost, remaining amount, and status
  - "Cancel" and "Save Budget" buttons

**Given** the budget modal is open
**When** the user enters a valid amount (> 0) and selects a period and clicks "Save Budget"
**Then** the budget is saved to the store
**And** the modal closes
**And** the dashboard Budget Card, Remaining Card, and status update immediately

**Given** the budget modal is open
**When** the user enters an invalid amount (<= 0 or empty)
**Then** an inline validation error is shown
**And** the budget is NOT saved

**Given** the budget modal is open
**When** the user clicks "Cancel" or close (X)
**Then** the modal closes without saving changes

**Given** no budget has been set yet
**When** the user views the dashboard
**Then** the Budget Card shows a prompt to set a budget (e.g., "Set your budget")

### Story 5.2: Budget Status Calculation

As a user,
I want the system to automatically determine if I'm within or over budget,
So that I can make informed shopping decisions.

**Acceptance Criteria:**

**Given** a budget is configured with an amount
**When** `calculateBudgetStatus(total, budgetAmount)` is called
**Then** it returns `"within"` when total <= budgetAmount
**And** it returns `"over"` when total > budgetAmount

**Given** the budget amount or any list total changes
**When** the budget status is recalculated
**Then** the status updates within 200ms

**Given** no budget is configured
**When** the status is evaluated
**Then** no budget status is shown (neutral state)

**And** `calculateBudgetStatus` is a pure domain function in `lib/domain/services/calculate-budget-status.ts`
**And** unit tests cover: total below budget, total equal to budget, total above budget, zero total, edge cases

### Story 5.3: Dashboard Budget Cards with Status Indicators

As a user,
I want to see my budget, total spent, and remaining balance on the dashboard with clear within/over budget indicators,
So that I can quickly understand my financial position.

**Acceptance Criteria:**

**Given** a budget is set and lists exist with items
**When** the user views the dashboard
**Then** three summary cards are displayed:
  - **Budget Card:** shows budget amount in R$ and period (Monthly/Yearly) with "Edit Budget" action
  - **Total Spent Card:** shows sum of all list totals in R$ with label "This cycle"
  - **Remaining Balance Card:** shows (budget - total spent) in R$ with budget status

**Given** total spent is less than or equal to budget
**When** the dashboard renders
**Then** the Remaining Balance Card shows a green badge with label "Within budget"
**And** the remaining amount is displayed as a positive value

**Given** total spent exceeds the budget
**When** the dashboard renders
**Then** the Remaining Balance Card shows a red badge with label "Over budget"
**And** the over-budget amount is displayed clearly

**Given** the status is shown with color
**When** color is used for budget indicators
**Then** a text label always accompanies the color (color is never the sole indicator)
**And** badges use the `BudgetBadge` component from `components/ui/badge/`

**Given** budget cards are viewed on desktop (>= 1024px)
**When** the dashboard renders
**Then** the three cards display in a horizontal row

**Given** budget cards are viewed on mobile (< 768px)
**When** the dashboard renders
**Then** the cards stack vertically in a compact layout

---

## Epic 6: Data Persistence & Recovery

Users' lists, items, and budget settings are automatically saved and reliably restored when they return to the application.

### Story 6.1: Persist State to localStorage After Each Mutation

As a user,
I want my data to be saved automatically whenever I make changes,
So that I don't lose my lists or budget if I close the browser.

**Acceptance Criteria:**

**Given** the user creates, renames, or deletes a list
**When** the mutation completes
**Then** the full app state (lists + budget) is persisted to localStorage under key `market_list_app_v1` within 1 second

**Given** the user adds, edits, or removes an item
**When** the mutation completes
**Then** the state is persisted to localStorage within 1 second

**Given** the user saves a budget
**When** the mutation completes
**Then** the state is persisted to localStorage within 1 second

**And** persistence writes are debounced (not triggered on every keystroke, only after mutation completes)
**And** the persisted JSON follows the data model structure from the PRD (Section 9.2)
**And** `stores/hydration/persist-state.ts` handles serialization and writing
**And** `lib/adapters/storage/local-storage-adapter.ts` wraps all localStorage access

### Story 6.2: Hydrate State from localStorage on Page Load

As a user,
I want my previously saved data restored when I open the app,
So that I can continue where I left off.

**Acceptance Criteria:**

**Given** saved data exists in localStorage under key `market_list_app_v1`
**When** the app loads
**Then** the stored data is read, validated against Zod schemas, and committed to the Zustand stores
**And** the dashboard displays the restored lists and budget within 2 seconds
**And** `stores/app-ui.store.ts` sets `isHydrating: true` during load and `false` after completion

**Given** saved data exists but fails schema validation
**When** the app loads
**Then** the invalid data is discarded
**And** the app starts with default empty state
**And** the user is not shown a blocking error (graceful degradation)

**Given** no saved data exists in localStorage
**When** the app loads
**Then** the app starts with empty default state (no lists, no budget)
**And** hydration completes successfully within 2 seconds

**Given** the app is hydrating
**When** the user views the page during hydration
**Then** a loading state is shown (not a flash of empty then populated content)

### Story 6.3: Storage Versioning and Migration Support

As a developer,
I want versioned storage with migration hooks,
So that future data model changes don't break existing users' saved data.

**Acceptance Criteria:**

**Given** the storage key is `market_list_app_v1`
**When** the app reads from localStorage
**Then** it checks the data version before hydrating

**Given** a future version (e.g., v2) introduces schema changes
**When** the migration map in `lib/adapters/storage/migrations.ts` has a `v1 → v2` migration function
**Then** stored v1 data is transformed to v2 format before schema validation and store commit

**Given** version 1 is the current version
**When** the migration map is initialized
**Then** it is an empty map (no migrations needed yet) but the structure supports adding migrations

**And** the version is stored alongside the data in localStorage
**And** the migration runner applies migrations sequentially (v1→v2→v3 if needed)
**And** if migration fails, the app falls back to default empty state with a logged error

---

## Epic 7: Responsive UI, Accessibility & Polish

Users can use all core features seamlessly across mobile and desktop devices, with accessible controls and optimized performance.

### Story 7.1: Responsive Layouts for Dashboard and List Detail

As a user,
I want the app to look great and be fully functional on my phone and computer,
So that I can manage my shopping lists on any device.

**Acceptance Criteria:**

**Given** the user opens the dashboard on a desktop (>= 1024px)
**When** the page renders
**Then** budget cards display in a horizontal 3-column row
**And** the list overview shows as a table with list name, total, and Open action
**And** no horizontal scroll occurs

**Given** the user opens the dashboard on mobile (360px-767px)
**When** the page renders
**Then** budget section uses compact stacked layout
**And** lists display as compact rows
**And** primary actions (Create List) remain visible and tappable
**And** no horizontal scroll occurs

**Given** the user opens list detail on desktop (>= 1024px)
**When** the page renders
**Then** items display in a table with the summary panel as a sidebar

**Given** the user opens list detail on mobile (360px-767px)
**When** the page renders
**Then** the summary appears above the items
**And** items display as stacked rows with Edit/Remove actions
**And** the "Add Item" button stays visible

**And** all modals and drawers (Create List, Add/Edit Item, Budget Edit) render properly on both mobile and desktop
**And** the layout is validated at viewport widths: 360px, 768px, 1024px, 1440px
**And** landscape orientation does not break layouts

### Story 7.2: WCAG 2.1 AA Accessibility Compliance

As a user,
I want the app to be accessible via keyboard and screen readers,
So that I can use it regardless of my abilities.

**Acceptance Criteria:**

**Given** any interactive control in a core flow
**When** the control is rendered
**Then** it has a minimum touch/click target size of 44px × 44px

**Given** the user navigates using only the keyboard
**When** they Tab through the dashboard and list detail pages
**Then** focus order follows a logical sequence
**And** all interactive elements (buttons, inputs, links) are reachable
**And** focus indicators are clearly visible

**Given** budget status uses color (green/red)
**When** status is displayed
**Then** a text label ("Within budget" / "Over budget") always accompanies the color
**And** color is never the sole status indicator

**Given** any text and background color combination in the UI
**When** contrast is measured
**Then** it meets WCAG 2.1 AA minimum contrast ratios (4.5:1 for normal text, 3:1 for large text)

**Given** form fields have validation errors
**When** errors are displayed
**Then** error messages are associated with their fields via `aria-describedby` or equivalent
**And** screen readers announce the error context

**And** all images and icons have appropriate `alt` text or `aria-label`
**And** modals trap focus while open and return focus on close
**And** the page has proper semantic heading structure (`h1`, `h2`, `h3` in order)

### Story 7.3: Performance Validation, SEO, and Error/Loading States

As a user,
I want the app to load fast, be discoverable, and handle errors gracefully,
So that I have a reliable and professional experience.

**Acceptance Criteria:**

**Given** any add/edit/delete/calculate action
**When** performed on lists with up to 200 items
**Then** the 95th percentile response time is under 200ms

**Given** the app has public-facing pages
**When** the pages are crawled
**Then** each page has a unique `<title>` and `<meta name="description">` tag
**And** pages use semantic heading structure (`h1` + ordered `h2/h3`)
**And** a `sitemap.xml` and `robots.txt` are present
**And** Lighthouse SEO score is >= 90

**Given** a page is loading data
**When** the user sees the page
**Then** `app/loading.tsx` renders a meaningful loading state (not a blank page)

**Given** a runtime error occurs
**When** the error boundary catches it
**Then** `app/error.tsx` renders a user-friendly error message with a retry option
**And** the error is logged (console in MVP)

**Given** the user navigates to a non-existent route
**When** the page loads
**Then** `app/not-found.tsx` renders a 404 page with navigation back to the dashboard

**And** global styles are loaded via `styles/globals.css` with Tailwind directives
**And** the `manifest.webmanifest` file is present in `public/` for PWA-readiness
