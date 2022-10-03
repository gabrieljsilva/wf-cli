export function clone<T = any>(obj: T): T {
  return JSON.parse(JSON.stringify(obj)) as T;
}
