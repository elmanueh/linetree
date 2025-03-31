import { TreeRepository } from '@genealogy/core/persistance/trees.repository';
import { TreePersistanceMapper } from '@genealogy/trees/repository/tree.mapper';
import { Tree, TreeSchema } from '@genealogy/trees/repository/tree.schema';
import { TreeRepositoryMongoose } from '@genealogy/trees/repository/trees.repository-mongoose';
import { TreesController } from '@genealogy/trees/trees.controller';
import { TreesService } from '@genealogy/trees/trees.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Tree.name, schema: TreeSchema }]),
  ],
  controllers: [TreesController],
  providers: [
    TreesService,
    TreePersistanceMapper,
    {
      provide: TreeRepository,
      useClass: TreeRepositoryMongoose,
    },
  ],
  exports: [TreeRepository],
})
export class TreesModule {}
