import { RelationEntity } from '@genealogy-ms/core/domain/relation.entity';
import { RelationType } from '@genealogy-ms/core/domain/relation.enum';

export class Children2ParentRule {
  applyInsert(relation: RelationEntity): RelationEntity[] {
    if (relation.type !== RelationType.Parent) return [];

    const newRelations = [
      RelationEntity.create({
        sourceNodeId: relation.targetNodeId,
        targetNodeId: relation.sourceNodeId,
        type: RelationType.Children,
        treeId: relation.treeId,
      }),
    ];

    return newRelations;
  }

  applyDelete(relation: RelationEntity): RelationEntity[] {
    if (relation.type !== RelationType.Parent) return [];

    const newRelations = [
      RelationEntity.create({
        sourceNodeId: relation.targetNodeId,
        targetNodeId: relation.sourceNodeId,
        type: RelationType.Children,
        treeId: relation.treeId,
      }),
    ];

    return newRelations;
  }
}
