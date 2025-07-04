import { RelationEntity } from '@genealogy-ms/core/domain/relation.entity';
import { Children2ParentRule } from '@genealogy-ms/relations/inference/children2parent.rule';
import { ChildrenFromSpouseRule } from '@genealogy-ms/relations/inference/childrenFromSpouse.rule';
import { Parent2ChildrenRule } from '@genealogy-ms/relations/inference/parent2children.rule';
import { Spouse2SpouseRule } from '@genealogy-ms/relations/inference/spouse2spouse.rule';
import { SpouseFromParentRule } from '@genealogy-ms/relations/inference/spouseFromParent.rule';
import { Injectable } from '@nestjs/common';

@Injectable()
export class InferenceService {
  private rules = [
    new Children2ParentRule(),
    new ChildrenFromSpouseRule(),
    new Parent2ChildrenRule(),
    new Spouse2SpouseRule(),
    new SpouseFromParentRule(),
  ];

  private compareRelations(
    relation1: RelationEntity,
    relation2: RelationEntity,
  ) {
    return (
      relation1.sourceNodeId === relation2.sourceNodeId &&
      relation1.targetNodeId === relation2.targetNodeId &&
      relation1.type === relation2.type &&
      relation1.treeId === relation2.treeId
    );
  }

  generateInferencesFromInsert(
    relation: RelationEntity,
    relations: RelationEntity[],
  ): RelationEntity[] {
    return this.rules
      .flatMap((rule) => rule.applyInsert(relation, relations))
      .filter(
        (r) =>
          !relations.some((existing) => this.compareRelations(existing, r)),
      );
  }

  generateInferencesFromDelete(
    relation: RelationEntity,
    relations: RelationEntity[],
  ): RelationEntity[] {
    return this.rules
      .flatMap((rule) => rule.applyDelete(relation))
      .filter(
        (r) =>
          !relations.some((existing) => this.compareRelations(existing, r)),
      );
  }
}
