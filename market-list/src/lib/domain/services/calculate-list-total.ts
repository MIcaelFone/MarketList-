import type { MarketItem } from "../entities/market-item";
import { calculateItemSubtotal } from "./calculate-item-subtotal";

export function calculateListTotal(items: MarketItem[]): number {
  return Number(items.reduce((sum, item) => sum + calculateItemSubtotal(item), 0).toFixed(2));
}
