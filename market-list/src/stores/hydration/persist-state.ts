import { writeLocalStorage } from "@/lib/adapters/storage/local-storage-adapter";
import { STORAGE_KEY, STORAGE_VERSION } from "@/lib/adapters/storage/storage-keys";
import { useBudgetStore } from "../budget.store";
import { useMarketListStore } from "../market-list.store";

let persistTimer: ReturnType<typeof setTimeout> | null = null;

export function persistState(): void {
  const payload = {
    version: STORAGE_VERSION,
    budget: useBudgetStore.getState().budget,
    lists: useMarketListStore.getState().lists,
  };
  writeLocalStorage(STORAGE_KEY, JSON.stringify(payload));
}

export function schedulePersistState(): void {
  if (persistTimer) {
    clearTimeout(persistTimer);
  }
  persistTimer = setTimeout(() => {
    persistState();
  }, 250);
}
