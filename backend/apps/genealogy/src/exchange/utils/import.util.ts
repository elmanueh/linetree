import { GenderType } from '@genealogy-ms/core/domain/gender.enum';
import { NodeEntity } from '@genealogy-ms/core/domain/node.entity';
import { RelationEntity } from '@genealogy-ms/core/domain/relation.entity';
import { RelationType } from '@genealogy-ms/core/domain/relation.enum';
import { FamilyData, monthMap } from '@genealogy-ms/exchange/utils/import.type';
import { UUID } from 'crypto';
import { Parent } from 'unist';

function parseGedcomDate(dateStr: string): Date | undefined {
  const trimmed = dateStr.trim().toUpperCase();
  const match = trimmed.match(/^(\d{1,2}) (\w+) (\d{4})$/);
  if (!match) return undefined;

  const day = parseInt(match[1], 10);
  const monStr = match[2].substring(0, 3);
  const year = parseInt(match[3], 10);

  const month = monthMap[monStr];
  if (month === undefined) return undefined;

  return new Date(Date.UTC(year, month, day));
}

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
      const nameRaw = ((data.NAME as string) ?? '').trim();
      const match = nameRaw.match(/^(.*?)\s*\/(.*?)\/\s*$/);
      const [givenName, familyName] = match
        ? [match[1].trim(), match[2].trim()]
        : ['', nameRaw];
      const gender =
        (data.SEX as string) === 'M' ? GenderType.Male : GenderType.Female;
      const birthDateStr = (data['BIRTH/DATE'] as string) ?? '';
      const birthDate = parseGedcomDate(birthDateStr);

      const node = NodeEntity.create({ givenName, gender });
      if (familyName) node.familyName = familyName;
      if (birthDate) node.birthDate = birthDate;

      individualMap.set(id, node);
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
