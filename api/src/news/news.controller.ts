import { Controller, Get, Post, Body, Param, HttpCode, HttpStatus } from '@nestjs/common';
import { NewsService } from './news.service';
import { CreateNewsDto } from './dto/create-news.dto';
import { News } from './entities/news.entity';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { NewNotFoundError } from './errors/new_not_found';
import { ReactionDto } from './dto/create-reaction.dto';

/**
 * Controller for handling news-related operations.
 * This controller manages the creation, retrieval, and listing of news articles.
 */
@Controller('news')
@ApiTags('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  /**
   * Creates a new news article.
   * @param createNewsDto - The data transfer object containing news creation details.
   * @returns The created news article.
   */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new news article' })
  @ApiBody({ type: CreateNewsDto })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'News article created successfully', type: News })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid input' })
  create(@Body() createNewsDto: CreateNewsDto): Promise<News> {
    return this.newsService.createNews(createNewsDto);
  }
  @Get(':id')
  @ApiParam({ name: 'id', type: 'number' })
  @ApiResponse({ status: 200, description: 'The found new' })
  @ApiResponse({ status: 404, description: 'New not found' })
  async getNew(@Param('id') newId: string) {
    try {
      return await this.newsService.getNew(+newId);
    } catch (error) {
      throw new NewNotFoundError();
    }
  }

  /**
   * Retrieves all news articles.
   * @returns An array of all news articles.
   */
  @Get()
  async findAll() {
    return this.newsService.findAll();
  }
  /**
   * Updates a like or dislike reaction to a news article.
   * @param newId The id of the news to react to.
   * @param reactionDto The DTO containing the userId and reactionType.
   * @returns The updated news with the new reaction count.
   */
  @Post(':id/reactions')
  async updateLikeOrDislike(@Param('id') newId: string, @Body() reactionDto: ReactionDto) {
    const { userId, reactionType } = reactionDto;
    return this.newsService.addReaction(+newId, userId, reactionType);
  }
}
