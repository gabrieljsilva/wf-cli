import { MigrationInterface, QueryRunner } from 'typeorm';

export class PopulateNotificationTypesTable1659493943653
  implements MigrationInterface
{
  private notificationTypes = ['ALERT', 'SUCCESS'];
  public async up(queryRunner: QueryRunner): Promise<void> {
    for (const type of this.notificationTypes) {
      await queryRunner.query(
        `INSERT INTO notification_types (type) VALUES ('${type}');`,
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    for (const type of this.notificationTypes) {
      await queryRunner.query(
        `DELETE FROM notification_types WHERE type = '${type}';`,
      );
    }
  }
}
