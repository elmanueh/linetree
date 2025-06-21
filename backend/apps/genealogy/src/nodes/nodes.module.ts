import { NodeRepository } from '@genealogy-ms/core/persistance/nodes.repository';
import { NodesController } from '@genealogy-ms/nodes/nodes.controller';
import { NodesService } from '@genealogy-ms/nodes/nodes.service';
import { NodePersistanceMapper } from '@genealogy-ms/nodes/repository/node.mapper';
import { Node, NodeSchema } from '@genealogy-ms/nodes/repository/node.schema';
import { NodeRepositoryMongoose } from '@genealogy-ms/nodes/repository/nodes.repository-mongoose';
import { RelationsModule } from '@genealogy-ms/relations/relations.module';
import { TreesModule } from '@genealogy-ms/trees/trees.module';
import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Node.name, schema: NodeSchema }]),
    forwardRef(() => TreesModule),
    RelationsModule,
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
  exports: [NodeRepository, NodesService],
})
export class NodesModule {}
