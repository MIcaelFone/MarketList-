import type { MarketItem } from "../entities/market-item";

export function calculateItemSubtotal(item: Pick<MarketItem, "quantity" | "unitPrice">): number {
  return Number((item.quantity * item.unitPrice).toFixed(2));
}
