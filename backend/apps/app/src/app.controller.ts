import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // ------------------ Authentication ------------------
  @Post('register')
  register(@Body() body: any) {
    return this.appService.register(body);
  }

  @Post('login')
  login(@Body() body: any) {
    return this.appService.login(body);
  }

  // ------------------ Users ------------------
  @Get('users/:id')
  getUser(@Param('id') id: string) {
    return this.appService.getUser(id);
  }

  @Delete('users/:id')
  deleteUser(@Param('id') id: string) {
    return this.appService.deleteUser(id);
  }
}
