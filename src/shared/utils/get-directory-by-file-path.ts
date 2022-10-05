export function getDirectoryByFilePath(path: string) {
  const directoriesList = path.split('/');
  directoriesList.pop();
  return directoriesList.join('/');
}
