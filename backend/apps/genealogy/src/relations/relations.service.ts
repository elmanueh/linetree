import { RelationEntity } from '@app/genealogy/core/domain/relation.entity';
import { RelationType } from '@app/genealogy/core/domain/relation.enum';
import { TreeEntity } from '@app/genealogy/core/domain/tree.entity';
import { RelationsRepository } from '@app/genealogy/core/persistance/relations.repository';
import { InferenceService } from '@app/genealogy/relations/inference/inference.service';
import { InternalErrorRpcException } from '@app/shared';
import { Injectable } from '@nestjs/common';
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
    const relation = RelationEntity.create({
      souceNodeId: sourceNodeId,
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
        inference.souceNodeId,
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
    await this.relationRepository.deleteByNodeId(nodeId);
  }

  async findRelationsByNodeId(
    nodeId: UUID,
    treeId: UUID,
  ): Promise<RelationEntity[]> {
    return this.relationRepository.findDescendantsByNodeId(nodeId, treeId);
  }

  async findParents(nodeId: UUID, treeId: UUID): Promise<RelationEntity[]> {
    return this.relationRepository.findParentsByNodeId(nodeId, treeId);
  }

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
        nodeGenealogy['http://schema.org/givenName'] = [
          { '@value': node.givenName },
        ];
        //nodeGenealogy['http://schema.org/familyName'] = [
        //  { '@value': node.familyName },
        //];
        //nodeGenealogy['http://schema.org/birthDate'] = [
        //  { '@value': node.birthDate?.toISOString() },
        //];
        //nodeGenealogy['http://schema.org/deathDate'] = [
        //  { '@value': node.deathDate?.toISOString() },
        //];
        nodeGenealogy['http://schema.org/gender'] = [{ '@value': node.gender }];
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
