# Market List UI Wireframe Spec

## 1. Wireflow Map

`Dashboard -> Create List Modal -> List Detail -> Add/Edit Item -> Budget Update -> Status Feedback`

## 2. Screen A - Dashboard

### Desktop Wireframe (>= 1024px)

```text
+----------------------------------------------------------------------------------+
| LOGO: Market List                                              [Settings] [Help] |
+----------------------------------------------------------------------------------+
| +----------------------+  +----------------------+  +--------------------------+ |
| | Budget Card          |  | Total Spent          |  | Remaining Balance        | |
| | R$ 1.200,00          |  | R$ 480,00            |  | R$ 720,00                | |
| | Period: Monthly      |  | This cycle           |  | Status: Within budget    | |
| | [Edit Budget]        |  |                      |  |                          | |
| +----------------------+  +----------------------+  +--------------------------+ |
|                                                                                  |
| Lists                                                                     [+ New]|
| +------------------------------------------------------------------------+       |
| | Supermarket - Week 1                           R$ 320,00      [Open]   |       |
| | Supermarket - Week 2                           R$ 160,00      [Open]   |       |
| +------------------------------------------------------------------------+       |
+----------------------------------------------------------------------------------+
```

### Mobile Wireframe (360px-767px)

```text
+------------------------------+
| Market List          [Menu]  |
+------------------------------+
| Budget: R$ 1.200,00          |
| Spent:  R$ 480,00            |
| Remain: R$ 720,00 (Green)    |
| [Edit Budget]                |
+------------------------------+
| Lists                  [+]   |
| - Week 1   R$320  [Open]     |
| - Week 2   R$160  [Open]     |
+------------------------------+
```

## 3. Screen B - Create List Modal

```text
+--------------------------------------------------+
| Create New List                              [X] |
+--------------------------------------------------+
| List Name                                      * |
| [______________________________________________] |
|                                                  |
| Validation: 1-60 chars, non-empty               |
|                                                  |
|                          [Cancel] [Create List] |
+--------------------------------------------------+
```

## 4. Screen C - List Detail

### Desktop Wireframe

```text
+----------------------------------------------------------------------------------+
| <- Back to Dashboard        Supermarket - Week 1                    [Delete List]|
+----------------------------------------------------------------------------------+
| +--------------------------------------------+  +------------------------------+ |
| | Items                                      |  | Summary                      | |
| | Name       Qty   Unit Price    Subtotal    |  | Items: 8                     | |
| | Rice       2     28,50         57,00       |  | List Total: R$ 320,00        | |
| | Beans      3     9,90          29,70       |  | Budget: R$ 1.200,00          | |
| | ...                                        |  | Status: Within budget (Green)| |
| |                                            |  | Remaining: R$ 880,00         | |
| | [Edit] [Remove] per row                    |  |                              | |
| +--------------------------------------------+  +------------------------------+ |
|                                                                                  |
| [Add Item]                                                                        |
+----------------------------------------------------------------------------------+
```

### Mobile Wireframe

```text
+------------------------------+
| <- Week 1        [Delete]    |
+------------------------------+
| Total: R$ 320,00             |
| Status: Within (Green)       |
| Remaining: R$ 880,00         |
+------------------------------+
| Rice        2 x 28,50 = 57,00|
| [Edit] [Remove]              |
| Beans       3 x 9,90 = 29,70 |
| [Edit] [Remove]              |
| ...                          |
+------------------------------+
| [Add Item]                   |
+------------------------------+
```

## 5. Screen D - Add/Edit Item Drawer

```text
+--------------------------------------------------+
| Add Item                                     [X] |
+--------------------------------------------------+
| Name                                          *  |
| [______________________________________________] |
| Quantity                                      *  |
| [____________]                                   |
| Unit Price (R$)                               *  |
| [____________]                                   |
| Category (optional)                               |
| [______________________________________________] |
|                                                  |
| Inline validation:                               |
| - quantity > 0                                   |
| - unitPrice >= 0 (2 decimals)                    |
|                                                  |
|                          [Cancel] [Save Item]    |
+--------------------------------------------------+
```

## 6. Screen E - Budget Edit Modal

```text
+--------------------------------------------------+
| Edit Budget                                  [X] |
+--------------------------------------------------+
| Amount (R$)                                   *  |
| [______________________________________________] |
| Period                                         * |
| ( ) Monthly    ( ) Yearly                        |
|                                                  |
| Preview:                                         |
| - Total list: R$ 320,00                          |
| - Remaining: R$ 880,00                           |
| - Status: Within budget                          |
|                                                  |
|                          [Cancel] [Save Budget]  |
+--------------------------------------------------+
```

## 7. Feedback and States

- Within budget state: green badge + label `Within budget`.
- Over budget state: red badge + label `Over budget`.
- Empty state: clear CTA `Create List`.
- Error state: inline field errors + non-blocking top alert for save/reload failures.

## 8. Interaction Notes

- Primary actions stay visible on mobile (`Create List`, `Add Item`, `Save Budget`).
- Every add/edit/delete triggers total recalculation and status refresh.
- Keyboard navigation supports all controls; focus order is logical and visible.

## 9. Component Inventory

- Cards: `BudgetCard`, `TotalCard`, `RemainingCard`
- List controls: `ListRow`, `ListActions`, `ListSelector`
- Forms: `ListForm`, `ItemForm`, `BudgetForm`
- Status UI: `BudgetBadge`, `InlineValidation`, `ToastAlert`
