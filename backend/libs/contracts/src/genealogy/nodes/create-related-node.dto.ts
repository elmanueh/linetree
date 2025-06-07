import { CreateNodeDto } from '@app/contracts';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsOptional,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { UUID } from 'crypto';

export class CreateRelatedNodeDto {
  @IsUUID()
  nodeId: UUID;

  @IsNotEmpty({ message: 'Relation is required' })
  relation: string;

  @IsOptional()
  @IsUUID()
  spouseId?: UUID;

  @ValidateNested()
  @Type(() => CreateNodeDto)
  nodeInfo: CreateNodeDto;
}
