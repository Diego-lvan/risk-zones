import { CheckpointRes } from "../../hooks/useSendNotification";
import { CheckpointEntity } from "../entities/checkpoint_entity";
import { NotificationEntity } from "../entities/notification_entity";

export interface SendNotificationDataSource {
  sendNotification(notification: NotificationEntity): Promise<void>;

  fetchCheckpoints(userId: string): Promise<CheckpointRes[]>;
}
