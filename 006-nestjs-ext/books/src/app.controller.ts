import { Controller, Get, HttpException } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('hello')
  getHello() {
    throw new HttpException('123', 400);
  }
}
