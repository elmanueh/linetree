import { AppModule } from '@app/gateway/app.module';
import { JsonToHttpExceptionFilter } from '@app/gateway/exceptions/json-http.filter';
import { NestFactory } from '@nestjs/core';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalFilters(new JsonToHttpExceptionFilter());
  await app.listen(3000);
}
void bootstrap();
