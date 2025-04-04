import { NodeEntity } from '@app/genealogy/core/domain/node.entity';
import { Node } from '@app/genealogy/nodes/repository/node.schema';
import { Mapper } from '@app/shared';
import { Injectable } from '@nestjs/common';

@Injectable()
export class NodePersistanceMapper extends Mapper<NodeEntity, Node> {
  domain2Persistance(entity: NodeEntity): Node {
    return {
      _id: entity.id,
      name: entity.name,
    };
  }

  persistance2Domain(document: Node): NodeEntity {
    return NodeEntity.create({ name: document.name }, document._id);
  }
}
