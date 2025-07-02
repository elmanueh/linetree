import { RpcJsonToHttpExceptionFilter } from '@app/shared';
import { AppModule } from '@gateway/app.module';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.setGlobalPrefix('api');
  app.useGlobalFilters(new RpcJsonToHttpExceptionFilter());
  app.use(cookieParser());
  app.enableCors({
    origin: configService.get<string>('FRONTEND_BASE_URL'),
    exposedHeaders: ['Location'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    credentials: true,
  });

  const port = configService.get<number>('GATEWAY_SERVICE_PORT')!;
  await app.listen(port);

  Logger.log(
    `Gateway listening on port ${configService.get<string>('GATEWAY_SERVICE_PORT')}`,
  );
}
void bootstrap();
