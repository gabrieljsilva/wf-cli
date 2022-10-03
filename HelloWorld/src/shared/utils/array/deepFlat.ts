export function deepFlat<T = any>(array: any): T {
  return array.reduce(function (result, element) {
    return (
      Array.isArray(element)
        ? result.push(...deepFlat(element))
        : result.push(element),
      result
    );
  }, []);
}
