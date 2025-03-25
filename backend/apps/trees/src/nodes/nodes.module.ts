import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NodeMapper } from '../repository/mapper/node.mapper';
import { NodeRepository } from '../repository/nodes.repository';
import { NodeRepositoryMongoose } from '../repository/nodes.repository-mongoose';
import { TreesModule } from '../trees/trees.module';
import { NodesController } from './nodes.controller';
import { NodesService } from './nodes.service';
import { Node, NodeSchema } from './repository/node.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Node.name, schema: NodeSchema }]),
    TreesModule,
  ],
  controllers: [NodesController],
  providers: [
    NodesService,
    NodeMapper,
    {
      provide: NodeRepository,
      useClass: NodeRepositoryMongoose,
    },
  ],
})
export class NodesModule {}
