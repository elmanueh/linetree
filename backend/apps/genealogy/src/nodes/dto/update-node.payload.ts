import { UpdateNodeDto } from '@app/contracts';
import { Type } from 'class-transformer';
import { IsUUID, ValidateNested } from 'class-validator';
import { UUID } from 'crypto';

export class UpdateNodePayload {
  @IsUUID()
  treeId: UUID;

  @IsUUID()
  nodeId: UUID;

  @ValidateNested()
  @Type(() => UpdateNodeDto)
  dto: UpdateNodeDto;

  @IsUUID()
  owner: UUID;
}
