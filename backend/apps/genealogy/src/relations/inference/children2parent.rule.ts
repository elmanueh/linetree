import { RelationEntity } from '@app/genealogy/core/domain/relation.entity';
import { RelationType } from '@app/genealogy/core/domain/relation.enum';

export class Children2ParentRule {
  applyInsert(relation: RelationEntity): RelationEntity[] {
    if (relation.type !== RelationType.Parent) return [];

    const newRelations = [
      RelationEntity.create({
        souceNodeId: relation.targetNodeId,
        targetNodeId: relation.souceNodeId,
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
        souceNodeId: relation.targetNodeId,
        targetNodeId: relation.souceNodeId,
        type: RelationType.Children,
        treeId: relation.treeId,
      }),
    ];

    return newRelations;
  }
}
