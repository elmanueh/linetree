import { IsUUID } from 'class-validator';
import { UUID } from 'crypto';

export class GetNodesPayload {
  @IsUUID()
  treeId: UUID;

  @IsUUID()
  owner: UUID;
}
