import { AuthService } from '@gateway/auth-service/auth.service';
import { LoginDto } from '@gateway/auth-service/dto/login.dto';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
  Post,
  Req,
  Res,
  ValidationPipe,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CreateUserDto } from '@users-ms/dto/create-user.dto';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @Post('register')
  async register(
    @Body(ValidationPipe) dto: CreateUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    this.logger.log('Registering user with email: ' + dto.email);
    const { accessToken } = await this.authService.register(dto);
    res.cookie('jwt', accessToken, {
      httpOnly: true,
      maxAge: this.configService.get<number>('JWT_COOKIE_MAX_AGE'),
    });
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(
    @Body(ValidationPipe) dto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    this.logger.log('Logging in user with email: ' + dto.email);
    const { accessToken } = await this.authService.login(dto);
    res.cookie('jwt', accessToken, {
      httpOnly: true,
      maxAge: this.configService.get<number>('JWT_COOKIE_MAX_AGE'),
    });
  }

  @HttpCode(HttpStatus.OK)
  @Post('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    this.logger.log('Logging out user');
    res.clearCookie('jwt');
  }

  @Get('user')
  async getUser(@Req() req: Request) {
    this.logger.log('Fetching user information');
    const token = req.cookies['jwt'] as string;
    const user = await this.authService.getUser(token);
    if (!user) return null;

    return user;
  }
}
