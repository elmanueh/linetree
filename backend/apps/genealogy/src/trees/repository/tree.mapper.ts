import { Mapper } from '@app/shared';
import { TreeEntity } from '@genealogy-ms/core/domain/tree.entity';
import { NodeRepository } from '@genealogy-ms/core/persistance/nodes.repository';
import { Tree } from '@genealogy-ms/trees/repository/tree.schema';
import { Injectable } from '@nestjs/common';
import { UUID } from 'crypto';

@Injectable()
export class TreePersistanceMapper extends Mapper<TreeEntity, Tree> {
  constructor(private readonly nodeRepository: NodeRepository) {
    super();
  }

  domain2Persistance(entity: TreeEntity): Tree {
    return {
      _id: entity.id,
      name: entity.name,
      nodes: entity.nodes.map((node) => node.id),
    };
  }

  async persistance2Domain(document: Tree): Promise<TreeEntity> {
    const nodes = await Promise.all(
      document.nodes.map((nodeId) =>
        this.nodeRepository.findById(nodeId as UUID),
      ),
    );

    return TreeEntity.create(
      {
        name: document.name,
        nodes: nodes,
      },
      document._id as UUID,
    );
  }
}
