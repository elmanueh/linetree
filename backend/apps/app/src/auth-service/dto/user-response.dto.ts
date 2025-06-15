import { GenderType } from '@app/genealogy/core/domain/gender.enum';
import { UUID } from 'crypto';

export class UserResponseDto {
  id: UUID;
  birthDate: Date;
  email: string;
  firstName: string;
  gender: GenderType;
  lastName: string;
}
