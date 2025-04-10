import { UUID } from 'crypto';

export class TripleRdf {
  subject: UUID;
  predicate: string;
  object: UUID;
  context: UUID;
}
