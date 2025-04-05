import { CreateNodeDto } from '@app/contracts';
import { IsUUID } from 'class-validator';
import { UUID } from 'crypto';

export class CreateNodePayload {
  @IsUUID()
  treeId: UUID;

  dto: CreateNodeDto;
}
