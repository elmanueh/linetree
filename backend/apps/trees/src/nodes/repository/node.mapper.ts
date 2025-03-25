import { Mapper } from '@genealogy/shared';
import { Injectable } from '@nestjs/common';
import { NodeEntity } from '../../core/domain/node.entity';
import { Node } from '../../nodes/repository/node.schema';

@Injectable()
export class NodeMapper extends Mapper<NodeEntity, Node> {
  toPersistance(entity: NodeEntity): Node {
    return {
      _id: entity.id,
      name: entity.name,
    };
  }

  toDomain(document: Node): NodeEntity {
    return NodeEntity.create({ name: document.name }, document._id);
  }
}
