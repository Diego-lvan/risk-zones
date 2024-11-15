import { Injectable } from '@nestjs/common';
import { CreateNewsDto } from './dto/create-news.dto';
import { News } from './entities/news.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';
import { NewNotFoundError } from './errors/new_not_found';
import { PublicNewResponse } from './dto/public-new-response';
import { Reactions } from './entities/reactions.entity';

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(News)
    private readonly newsRepository: Repository<News>,
    private readonly userService: UserService,
    @InjectRepository(Reactions)
    private readonly reactionRepository: Repository<Reactions>,
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

  /**
   * Method to add a reaction (like or dislike) to a news
   * @param newId The id of the news to react to
   * @param userId The id of the user who reacts to the news
   * @param reactionType The type of reaction ('like' or 'dislike')
   * @returns The updated news with the new reaction count
   */
  async addReaction(newId: number, userId: number, reactionType: 'like' | 'dislike') {
    const news = await this.newsRepository.findOneBy({ id: newId });
    if (!news) {
      throw new NewNotFoundError();
    }
    const user = await this.userService.findOne(userId.toString());
    if (!user) {
      throw new Error('User not found');
    }
    let reaction = await this.findReaction(newId, userId);
    if (!reaction) {
      reaction = new Reactions();
      reaction.news = news;
      reaction.user = user;
    }
    reaction.reactionType = reactionType;
    await this.saveOrUpdateReaction(reaction);
    return news;
  }

  /**
   * Method to find a reaction by newsId and userId
   * @param newsId The id of the news
   * @param userId The id of the user
   * @returns The reaction entity or null if not found
   */
  async findReaction(newsId: number, userId: number): Promise<Reactions | null> {
    return this.reactionRepository.findOne({
      where: {
        news: { id: newsId },
        user: { id: userId.toString() },
      },
    });
  }

  /**
   * Method to save or update a reaction
   * @param reaction The reaction entity to save or update
   * @returns The saved or updated reaction entity
   */
  async saveOrUpdateReaction(reaction: Reactions): Promise<Reactions> {
    return this.reactionRepository.save(reaction);
  }
}

// user: tspTeam
// password: OUugFvdepv2QtOYyXgR9ptJnriB
