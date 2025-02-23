import { CreateUserDto } from '../dto/create-user.dto';
import { GetUserDto } from '../dto/get-user.dto';
import { User } from '../schema/user.schema';

export class UserMapper {
  static toDomain(dto: CreateUserDto): User {
    const user = new User();
    user.name = dto.name;
    user.email = dto.email;
    user.password = dto.password;
    return user;
  }

  static toDto(user: User): GetUserDto {
    const dto = new GetUserDto();
    dto.id = user.id;
    dto.name = user.name;
    dto.email = user.email;
    dto.password = user.password;
    dto.trees = user.trees;
    return dto;
  }
}
