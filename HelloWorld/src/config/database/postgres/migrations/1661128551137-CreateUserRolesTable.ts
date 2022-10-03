import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { createdAt, id, updatedAt } from '../utils';

export class CreateUserRolesTable1661128551137 implements MigrationInterface {
  private table = new Table({
    name: 'users_roles',
    columns: [
      id,
      {
        name: 'user_id',
        type: 'varchar',
        isNullable: false,
      },
      {
        name: 'role_id',
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
