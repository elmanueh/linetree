import { GenderType } from '@genealogy-ms/core/domain/gender.enum';
import { UUID } from 'crypto';
import { NodeObject } from 'jsonld';

export interface GenealogyNode extends NodeObject {
  _gedcomId?: string;
  '@id': UUID;
  address?: string;
  birthDate?: string;
  birthPlace?: string;
  deathDate?: string;
  deathPlace?: string;
  email?: string;
  familyName?: string;
  gender: GenderType;
  givenName: string;
  nationality?: string;
  telephone?: string;
  spouse?: GenealogyNode | GenealogyNode[];
  children?: GenealogyNode | GenealogyNode[];
}
