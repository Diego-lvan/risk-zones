import { Coordinate } from 'src/common/interfaces/coordinate';
import { News } from '../entities/news.entity';

/**
 * Class to represent the response of a news in the public API
 */
export class PublicNewResponse {
  id: number;
  title: string;
  content: string;
  createdAt: Date;
  coords: Coordinate;

  /**
   * Method to create a new instance of PublicNewResponse from a News entity
   * @param newInfo News entity
   * @returns A new instance of PublicNewResponse
   */
  static from(newInfo: News): PublicNewResponse {
    const response = new PublicNewResponse();
    response.id = newInfo.id;
    response.title = newInfo.title;
    response.content = newInfo.content;
    response.createdAt = newInfo.date;
    response.coords = {
      latitude: newInfo.coords.coordinates[1],
      longitude: newInfo.coords.coordinates[0],
    };
    return response;
  }
}
