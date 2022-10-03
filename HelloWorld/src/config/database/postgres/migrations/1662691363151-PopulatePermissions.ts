import { MigrationInterface, QueryRunner } from 'typeorm';
import {
  createInsertPermissionQuery,
  createRemovePermissionByNameQuery,
} from '../utils/permissions';
import { UPLOAD_PERMISSION } from '../../../../shared/constants/permissions/upload-permission.enum';
import { USER_PERMISSION } from '../../../../shared/constants/permissions/user-permission.enum';

export class PopulatePermissions1662691363151 implements MigrationInterface {
  private permissions = [
    UPLOAD_PERMISSION.DELETE_UPLOADED_FILE,
    UPLOAD_PERMISSION.UPLOAD_FILE,
    UPLOAD_PERMISSION.GET_UPLOADED_FILE,
    USER_PERMISSION.GET_USERS,
  ];

  public async up(queryRunner: QueryRunner): Promise<void> {
    for (const permission of this.permissions) {
      await queryRunner.query(createInsertPermissionQuery(permission));
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    for (const permission of this.permissions) {
      await queryRunner.query(createRemovePermissionByNameQuery(permission));
    }
  }
}
