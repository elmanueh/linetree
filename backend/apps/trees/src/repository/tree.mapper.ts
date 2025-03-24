import { Mapper } from '@genealogy/shared';
import { TreeEntity } from '../domain/tree.entity';
import { Tree } from './tree.schema';

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
