import { RelationsRepository } from '@app/genealogy/core/persistance/relations.repository';
import { NodesModule } from '@app/genealogy/nodes/nodes.module';
import { RelationsService } from '@app/genealogy/relations/relations.service';
import { RelationPersistanceMapper } from '@app/genealogy/relations/repository/relation.mapper';
import { RelationRepositoryRDF } from '@app/genealogy/relations/repository/relation.repository-rdf';
import { SparqlService } from '@app/shared';
import { HttpModule } from '@nestjs/axios';
import { forwardRef, Module } from '@nestjs/common';

@Module({
  imports: [forwardRef(() => NodesModule), HttpModule],
  providers: [
    RelationsService,
    SparqlService,
    RelationPersistanceMapper,
    {
      provide: RelationsRepository,
      useClass: RelationRepositoryRDF,
    },
  ],
  exports: [RelationsService, RelationsRepository],
})
export class RelationsModule {}
