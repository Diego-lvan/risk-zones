import { LightingReportEntity } from "../entities/lighting_report_entity";

export interface LightingReportDataSource {
  saveLightingReport(lightingReport: LightingReportEntity): Promise<void>;
}
