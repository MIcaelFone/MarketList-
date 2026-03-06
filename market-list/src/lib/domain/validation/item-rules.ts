export const ITEM_NAME_MAX = 80;

export function validateItemName(name: string): string | null {
  const normalized = name.trim();
  if (!normalized) {
    return "Item name is required.";
  }
  if (normalized.length > ITEM_NAME_MAX) {
    return `Item name must be at most ${ITEM_NAME_MAX} characters.`;
  }
  return null;
}

export function validateQuantity(quantity: number): string | null {
  if (!Number.isFinite(quantity) || quantity <= 0) {
    return "Quantity must be greater than 0.";
  }
  return null;
}

export function validateUnitPrice(unitPrice: number): string | null {
  if (!Number.isFinite(unitPrice) || unitPrice < 0) {
    return "Unit price must be 0 or greater.";
  }
  return null;
}
