import { Mapper, TripleRdf } from '@app/shared';
import { RelationEntity } from '@genealogy-ms/core/domain/relation.entity';
import { RelationType } from '@genealogy-ms/core/domain/relation.enum';
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
      subject: entity.sourceNodeId,
      predicate: entity.type,
      object: entity.targetNodeId,
      context: entity.treeId,
    };
  }

  persistance2Domain(document: TripleRdf): Promise<RelationEntity> {
    return Promise.resolve(
      RelationEntity.create({
        sourceNodeId: this.getUUID(document.subject)!,
        targetNodeId: this.getUUID(document.object)!,
        type: document.predicate.split('/').pop() as RelationType,
        treeId: document.context,
      }),
    );
  }
}
