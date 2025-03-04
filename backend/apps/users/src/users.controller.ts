import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { GetUserDto } from './dto/get-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { CreateUserDto } from './dto/register-user.dto';
import { UserMapper } from './mapper/user.mapper';
import { UsersService } from './users.service';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern('users.create')
  async create(createUserDto: CreateUserDto) {
    await this.usersService.create(UserMapper.toDomainRegister(createUserDto));
  }

  @MessagePattern('users.login')
  async login(loginUserDto: LoginUserDto) {
    await this.usersService.login(UserMapper.toDomainLogin(loginUserDto));
  }

  @MessagePattern('users.findOne')
  async findOne(id: string): Promise<GetUserDto> {
    const user = await this.usersService.findOne(id);
    return UserMapper.toDto(user);
  }

  @MessagePattern('users.remove')
  async remove(id: string) {
    await this.usersService.remove(id);
  }
}
