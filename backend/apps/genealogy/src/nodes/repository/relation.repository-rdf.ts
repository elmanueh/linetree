import { RelationEntity } from '@app/genealogy/core/domain/relation.entity';
import { RelationsRepository } from '@app/genealogy/core/persistance/relations.repository';
import { RelationPersistanceMapper } from '@app/genealogy/nodes/repository/relation.mapper';
import { RepositoryRDF, SparqlService } from '@app/shared';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RelationRepositoryRDF
  extends RepositoryRDF<RelationEntity>
  implements RelationsRepository
{
  constructor(
    private readonly relationMapper: RelationPersistanceMapper,
    sparqlService: SparqlService,
  ) {
    super(relationMapper, sparqlService);
  }
}
