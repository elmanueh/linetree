import { RelationEntity } from '@app/genealogy/core/domain/relation.entity';
import { RelationType } from '@app/genealogy/core/domain/relation.enum';

export class Parent2ChildrenRule {
  applyInsert(relation: RelationEntity): RelationEntity[] {
    if (relation.type !== RelationType.Children) return [];
    return [
      RelationEntity.create({
        souceNodeId: relation.targetNodeId,
        targetNodeId: relation.souceNodeId,
        type: RelationType.Parent,
        treeId: relation.treeId,
      }),
    ];
  }

  applyDelete(relation: RelationEntity): RelationEntity[] {
    if (relation.type !== RelationType.Children) return [];
    return [
      RelationEntity.create({
        souceNodeId: relation.targetNodeId,
        targetNodeId: relation.souceNodeId,
        type: RelationType.Parent,
        treeId: relation.treeId,
      }),
    ];
  }
}
