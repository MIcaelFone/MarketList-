---
stepsCompleted:
  - 1
  - 2
  - 3
  - 4
  - 5
inputDocuments:
  - docs/market-list-website-prd.md
  - docs/market-list-ui-wireframes.md
  - _bmad-output/planning-artifacts/ux-design-specification.md
  - _bmad-output/planning-artifacts/architecture.md
date: 2026-03-06
author: Micael Fone
---

# Product Brief: Market List

## Executive Summary

Market List is a responsive web product for household shoppers who need to plan grocery purchases and control spending before checkout. The product focuses on fast list management, clear cost visibility, and immediate budget feedback using local-first persistence.

---

## Core Vision

### Problem Statement

People planning grocery shopping often estimate spending manually and discover budget overruns too late. Existing notes apps and generic to-do tools do not provide structured item totals, budget comparison, and reliable session persistence in one focused flow.

### Problem Impact

- Overspending due to late visibility of list totals
- Friction in updating quantities and prices while planning
- Low trust when data is lost after refresh or session changes

### Why Existing Solutions Fall Short

- Generic tools do not enforce grocery-specific fields and validations
- Spreadsheet approaches are slower on mobile and harder for routine use
- Many solutions lack clear within/over budget status tied to live totals

### Proposed Solution

Provide a lightweight responsive web app where users create lists, add items with quantity and unit price, and see automatic subtotal/total calculations plus immediate budget status.

### Key Differentiators

- Local-first reliability with fast restore behavior
- Budget status visibility integrated directly into planning flow
- Focused grocery domain model with clear validation and BRL formatting

## Target Users

### Primary Users

- Household shoppers who plan weekly/monthly grocery runs and need budget control
- Users who primarily operate on mobile but also review/update on desktop

### Secondary Users

- Family members who coordinate purchasing and need clear totals
- Cost-conscious users tracking spending trends by planning period

### User Journey

1. User opens dashboard and creates a list.
2. User adds items with quantity and unit price.
3. App recalculates totals instantly and compares against budget.
4. User adjusts list until status is within budget.
5. User returns later and state is restored from local persistence.

## Success Metrics

- 90%+ of first-time test users complete create list + add 3 items + set budget in under 3 minutes.
- 95th percentile interaction latency under 200ms for item mutations and budget recalculation.
- 99%+ successful state restore in automated refresh tests.
- 100% budget status correctness for below/equal/above-budget scenarios.

### Business Objectives

- Deliver a dependable MVP that increases planning confidence and repeat usage.
- Establish a scalable architecture for future enhancements (sync, sharing, insights).

### Key Performance Indicators

- Weekly active users who complete at least one list update flow.
- Percentage of sessions with persisted state successfully restored.
- Rate of users who configure budget and keep using the feature across sessions.

## MVP Scope

### Core Features

- Create, rename, delete shopping lists
- Add, edit, remove items with validation (name, quantity, unit price)
- Automatic subtotal and list total calculations
- Budget amount and period setup (monthly/yearly)
- Real-time budget status (within/over)
- Local persistence and restore
- Responsive UI across 360px to desktop

### Out of Scope for MVP

- Authentication and cloud sync
- Multi-user sharing and collaboration
- Payment flows and advanced reporting analytics

### MVP Success Criteria

- Core flows operate without layout break on mobile and desktop.
- Users can complete the primary planning loop quickly and without help.
- Data persistence and restore pass reliability targets in test runs.

### Future Vision

- Optional cloud backup and device sync
- Shared household lists with permissions
- Category analytics and spend trends
- Smart recommendations for budget optimization
