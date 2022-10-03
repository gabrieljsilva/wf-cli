export function createRemoveRolesByNameQuery(name: string) {
  return `DELETE FROM roles WHERE name = '${name}';`;
}
