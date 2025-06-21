import { RepositoryException, RepositoryRDF, SparqlService } from '@app/shared';
import { RelationEntity } from '@genealogy-ms/core/domain/relation.entity';
import { RelationsRepository } from '@genealogy-ms/core/persistance/relations.repository';
import { RelationPersistanceMapper } from '@genealogy-ms/relations/repository/relation.mapper';
import { Injectable } from '@nestjs/common';
import { UUID } from 'crypto';
import { NodeObject } from 'jsonld';

@Injectable()
export class RelationRepositoryRDF
  extends RepositoryRDF<RelationEntity>
  implements RelationsRepository
{
  constructor(
    private readonly relationMapper: RelationPersistanceMapper,
    sparqlService: SparqlService,
  ) {
    super(relationMapper, sparqlService);
  }

  async deleteByTreeId(treeId: UUID): Promise<void> {
    try {
      const triple = this.relationMapper.domain2Persistance({
        treeId: treeId,
      } as RelationEntity);
      await this.sparqlService.delete(triple);
    } catch {
      throw new RepositoryException("The relations couldn't be deleted");
    }
  }

  async deleteByNodeId(nodeId: UUID): Promise<void> {
    try {
      const triple = this.relationMapper.domain2Persistance({
        sourceNodeId: nodeId,
        targetNodeId: nodeId,
      } as RelationEntity);
      await this.sparqlService.delete(triple);
    } catch {
      throw new RepositoryException("The relations couldn't be deleted");
    }
  }

  async findByTreeId(treeId: UUID): Promise<RelationEntity[]> {
    try {
      const triple = this.relationMapper.domain2Persistance({
        treeId: treeId,
      } as RelationEntity);

      const triples = await this.sparqlService.query(triple);
      return Promise.all(
        triples.map(async (triple) => {
          return this.relationMapper.persistance2Domain(triple);
        }),
      );
    } catch {
      throw new RepositoryException("The relations couldn't be fetched");
    }
  }

  async findGenealogy(treeId: UUID): Promise<NodeObject[]> {
    try {
      const triple = this.relationMapper.domain2Persistance({
        treeId: treeId,
      } as RelationEntity);

      const jsonld = await this.sparqlService.construct(triple);
      return jsonld;
    } catch (error) {
      console.error(error);
      throw new RepositoryException("The relations couldn't be fetched");
    }
  }

  async findDescendantsByNodeId(
    treeId: UUID,
    nodeId: UUID,
  ): Promise<RelationEntity[]> {
    try {
      const triple = this.relationMapper.domain2Persistance({
        sourceNodeId: nodeId,
        treeId: treeId,
      } as RelationEntity);

      const triples = await this.sparqlService.queryDescendants(triple);

      return Promise.all(
        triples.map(async (triple) => {
          return this.relationMapper.persistance2Domain(triple);
        }),
      );
    } catch {
      throw new RepositoryException("The relations couldn't be fetched");
    }
  }

  async findParentsByNodeId(
    nodeId: UUID,
    treeId: UUID,
  ): Promise<RelationEntity[]> {
    try {
      const triple = this.relationMapper.domain2Persistance({
        sourceNodeId: nodeId,
        treeId: treeId,
      } as RelationEntity);

      const triples = await this.sparqlService.queryParents(triple);

      return Promise.all(
        triples.map(async (triple) => {
          return this.relationMapper.persistance2Domain(triple);
        }),
      );
    } catch {
      throw new RepositoryException("The relations couldn't be fetched");
    }
  }
}
