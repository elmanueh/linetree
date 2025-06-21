import { IllegalArgumentRpcException, NotFoundRpcException } from '@app/shared';
import { GenderType } from '@genealogy-ms/core/domain/gender.enum';
import { Injectable, Logger } from '@nestjs/common';
import { UserEntity } from '@users-ms/domain/user.entity';
import { UserRepository } from '@users-ms/repository/user.repository';
import { UUID } from 'crypto';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  constructor(private readonly userRepository: UserRepository) {}

  async create(
    birthDate: Date,
    email: string,
    firstName: string,
    gender: GenderType,
    lastName: string,
    password: string,
  ): Promise<UserEntity> {
    if (!birthDate) {
      throw new IllegalArgumentRpcException(
        'The birthDate cannot be null or undefined.',
      );
    }
    if (!email) {
      throw new IllegalArgumentRpcException(
        'The email cannot be null or undefined.',
      );
    }
    if (!firstName) {
      throw new IllegalArgumentRpcException(
        'The firstName cannot be null or undefined.',
      );
    }
    if (!gender) {
      throw new IllegalArgumentRpcException(
        'The gender cannot be null or undefined.',
      );
    }
    if (!lastName) {
      throw new IllegalArgumentRpcException(
        'The lastName cannot be null or undefined.',
      );
    }
    if (!password) {
      throw new IllegalArgumentRpcException(
        'The password cannot be null or undefined.',
      );
    }

    this.logger.log('Executing create user method');
    const user = UserEntity.create({
      birthDate,
      email,
      firstName,
      gender,
      lastName,
      password,
    });

    await this.userRepository.save(user);
    return user;
  }

  async findOneByEmail(email: string): Promise<UserEntity> {
    if (!email) {
      throw new IllegalArgumentRpcException(
        'The email cannot be null or undefined.',
      );
    }

    this.logger.log('Executing find user by email method');
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new NotFoundRpcException('User not found with this email ' + email);
    }

    return user;
  }

  async findOneById(id: UUID): Promise<UserEntity> {
    if (!id) {
      throw new IllegalArgumentRpcException(
        'The id cannot be null or undefined.',
      );
    }

    this.logger.log('Executing find user by id method');
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundRpcException('User not found with this id ' + id);
    }

    return user;
  }

  async remove(id: UUID): Promise<void> {
    if (!id) {
      throw new IllegalArgumentRpcException(
        'The id cannot be null or undefined.',
      );
    }

    this.logger.log('Executing remove user method');
    await this.userRepository.delete(id);
  }
}
