import { UserPersistanceMapper } from '@app/gateway/user-service/persistance/user.mapper';
import { UserRepository } from '@app/gateway/user-service/persistance/user.repository';
import { UserRepositoryMongoose } from '@app/gateway/user-service/persistance/user.repository-mongoose';
import {
  User,
  UserSchema,
} from '@app/gateway/user-service/persistance/user.schema';
import { UserController } from '@app/gateway/user-service/user.controller';
import { UserService } from '@app/gateway/user-service/user.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [
    UserService,
    UserPersistanceMapper,
    {
      provide: UserRepository,
      useClass: UserRepositoryMongoose,
    },
  ],
  exports: [UserService],
})
export class UserModule {}
