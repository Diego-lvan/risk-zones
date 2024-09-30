import * as dotenv from 'dotenv';
import * as network from 'network';
import { join } from 'path';

let publicIp: string;

dotenv.config();

export class ServerConstants {
  static PORT: number = process.env.SERVER_PORT ? parseInt(process.env.SERVER_PORT) : 3003;
  static IP: string = publicIp || 'http://localhost';
  static HOST: string = `http://${publicIp || 'localhost'}:${this.PORT}`;
  static ROOT_PATH: string = join(__dirname, '..', '..');
  static ROOT_STATIC_PATH: string = join(__dirname, '..', '..', 'static');
}

network.get_private_ip(function (err, ip) {
  publicIp = ip;
  ServerConstants.IP = publicIp;
  ServerConstants.HOST = `http://${publicIp || 'localhost'}:${ServerConstants.PORT}`;
});
