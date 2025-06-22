import { IsUUID } from 'class-validator';
import { UUID } from 'crypto';

export class ExportGedcomPayload {
  @IsUUID()
  treeId: UUID;

  @IsUUID()
  owner: UUID;
}
