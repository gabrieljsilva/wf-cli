export interface InsertNotificationTemplateParams {
  key: string;
  title: string;
  body: string;
  variables: string[];
  notification_type_name: string;
}

export function createInsertNotificationTemplateQuery(
  params: InsertNotificationTemplateParams,
): string {
  return `
    INSERT INTO notification_templates (
      "key",
      title,
      body,
      variables,
      notification_type_id
    ) VALUES (
        '${params.key}',
        '${params.title}',
        '${params.body}',
        '{${params.variables.join()}}',
        (SELECT id FROM notification_types WHERE type = '${
          params.notification_type_name
        }')
    );
  `;
}
