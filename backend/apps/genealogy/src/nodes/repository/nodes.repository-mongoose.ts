import { RepositoryMongoose } from '@app/shared';
import { NodeEntity } from '@genealogy-ms/core/domain/node.entity';
import { NodeRepository } from '@genealogy-ms/core/persistance/nodes.repository';
import { NodePersistanceMapper } from '@genealogy-ms/nodes/repository/node.mapper';
import { Node, NodeDocument } from '@genealogy-ms/nodes/repository/node.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class NodeRepositoryMongoose
  extends RepositoryMongoose<NodeEntity, Node>
  implements NodeRepository
{
  constructor(
    @InjectModel(Node.name) private readonly nodeModel: Model<NodeDocument>,
    private readonly nodeMapper: NodePersistanceMapper,
  ) {
    super(nodeModel, nodeMapper);
  }
}
