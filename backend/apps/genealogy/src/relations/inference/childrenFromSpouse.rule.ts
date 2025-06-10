import { RelationEntity } from '@app/genealogy/core/domain/relation.entity';
import { RelationType } from '@app/genealogy/core/domain/relation.enum';

export class ChildrenFromSpouseRule {
  applyInsert(
    relation: RelationEntity,
    relations: RelationEntity[],
  ): RelationEntity[] {
    if (relation.type !== RelationType.Spouse) return [];

    const newRelations: RelationEntity[] = [];
    const parents = relations.filter((r) => r.type === RelationType.Parent);

    parents.forEach((p) => {
      const parent = p.targetNodeId;
      const child = p.sourceNodeId;
      const spousesParent = relations
        .filter(
          (r) => r.type === RelationType.Spouse && r.sourceNodeId === parent,
        )
        .map((r) => r.targetNodeId);

      if (spousesParent.length === 1) {
        newRelations.push(
          RelationEntity.create({
            sourceNodeId: spousesParent[0],
            targetNodeId: child,
            type: RelationType.Children,
            treeId: relation.treeId,
          }),
        );
      }
    });

    return newRelations;
  }

  applyDelete(): RelationEntity[] {
    return [];
  }
}
