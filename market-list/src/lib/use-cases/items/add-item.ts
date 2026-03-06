import { createItemId } from "@/lib/utils/id";

export function addItem(input: { name: string; quantity: number; unitPrice: number; category?: string }) {
  return {
    id: createItemId(),
    name: input.name,
    quantity: input.quantity,
    unitPrice: input.unitPrice,
    category: input.category,
  };
}
