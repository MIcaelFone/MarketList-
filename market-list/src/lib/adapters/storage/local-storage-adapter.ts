import { PersistenceError } from "@/lib/errors/persistence-error";

export function readLocalStorage(key: string): string | null {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage.getItem(key);
  } catch (error) {
    throw new PersistenceError(`Failed to read local storage: ${String(error)}`);
  }
}

export function writeLocalStorage(key: string, value: string): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, value);
  } catch (error) {
    throw new PersistenceError(`Failed to write local storage: ${String(error)}`);
  }
}
