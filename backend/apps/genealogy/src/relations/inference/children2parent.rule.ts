import { RelationEntity } from '@app/genealogy/core/domain/relation.entity';
import { RelationType } from '@app/genealogy/core/domain/relation.enum';

export class Children2ParentRule {
  applyInsert(relation: RelationEntity): RelationEntity[] {
    if (relation.type !== RelationType.Parent) return [];
    return [
      RelationEntity.create({
        souceNodeId: relation.targetNodeId,
        targetNodeId: relation.souceNodeId,
        type: RelationType.Children,
        treeId: relation.treeId,
      }),
    ];
  }

  applyDelete(relation: RelationEntity): RelationEntity[] {
    if (relation.type !== RelationType.Parent) return [];
    return [
      RelationEntity.create({
        souceNodeId: relation.targetNodeId,
        targetNodeId: relation.souceNodeId,
        type: RelationType.Children,
        treeId: relation.treeId,
      }),
    ];
  }
}
