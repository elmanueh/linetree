import { ExchangeController } from '@app/genealogy/exchange/exchange.controller';
import { ExchangeService } from '@app/genealogy/exchange/exchange.service';
import { NodesModule } from '@app/genealogy/nodes/nodes.module';
import { RelationsModule } from '@app/genealogy/relations/relations.module';
import { TreesModule } from '@app/genealogy/trees/trees.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [TreesModule, NodesModule, RelationsModule],
  controllers: [ExchangeController],
  providers: [ExchangeService],
})
export class ExchangeModule {}
