import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { createdAt, id, updatedAt } from '../utils';

export class CreatePermissionsTable1661037205114 implements MigrationInterface {
  private table = new Table({
    name: 'permissions',
    columns: [
      id,
      {
        name: 'name',
        type: 'varchar',
        isUnique: true,
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
