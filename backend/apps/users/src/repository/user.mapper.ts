import { Mapper } from '@app/shared';
import { GenderType } from '@genealogy-ms/core/domain/gender.enum';
import { Injectable } from '@nestjs/common';
import { UserEntity } from '@users-ms/domain/user.entity';
import { User } from '@users-ms/repository/user.schema';
import { UUID } from 'crypto';

@Injectable()
export class UserPersistanceMapper extends Mapper<UserEntity, User> {
  domain2Persistance(entity: UserEntity): User {
    return {
      _id: entity.id,
      birthDate: entity.birthDate,
      email: entity.email,
      firstName: entity.firstName,
      gender: entity.gender,
      lastName: entity.lastName,
      password: entity.password,
    };
  }

  async persistance2Domain(document: User): Promise<UserEntity> {
    return Promise.resolve(
      UserEntity.create(
        {
          birthDate: document.birthDate,
          email: document.email,
          firstName: document.firstName,
          gender: document.gender as GenderType,
          lastName: document.lastName,
          password: document.password,
        },
        document._id as UUID,
      ),
    );
  }
}
