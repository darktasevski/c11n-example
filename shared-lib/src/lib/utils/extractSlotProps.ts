export function extractSlotProps<T>(slot?: {
  type?: string;
  props?: T;
}): T | undefined {
  return slot?.type ? undefined : (slot?.props as T | undefined);
}
