import { SparqlService } from '@app/shared';
import { RelationsRepository } from '@genealogy-ms/core/persistance/relations.repository';
import { NodesModule } from '@genealogy-ms/nodes/nodes.module';
import { InferenceService } from '@genealogy-ms/relations/inference/inference.service';
import { RelationsService } from '@genealogy-ms/relations/relations.service';
import { RelationPersistanceMapper } from '@genealogy-ms/relations/repository/relation.mapper';
import { RelationRepositoryRDF } from '@genealogy-ms/relations/repository/relation.repository-rdf';
import { HttpModule } from '@nestjs/axios';
import { forwardRef, Module } from '@nestjs/common';

@Module({
  imports: [forwardRef(() => NodesModule), HttpModule],
  providers: [
    RelationsService,
    SparqlService,
    InferenceService,
    RelationPersistanceMapper,
    {
      provide: RelationsRepository,
      useClass: RelationRepositoryRDF,
    },
  ],
  exports: [RelationsService, RelationsRepository],
})
export class RelationsModule {}
