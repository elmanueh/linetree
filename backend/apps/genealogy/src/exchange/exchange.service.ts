import { GenderType } from '@genealogy-ms/core/domain/gender.enum';
import { NodeRepository } from '@genealogy-ms/core/persistance/nodes.repository';
import { RelationsRepository } from '@genealogy-ms/core/persistance/relations.repository';
import { TreeRepository } from '@genealogy-ms/core/persistance/trees.repository';
import { GenealogyNode } from '@genealogy-ms/exchange/types/genealogy.type';
import { parseGedcomJson } from '@genealogy-ms/exchange/utils/import.util';
import { TreesService } from '@genealogy-ms/trees/trees.service';
import { Injectable } from '@nestjs/common';
import { randomUUID, UUID } from 'crypto';
import { compact, parse } from 'parse-gedcom';

@Injectable()
export class ExchangeService {
  constructor(
    private readonly treeService: TreesService,
    private readonly treeRepository: TreeRepository,
    private readonly nodeRepository: NodeRepository,
    private readonly relationRepository: RelationsRepository,
  ) {}

  private formatGedcomDate(date: Date): string {
    const month = date
      .toLocaleString('default', { month: 'short' })
      .toUpperCase();

    return `${date.getDate()} ${month} ${date.getFullYear()}`;
  }

  async createGedcomFile(treeId: UUID, owner: UUID): Promise<string> {
    await this.treeService.findOneById(treeId, owner);
    const genealogy = await this.treeService.getGenealogy(treeId, owner);
    const people = Array.isArray(genealogy['@graph'])
      ? (genealogy['@graph'] as GenealogyNode[])
      : [genealogy as GenealogyNode];

    const head =
      [
        '0 HEAD',
        '1 SUBM @SUBM1@',
        '1 SOUR LineTree',
        '2 VERS 1.0',
        '1 DEST GEDCOM',
        `1 DATE ${this.formatGedcomDate(new Date())}`,
        '1 GEDC',
        '2 VERS 5.5.1',
        '2 FORM LINEAGE-LINKED',
        '1 CHAR UTF-8',
        '0 @SUBM1@ SUBM',
        '1 NAME LineTree Member',
      ].join('\n') + '\n';
    let indi = '';
    let fam = '';
    const end = '0 TRLR';

    const indiMap = new Map<UUID, GenealogyNode>();
    people.forEach((p, index) => {
      const id = `@I${index + 1}@`;
      p._gedcomId = id;
      indiMap.set(p['@id'], p);
    });

    // FAM section
    let familyIndex = 1;
    const processedFamilies = new Set<string>();
    const famMap = new Map<string, string>();

    people.forEach((p) => {
      if (!p.spouse) return;
      const spouse = Array.isArray(p.spouse) ? p.spouse[0] : p.spouse;
      const coupleKey = [p['@id'], spouse['@id']].sort().join('|');
      if (processedFamilies.has(coupleKey)) return;

      const familyId = `@F${familyIndex++}@`;
      processedFamilies.add(coupleKey);
      famMap.set(coupleKey, familyId);

      fam += `0 ${familyId} FAM\n`;
      fam += `1 HUSB ${p.gender === GenderType.Male ? p._gedcomId : indiMap.get(spouse['@id'])?._gedcomId}\n`;
      fam += `1 WIFE ${p.gender === GenderType.Female ? p._gedcomId : indiMap.get(spouse['@id'])?._gedcomId}\n`;

      if (p.children && !Array.isArray(p.children)) p.children = [p.children];
      p.children?.forEach((c) => {
        const childNode = indiMap.get(c['@id'])!;
        fam += `1 CHIL ${childNode._gedcomId}\n`;
      });
    });

    // INDI section
    people.forEach((p) => {
      indi += `0 ${p._gedcomId} INDI\n`;
      indi += `1 NAME ${p.givenName}${p.familyName ? ` /${p.familyName}/` : ''}\n`;
      indi += `1 SEX ${p.gender === GenderType.Male ? 'M' : 'F'}\n`;

      if (p.address) indi += `1 ADDR ${p.address}\n`;
      if (p.birthDate) {
        indi += `1 BIRT\n`;
        indi += `2 DATE ${this.formatGedcomDate(new Date(p.birthDate))}\n`;
        if (p.birthPlace) indi += `2 PLAC ${p.birthPlace}\n`;
      }
      if (p.deathDate) {
        indi += `1 DEAT\n`;
        indi += `2 DATE ${this.formatGedcomDate(new Date(p.deathDate))}\n`;
        if (p.deathPlace) indi += `2 PLAC ${p.deathPlace}\n`;
      }
      if (p.email) indi += `1 EMAIL ${p.email}\n`;
      if (p.nationality) indi += `1 NATI ${p.nationality}\n`;
      if (p.telephone) indi += `1 PHON ${p.telephone}\n`;

      famMap.forEach((famId, coupleKey) => {
        const [id1, id2] = coupleKey.split('|') as UUID[];
        if (p['@id'] === id1 || p['@id'] === id2) {
          indi += `1 FAMS ${famId}\n`;
        }
      });

      famMap.forEach((famId, coupleKey) => {
        const [id1, id2] = coupleKey.split('|') as UUID[];
        const p1 = indiMap.get(id1);
        const p2 = indiMap.get(id2);

        const p1Children = Array.isArray(p1?.children) ? p1.children : [];
        const p2Children = Array.isArray(p2?.children) ? p2.children : [];
        const isChildren = p1Children.some((c1) =>
          p2Children.some(
            (c2) => c2['@id'] === c1['@id'] && c1['@id'] === p['@id'],
          ),
        );

        if (isChildren) {
          indi += `1 FAMC ${famId}\n`;
        }
      });
    });

    return head + indi + fam + end;
  }

  async loadGedcomFile(fileData: string, owner: UUID): Promise<UUID> {
    const data = compact(parse(fileData));
    const tree = await this.treeService.create(randomUUID().slice(0, 8), owner);
    const { nodes, relations } = parseGedcomJson(data, tree.id);

    const initialNode = tree.getNodes().pop()!;

    for (const node of nodes) {
      await this.nodeRepository.save(node);
      tree.addNode(node);
    }

    tree.removeNode(initialNode.id);
    await this.treeRepository.save(tree);

    for (const relation of relations) {
      await this.relationRepository.save(relation);
    }

    return tree.id;
  }
}
