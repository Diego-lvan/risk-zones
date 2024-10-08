import axios, { AxiosError } from "axios";
import { API_URL } from "@/common/constants/api";
import { ApiError } from "@/src/common/errors/api_error";
import { NotificationEntity } from "../../domain/entities/notification_entity";
import { SendNotificationDataSource } from "../../domain/datasources/notification_datasource";
import { CheckpointEntity } from "../../domain/entities/checkpoint_entity";
import { CheckpointRes } from "../../hooks/useSendNotification";

export class NotificationDataSourceImpl implements SendNotificationDataSource {
  async sendNotification(notification: NotificationEntity): Promise<void> {
    try {
      const { status } = await axios.post(`${API_URL}/checkpoint/notify`, notification);
      if (status !== 201) {
        throw new Error();
      }
    } catch (error) {
      const apiError = error as AxiosError;
      const message = apiError.response ? (apiError.response.data as { message: string }).message : "Error desconocido";
      throw new ApiError(message, apiError.response?.status || 500);
    }
  }

  async fetchCheckpoints(userId: string): Promise<CheckpointRes[]> {
    console.log("fetchCheckpoints");
    try {
      const { data } = await axios.get(`${API_URL}/checkpoint/user/${userId}`);
      return data as CheckpointRes[];
    } catch (error) {
      const apiError = error as AxiosError;
      const message = apiError.response ? (apiError.response.data as { message: string }).message : "Error desconocido";
      throw new ApiError(message, apiError.response?.status || 500);
    }
  }
}
