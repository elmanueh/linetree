import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseFilters,
} from '@nestjs/common';
import { AppService } from './app.service';
import { JsonToHttpExceptionFilter } from './exceptions/json-http.filter';

@Controller('api')
@UseFilters(new JsonToHttpExceptionFilter())
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
