import { CreateUserDto } from '@app/gateway/user-service/dto/create-user.dto';
import { UserService } from '@app/gateway/user-service/user.service';
import { Body, Controller, Param, ValidationPipe } from '@nestjs/common';
import { UUID } from 'crypto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  create(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  findOne(@Param('id') id: UUID) {
    return this.userService.findById(id);
  }

  findAll() {
    return this.userService.findAll();
  }

  remove(@Param('id') id: UUID) {
    return this.userService.remove(id);
  }
}
