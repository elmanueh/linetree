import { UUID } from 'crypto';

export class GetTreePayload {
  readonly treeId: UUID;
  readonly owner: UUID;
}
