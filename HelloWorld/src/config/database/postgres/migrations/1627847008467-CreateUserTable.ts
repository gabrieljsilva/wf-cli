import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

import { createdAt, id, updatedAt } from '../utils/columns';

export class CreateUserTable1627847008467 implements MigrationInterface {
  private table = new Table({
    name: 'users',
    columns: [
      id,
      {
        name: 'user_name',
        type: 'varchar',
        isNullable: false,
      },
      {
        name: 'credentials_id',
        type: 'varchar',
        isNullable: false,
      },
      {
        name: 'status',
        type: 'varchar',
        isNullable: false,
      },
      createdAt,
      updatedAt,
    ],
  });

  private tableForeignKey = new TableForeignKey({
    name: 'user_has_credentials',
    columnNames: ['credentials_id'],
    referencedTableName: 'credentials',
    referencedColumnNames: ['id'],
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.table);
    await queryRunner.createForeignKey(this.table, this.tableForeignKey);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(this.table, this.tableForeignKey);
    await queryRunner.dropTable(this.table);
  }
}
