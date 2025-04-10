import { RelationEntity } from '@app/genealogy/core/domain/relation.entity';
import { Mapper, TripleRdf } from '@app/shared';

export class RelationPersistanceMapper
  implements Mapper<RelationEntity, TripleRdf>
{
  domain2Persistance(entity: RelationEntity): TripleRdf {
    return {
      subject: entity.souceNodeId,
      predicate: entity.relationType,
      object: entity.targetNodeId,
      context: entity.treeId,
    };
  }

  persistance2Domain(document: TripleRdf): RelationEntity {
    return RelationEntity.create({
      souceNodeId: document.subject,
      targetNodeId: document.object,
      relationType: document.predicate,
      treeId: document.context,
    });
  }
}
