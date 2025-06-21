import { LoginDto } from '@gateway/auth-service/dto/login.dto';
import { UserService } from '@gateway/user-service/user.service';
import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '@users-ms/dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { UUID } from 'crypto';

interface JwtPayload {
  sub: UUID;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  private generateToken(userId: UUID) {
    const payload: JwtPayload = { sub: userId };
    return this.jwtService.signAsync(payload);
  }

  async register(dto: CreateUserDto) {
    const user = await this.userService.getUserByEmail(dto.email);
    if (user) throw new ConflictException('Email already exists');

    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const id = await this.userService.createUser({
      birthDate: dto.birthDate,
      email: dto.email,
      firstName: dto.firstName,
      gender: dto.gender,
      lastName: dto.lastName,
      password: hashedPassword,
    });

    const accessToken = await this.generateToken(id);
    return { accessToken };
  }

  async login(dto: LoginDto) {
    const user = await this.userService.getUserByEmail(dto.email);
    if (!user || !(await bcrypt.compare(dto.password, user.password))) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const accessToken = await this.generateToken(user.id);
    return { accessToken };
  }

  async getUser(token: string) {
    if (!token) return null;

    try {
      const payload = await this.jwtService.verifyAsync<JwtPayload>(token);
      return this.userService.getUser(payload.sub);
    } catch {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
