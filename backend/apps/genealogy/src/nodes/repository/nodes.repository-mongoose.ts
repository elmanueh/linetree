import { NodeEntity } from '@genealogy/core/domain/node.entity';
import { NodeRepository } from '@genealogy/core/persistance/nodes.repository';
import { NodePersistanceMapper } from '@genealogy/nodes/repository/node.mapper';
import { Node, NodeDocument } from '@genealogy/nodes/repository/node.schema';
import { RepositoryMongoose } from '@genealogy/shared';
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
