import { useMarketListStore } from "@/stores/market-list.store";

export function useMarketItems(listId: string) {
  const list = useMarketListStore((state) => state.lists.find((entry) => entry.id === listId) ?? null);
  const setLists = useMarketListStore((state) => state.setLists);
  const lists = useMarketListStore((state) => state.lists);

  return {
    list,
    updateLists: (updater: typeof lists) => setLists(updater),
  };
}
