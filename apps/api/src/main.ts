/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app/app.module';
import { ApiKeyGuard } from './app/guards/ApiKey.guard';
import { API_ENVS } from '@chat-app/api/env';

async function bootstrap() {
  const { PORT, API_PREFIX } = API_ENVS;
  const app = await NestFactory.create(AppModule);
  app.useGlobalGuards(new ApiKeyGuard());
  app.setGlobalPrefix(API_PREFIX);
  app.enableCors();
  const config = new DocumentBuilder()
    .setTitle('ChatApp')
    .setDescription('The chat app API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(API_PREFIX, app, document);
  await app.listen(PORT);
  Logger.log(
    `🚀 Application is running on: http://localhost:${PORT}/${API_PREFIX}`
  );
}

bootstrap();
