import { GENEALOGY_CLIENT } from '@app/contracts';
import { GenealogyController } from '@gateway/genealogy-service/genealogy.controller';
import { GenealogyService } from '@gateway/genealogy-service/genealogy.service';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: GENEALOGY_CLIENT,
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: configService.get<string>('GENEALOGY_SERVICE_HOST'),
            port: configService.get<number>('GENEALOGY_SERVICE_PORT'),
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [GenealogyController],
  providers: [GenealogyService],
})
export class GenealogyModule {}
