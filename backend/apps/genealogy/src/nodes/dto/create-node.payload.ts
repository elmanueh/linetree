import { Type } from 'class-transformer';
import { IsUUID, ValidateNested } from 'class-validator';
import { UUID } from 'crypto';
import { CreateRelatedNodeDto } from 'libs/contracts/src/genealogy/nodes/create-related-node.dto';

export class CreateNodePayload {
  @IsUUID()
  treeId: UUID;

  @ValidateNested()
  @Type(() => CreateRelatedNodeDto)
  dto: CreateRelatedNodeDto;
}
