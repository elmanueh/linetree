import { GenderType } from '@genealogy-ms/core/domain/gender.enum';
import { UserEntity } from '@users-ms/domain/user.entity';
import { UUID } from 'crypto';

export class GetUserDto {
  id: UUID;
  birthDate: Date;
  email: string;
  firstName: string;
  gender: GenderType;
  lastName: string;
  password: string;

  static fromEntity(entity: UserEntity): GetUserDto {
    const dto = new GetUserDto();
    dto.id = entity.id;
    dto.birthDate = entity.birthDate;
    dto.email = entity.email;
    dto.firstName = entity.firstName;
    dto.gender = entity.gender;
    dto.lastName = entity.lastName;
    dto.password = entity.password;
    return dto;
  }
}
