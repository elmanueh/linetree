import { RepositoryMongoose } from '@genealogy/shared';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NodeEntity } from '../core/domain/node.entity';
import { Node, NodeDocument } from '../schema/node.schema';
import { NodeMapper } from './mapper/node.mapper';
import { NodeRepository } from './nodes.repository';

@Injectable()
export class NodeRepositoryMongoose
  extends RepositoryMongoose<NodeEntity, Node>
  implements NodeRepository
{
  constructor(
    @InjectModel(Node.name) private readonly nodeModel: Model<NodeDocument>,
    private readonly nodeMapper: NodeMapper,
  ) {
    super(nodeModel, nodeMapper);
  }
}
