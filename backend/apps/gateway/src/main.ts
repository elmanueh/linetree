import { AppModule } from '@gateway/app.module';
import { JsonToHttpExceptionFilter } from '@gateway/exceptions/json-http.filter';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.setGlobalPrefix('api');
  app.useGlobalFilters(new JsonToHttpExceptionFilter());
  app.use(cookieParser());
  app.enableCors({
    origin: configService.get<string>('FRONTEND_URL'),
    exposedHeaders: ['Location'],
    methods: '*',
    credentials: true,
  });

  const port = configService.get<number>('GATEWAY_PORT')!;
  await app.listen(port);

  Logger.log(`Gateway listening on port ${configService.get('GATEWAY_PORT')}`);
}
void bootstrap();
