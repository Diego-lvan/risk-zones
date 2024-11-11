import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LightedStreet } from './entities/lighted_street.entity';
import { Repository } from 'typeorm';
import { LightedStreetDTO } from './dto/lighted-street.dto';
import { UserService } from 'src/user/user.service';
import { CreateLightingReportDto } from './dto/create-lighting-report.dto';
import { LightedStreetRatingDto } from './dto/create-lighting-rating.dto';
import { LightingRating } from './entities/lighting_rating.entity';

@Injectable()
export class LightedStreetsService {
  constructor(
    @InjectRepository(LightedStreet) private lightedStreetRepository: Repository<LightedStreet>,
    @InjectRepository(LightingRating) private lightingRatingRepository: Repository<LightingRating>,
    private readonly userService: UserService,
  ) {}

  /**
   * Retrieves lighted streets within a specified radius from given coordinates.
   * @param lat - Latitude of the center point.
   * @param long - Longitude of the center point.
   * @param radius - Radius to search within.
   * @returns A promise that resolves to an array of LightedStreetDTO.
   */
  async getLightedStreets(lat: number, long: number, radius: number): Promise<LightedStreetDTO[]> {
    const lightedStreetsEntities = await this.lightedStreetRepository
      .createQueryBuilder('lighted_street')
      .leftJoinAndSelect('lighted_street.user', 'user')
      .where(`ST_DWithin("startCoords",ST_MakePoint(:long, :lat)::geography,:radius)`, { long, lat, radius })
      .orWhere(`ST_DWithin("endCoords",ST_MakePoint(:long, :lat)::geography,:radius)`, { long, lat, radius })
      .getMany();

    const lightedStreets: LightedStreetDTO[] = await Promise.all(
      lightedStreetsEntities.map(async (street): Promise<LightedStreetDTO> => {
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
          rating: await this.getAverageRating(street.id),
        };
      }),
    );

    return lightedStreets;
  }

  /**
   * Calculates the average rating for a specific lighted street.
   * @param streetId - The ID of the lighted street.
   * @returns A promise that resolves to the average rating.
   */
  async getAverageRating(streetId: string): Promise<number> {
    const { average } = await this.lightingRatingRepository
      .createQueryBuilder('lighting_rating')
      .leftJoinAndSelect('lighting_rating.user', 'user')
      .leftJoinAndSelect('lighting_rating.street', 'lighted_street')
      .select('AVG("rating")', 'average')
      .where(`lighted_street.id = :streetId`, { streetId })
      .getRawOne();

    return average || 2;
  }

  /**
   * Rates a lighted street by a user.
   * @param lightedStreetRatingDto - Data transfer object containing rating details.
   * @throws HttpException if the user or lighted street is not found, or if the rating already exists.
   */
  async rateLightedStreet(lightedStreetRatingDto: LightedStreetRatingDto): Promise<void> {
    const user = await this.userService.findOne(lightedStreetRatingDto.userId);
    if (!user) {
      throw new Error('User not found');
    }

    const lightedStreet = await this.findOne(lightedStreetRatingDto.streetId);
    if (!lightedStreet) {
      throw new Error('Lighted street not found');
    }

    const existingRating = await this.lightingRatingRepository.findOne({
      where: {
        user: { id: lightedStreetRatingDto.userId },
        street: { id: lightedStreetRatingDto.streetId },
      },
    });

    if (existingRating) {
      throw new HttpException('Rating already exists for this user and street', HttpStatus.BAD_REQUEST);
    }

    const newRating = this.lightingRatingRepository.create({
      user,
      street: lightedStreet,
      rating: lightedStreetRatingDto.rating,
    });

    await this.lightingRatingRepository.save(newRating);
  }

  /**
   * Creates a new lighting report.
   * @param createLightingReportDto - Data transfer object containing report details.
   * @returns A promise that resolves to the created LightedStreet entity.
   * @throws Error if the user is not found.
   */
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

  /**
   * Retrieves all lighting reports.
   * @returns A string indicating the action.
   */
  findAll() {
    return `This action returns all lightingReport`;
  }

  /**
   * Retrieves a specific lighted street by ID.
   * @param id - The ID of the lighted street.
   * @returns A promise that resolves to the LightedStreet entity or null if not found.
   */
  async findOne(id: string): Promise<LightedStreet | null> {
    return await this.lightedStreetRepository.findOneBy({ id });
  }

  /**
   * Removes a specific lighting report by ID.
   * @param id - The ID of the lighting report.
   * @returns A string indicating the action.
   */
  remove(id: number) {
    return `This action removes a #${id} lightingReport`;
  }
}
