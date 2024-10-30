import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LightedStreet } from './entities/lighted_street.entity';
import { Repository } from 'typeorm';
import { LightedStreetDTO } from './dto/lighted-street.dto';
import { UserService } from 'src/user/user.service';
import { CreateLightingReportDto } from './dto/create-lighting-report.dto';

@Injectable()
export class LightedStreetsService {
  constructor(
    @InjectRepository(LightedStreet) private lightedStreetRepository: Repository<LightedStreet>,
    private readonly userService: UserService,
  ) {}

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

  async createLightingReport(createLightingReportDto: CreateLightingReportDto): Promise<LightedStreet> {
    const user = await this.userService.findOne(createLightingReportDto.user);
    if (!user) {
      throw new Error('User not found');
    }

    // Crear una nueva instancia de LightingReport
    const lightingReport = new LightedStreet();

    // Asignar las coordenadas en formato tipo Point
    lightingReport.startCoords = {
      type: 'Point',
      coordinates: [createLightingReportDto.startCoords.longitude, createLightingReportDto.startCoords.latitude],
    };
    lightingReport.endCoords = {
      type: 'Point',
      coordinates: [createLightingReportDto.endCoords.longitude, createLightingReportDto.endCoords.latitude],
    };

    // Asignar el usuario al reporte de iluminación
    lightingReport.user = user;

    // Asignar la fecha actual
    lightingReport.createdAt = new Date();

    // Guardar el reporte de iluminación en la base de datos
    return this.lightedStreetRepository.save(lightingReport);
  }

  findAll() {
    return `This action returns all lightingReport`;
  }

  findOne(id: number) {
    return `This action returns a #${id} lightingReport`;
  }

  remove(id: number) {
    return `This action removes a #${id} lightingReport`;
  }
}
