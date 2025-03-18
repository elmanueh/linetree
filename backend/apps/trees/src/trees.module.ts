import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { TreeMapper } from './repository/mapper/tree.mapper';
import { Tree, TreeSchema } from './repository/persistance/tree.schema';
import { TreeRepository } from './repository/trees.repository';
import { TreeRepositoryMongoose } from './repository/trees.repository-mongoose';
import { TreesController } from './trees.controller';
import { TreesService } from './trees.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forFeature([{ name: Tree.name, schema: TreeSchema }]),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get('MONGODB_URI'),
      }),
    }),
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
})
export class TreesModule {}
