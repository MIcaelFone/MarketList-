export type BudgetStatus = "within" | "over";

export function calculateBudgetStatus(total: number, budgetAmount: number): BudgetStatus {
  return total > budgetAmount ? "over" : "within";
}
