import { EXCHANGE_PATTERNS } from '@app/contracts';
import { ExchangeService } from '@app/genealogy/exchange/exchange.service';
import { RpcParseUUIDPipe } from '@app/shared';
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UUID } from 'crypto';

@Controller()
export class ExchangeController {
  constructor(private readonly exchangeService: ExchangeService) {}

  @MessagePattern(EXCHANGE_PATTERNS.GEDCOM)
  createGedcomFile(@Payload('id', RpcParseUUIDPipe) treeId: UUID) {
    return this.exchangeService.createGedcomFile(treeId);
  }
}
