import { Injectable } from '@nestjs/common';
import { CreateNewsDto } from './dto/create-news.dto';
import { News } from './entities/news.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(News)
    private readonly newsRepository: Repository<News>,
    private readonly userService: UserService,
  ) {}

  async createNews(createNewsDto: CreateNewsDto): Promise<News> {
    const user = await this.userService.findOne(createNewsDto.user);
    
    if(!user) {
      throw new Error('User not found');
    }
    // Crear una nueva instancia de News
    const news = new News();
    news.title = createNewsDto.title;
    news.content = createNewsDto.content;

    // Asignar las coordenadas en formato tipo Point
    news.coords = {
      type: 'Point',
      coordinates: [createNewsDto.point.longitude, createNewsDto.point.latitude],
    };

    //Asignar el usuario a la noticia
    news.user = user;

    // Asignar la fecha actual
    news.date = new Date();

    // Guardar la noticia en la base de datos
    return this.newsRepository.save(news);
    
  }
  create(createNewsDto: CreateNewsDto) {
    return 'This action adds a new news';
  }

  findAll() {
    return `This action returns all news`;
  }

  findOne(id: number) {
    return `This action returns a #${id} news`;
  }

}
