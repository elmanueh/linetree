import { NodesModule } from '@app/genealogy/nodes/nodes.module';
import { InferenceService } from '@app/genealogy/relations/inference/inference.service';
import { RelationsModule } from '@app/genealogy/relations/relations.module';
import { TreesModule } from '@app/genealogy/trees/trees.module';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ExchangeModule } from './exchange/exchange.module';

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
    ExchangeModule,
  ],
  providers: [InferenceService],
})
export class GenealogyModule {}
