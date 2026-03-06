import { calculateListTotal } from "@/lib/domain/services/calculate-list-total";
import { useBudgetStore } from "../budget.store";
import { useMarketListStore } from "../market-list.store";

export const dashboardSelectors = {
  useTotalSpent: () =>
    useMarketListStore((state) =>
      Number(state.lists.reduce((sum, list) => sum + calculateListTotal(list.items), 0).toFixed(2)),
    ),
  useRemainingBudget: () => {
    const budget = useBudgetStore((state) => state.budget);
    const totalSpent = useMarketListStore((state) =>
      Number(state.lists.reduce((sum, list) => sum + calculateListTotal(list.items), 0).toFixed(2)),
    );
    if (!budget) return null;
    return Number((budget.amount - totalSpent).toFixed(2));
  },
};
