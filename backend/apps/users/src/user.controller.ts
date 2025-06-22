import { USER_PATTERN } from '@app/contracts';
import { Controller, ParseUUIDPipe, ValidationPipe } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateUserDto } from '@users-ms/dto/create-user.dto';
import { GetUserDto } from '@users-ms/dto/get-user.dto';
import { UserService } from '@users-ms/user.service';
import { UUID } from 'crypto';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern(USER_PATTERN.CREATE)
  async create(@Payload(ValidationPipe) dto: CreateUserDto): Promise<UUID> {
    const user = await this.userService.create(
      dto.birthDate,
      dto.email,
      dto.firstName,
      dto.gender,
      dto.lastName,
      dto.password,
    );

    return user.id;
  }

  @MessagePattern(USER_PATTERN.FIND_ONE)
  async findOne(@Payload('id', ParseUUIDPipe) id: UUID): Promise<GetUserDto> {
    const user = await this.userService.findOneById(id);
    return GetUserDto.fromEntity(user);
  }

  @MessagePattern(USER_PATTERN.FIND_ONE_BY_EMAIL)
  async findOneByEmail(@Payload('email') email: string): Promise<GetUserDto> {
    const user = await this.userService.findOneByEmail(email);
    return GetUserDto.fromEntity(user);
  }

  @MessagePattern(USER_PATTERN.REMOVE)
  async remove(@Payload('id', ParseUUIDPipe) id: UUID) {
    await this.userService.remove(id);
    return {};
  }
}
