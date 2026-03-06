import type { AppStateSchema } from "@/lib/schemas/app-state.schema";

type Migrator = (input: unknown) => unknown;
const migrators = new Map<number, Migrator>();

export function registerMigration(version: number, migrator: Migrator): void {
  migrators.set(version, migrator);
}

export function runMigrations(data: unknown, currentVersion: number, targetVersion: number): AppStateSchema | null {
  let next = data;
  for (let version = currentVersion; version < targetVersion; version += 1) {
    const migrator = migrators.get(version);
    if (!migrator) break;
    next = migrator(next);
  }
  return next as AppStateSchema;
}
