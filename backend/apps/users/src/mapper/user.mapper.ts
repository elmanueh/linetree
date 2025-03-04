import { GetUserDto } from '../dto/get-user.dto';
import { LoginUserDto } from '../dto/login-user.dto';
import { CreateUserDto } from '../dto/register-user.dto';
import { User } from '../schema/user.schema';

export class UserMapper {
  static toDomainRegister(dto: CreateUserDto): User {
    const user = new User();
    user.name = dto.name;
    user.email = dto.email;
    user.password = dto.password;
    return user;
  }

  static toDomainLogin(dto: LoginUserDto) {
    const user = new User();
    user.email = dto.email;
    user.password = dto.password;
    return user;
  }

  static toDto(user: User): GetUserDto {
    const dto = new GetUserDto();
    dto.name = user.name;
    dto.email = user.email;
    dto.password = user.password;
    dto.trees = user.trees;
    return dto;
  }
}
