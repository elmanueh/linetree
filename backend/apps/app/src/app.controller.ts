import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('register')
  register(@Body() body: any) {
    return this.appService.register(body);
  }

  @Post('login')
  login(@Body() body: any) {
    return this.appService.login(body);
  }

  @Get('users/:id')
  getUser(@Param('id') id: string) {
    return this.appService.getUser(id);
  }

  @Delete('users/:id')
  deleteUser(@Param('id') id: string) {
    return this.appService.deleteUser(id);
  }
}
