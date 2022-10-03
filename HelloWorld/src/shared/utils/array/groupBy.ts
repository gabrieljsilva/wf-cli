import { clone } from '../object';

export function groupBy<T = any>(array: T[], key: string): Record<string, T[]> {
  const cloned = clone(array);
  return cloned.reduce((result, currentValue) => {
    (result[currentValue[key]] = result[currentValue[key]] || []).push(
      currentValue,
    );
    return result;
  }, {});
}
