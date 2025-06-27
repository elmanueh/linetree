import { RelationEntity } from '@genealogy-ms/core/domain/relation.entity';
import { RelationType } from '@genealogy-ms/core/domain/relation.enum';
import { TreeEntity } from '@genealogy-ms/core/domain/tree.entity';
import { RelationsRepository } from '@genealogy-ms/core/persistance/relations.repository';
import { InferenceService } from '@genealogy-ms/relations/inference/inference.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { UUID } from 'crypto';
import { compact, JsonLdDocument } from 'jsonld';

@Injectable()
export class RelationsService {
  constructor(
    private readonly relationRepository: RelationsRepository,
    private readonly inferenceService: InferenceService,
  ) {}

  async createRelation(
    sourceNodeId: UUID,
    targetNodeId: UUID,
    spouseId: UUID | undefined,
    relationType: RelationType,
    treeId: UUID,
  ): Promise<void> {
    if (!sourceNodeId) {
      throw new BadRequestException(
        'The sourceNodeId cannot be null or undefined.',
      );
    }
    if (!targetNodeId) {
      throw new BadRequestException(
        'The targetNodeId cannot be null or undefined.',
      );
    }
    if (!relationType) {
      throw new BadRequestException(
        'The relationType cannot be null or undefined.',
      );
    }
    if (!treeId) {
      throw new BadRequestException('The treeId cannot be null or undefined.');
    }

    const relation = RelationEntity.create({
      sourceNodeId: sourceNodeId,
      targetNodeId: targetNodeId,
      type: relationType,
      treeId: treeId,
    });
    await this.relationRepository.save(relation);

    // Generate inferences based on the new relation
    const relations = await this.relationRepository.findByTreeId(treeId);
    const inferences = this.inferenceService.generateInferencesFromInsert(
      relation,
      relations,
    );

    for (const inference of inferences) {
      await this.createRelation(
        inference.sourceNodeId,
        inference.targetNodeId,
        undefined,
        inference.type,
        inference.treeId,
      );
    }

    // TODO: change
    if (relationType === RelationType.Children && spouseId) {
      await this.createRelation(
        spouseId,
        targetNodeId,
        undefined,
        RelationType.Children,
        treeId,
      );
    }
  }

  async removeRelation(nodeId: UUID): Promise<void> {
    if (!nodeId) {
      throw new BadRequestException('The nodeId cannot be null or undefined.');
    }

    await this.relationRepository.deleteByNodeId(nodeId);
  }

  async findRelationsByNodeId(
    nodeId: UUID,
    treeId: UUID,
  ): Promise<RelationEntity[]> {
    if (!nodeId) {
      throw new BadRequestException('The nodeId cannot be null or undefined.');
    }
    if (!treeId) {
      throw new BadRequestException('The treeId cannot be null or undefined.');
    }

    return this.relationRepository.findDescendantsByNodeId(nodeId, treeId);
  }

  async findParents(nodeId: UUID, treeId: UUID): Promise<RelationEntity[]> {
    if (!nodeId) {
      throw new BadRequestException('The nodeId cannot be null or undefined.');
    }
    if (!treeId) {
      throw new BadRequestException('The treeId cannot be null or undefined.');
    }

    return this.relationRepository.findParentsByNodeId(nodeId, treeId);
  }

  async getGenealogy(tree: TreeEntity): Promise<JsonLdDocument> {
    if (!tree) {
      throw new BadRequestException('The tree cannot be null or undefined.');
    }

    const genealogy = await this.relationRepository.findGenealogy(tree.id);
    if (Array.isArray(genealogy) && genealogy.length === 0) {
      const node = tree.getNodes()[0];
      genealogy.push({
        '@id': node.id,
        '@type': 'https://schema.org/Person',
      });
    }

    for (const nodeGenealogy of genealogy) {
      const rawId = Array.isArray(nodeGenealogy['@id'])
        ? nodeGenealogy['@id'][0]
        : nodeGenealogy['@id']!;
      const id = rawId.split('/').pop() as UUID;

      const node = tree.getNode(id);
      if (!node) continue;

      nodeGenealogy['https://schema.org/givenName'] = [
        { '@value': node.givenName },
      ];
      nodeGenealogy['https://schema.org/gender'] = [{ '@value': node.gender }];

      if (node.familyName) {
        nodeGenealogy['https://schema.org/familyName'] = [
          { '@value': node.familyName },
        ];
      }
      if (node.birthDate) {
        nodeGenealogy['https://schema.org/birthDate'] = [
          { '@value': node.birthDate?.toISOString() },
        ];
      }
      if (node.deathDate) {
        nodeGenealogy['https://schema.org/deathDate'] = [
          { '@value': node.deathDate?.toISOString() },
        ];
      }
    }

    return compact(genealogy, {
      '@vocab': 'https://schema.org/',
      '@base': 'http://example.org/nodes/',
    });
  }
}
