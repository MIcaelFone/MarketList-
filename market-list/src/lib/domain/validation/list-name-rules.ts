export const LIST_NAME_MIN = 1;
export const LIST_NAME_MAX = 60;

export function validateListName(name: string): string | null {
  const normalized = name.trim();
  if (normalized.length < LIST_NAME_MIN) {
    return "List name is required.";
  }
  if (normalized.length > LIST_NAME_MAX) {
    return `List name must be at most ${LIST_NAME_MAX} characters.`;
  }
  return null;
}
