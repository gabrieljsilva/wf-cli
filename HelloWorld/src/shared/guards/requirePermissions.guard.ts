import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Permission, PermissionType } from '../constants/permissions';
import { GqlExecutionContext } from '@nestjs/graphql';
import { deepFlat } from '../utils';

@Injectable()
export class RequirePermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const requiredPermissions = this.reflector.getAllAndOverride<
      PermissionType[]
    >('permissions', [context.getHandler(), context.getClass()]);

    const gqlContext = GqlExecutionContext.create(context).getContext();

    const userRolesArray = gqlContext.req.user.user.roles.map((role) =>
      role.permissions.map((permission) => permission.name),
    );

    const allUserPermissions = deepFlat<PermissionType>(userRolesArray);

    const hasAllRequiredPermissions = requiredPermissions?.every(
      (requiredPermission) => allUserPermissions.includes(requiredPermission),
    );

    return (
      !requiredPermissions ||
      requiredPermissions.length === 0 ||
      hasAllRequiredPermissions
    );
  }
}
