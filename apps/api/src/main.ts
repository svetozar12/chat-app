import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app/app.module';
import cookieParser from 'cookie-parser';
import { API_ENVS } from './app/utils/env';
import fs from 'fs';

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
  fs.writeFileSync(
    './libs/api/sdk/swagger-spec.json',
    JSON.stringify(document)
  );
  await app.listen(PORT);
}

bootstrap();
