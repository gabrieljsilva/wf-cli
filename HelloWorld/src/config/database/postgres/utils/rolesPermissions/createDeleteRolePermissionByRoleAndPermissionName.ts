export function createDeleteRolePermissionByRoleAndPermissionName(
  role: string,
  permission: string,
) {
  return `
    DELETE FROM roles_permissions 
        WHERE role_id = (SELECT id FROM roles WHERE name = '${role}')
        AND permission_id = (SELECT id FROM permissions WHERE name = '${permission}')
  ;`;
}
