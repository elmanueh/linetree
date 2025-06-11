import { ExchangeController } from '@app/genealogy/exchange/exchange.controller';
import { ExchangeService } from '@app/genealogy/exchange/exchange.service';
import { TreesModule } from '@app/genealogy/trees/trees.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [TreesModule],
  controllers: [ExchangeController],
  providers: [ExchangeService],
})
export class ExchangeModule {}
