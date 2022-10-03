export function createInsertRolePermissionQuery(
  role: string,
  permission: string,
) {
  return `
    INSERT INTO roles_permissions (role_id, permission_id)
        VALUES (
            (SELECT id FROM roles WHERE name = '${role}'),
            (SELECT id FROM permissions WHERE name = '${permission}')
        )
  ;`;
}
