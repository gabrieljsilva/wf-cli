import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { createdAt, id, updatedAt } from '../utils';

export class AddNotificationsSentTable1659492423516
  implements MigrationInterface
{
  private table = new Table({
    name: 'notifications_sent',
    columns: [
      id,
      {
        name: 'is_read',
        type: 'boolean',
        isNullable: false,
      },
      {
        name: 'credentials_id',
        type: 'varchar',
        isNullable: false,
      },
      {
        name: 'notification_id',
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
