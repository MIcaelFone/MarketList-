import { useBudgetStore } from "@/stores/budget.store";

export function useBudget() {
  const budget = useBudgetStore((state) => state.budget);
  const setBudget = useBudgetStore((state) => state.setBudget);
  const clearBudget = useBudgetStore((state) => state.clearBudget);
  return { budget, setBudget, clearBudget };
}
