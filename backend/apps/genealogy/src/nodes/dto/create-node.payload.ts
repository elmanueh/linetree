import { CreateNodeDto } from '@app/contracts';
import { RelationType } from '@genealogy-ms/core/domain/relation.enum';
import { Type } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { UUID } from 'crypto';

export class CreateNodePayload {
  @IsUUID()
  treeId: UUID;

  @IsUUID()
  nodeRefId: UUID;

  @IsOptional()
  @IsUUID()
  spouseId?: UUID;

  @IsNotEmpty()
  @IsEnum(RelationType, {
    message: 'Type must be one of the following: children, parent, spouse',
  })
  type: RelationType;

  @ValidateNested()
  @Type(() => CreateNodeDto)
  dto: CreateNodeDto;

  @IsUUID()
  owner: UUID;
}
