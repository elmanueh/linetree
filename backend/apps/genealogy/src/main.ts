import { RpcGlobalExceptionFilter } from '@app/shared';
import { GenealogyModule } from '@genealogy-ms/genealogy.module';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const appContext =
    await NestFactory.createApplicationContext(GenealogyModule);
  const configService = appContext.get(ConfigService);

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    GenealogyModule,
    {
      transport: Transport.TCP,
      options: {
        host: configService.get<string>('GENEALOGY_SERVICE_HOST'),
        port: configService.get<number>('GENEALOGY_SERVICE_PORT'),
      },
    },
  );
  app.useGlobalFilters(new RpcGlobalExceptionFilter());
  await app.listen();

  Logger.log(
    `Genealogy microservice listening on ${configService.get<string>('GENEALOGY_SERVICE_HOST')}:${configService.get<number>('GENEALOGY_SERVICE_PORT')}`,
  );
}
void bootstrap();
