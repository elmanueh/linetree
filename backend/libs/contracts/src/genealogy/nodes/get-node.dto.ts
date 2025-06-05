import { GenderType } from '@app/genealogy/core/domain/gender.enum';
import { UUID } from 'crypto';

export class GetNodeDto {
  id: UUID;
  address?: string;
  birthDate?: Date;
  birthPlace?: string;
  deathDate?: Date;
  deathPlace?: string;
  email?: string;
  familyName?: string;
  gender: GenderType;
  givenName: string;
  nationality?: string;
  telephone?: string;
}
