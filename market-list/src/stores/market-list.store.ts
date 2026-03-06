import { addItem } from "@/lib/use-cases/items/add-item";
import { updateItem } from "@/lib/use-cases/items/update-item";
import { createList } from "@/lib/use-cases/lists/create-list";
import { renameList } from "@/lib/use-cases/lists/rename-list";
import { validateItemName, validateQuantity, validateUnitPrice } from "@/lib/domain/validation/item-rules";
import { validateListName } from "@/lib/domain/validation/list-name-rules";
import { create } from "zustand";
import { schedulePersistState } from "./hydration/persist-state";

export type MarketItemState = {
  id: string;
  name: string;
  quantity: number;
  unitPrice: number;
  category?: string;
};

export type MarketListState = {
  id: string;
  name: string;
  createdAt: string;
  items: MarketItemState[];
};

export type ItemInput = {
  name: string;
  quantity: number;
  unitPrice: number;
  category?: string;
};

export type MarketListStoreState = {
  lists: MarketListState[];
  selectedListId: string | null;
  listError: string | null;
  itemError: string | null;
  createList: (name: string) => boolean;
  renameList: (listId: string, name: string) => boolean;
  deleteList: (listId: string) => void;
  selectList: (listId: string | null) => void;
  addItemToList: (listId: string, input: ItemInput) => boolean;
  updateListItem: (listId: string, itemId: string, patch: Partial<ItemInput>) => boolean;
  removeListItem: (listId: string, itemId: string) => void;
  setLists: (lists: MarketListState[]) => void;
};

function validateItemInput(input: ItemInput): string | null {
  return (
    validateItemName(input.name) ??
    validateQuantity(input.quantity) ??
    validateUnitPrice(input.unitPrice)
  );
}

export const useMarketListStore = create<MarketListStoreState>((set) => ({
  lists: [],
  selectedListId: null,
  listError: null,
  itemError: null,
  createList: (name) => {
    const error = validateListName(name);
    if (error) {
      set({ listError: error });
      return false;
    }
    set((state) => ({
      listError: null,
      lists: [...state.lists, createList(name.trim())],
    }));
    schedulePersistState();
    return true;
  },
  renameList: (listId, name) => {
    const error = validateListName(name);
    if (error) {
      set({ listError: error });
      return false;
    }
    set((state) => ({
      listError: null,
      lists: state.lists.map((list) => (list.id === listId ? { ...list, name: renameList(name) } : list)),
    }));
    schedulePersistState();
    return true;
  },
  deleteList: (listId) => {
    set((state) => ({
      lists: state.lists.filter((list) => list.id !== listId),
      selectedListId: state.selectedListId === listId ? null : state.selectedListId,
      listError: null,
    }));
    schedulePersistState();
  },
  selectList: (listId) => set({ selectedListId: listId }),
  addItemToList: (listId, input) => {
    const error = validateItemInput(input);
    if (error) {
      set({ itemError: error });
      return false;
    }
    set((state) => ({
      itemError: null,
      lists: state.lists.map((list) =>
        list.id === listId ? { ...list, items: [...list.items, addItem(input)] } : list,
      ),
    }));
    schedulePersistState();
    return true;
  },
  updateListItem: (listId, itemId, patch) => {
    if (patch.name !== undefined || patch.quantity !== undefined || patch.unitPrice !== undefined) {
      const error = validateItemInput({
        name: patch.name ?? "fallback",
        quantity: patch.quantity ?? 1,
        unitPrice: patch.unitPrice ?? 0,
        category: patch.category,
      });
      if (error) {
        set({ itemError: error });
        return false;
      }
    }

    set((state) => ({
      itemError: null,
      lists: state.lists.map((list) =>
        list.id === listId
          ? {
              ...list,
              items: list.items.map((item) => (item.id === itemId ? updateItem(item, patch) : item)),
            }
          : list,
      ),
    }));
    schedulePersistState();
    return true;
  },
  removeListItem: (listId, itemId) => {
    set((state) => ({
      itemError: null,
      lists: state.lists.map((list) =>
        list.id === listId ? { ...list, items: list.items.filter((item) => item.id !== itemId) } : list,
      ),
    }));
    schedulePersistState();
  },
  setLists: (lists) => set({ lists, listError: null, itemError: null }),
}));
