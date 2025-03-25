import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { TreesModule } from '../trees/trees.module';
import { NodesController } from './nodes.controller';
import { NodesService } from './nodes.service';

@Module({
  imports: [ClientsModule, TreesModule],
  controllers: [NodesController],
  providers: [NodesService],
})
export class NodesModule {}
