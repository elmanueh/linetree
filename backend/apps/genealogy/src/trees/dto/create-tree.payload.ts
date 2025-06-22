import { UUID } from 'crypto';

export class CreateTreePayload {
  readonly name: string;
  readonly owner: UUID;
}
