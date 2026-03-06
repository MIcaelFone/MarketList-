import { create } from "zustand";

type AppUiStoreState = {
  isHydrating: boolean;
  hydratedOnce: boolean;
  createListModalOpen: boolean;
  budgetModalOpen: boolean;
  setHydrating: (value: boolean) => void;
  setHydratedOnce: () => void;
  setCreateListModalOpen: (value: boolean) => void;
  setBudgetModalOpen: (value: boolean) => void;
};

export const useAppUiStore = create<AppUiStoreState>((set) => ({
  isHydrating: true,
  hydratedOnce: false,
  createListModalOpen: false,
  budgetModalOpen: false,
  setHydrating: (value) => set({ isHydrating: value }),
  setHydratedOnce: () => set({ hydratedOnce: true }),
  setCreateListModalOpen: (value) => set({ createListModalOpen: value }),
  setBudgetModalOpen: (value) => set({ budgetModalOpen: value }),
}));
