import { CreateUserDto } from '@app/gateway/user-service/dto/create-user.dto';
import { UserEntity } from '@app/gateway/user-service/entities/user.entity';
import { UserRepository } from '@app/gateway/user-service/persistance/user.repository';
import { Injectable } from '@nestjs/common';
import { UUID } from 'crypto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(dto: CreateUserDto): Promise<UserEntity> {
    const user = UserEntity.create({
      birthDate: dto.birthDate,
      email: dto.email,
      firstName: dto.firstName,
      gender: dto.gender,
      lastName: dto.lastName,
      password: dto.password,
    });

    await this.userRepository.save(user);
    return user;
  }

  async findAll(): Promise<UserEntity[]> {
    return this.userRepository.findAll();
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    return this.userRepository.findByEmail(email);
  }

  findById(id: UUID): Promise<UserEntity | null> {
    return this.userRepository.findById(id);
  }

  async remove(id: UUID): Promise<void> {
    return this.userRepository.delete(id);
  }
}
