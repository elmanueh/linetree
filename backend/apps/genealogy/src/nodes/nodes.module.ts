import { NodeRepository } from '@app/genealogy/core/persistance/nodes.repository';
import { RelationsRepository } from '@app/genealogy/core/persistance/relations.repository';
import { NodesController } from '@app/genealogy/nodes/nodes.controller';
import { NodesService } from '@app/genealogy/nodes/nodes.service';
import { NodePersistanceMapper } from '@app/genealogy/nodes/repository/node.mapper';
import { Node, NodeSchema } from '@app/genealogy/nodes/repository/node.schema';
import { NodeRepositoryMongoose } from '@app/genealogy/nodes/repository/nodes.repository-mongoose';
import { RelationPersistanceMapper } from '@app/genealogy/nodes/repository/relation.mapper';
import { RelationRepositoryRDF } from '@app/genealogy/nodes/repository/relation.repository-rdf';
import { TreesModule } from '@app/genealogy/trees/trees.module';
import { SparqlService } from '@app/shared';
import { HttpModule } from '@nestjs/axios';
import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Node.name, schema: NodeSchema }]),
    forwardRef(() => TreesModule),
    HttpModule,
  ],
  controllers: [NodesController],
  providers: [
    NodesService,
    NodePersistanceMapper,
    RelationPersistanceMapper,
    SparqlService,
    {
      provide: NodeRepository,
      useClass: NodeRepositoryMongoose,
    },
    {
      provide: RelationsRepository,
      useClass: RelationRepositoryRDF,
    },
  ],
  exports: [NodeRepository],
})
export class NodesModule {}
