import { SendNotificationDataSource } from "../../domain/datasources/notification_datasource";
import { NotificationEntity } from "../../domain/entities/notification_entity";
import { NotificationRepository } from "../../domain/repositories/notification_repository";

export class NotificationRepositoryImpl implements NotificationRepository {
  private readonly dataSource: SendNotificationDataSource;

  constructor(dataSource: SendNotificationDataSource) {
    this.dataSource = dataSource;
  }
  async sendNotification(notification: NotificationEntity): Promise<void> {
    return await this.dataSource.sendNotification(notification);
  }
}
