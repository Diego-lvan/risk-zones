import { ApiError } from "@/src/common/errors/api_error";
import { LightingReportRepository } from "../repositories/lighting_report_repository";
import { LightingReportDataSourceImpl } from "../../infrastructure/datasources/lighting_report_datasource";
import { LightingReportEntity } from "../entities/lighting_report_entity";
import { LightingReportRepositoryImpl } from "../../infrastructure/repositories/lighting_report_repository";
import { LightingReportForm } from "../../hooks/useValidateLigthingReportForm";

export class SaveLightingReportUseCase {
  private lightingReportRepository: LightingReportRepository;

  constructor() {
    const datasource = new LightingReportDataSourceImpl();
    this.lightingReportRepository = new LightingReportRepositoryImpl(
      datasource
    );
  }

  public async execute(lightingReports: LightingReportForm) {
    try {
      console.log("Datos recibidos en execute:", lightingReports);
      const lightingReportEntity = this.validate(lightingReports);
      await this.lightingReportRepository.saveLightingReport(
        lightingReportEntity
      );
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError("Error saving news", 500);
    }
  }

  private validate(lightingReports: LightingReportForm): LightingReportEntity {
    const publishedAt = new Date(lightingReports.created_at);
    if (isNaN(publishedAt.getTime())) {
      throw new Error("Invalid published date");
    }
    if (
      !lightingReports.startLatitude ||
      !lightingReports.startLongitude ||
      !lightingReports.endLatitude ||
      !lightingReports.endLongitude
    ) {
      throw new Error("Invalid coordinates");
    }

    return {
      created_at: publishedAt,
      startCoords: {
        latitude: lightingReports.startLatitude,
        longitude: lightingReports.startLongitude,
      },
      endCoords: {
        latitude: lightingReports.endLatitude,
        longitude: lightingReports.endLongitude,
      },
      userId: lightingReports.userId,
    };
  }
}
