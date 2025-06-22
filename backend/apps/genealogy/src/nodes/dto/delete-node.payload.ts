import { IsUUID } from 'class-validator';
import { UUID } from 'crypto';

export class DeleteNodePayload {
  @IsUUID()
  treeId: UUID;

  @IsUUID()
  nodeId: UUID;

  @IsUUID()
  owner: UUID;
}
