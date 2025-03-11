import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TreesController } from './trees.controller';
import { TreesService } from './trees.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'TREES_CLIENT',
        transport: Transport.TCP,
        options: {
          port: 3002,
        },
      },
    ]),
  ],
  controllers: [TreesController],
  providers: [TreesService],
  exports: [ClientsModule],
})
export class TreesModule {}
