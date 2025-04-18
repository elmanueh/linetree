import { RelationEntity } from '@app/genealogy/core/domain/relation.entity';
import { RelationsRepository } from '@app/genealogy/core/persistance/relations.repository';
import { RelationPersistanceMapper } from '@app/genealogy/nodes/repository/relation.mapper';
import { RepositoryException, RepositoryRDF, SparqlService } from '@app/shared';
import { Injectable } from '@nestjs/common';
import { UUID } from 'crypto';

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
        souceNodeId: nodeId,
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
      return triples.map((triple) => {
        return this.relationMapper.persistance2Domain(triple);
      });
    } catch {
      throw new RepositoryException("The relations couldn't be fetched");
    }
  }

  async findGenealogy(treeId: UUID): Promise<object> {
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
}
