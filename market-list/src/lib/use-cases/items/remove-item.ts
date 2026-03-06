export function removeItem<T extends { id: string }>(items: T[], itemId: string): T[] {
  return items.filter((item) => item.id !== itemId);
}
