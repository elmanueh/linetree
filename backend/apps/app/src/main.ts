import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { JsonToHttpExceptionFilter } from './exceptions/json-http.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalFilters(new JsonToHttpExceptionFilter());
  await app.listen(3000);
}
void bootstrap();
