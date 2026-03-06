import { nanoid } from "nanoid";

export function createListId(): string {
  return `list_${nanoid(8)}`;
}

export function createItemId(): string {
  return `item_${nanoid(8)}`;
}
