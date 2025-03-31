import { NodeEntity } from '@genealogy/core/domain/node.entity';
import { TreeEntity } from '@genealogy/core/domain/tree.entity';
import { Mapper } from '@genealogy/shared';
import { Tree } from '@genealogy/trees/repository/tree.schema';
import { Injectable } from '@nestjs/common';
import { UUID } from 'crypto';

@Injectable()
export class TreePersistanceMapper extends Mapper<TreeEntity, Tree> {
  domain2Persistance(entity: TreeEntity): Tree {
    return {
      _id: entity.id,
      name: entity.name,
      nodes: entity.nodes.map((node) => node.id),
    };
  }

  persistance2Domain(document: Tree): TreeEntity {
    return TreeEntity.create(
      {
        name: document.name,
        nodes: document.nodes.map((node) =>
          NodeEntity.create({ name: '' }, node as UUID),
        ),
      },
      document._id as UUID,
    );
  }
}
