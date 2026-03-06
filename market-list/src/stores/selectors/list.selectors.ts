import { calculateListTotal } from "@/lib/domain/services/calculate-list-total";
import { useMarketListStore } from "../market-list.store";

export const listSelectors = {
  useLists: () => useMarketListStore((state) => state.lists),
  useListError: () => useMarketListStore((state) => state.listError),
  useListById: (listId: string) =>
    useMarketListStore((state) => state.lists.find((list) => list.id === listId) ?? null),
  useListTotal: (listId: string) =>
    useMarketListStore((state) => {
      const list = state.lists.find((entry) => entry.id === listId);
      return list ? calculateListTotal(list.items) : 0;
    }),
};
