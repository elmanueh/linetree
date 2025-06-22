import { RepositoryMongoose } from '@app/shared';
import { TreeEntity } from '@genealogy-ms/core/domain/tree.entity';
import { TreeRepository } from '@genealogy-ms/core/persistance/trees.repository';
import { TreePersistanceMapper } from '@genealogy-ms/trees/repository/tree.mapper';
import { Tree, TreeDocument } from '@genealogy-ms/trees/repository/tree.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UUID } from 'crypto';
import { Model } from 'mongoose';

@Injectable()
export class TreeRepositoryMongoose
  extends RepositoryMongoose<TreeEntity, Tree>
  implements TreeRepository
{
  constructor(
    @InjectModel(Tree.name) private readonly treeModel: Model<TreeDocument>,
    private readonly treeMapper: TreePersistanceMapper,
  ) {
    super(treeModel, treeMapper);
  }

  async findAllByOwner(owner: UUID): Promise<TreeEntity[]> {
    const trees = await this.findAll();
    return trees.filter((tree) => tree.owner === owner);
  }
}
