export function createInsertRolesQuery(name: string) {
  return `INSERT INTO roles (name) values('${name}');`;
}
