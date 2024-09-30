export class DbConstants {
  static DB_HOST: string = process.env.DB_HOST || 'localhost';
  static DB_PORT: number = process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3030;
  static DB_USER: string = process.env.DB_USER || 'postgres';
  static DB_PASSWORD: string = process.env.DB_PASSWORD || 'root';
  static DB_NAME: string = process.env.DB_NAME || 'risk_zones';
  static DB_SYNC: boolean = process.env.DB_SYNC === 'true';
}
