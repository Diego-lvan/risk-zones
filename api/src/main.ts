import * as dotenv from 'dotenv';
dotenv.config();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ServerConstants } from './constants/server.contants';

async function bootstrap() {
  console.log(process.env);
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  const config = new DocumentBuilder().setTitle('Risk Zones API').setVersion('1.0').build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.enableCors();
  await app.listen(ServerConstants.PORT);
  console.log(`Application is running on: ${await app.getUrl()}`);
  console.log(`API documentation at: ${await app.getUrl()}/api`);
}
bootstrap();
