import { TreeRepository } from '@genealogy-ms/core/persistance/trees.repository';
import { NodesModule } from '@genealogy-ms/nodes/nodes.module';
import { RelationsModule } from '@genealogy-ms/relations/relations.module';
import { TreePersistanceMapper } from '@genealogy-ms/trees/repository/tree.mapper';
import { Tree, TreeSchema } from '@genealogy-ms/trees/repository/tree.schema';
import { TreeRepositoryMongoose } from '@genealogy-ms/trees/repository/trees.repository-mongoose';
import { TreesController } from '@genealogy-ms/trees/trees.controller';
import { TreesService } from '@genealogy-ms/trees/trees.service';
import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Tree.name, schema: TreeSchema }]),
    forwardRef(() => NodesModule),
    RelationsModule,
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
  exports: [TreeRepository, TreesService],
})
export class TreesModule {}
