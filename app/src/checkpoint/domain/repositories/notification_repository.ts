import { NotificationEntity } from "../entities/notification_entity";

export interface NotificationRepository {
  sendNotification(notification: NotificationEntity): Promise<void>;
}
