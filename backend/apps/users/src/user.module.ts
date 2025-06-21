import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserPersistanceMapper } from '@users-ms/repository/user.mapper';
import { UserRepository } from '@users-ms/repository/user.repository';
import { UserRepositoryMongoose } from '@users-ms/repository/user.repository-mongoose';
import { User, UserSchema } from '@users-ms/repository/user.schema';
import { UserController } from '@users-ms/user.controller';
import { UserService } from '@users-ms/user.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: './apps/users/.env' }),
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
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
