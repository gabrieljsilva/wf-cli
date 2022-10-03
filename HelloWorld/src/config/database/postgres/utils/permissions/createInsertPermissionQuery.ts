export function createInsertPermissionQuery(name: string) {
  return `INSERT INTO permissions (name) VALUES ('${name}');`;
}
