import { TreeEntity } from '@app/genealogy/core/domain/tree.entity';
import { NodeRepository } from '@app/genealogy/core/persistance/nodes.repository';
import { RelationsRepository } from '@app/genealogy/core/persistance/relations.repository';
import { InternalErrorRpcException } from '@app/shared';
import { Injectable } from '@nestjs/common';
import { UUID } from 'crypto';
import { compact, JsonLdDocument } from 'jsonld';

@Injectable()
export class RelationsService {
  constructor(
    private readonly relationRepository: RelationsRepository,
    private readonly nodeRepository: NodeRepository,
  ) {}

  async getGenealogy(tree: TreeEntity): Promise<JsonLdDocument> {
    try {
      const genealogy = await this.relationRepository.findGenealogy(tree.id);
      if (Array.isArray(genealogy) && genealogy.length === 0) {
        const node = tree.getNodes()[0];
        genealogy.push({
          '@id': node.id,
          '@type': 'http://schema.org/Person',
        });
      }

      for (const nodeGenealogy of genealogy) {
        const rawId = Array.isArray(nodeGenealogy['@id'])
          ? nodeGenealogy['@id'][0]
          : nodeGenealogy['@id']!;
        const id = rawId.split('/').pop() as UUID;

        const node = tree.getNode(id);
        if (!node) continue;
        nodeGenealogy['http://schema.org/name'] = [{ '@value': node.name }];
      }

      return compact(genealogy, {
        '@context': 'http://schema.org/',
      });
    } catch {
      throw new InternalErrorRpcException(
        'An error occurred while fetching the genealogy',
      );
    }
  }
}
