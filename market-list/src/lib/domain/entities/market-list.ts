import type { MarketItem } from "./market-item";

export type MarketList = {
  id: string;
  name: string;
  createdAt: string;
  items: MarketItem[];
};
