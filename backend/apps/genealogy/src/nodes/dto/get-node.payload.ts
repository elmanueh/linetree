import { IsUUID } from 'class-validator';
import { UUID } from 'crypto';

export class GetNodePayload {
  @IsUUID()
  treeId: UUID;

  @IsUUID()
  nodeId: UUID;
}
