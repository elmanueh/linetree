import { TreeRepository } from '@app/genealogy/core/persistance/trees.repository';
import { TreePersistanceMapper } from '@app/genealogy/trees/repository/tree.mapper';
import { Tree, TreeSchema } from '@app/genealogy/trees/repository/tree.schema';
import { TreeRepositoryMongoose } from '@app/genealogy/trees/repository/trees.repository-mongoose';
import { TreesController } from '@app/genealogy/trees/trees.controller';
import { TreesService } from '@app/genealogy/trees/trees.service';
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
