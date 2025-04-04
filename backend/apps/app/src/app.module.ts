import { AppController } from '@app/gateway/app.controller';
import { AppService } from '@app/gateway/app.service';
import { GenealogyModule } from '@app/gateway/genealogy-service/genealogy.module';
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'USERS_CLIENT',
        transport: Transport.TCP,
        options: {
          port: 3001,
        },
      },
    ]),
    GenealogyModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
