import { CreateNodeDto } from '@app/contracts';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsUUID, ValidateNested } from 'class-validator';
import { UUID } from 'crypto';

export class CreateRelatedNodeDto {
  @IsUUID()
  nodeId: UUID;

  @IsNotEmpty({ message: 'Relation is required' })
  relation: string;

  @ValidateNested()
  @Type(() => CreateNodeDto)
  nodeInfo: CreateNodeDto;
}
