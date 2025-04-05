import { IsUUID } from 'class-validator';
import { UUID } from 'crypto';

export class RemoveNodePayload {
  @IsUUID()
  treeId: UUID;

  @IsUUID()
  nodeId: UUID;
}
