import { RelationEntity } from '@app/genealogy/core/domain/relation.entity';
import { RelationType } from '@app/genealogy/core/domain/relation.enum';
import { Mapper, TripleRdf } from '@app/shared';
import { UUID } from 'crypto';

export class RelationPersistanceMapper
  implements Mapper<RelationEntity, TripleRdf>
{
  private getUUID(uri: string): UUID | undefined {
    if (!uri) return undefined;
    const match = uri.match(
      /[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}/,
    );

    return match ? (match[0] as UUID) : undefined;
  }

  domain2Persistance(entity: RelationEntity): TripleRdf {
    return {
      subject: entity.souceNodeId,
      predicate: entity.type,
      object: entity.targetNodeId,
      context: entity.treeId,
    };
  }

  persistance2Domain(document: TripleRdf): Promise<RelationEntity> {
    return Promise.resolve(
      RelationEntity.create({
        souceNodeId: this.getUUID(document.subject)!,
        targetNodeId: this.getUUID(document.object)!,
        type: document.predicate.split('/').pop() as RelationType,
        treeId: document.context,
      }),
    );
  }
}
