import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { createdAt, id, updatedAt } from '../utils';

export class CreateRolesPermissionsTable1661129236054
  implements MigrationInterface
{
  private table = new Table({
    name: 'roles_permissions',
    columns: [
      id,
      {
        name: 'role_id',
        type: 'varchar',
        isNullable: false,
      },
      {
        name: 'permission_id',
        type: 'varchar',
        isNullable: false,
      },
      createdAt,
      updatedAt,
    ],
  });
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.table);
  }
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.table);
  }
}
