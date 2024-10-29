import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LightedStreet } from './entities/lighted_street.entity';
import { Repository } from 'typeorm';
import { LightedStreetDTO } from './dto/lighted-street.dto';

@Injectable()
export class LightedStreetsService {
  constructor(@InjectRepository(LightedStreet) private lightedStreetRepository: Repository<LightedStreet>) {}

  async getLightedStreets(lat: number, long: number, radius: number): Promise<LightedStreetDTO[]> {
    const lightedStreetsEntities = await this.lightedStreetRepository
      .createQueryBuilder('lighted_street')
      .leftJoinAndSelect('lighted_street.user', 'user')
      .where(`ST_DWithin("startCoords",ST_MakePoint(:long, :lat)::geography,:radius)`, { long, lat, radius })
      .orWhere(`ST_DWithin("endCoords",ST_MakePoint(:long, :lat)::geography,:radius)`, { long, lat, radius })
      .getMany();

    const lightedStreets: LightedStreetDTO[] = lightedStreetsEntities.map((street): LightedStreetDTO => {
      return {
        id: street.id,
        startCoords: {
          longitude: street.startCoords.coordinates[0],
          latitude: street.startCoords.coordinates[1],
        },
        endCoords: {
          longitude: street.endCoords.coordinates[0],
          latitude: street.endCoords.coordinates[1],
        },
        user: street.user.id,
        createdAt: street.createdAt,
      };
    });

    return lightedStreets;
  }
}
