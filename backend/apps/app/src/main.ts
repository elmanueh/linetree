import { AppModule } from '@app/gateway/app.module';
import { JsonToHttpExceptionFilter } from '@app/gateway/exceptions/json-http.filter';
import { NestFactory } from '@nestjs/core';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalFilters(new JsonToHttpExceptionFilter());

  app.enableCors({
    origin: 'http://localhost:5173',
    methods: '*',
    credentials: true,
  });

  await app.listen(3000);
}
void bootstrap();
