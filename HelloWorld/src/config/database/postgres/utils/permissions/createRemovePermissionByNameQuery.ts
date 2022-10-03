export function createRemovePermissionByNameQuery(name: string) {
  return `DELETE FROM permissions WHERE name = '${name}';`;
}
