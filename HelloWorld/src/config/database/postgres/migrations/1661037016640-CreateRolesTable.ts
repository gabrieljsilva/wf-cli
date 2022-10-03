import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { createdAt, id, updatedAt } from '../utils';

export class CreateRolesTable1661037016640 implements MigrationInterface {
  private table = new Table({
    name: 'roles',
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
