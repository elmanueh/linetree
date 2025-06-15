import { AuthService } from '@app/gateway/auth-service/auth.service';
import { LoginDto } from '@app/gateway/auth-service/dto/login.dto';
import { UserResponseDto } from '@app/gateway/auth-service/dto/user-response.dto';
import { CreateUserDto } from '@app/gateway/user-service/dto/create-user.dto';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  ValidationPipe,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(
    @Body(ValidationPipe) dto: CreateUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken } = await this.authService.register(dto);
    res.cookie('jwt', accessToken, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60,
    });
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(
    @Body(ValidationPipe) dto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken } = await this.authService.login(dto);
    res.cookie('jwt', accessToken, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60,
    });
  }

  @Post('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('jwt');
  }

  @Get('user')
  async getUser(@Req() req: Request) {
    const token = req.cookies['jwt'] as string;
    const user = await this.authService.getUser(token);
    if (!user) return null;

    const userResponse: UserResponseDto = {
      id: user.id,
      birthDate: user.birthDate,
      email: user.email,
      firstName: user.firstName,
      gender: user.gender,
      lastName: user.lastName,
    };

    return userResponse;
  }
}
