import { RelationEntity } from '@genealogy-ms/core/domain/relation.entity';
import { RelationType } from '@genealogy-ms/core/domain/relation.enum';

export class Spouse2SpouseRule {
  applyInsert(relation: RelationEntity): RelationEntity[] {
    if (relation.type !== RelationType.Spouse) return [];

    const newRelations = [
      RelationEntity.create({
        sourceNodeId: relation.targetNodeId,
        targetNodeId: relation.sourceNodeId,
        type: RelationType.Spouse,
        treeId: relation.treeId,
      }),
    ];

    return newRelations;
  }

  applyDelete(relation: RelationEntity): RelationEntity[] {
    if (relation.type !== RelationType.Spouse) return [];

    const newRelations = [
      RelationEntity.create({
        sourceNodeId: relation.targetNodeId,
        targetNodeId: relation.sourceNodeId,
        type: RelationType.Spouse,
        treeId: relation.treeId,
      }),
    ];

    return newRelations;
  }
}
