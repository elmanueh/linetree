import { GenderType } from '@genealogy-ms/core/domain/gender.enum';
import { UUID } from 'crypto';
import { NodeObject } from 'jsonld';

export interface GenealogyNode extends NodeObject {
  _gedcomId?: string;
  id: UUID;
  givenName: string;
  gender: GenderType;
  spouse?: GenealogyNode;
  children?: GenealogyNode | GenealogyNode[];
}
