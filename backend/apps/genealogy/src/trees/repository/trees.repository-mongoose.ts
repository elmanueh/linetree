import { TreeEntity } from '@app/genealogy/core/domain/tree.entity';
import { TreeRepository } from '@app/genealogy/core/persistance/trees.repository';
import { TreePersistanceMapper } from '@app/genealogy/trees/repository/tree.mapper';
import {
  Tree,
  TreeDocument,
} from '@app/genealogy/trees/repository/tree.schema';
import { EntityNotFoundException, RepositoryMongoose } from '@app/shared';
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

  // Override the findById method to populate the nodes field
  async findById(id: UUID): Promise<TreeEntity> {
    const document = await this.treeModel.findById(id).populate('nodes');
    if (!document) {
      throw new EntityNotFoundException(`Tree with id "${id}" not found`);
    }
    return this.treeMapper.persistance2DomainAsync(document);
  }
}
