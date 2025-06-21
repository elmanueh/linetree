import { RelationEntity } from '@genealogy-ms/core/domain/relation.entity';
import { RelationType } from '@genealogy-ms/core/domain/relation.enum';

export class Parent2ChildrenRule {
  applyInsert(relation: RelationEntity): RelationEntity[] {
    if (relation.type !== RelationType.Children) return [];

    const newRelations = [
      RelationEntity.create({
        sourceNodeId: relation.targetNodeId,
        targetNodeId: relation.sourceNodeId,
        type: RelationType.Parent,
        treeId: relation.treeId,
      }),
    ];

    return newRelations;
  }

  applyDelete(relation: RelationEntity): RelationEntity[] {
    if (relation.type !== RelationType.Children) return [];

    const newRelations = [
      RelationEntity.create({
        sourceNodeId: relation.targetNodeId,
        targetNodeId: relation.sourceNodeId,
        type: RelationType.Parent,
        treeId: relation.treeId,
      }),
    ];

    return newRelations;
  }
}
