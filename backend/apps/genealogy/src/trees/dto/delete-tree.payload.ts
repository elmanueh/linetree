import { UUID } from 'crypto';

export class DeleteTreePayload {
  readonly treeId: UUID;
  readonly owner: UUID;
}
