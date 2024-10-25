import { Injectable } from '@nestjs/common';
import { CreateLightingReportDto } from './dto/create-lighting-report.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LightingReport } from './entities/lighting-report.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class LightingReportService {
  constructor(
    @InjectRepository(LightingReport)
    private lightingReportRepository: Repository<LightingReport>,
    private readonly userService: UserService,
  ) {}

  async createLightingReport(createLightingReportDto: CreateLightingReportDto): Promise<LightingReport> {
    const user = await this.userService.findOne(createLightingReportDto.user);
    if (!user) {
      throw new Error('User not found');
    }

    // Crear una nueva instancia de LightingReport
    const lightingReport = new LightingReport();

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
    lightingReport.created_at = new Date();

    // Guardar el reporte de iluminación en la base de datos
    return this.lightingReportRepository.save(lightingReport);
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
