import { UserEntity } from '@app/gateway/user-service/entities/user.entity';
import { UserPersistanceMapper } from '@app/gateway/user-service/persistance/user.mapper';
import { UserRepository } from '@app/gateway/user-service/persistance/user.repository';
import {
  User,
  UserDocument,
} from '@app/gateway/user-service/persistance/user.schema';
import { RepositoryMongoose } from '@app/shared';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';

@Injectable()
export class UserRepositoryMongoose
  extends RepositoryMongoose<UserEntity, User>
  implements UserRepository
{
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private readonly userMapper: UserPersistanceMapper,
  ) {
    super(userModel, userMapper);
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const userDocument = await this.userModel.findOne({ email }).exec();
    if (!userDocument) return null;

    return this.userMapper.persistance2Domain(userDocument);
  }
}
