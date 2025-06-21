import { EXCHANGE_PATTERNS } from '@app/contracts';
import { RpcParseUUIDPipe } from '@app/shared';
import { ExchangeService } from '@genealogy-ms/exchange/exchange.service';
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UUID } from 'crypto';

@Controller()
export class ExchangeController {
  constructor(private readonly exchangeService: ExchangeService) {}

  @MessagePattern(EXCHANGE_PATTERNS.EXPORT_GEDCOM)
  createGedcomFile(@Payload('id', RpcParseUUIDPipe) treeId: UUID) {
    return this.exchangeService.createGedcomFile(treeId);
  }

  @MessagePattern(EXCHANGE_PATTERNS.IMPORT_GEDCOM)
  loadGedcomFile(@Payload('gedcom') fileData: string) {
    return this.exchangeService.loadGedcomFile(fileData);
  }
}
