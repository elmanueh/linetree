import { CreateNodeDto } from '@app/contracts';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsUUID, ValidateNested } from 'class-validator';
import { UUID } from 'crypto';

export class CreateNodePayload {
  @IsUUID()
  treeId: UUID;

  @IsUUID()
  nodeRefId: UUID;

  @IsNotEmpty()
  type: string;

  @ValidateNested()
  @Type(() => CreateNodeDto)
  dto: CreateNodeDto;
}
