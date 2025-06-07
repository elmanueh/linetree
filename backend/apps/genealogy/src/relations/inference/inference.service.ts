import { RelationEntity } from '@app/genealogy/core/domain/relation.entity';
import { Children2ParentRule } from '@app/genealogy/relations/inference/children2parent.rule';
import { Parent2ChildrenRule } from '@app/genealogy/relations/inference/parent2children.rule';
import { Spouse2SpouseRule } from '@app/genealogy/relations/inference/spouse2spouse.rule';
import { Injectable } from '@nestjs/common';

@Injectable()
export class InferenceService {
  private rules = [
    new Parent2ChildrenRule(),
    new Spouse2SpouseRule(),
    new Children2ParentRule(),
  ];

  generateInferencesFromInsert(relation: RelationEntity): RelationEntity[] {
    return this.rules.flatMap((rule) => rule.applyInsert(relation));
  }

  generateInferencesFromDelete(relation: RelationEntity): RelationEntity[] {
    return this.rules.flatMap((rule) => rule.applyDelete(relation));
  }
}
