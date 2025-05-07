import { UUID } from 'crypto';

export class GetNodeDto {
  id: UUID;
  name: string;
  firstName: string;
  lastName?: string;
  birthDate: string;
  deathDate?: string;
  gender: string;
}
