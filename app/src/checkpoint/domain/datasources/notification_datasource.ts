import { NotificationEntity } from "../entities/notification_entity";

export interface SendNotificationDataSource {
  sendNotification(notification: NotificationEntity): Promise<void>;
}
