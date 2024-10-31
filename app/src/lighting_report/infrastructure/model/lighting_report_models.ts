export interface LightingReportModel {
  user: string;
  created_at: Date;
  startCoords: {
    latitude: number;
    longitude: number;
  };
  endCoords: {
    latitude: number;
    longitude: number;
  };
}
