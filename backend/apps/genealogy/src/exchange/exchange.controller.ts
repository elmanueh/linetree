import { EXCHANGE_PATTERNS } from '@app/contracts';
import { ExportGedcomPayload } from '@genealogy-ms/exchange/dto/export-gedcom.payload';
import { ImportGedcomPayload } from '@genealogy-ms/exchange/dto/import-gedcom.payload';
import { ExchangeService } from '@genealogy-ms/exchange/exchange.service';
import { Controller, ValidationPipe } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class ExchangeController {
  constructor(private readonly exchangeService: ExchangeService) {}

  @MessagePattern(EXCHANGE_PATTERNS.EXPORT_GEDCOM)
  createGedcomFile(@Payload(ValidationPipe) payload: ExportGedcomPayload) {
    const { treeId, owner } = payload;
    return this.exchangeService.createGedcomFile(treeId, owner);
  }

  @MessagePattern(EXCHANGE_PATTERNS.IMPORT_GEDCOM)
  loadGedcomFile(@Payload(ValidationPipe) payload: ImportGedcomPayload) {
    const { fileData, owner } = payload;
    return this.exchangeService.loadGedcomFile(fileData, owner);
  }
}
