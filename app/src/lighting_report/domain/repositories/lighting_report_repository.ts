import { LightingReportEntity } from "../entities/lighting_report_entity";

export interface LightingReportRepository {
  saveLightingReport(report: LightingReportEntity): Promise<void>;
}
