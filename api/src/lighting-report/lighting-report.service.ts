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
    // Validar que el título no exceda de 6 palabras
    if (this.countWords(createLightingReportDto.title) > 6) {
      throw new Error('Title exceeds 6 words');
    }
    // Validar que el contenido no exceda de 50 palabras
    if (this.countWords(createLightingReportDto.content) > 50) {
      throw new Error('Content exceeds 50 words');
    }

    const user = await this.userService.findOne(createLightingReportDto.user);
    if (!user) {
      throw new Error('User not found');
    }

    // Crear una nueva instancia de LightingReport
    const lightingReport = new LightingReport();
    lightingReport.title = createLightingReportDto.title;
    lightingReport.content = createLightingReportDto.content;

    // Asignar las coordenadas en formato tipo Point
    lightingReport.startPoint = {
      type: 'Point',
      coordinates: [createLightingReportDto.startPoint.longitude, createLightingReportDto.startPoint.latitude],
    };
    lightingReport.endPoint = {
      type: 'Point',
      coordinates: [createLightingReportDto.endPoint.longitude, createLightingReportDto.endPoint.latitude],
    };

    // Asignar el usuario al reporte de iluminación
    lightingReport.user = user;

    // Asignar la fecha actual
    lightingReport.date = new Date();

    // Guardar el reporte de iluminación en la base de datos
    return this.lightingReportRepository.save(lightingReport);
  }
  // Método para contar las palabras
  private countWords(text: string): number {
    return text.split(' ').filter((word) => word.length > 0).length;
  }
  create() {
    return 'This action adds a new lightingReport';
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
