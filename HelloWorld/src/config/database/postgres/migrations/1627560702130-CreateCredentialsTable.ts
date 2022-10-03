import { MigrationInterface, QueryRunner, Table } from 'typeorm';

import { createdAt, id, updatedAt } from '../utils';

export class CreateCredentialsTable1627560702130 implements MigrationInterface {
  private table = new Table({
    name: 'credentials',
    columns: [
      id,
      {
        name: 'email',
        type: 'varchar',
        isUnique: true,
        isNullable: false,
      },
      {
        name: 'password',
        type: 'varchar',
        isNullable: false,
      },
      {
        name: 'type',
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
