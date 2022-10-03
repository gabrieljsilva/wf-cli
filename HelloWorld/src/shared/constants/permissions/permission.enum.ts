import { UPLOAD_PERMISSION } from './upload-permission.enum';
import { USER_PERMISSION } from './user-permission.enum';

export const Permission = {
  ...UPLOAD_PERMISSION,
  ...USER_PERMISSION,
};

export type PermissionType = keyof typeof Permission;
