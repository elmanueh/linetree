import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUserDto } from './dto/get-user.dto';
import { UserMapper } from './mapper/user.mapper';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body(new ValidationPipe()) createUserDto: CreateUserDto) {
    await this.usersService.create(UserMapper.toDomain(createUserDto));
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<GetUserDto> {
    const user = await this.usersService.findOne(id);
    return UserMapper.toDto(user);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.usersService.remove(id);
  }
}
