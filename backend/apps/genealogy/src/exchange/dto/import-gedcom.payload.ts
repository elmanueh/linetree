import { IsString, IsUUID } from 'class-validator';
import { UUID } from 'crypto';

export class ImportGedcomPayload {
  @IsString()
  fileData: string;

  @IsUUID()
  owner: UUID;
}
