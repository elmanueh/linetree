import { RelationEntity } from '@app/genealogy/core/domain/relation.entity';
import { RelationType } from '@app/genealogy/core/domain/relation.enum';

export class Spouse2SpouseRule {
  applyInsert(relation: RelationEntity): RelationEntity[] {
    if (relation.type !== RelationType.Spouse) return [];
    return [
      RelationEntity.create({
        souceNodeId: relation.targetNodeId,
        targetNodeId: relation.souceNodeId,
        type: RelationType.Spouse,
        treeId: relation.treeId,
      }),
    ];
  }

  applyDelete(relation: RelationEntity): RelationEntity[] {
    if (relation.type !== RelationType.Spouse) return [];
    return [
      RelationEntity.create({
        souceNodeId: relation.targetNodeId,
        targetNodeId: relation.souceNodeId,
        type: RelationType.Spouse,
        treeId: relation.treeId,
      }),
    ];
  }
}
