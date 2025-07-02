import { ExchangeModule } from '@genealogy-ms/exchange/exchange.module';
import { NodesModule } from '@genealogy-ms/nodes/nodes.module';
import { InferenceService } from '@genealogy-ms/relations/inference/inference.service';
import { RelationsModule } from '@genealogy-ms/relations/relations.module';
import { TreesModule } from '@genealogy-ms/trees/trees.module';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env'],
    }),
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
    TreesModule,
    NodesModule,
    RelationsModule,
    ExchangeModule,
  ],
  providers: [InferenceService],
})
export class GenealogyModule {}
