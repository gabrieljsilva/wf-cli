export function createDeleteNotificationTemplateQuery(key: string) {
  return `DELETE FROM notification_templates WHERE "key" = '${key}'`;
}
