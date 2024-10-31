import axios, { AxiosError } from "axios";
import { API_URL } from "@/common/constants/api";
import { ApiError } from "@/src/common/errors/api_error";
import { LightingReportModel } from "../model/lighting_report_models";
import { LightingReportEntity } from "../../domain/entities/lighting_report_entity";
import { LightingReportDataSource } from "../../domain/datasources/lighting_report_datasources";

export class LightingReportDataSourceImpl implements LightingReportDataSource {
  async saveLightingReport(
    lighting_report: LightingReportEntity
  ): Promise<void> {
    const lighting_reportModel: LightingReportModel = {
      startCoords: {
        latitude: lighting_report.startCoords.latitude,
        longitude: lighting_report.startCoords.longitude,
      },
      endCoords: {
        latitude: lighting_report.endCoords.latitude,
        longitude: lighting_report.endCoords.longitude,
      },
      user: lighting_report.userId,
      date: new Date().toISOString(),
    };

    console.log("Datos que se envían al backend:", lighting_reportModel);
    try {
      const { status } = await axios.post(
        `${API_URL}/lighted-streets`,
        lighting_reportModel
      );
      console.log(status);
      console.log("Datos que se envían al backend:", lighting_reportModel);
      if (status !== 201) {
        throw new Error();
      }
    } catch (error) {
      const apiError = error as AxiosError;
      const message = apiError.response
        ? (apiError.response.data as { message: string }).message
        : "Error desconocido";
      console.log("Error al guardar la noticia:", apiError.response?.data);

      throw new ApiError(message, apiError.response?.status || 500);
    }
  }
}
