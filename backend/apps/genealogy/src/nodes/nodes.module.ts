import { NodeRepository } from '@genealogy/core/persistance/nodes.repository';
import { NodesController } from '@genealogy/nodes/nodes.controller';
import { NodesService } from '@genealogy/nodes/nodes.service';
import { NodePersistanceMapper } from '@genealogy/nodes/repository/node.mapper';
import { Node, NodeSchema } from '@genealogy/nodes/repository/node.schema';
import { NodeRepositoryMongoose } from '@genealogy/nodes/repository/nodes.repository-mongoose';
import { TreesModule } from '@genealogy/trees/trees.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Node.name, schema: NodeSchema }]),
    TreesModule,
  ],
  controllers: [NodesController],
  providers: [
    NodesService,
    NodePersistanceMapper,
    {
      provide: NodeRepository,
      useClass: NodeRepositoryMongoose,
    },
  ],
})
export class NodesModule {}
