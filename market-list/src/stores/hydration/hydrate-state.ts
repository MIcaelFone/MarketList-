import { runMigrations } from "@/lib/adapters/storage/migrations";
import { readLocalStorage } from "@/lib/adapters/storage/local-storage-adapter";
import { STORAGE_KEY, STORAGE_VERSION } from "@/lib/adapters/storage/storage-keys";
import { appStateSchema } from "@/lib/schemas/app-state.schema";
import { useAppUiStore } from "../app-ui.store";
import { useBudgetStore } from "../budget.store";
import { useMarketListStore } from "../market-list.store";

export function hydrateState(): void {
  useAppUiStore.getState().setHydrating(true);
  try {
    const raw = readLocalStorage(STORAGE_KEY);
    if (!raw) {
      useMarketListStore.getState().setLists([]);
      useBudgetStore.getState().clearBudget();
      return;
    }

    const parsed = JSON.parse(raw) as { version?: number };
    const version = parsed?.version ?? STORAGE_VERSION;
    const migrated = runMigrations(parsed, version, STORAGE_VERSION);
    const result = appStateSchema.safeParse(migrated);

    if (!result.success) {
      console.warn("[hydration] invalid persisted payload, falling back to empty state");
      useMarketListStore.getState().setLists([]);
      useBudgetStore.getState().clearBudget();
      return;
    }

    useMarketListStore.getState().setLists(result.data.lists);
    if (result.data.budget) {
      useBudgetStore.getState().setBudget(result.data.budget);
    } else {
      useBudgetStore.getState().clearBudget();
    }
  } catch (error) {
    console.error("[hydration] failed", error);
    useMarketListStore.getState().setLists([]);
    useBudgetStore.getState().clearBudget();
  } finally {
    useAppUiStore.getState().setHydrating(false);
    useAppUiStore.getState().setHydratedOnce();
  }
}
