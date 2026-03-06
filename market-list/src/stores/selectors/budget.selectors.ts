import { calculateBudgetStatus } from "@/lib/domain/services/calculate-budget-status";
import { useBudgetStore } from "../budget.store";

export const budgetSelectors = {
  useBudget: () => useBudgetStore((state) => state.budget),
  getStatus: (total: number, budgetAmount: number | null) => {
    if (budgetAmount === null) return null;
    return calculateBudgetStatus(total, budgetAmount);
  },
};
