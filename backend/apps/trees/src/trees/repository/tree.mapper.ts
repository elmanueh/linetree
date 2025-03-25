import { Mapper } from '@genealogy/shared';
import { Injectable } from '@nestjs/common';
import { TreeEntity } from '../../core/domain/tree.entity';
import { Tree } from '../../trees/repository/tree.schema';

@Injectable()
export class TreeMapper extends Mapper<TreeEntity, Tree> {
  toPersistance(entity: TreeEntity): Tree {
    return {
      _id: entity.id,
      name: entity.name,
      nodes: entity.nodes,
    };
  }

  toDomain(document: Tree): TreeEntity {
    return TreeEntity.create(
      { name: document.name, nodes: document.nodes },
      document._id,
    );
  }
}
