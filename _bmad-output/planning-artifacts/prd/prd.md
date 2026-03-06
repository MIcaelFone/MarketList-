---
stepsCompleted:
  - 1
inputDocuments:
  - docs/market-list-website-prd.md
  - docs/market-list-ui-wireframes.md
  - _bmad-output/planning-artifacts/ux-design-specification.md
  - _bmad-output/planning-artifacts/architecture.md
workflowType: 'prd'
classification:
  domain: general
  projectType: web_app
date: 2026-03-06
status: draft
version: 1.2
---

# Product Requirements Document - Market List

**Author:** Micael Fone
**Date:** 2026-03-06

## 1. Product Overview

### 1.1 Product Name
Market List

### 1.2 Goal
Build a responsive website where users can:
- Create market shopping lists
- Add item values and quantities
- Calculate total list cost automatically
- Define available money for a period (month or year)
- See if the list is within budget

### 1.3 Target User
- People who want to organize grocery shopping and control household spending

## 2. Success Criteria

- At least 90% of test users can create a list, add 3 items, and configure a budget in under 3 minutes without assistance.
- 95th percentile for list update operations (add/edit/remove item) is under 200ms on reference mobile and desktop devices.
- 99% of refresh events restore the most recent saved list and budget state within 2 seconds.
- Budget status accuracy is 100% for test scenarios where total is below, equal to, and above configured budget.

## 3. Scope

### 3.1 In Scope (MVP)
- Create, edit, and delete shopping lists
- Add, edit, and remove items inside each list
- Fields per item:
  - Name
  - Quantity
  - Unit price
  - Category (optional)
- Automatic calculation:
  - Item subtotal = quantity * unit price
  - List total = sum of all subtotals
- Budget setup:
  - Budget amount
  - Period: monthly or yearly
- Budget feedback:
  - Remaining amount
  - Over budget warning
- Persistent local data between sessions
- Responsive interface for mobile and desktop
- Clear primary action buttons

### 3.2 Out of Scope (for now)
- User login/account
- Cloud sync
- Multi-user sharing
- Payment integration
- Reports with charts

## 4. Functional Requirements

### FR-01 - List Management
Users can create, rename, and delete market lists with non-empty names (1-60 characters), and each operation updates the visible list state within 1 second.

### FR-02 - Item Management
Users can add, edit, and delete list items with `name`, `quantity`, and `unitPrice`; `name` is required (1-80 characters), `quantity` must be > 0, and `unitPrice` must be >= 0 with up to 2 decimal places.

### FR-03 - Cost Calculation
The product recalculates item subtotal and list total within 200ms (95th percentile) after any item quantity or price change for lists with up to 200 items.

### FR-04 - Budget Management
Users can set a budget amount (> 0) and period (`monthly` or `yearly`), and the selected values persist for future sessions with restore time <= 2 seconds after page load.

### FR-05 - Budget Validation
The product compares list total with budget and shows:
- `Within budget` when total <= budget
- `Over budget` when total > budget
Status updates must occur within 200ms after total or budget changes.

### FR-06 - Data Persistence
After each create/edit/delete item or budget update, the product persists latest list and budget state within 1 second, and restores that state within 2 seconds after page load.

### FR-07 - Responsive UI
Core flows (create list, add item, save budget, delete list) work without layout break or horizontal scroll at viewport widths from 360px to 1440px in portrait and landscape orientations.

## 5. Non-Functional Requirements

### NFR-01 - Performance Targets
- 95th percentile response time for add/edit/delete/calculate actions is under 200ms, measured via production telemetry over rolling 24-hour windows.

### NFR-02 - Reliability Targets
- In automated refresh tests (minimum 1,000 runs per release), at least 99% of runs restore saved state without data loss.

### NFR-03 - Accessibility and Usability
- Interactive controls in core flows have a minimum target size of 44px by 44px.
- Core user flows conform to WCAG 2.1 AA contrast and keyboard navigation criteria, validated before release by automated accessibility scans plus manual keyboard-only checks.

### NFR-04 - Localization and Currency
- 100% of displayed monetary values use Brazilian Real formatting via `pt-BR` locale conventions, verified in automated UI checks for all money display components.

## 6. Browser Matrix

| Browser | Minimum Version | Support Level |
|---------|------------------|---------------|
| Chrome  | Last 2 stable versions | Full |
| Edge    | Last 2 stable versions | Full |
| Firefox | Last 2 stable versions | Full |
| Safari  | Last 2 major versions  | Full |

## 7. UX Requirements

### 7.1 Main Screens
- Dashboard with:
  - Budget card
  - Total spent card
  - Remaining balance card
  - List selector/overview
- List details page:
  - Items table/list
  - Add item form
  - Total summary

### 7.2 Main Buttons (Prominent)
- `Create List`
- `Add Item`
- `Save Budget`
- `Delete List`

### 7.3 Status Indicators
- Green + label for within budget
- Red + label for over budget

## 8. Data Model (Local Persistence)

### 8.1 Storage Key
- `market_list_app_v1`

### 8.2 Suggested JSON Structure
```json
{
  "budget": {
    "amount": 1200,
    "period": "monthly"
  },
  "lists": [
    {
      "id": "list_001",
      "name": "Supermarket - Week 1",
      "createdAt": "2026-03-06T12:00:00.000Z",
      "items": [
        {
          "id": "item_001",
          "name": "Rice",
          "quantity": 2,
          "unitPrice": 28.5,
          "category": "Groceries"
        }
      ]
    }
  ]
}
```

## 9. User Stories

### US-01
As a user, I want to create a shopping list so I can organize my purchases.

### US-02
As a user, I want to add item quantity and price so I can know exact costs.

### US-03
As a user, I want to set a monthly or yearly budget so I can control my spending.

### US-04
As a user, I want to see if I am over budget so I can adjust my list before buying.

## 10. Acceptance Criteria

### AC-01
Given no data exists, when user opens the app, then a default empty state is shown.

### AC-02
Given a list exists, when user adds item name, quantity, and price, then subtotal and list total update within 200ms.

### AC-03
Given budget is configured, when list total changes, then budget status updates correctly (`within` or `over`).

### AC-04
Given user refreshes browser, when app loads, then previously saved lists and budget are restored within 2 seconds.

### AC-05
Given user is on mobile, when using core actions, then all major buttons are visible and usable without layout break.
