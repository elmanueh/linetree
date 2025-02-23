import { NestFactory } from '@nestjs/core';
import { config } from 'dotenv';
import { UsersModule } from './users.module';

async function bootstrap() {
  config();
  const app = await NestFactory.create(UsersModule);
  await app.listen(process.env.USER_SERVICE_PORT ?? 3000);
}
void bootstrap();
