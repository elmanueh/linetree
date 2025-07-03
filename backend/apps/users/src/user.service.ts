import { GenderType } from '@genealogy-ms/core/domain/gender.enum';
import {
  BadRequestException,
  ConflictException,
  Injectable,
  Logger,
} from '@nestjs/common';
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
      throw new BadRequestException(
        'The birthDate cannot be null or undefined.',
      );
    }
    if (!email) {
      throw new BadRequestException('The email cannot be null or undefined.');
    }
    if (!firstName) {
      throw new BadRequestException(
        'The firstName cannot be null or undefined.',
      );
    }
    if (!gender) {
      throw new BadRequestException('The gender cannot be null or undefined.');
    }
    if (!lastName) {
      throw new BadRequestException(
        'The lastName cannot be null or undefined.',
      );
    }
    if (!password) {
      throw new BadRequestException(
        'The password cannot be null or undefined.',
      );
    }

    this.logger.log('Executing create user method');
    const userExist = await this.userRepository.findByEmail(email);
    if (userExist) {
      this.logger.warn(`User with email ${email} already exists.`);
      throw new ConflictException(
        `A user with the email ${email} already exists.`,
      );
    }

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

  async findOneByEmail(email: string): Promise<UserEntity | null> {
    if (!email) {
      throw new BadRequestException('The email cannot be null or undefined.');
    }

    this.logger.log('Executing find user by email method');
    const user = await this.userRepository.findByEmail(email);
    return user;
  }

  async findOneById(id: UUID): Promise<UserEntity> {
    if (!id) {
      throw new BadRequestException('The id cannot be null or undefined.');
    }

    this.logger.log('Executing find user by id method');
    const user = await this.userRepository.findById(id);
    return user;
  }

  async remove(id: UUID): Promise<void> {
    if (!id) {
      throw new BadRequestException('The id cannot be null or undefined.');
    }

    this.logger.log('Executing remove user method');
    await this.userRepository.delete(id);
  }
}
