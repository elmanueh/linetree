import { NodeEntity } from '@app/genealogy/core/domain/node.entity';
import { TreeEntity } from '@app/genealogy/core/domain/tree.entity';
import { Tree } from '@app/genealogy/trees/repository/tree.schema';
import { Mapper } from '@app/shared';
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
