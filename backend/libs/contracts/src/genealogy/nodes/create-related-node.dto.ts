import { Type } from 'class-transformer';
import { IsNotEmpty, IsUUID, ValidateNested } from 'class-validator';
import { UUID } from 'crypto';
import { CreateNodeDto } from 'libs/contracts/src/genealogy/nodes/create-node.dto';

export class CreateRelatedNodeDto {
  @IsUUID()
  nodeId: UUID;

  @IsNotEmpty({ message: 'Relation is required' })
  relation: string;

  @ValidateNested()
  @Type(() => CreateNodeDto)
  nodeInfo: CreateNodeDto;
}
