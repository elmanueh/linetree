import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TreeRepository } from '../core/persistance/trees.repository';

import { TreeMapper } from './repository/tree.mapper';
import { Tree, TreeSchema } from './repository/tree.schema';
import { TreeRepositoryMongoose } from './repository/trees.repository-mongoose';
import { TreesController } from './trees.controller';
import { TreesService } from './trees.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Tree.name, schema: TreeSchema }]),
  ],
  controllers: [TreesController],
  providers: [
    TreesService,
    TreeMapper,
    {
      provide: TreeRepository,
      useClass: TreeRepositoryMongoose,
    },
  ],
  exports: [TreeRepository],
})
export class TreesModule {}
