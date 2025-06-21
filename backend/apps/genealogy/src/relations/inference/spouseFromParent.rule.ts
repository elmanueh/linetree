import { RelationEntity } from '@genealogy-ms/core/domain/relation.entity';
import { RelationType } from '@genealogy-ms/core/domain/relation.enum';

export class SpouseFromParentRule {
  applyInsert(
    relation: RelationEntity,
    relations: RelationEntity[],
  ): RelationEntity[] {
    if (relation.type !== RelationType.Parent) return [];

    const newRelations: RelationEntity[] = [];
    const relationsParents = relations.filter(
      (r) =>
        r.type === RelationType.Parent &&
        r.sourceNodeId === relation.sourceNodeId,
    );

    if (relationsParents.length < 2) return [];
    const [p1, p2] = relationsParents;

    newRelations.push(
      RelationEntity.create({
        sourceNodeId: p1.targetNodeId,
        targetNodeId: p2.targetNodeId,
        type: RelationType.Spouse,
        treeId: relation.treeId,
      }),
    );

    return newRelations;
  }

  applyDelete(): RelationEntity[] {
    return [];
  }
}
