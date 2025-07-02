import { RpcGlobalExceptionFilter } from '@app/shared';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { UserModule } from '@users-ms/user.module';

async function bootstrap() {
  const appContext = await NestFactory.createApplicationContext(UserModule);
  const configService = appContext.get(ConfigService);

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    UserModule,
    {
      transport: Transport.TCP,
      options: {
        host: configService.get<string>('USER_SERVICE_HOST'),
        port: configService.get<number>('USER_SERVICE_PORT'),
      },
    },
  );

  app.useGlobalFilters(new RpcGlobalExceptionFilter());
  await app.listen();

  Logger.log(
    `User microservice listening on ${configService.get<string>('USER_SERVICE_HOST')}:${configService.get<number>('USER_SERVICE_PORT')}`,
  );
}
void bootstrap();
