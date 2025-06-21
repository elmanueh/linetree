import { ExchangeController } from '@genealogy-ms/exchange/exchange.controller';
import { ExchangeService } from '@genealogy-ms/exchange/exchange.service';
import { NodesModule } from '@genealogy-ms/nodes/nodes.module';
import { RelationsModule } from '@genealogy-ms/relations/relations.module';
import { TreesModule } from '@genealogy-ms/trees/trees.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [TreesModule, NodesModule, RelationsModule],
  controllers: [ExchangeController],
  providers: [ExchangeService],
})
export class ExchangeModule {}
