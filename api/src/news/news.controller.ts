import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { NewsService } from './news.service';
import { CreateNewsDto } from './dto/create-news.dto';
import { News } from './entities/news.entity';
import { ApiParam, ApiResponse } from '@nestjs/swagger';
import { NewNotFoundError } from './errors/new_not_found';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Post()
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
}
