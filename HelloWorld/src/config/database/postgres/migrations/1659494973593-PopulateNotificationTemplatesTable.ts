import { MigrationInterface, QueryRunner } from 'typeorm';
import {
  createInsertNotificationTemplateQuery,
  InsertNotificationTemplateParams,
} from '../utils';
import { createDeleteNotificationTemplateQuery } from '../utils/notification/createDeleteNotificationTemplateQuery';

export class PopulateNotificationTemplatesTable1659494973593
  implements MigrationInterface
{
  private template: InsertNotificationTemplateParams = {
    key: 'SUCCESS_TO_SEND_NOTIFICATION',
    title: 'Hello World',
    body: 'Lorem ipsum dolor sit $USER_NAME, consectetur adipiscing elit. Duis vitae felis metus. Donec auctor vel tortor sed venenatis. Nam convallis leo eget lorem ultricies, id aliquet libero mollis',
    variables: ['USER_NAME'],
    notification_type_name: 'SUCCESS',
  };
  public async up(queryRunner: QueryRunner): Promise<void> {
    const query = createInsertNotificationTemplateQuery(this.template);
    await queryRunner.query(query);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      createDeleteNotificationTemplateQuery(this.template.key),
    );
  }
}
