export interface NewsModel {
  title: string;
  content: string;
  point: {
    latitude: number;
    longitude: number;
  };
  user: string;
  date: string;
}
