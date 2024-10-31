export interface LightingReportModel {
  user: string;
  date: string;
  startCoords: {
    latitude: number;
    longitude: number;
  };
  endCoords: {
    latitude: number;
    longitude: number;
  };
}
