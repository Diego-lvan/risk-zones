import { Controller, Get, Post, Body, Param, HttpCode, HttpStatus } from '@nestjs/common';
import { NewsService } from './news.service';
import { CreateNewsDto } from './dto/create-news.dto';
import { News } from './entities/news.entity';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

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

  /**
   * Retrieves all news articles.
   * @returns An array of all news articles.
   */
  @Get()
  findAll() {
    return this.newsService.findAll();
  }

  /**
   * Retrieves a specific news article by its ID.
   * @param id - The ID of the news article.
   * @returns The news article with the specified ID.
   */
  @Get(':id')
  @ApiOperation({ summary: 'Get a news article by ID' })
  @ApiParam({ name: 'id', description: 'News article ID' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Returns the news article', type: News })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'News article not found' })
  findOne(@Param('id') id: string) {
    return this.newsService.findOne(+id);
  }
}
