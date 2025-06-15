import { AuthController } from '@app/gateway/auth-service/auth.controller';
import { AuthService } from '@app/gateway/auth-service/auth.service';
import { UserModule } from '@app/gateway/user-service/user.module';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: 'your-secret-key',
      signOptions: { expiresIn: '1h' },
    }),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
