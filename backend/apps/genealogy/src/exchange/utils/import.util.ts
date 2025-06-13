import { GenderType } from '@app/genealogy/core/domain/gender.enum';
import { NodeEntity } from '@app/genealogy/core/domain/node.entity';
import { RelationEntity } from '@app/genealogy/core/domain/relation.entity';
import { RelationType } from '@app/genealogy/core/domain/relation.enum';
import { FamilyData } from '@app/genealogy/exchange/utils/import.type';
import { UUID } from 'crypto';
import { Parent } from 'unist';

export function parseGedcomJson(
  gedcomData: Parent,
  treeId: UUID,
): {
  nodes: NodeEntity[];
  relations: RelationEntity[];
} {
  const individualMap = new Map<string, NodeEntity>();
  const familyMap = new Map<string, any>();
  const relations: RelationEntity[] = [];

  // create nodes
  for (const entry of gedcomData.children) {
    const { type, data } = entry;
    if (!type || !data) continue;

    if (type === 'INDI') {
      const id = data.xref_id as string;
      individualMap.set(
        id,
        NodeEntity.create({
          givenName: ((data.NAME as string) ?? '').trim(),
          gender:
            (data.SEX as string) === 'M' ? GenderType.Male : GenderType.Female,
        }),
      );
    }

    if (type === 'FAM') {
      const id = data.xref_id as string;
      familyMap.set(id, data);
    }
  }

  // create relations
  for (const [, famData] of familyMap.entries()) {
    const typedFamData = famData as FamilyData;
    const husbandId = typedFamData['@HUSBAND'];
    const wifeId = typedFamData['@WIFE'];
    const children: string[] = [];

    if (typedFamData['@CHILD']) {
      children.push(typedFamData['@CHILD']);
    }

    if (Array.isArray(typedFamData['+@CHILD'])) {
      children.push(...typedFamData['+@CHILD']);
    }

    // spouse relation
    if (husbandId && wifeId) {
      relations.push(
        RelationEntity.create({
          sourceNodeId: individualMap.get(husbandId)!.id,
          targetNodeId: individualMap.get(wifeId)!.id,
          type: RelationType.Spouse,
          treeId,
        }),
        RelationEntity.create({
          sourceNodeId: individualMap.get(wifeId)!.id,
          targetNodeId: individualMap.get(husbandId)!.id,
          type: RelationType.Spouse,
          treeId,
        }),
      );
    }

    // parent-child relations
    for (const childId of children) {
      if (husbandId) {
        relations.push(
          RelationEntity.create({
            sourceNodeId: individualMap.get(husbandId)!.id,
            targetNodeId: individualMap.get(childId)!.id,
            type: RelationType.Children,
            treeId,
          }),
          RelationEntity.create({
            sourceNodeId: individualMap.get(childId)!.id,
            targetNodeId: individualMap.get(husbandId)!.id,
            type: RelationType.Parent,
            treeId,
          }),
        );
      }
      if (wifeId) {
        relations.push(
          RelationEntity.create({
            sourceNodeId: individualMap.get(wifeId)!.id,
            targetNodeId: individualMap.get(childId)!.id,
            type: RelationType.Children,
            treeId,
          }),
          RelationEntity.create({
            sourceNodeId: individualMap.get(childId)!.id,
            targetNodeId: individualMap.get(wifeId)!.id,
            type: RelationType.Parent,
            treeId,
          }),
        );
      }
    }
  }

  const nodes = Array.from(individualMap.values());
  return { nodes, relations };
}
