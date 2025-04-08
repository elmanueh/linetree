import { RelationEntity } from '@app/genealogy/core/domain/relation.entity';
import { RelationsReposity } from '@app/genealogy/core/persistance/relations.repository';
import { RepositoryRDF } from 'libs/shared/src/repository/repository-rdf';

export class RelationRepositoryRDF
  extends RepositoryRDF<RelationEntity, void>
  implements RelationsReposity
{
  constructor(private readonly relationMapper: RelationPersistanceMapper) {
    super(void, relationMapper);  // TODO: Implement the void type for RDF relations
  }
}
