import { AuthModule } from '@app/gateway/auth-service/auth.module';
import { GenealogyModule } from '@app/gateway/genealogy-service/genealogy.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './apps/app/.env',
    }),
    GenealogyModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
