export function getFileNameByPath(path: string) {
  return path.split('/').pop();
}
