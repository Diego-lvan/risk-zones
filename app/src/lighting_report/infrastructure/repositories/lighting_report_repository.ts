import { LightingReportDataSource } from "../../domain/datasources/lighting_report_datasources";
import { LightingReportEntity } from "../../domain/entities/lighting_report_entity";
import { LightingReportRepository } from "../../domain/repositories/lighting_report_repository";

export class LightingReportRepositoryImpl implements LightingReportRepository {
  private readonly dataSource: LightingReportDataSource;

  constructor(dataSource: LightingReportDataSource) {
    this.dataSource = dataSource;
  }
  async saveLightingReport(
    lighting_report: LightingReportEntity
  ): Promise<void> {
    return await this.dataSource.saveLightingReport(lighting_report);
  }
}
