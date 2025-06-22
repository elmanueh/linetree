import { EntityNotFoundException, RepositoryMongoose } from '@app/shared';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserEntity } from '@users-ms/domain/user.entity';
import { UserPersistanceMapper } from '@users-ms/repository/user.mapper';
import { UserRepository } from '@users-ms/repository/user.repository';
import { User, UserDocument } from '@users-ms/repository/user.schema';
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

  async findByEmail(email: string): Promise<UserEntity> {
    const userDocument = await this.userModel.findOne({ email }).exec();
    if (!userDocument) throw new EntityNotFoundException('User not found');

    return this.userMapper.persistance2Domain(userDocument);
  }
}
