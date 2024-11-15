import { Module } from '@nestjs/common';
import { LightedStreetsController } from './lighted-streets.controller';
import { LightedStreetsService } from './lighted-streets.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LightedStreet } from './entities/lighted_street.entity';
import { User } from 'src/user/entities/user.entity';
import { UserModule } from 'src/user/user.module';
import { LightingRating } from './entities/lighting_rating.entity';

/**
 * The LightedStreetModule is a module that provides the necessary configuration
 * for the lighted streets feature in the application. It imports the required
 * modules and registers the necessary entities and providers.
 */
@Module({
  controllers: [LightedStreetsController], // Registers the LightedStreetsController
  providers: [LightedStreetsService], // Registers the LightedStreetsService
  imports: [
    // Imports the TypeOrmModule and registers the LightedStreet, User, and LightingRating entities
    TypeOrmModule.forFeature([LightedStreet, User, LightingRating]),
    UserModule, // Imports the UserModule
  ],
})
export class LightedStreetModule {}
