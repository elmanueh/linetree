import { NodeRepository } from '@app/genealogy/core/persistance/nodes.repository';
import { RelationsReposity } from '@app/genealogy/core/persistance/relations.repository';
import { NodesController } from '@app/genealogy/nodes/nodes.controller';
import { NodesService } from '@app/genealogy/nodes/nodes.service';
import { NodePersistanceMapper } from '@app/genealogy/nodes/repository/node.mapper';
import { Node, NodeSchema } from '@app/genealogy/nodes/repository/node.schema';
import { NodeRepositoryMongoose } from '@app/genealogy/nodes/repository/nodes.repository-mongoose';
import { RelationRepositoryRDF } from '@app/genealogy/nodes/repository/relation.repository-rdf';
import { TreesModule } from '@app/genealogy/trees/trees.module';
import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Node.name, schema: NodeSchema }]),
    forwardRef(() => TreesModule),
  ],
  controllers: [NodesController],
  providers: [
    NodesService,
    NodePersistanceMapper,
    {
      provide: NodeRepository,
      useClass: NodeRepositoryMongoose,
    },
    {
      provide: RelationsReposity,
      useClass: RelationRepositoryRDF,
    },
  ],
  exports: [NodeRepository],
})
export class NodesModule {}
