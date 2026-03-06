export function updateItem<T>(item: T, patch: Partial<T>): T {
  return { ...item, ...patch };
}
