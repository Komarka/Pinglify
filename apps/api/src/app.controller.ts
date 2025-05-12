import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('ping')
  getPing() {
    return { status: 'ok', time: new Date().toISOString() };
  }
}
