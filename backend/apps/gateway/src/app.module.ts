import { AuthModule } from '@gateway/auth-service/auth.module';
import { GenealogyModule } from '@gateway/genealogy-service/genealogy.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './apps/gateway/.env',
    }),
    GenealogyModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
