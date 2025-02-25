import { NestFactory } from '@nestjs/core';
import { TreesModule } from './trees.module';

async function bootstrap() {
  const app = await NestFactory.create(TreesModule);
  await app.listen(process.env.TREE_SERVICE_PORT ?? 3000);
}
void bootstrap();
