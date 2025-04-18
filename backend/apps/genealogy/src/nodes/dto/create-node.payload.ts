import { CreateNodeDto } from '@app/contracts';
import { Type } from 'class-transformer';
import { IsIn, IsNotEmpty, IsUUID, ValidateNested } from 'class-validator';
import { UUID } from 'crypto';

export class CreateNodePayload {
  @IsUUID()
  treeId: UUID;

  @IsUUID()
  nodeRefId: UUID;

  @IsNotEmpty({ message: 'Type is required' })
  @IsIn(['children', 'spouse'], {
    message: "relation must be one of the following: 'children', 'spouse'",
  })
  type: string;

  @ValidateNested()
  @Type(() => CreateNodeDto)
  dto: CreateNodeDto;
}
