import { LoginDto } from '@app/gateway/auth-service/dto/login.dto';
import { CreateUserDto } from '@app/gateway/user-service/dto/create-user.dto';
import { UserService } from '@app/gateway/user-service/user.service';
import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
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
    const existEmail = await this.userService.findByEmail(dto.email);
    if (existEmail) throw new ConflictException('Email already exists');

    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const user = await this.userService.create({
      birthDate: dto.birthDate,
      email: dto.email,
      firstName: dto.firstName,
      gender: dto.gender,
      lastName: dto.lastName,
      password: hashedPassword,
    });

    const accessToken = await this.generateToken(user.id);
    return { accessToken };
  }

  async login(dto: LoginDto) {
    const user = await this.userService.findByEmail(dto.email);
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
      return this.userService.findById(payload.sub);
    } catch {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
