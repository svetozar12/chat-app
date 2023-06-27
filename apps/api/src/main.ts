import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app/app.module';
import cookieParser from 'cookie-parser';
// import deps which are required but nx cant find
import * as _ from 'envalid';
import { API_ENVS } from './app/utils/env';
async function bootstrap() {
  const { PORT, API_PREFIX } = API_ENVS;
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.setGlobalPrefix(API_PREFIX);
  app.enableCors({ origin: '*', credentials: true });
  const config = new DocumentBuilder()
    .setTitle('ChatApp')
    .addBearerAuth()
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
