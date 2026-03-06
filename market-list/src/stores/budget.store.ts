import type { Budget } from "@/lib/domain/entities/budget";
import { create } from "zustand";
import { schedulePersistState } from "./hydration/persist-state";

type BudgetStoreState = {
  budget: Budget | null;
  setBudget: (budget: Budget) => void;
  clearBudget: () => void;
};

export const useBudgetStore = create<BudgetStoreState>((set) => ({
  budget: null,
  setBudget: (budget) => {
    set({ budget });
    schedulePersistState();
  },
  clearBudget: () => {
    set({ budget: null });
    schedulePersistState();
  },
}));
