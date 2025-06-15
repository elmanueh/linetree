import { UserEntity } from '@app/gateway/user-service/entities/user.entity';
import { User } from '@app/gateway/user-service/persistance/user.schema';
import { GenderType } from '@app/genealogy/core/domain/gender.enum';
import { Mapper } from '@app/shared';
import { Injectable } from '@nestjs/common';
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
