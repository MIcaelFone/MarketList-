import { createListId } from "@/lib/utils/id";

export function createList(name: string) {
  return {
    id: createListId(),
    name,
    createdAt: new Date().toISOString(),
    items: [],
  };
}
