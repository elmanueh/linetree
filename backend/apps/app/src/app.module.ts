import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TreesModule } from './trees/trees.module';
import { NodesModule } from './nodes/nodes.module';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'USERS_CLIENT',
        transport: Transport.TCP,
        options: {
          port: 3001,
        },
      },
    ]),
    TreesModule,
    NodesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
