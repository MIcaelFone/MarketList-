import { useMarketListStore } from "@/stores/market-list.store";

export function useMarketLists() {
  const lists = useMarketListStore((state) => state.lists);
  const createList = useMarketListStore((state) => state.createList);
  const renameList = useMarketListStore((state) => state.renameList);
  const deleteList = useMarketListStore((state) => state.deleteList);
  return { lists, createList, renameList, deleteList };
}
