import { Injectable } from '@nestjs/common';
import { CreateNewsDto } from './dto/create-news.dto';
import { News } from './entities/news.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';
import { NewNotFoundError } from './errors/new_not_found';
import { PublicNewResponse } from './dto/public-new-response';

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(News)
    private readonly newsRepository: Repository<News>,
    private readonly userService: UserService,
  ) {}

  async createNews(createNewsDto: CreateNewsDto): Promise<News> {
    // Validar que el titulo no exceda de 6 palabras
    if (this.countWords(createNewsDto.title) > 6) {
      throw new Error('Title exceeds 6 words');
    }
    // Validar que el contenido no exceda de 50 palabras
    if (this.countWords(createNewsDto.content) > 50) {
      throw new Error('Content exceeds 50 words');
    }
    const user = await this.userService.findOne(createNewsDto.user);
    if (!user) {
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
  // Método para contar las palabras
  private countWords(text: string): number {
    return text.split(' ').filter((word) => word.length > 0).length;
  }

  create() {
    return 'This action adds a new news';
  }

  findAll() {
    return `This action returns all news`;
  }

  /**
   * Method to find a news by its id
   * @param id The id of the news to find
   * @returns A news with the given id or an error if not found
   */
  async getNew(newId: number) {
    try {
      const news = await this.newsRepository.findOneByOrFail({ id: newId });
      // Parse the news to a PublicNewResponse object
      const responseNews = PublicNewResponse.from(news);
      return responseNews;
    } catch (error) {
      throw new NewNotFoundError();
    }
  }
}

// user: tspTeam
// password: OUugFvdepv2QtOYyXgR9ptJnriB
