import { UUID } from 'crypto';

export class GetGenealogyPayload {
  readonly treeId: UUID;
  readonly owner: UUID;
}
