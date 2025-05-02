import { NodesModule } from '@app/genealogy/nodes/nodes.module';
import { TreesModule } from '@app/genealogy/trees/trees.module';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { RelationsModule } from './relations/relations.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get('MONGODB_URI'),
      }),
    }),
    TreesModule,
    NodesModule,
    RelationsModule,
  ],
})
export class GenealogyModule {}
