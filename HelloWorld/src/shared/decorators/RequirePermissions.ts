import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { GQLAuthGuard, RequirePermissionsGuard } from '../guards';
import { Permission, PermissionType } from '../constants/permissions';

export function RequirePermissions(...permissions: PermissionType[]) {
  return applyDecorators(
    SetMetadata('permissions', permissions),
    UseGuards(GQLAuthGuard, RequirePermissionsGuard),
  );
}
