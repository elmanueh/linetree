import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UUID } from 'crypto';
import { NextFunction, Request, Response } from 'express';

declare module 'express' {
  interface Request {
    user?: UUID;
  }
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies['jwt'] as string;
    if (!token)
      throw new UnauthorizedException(
        'Access denied. No authentication token provided.',
      );

    try {
      const payload = await this.jwtService.verifyAsync<{ sub: UUID }>(token);
      req.user = payload.sub;
      next();
    } catch {
      throw new UnauthorizedException('Invalid JWT');
    }
  }
}
