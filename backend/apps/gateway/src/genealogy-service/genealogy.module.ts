import { GENEALOGY_CLIENT } from '@app/contracts';
import { GenealogyController } from '@gateway/genealogy-service/genealogy.controller';
import { GenealogyService } from '@gateway/genealogy-service/genealogy.service';
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: GENEALOGY_CLIENT,
        transport: Transport.TCP,
        options: {
          port: 3002,
        },
      },
    ]),
  ],
  controllers: [GenealogyController],
  providers: [GenealogyService],
})
export class GenealogyModule {}
