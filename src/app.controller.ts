//import { Controller, Get, Header } from '@nestjs/common';
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

// @Controller('vacancy')
@Controller()
//@Header('Content-Type', 'text/html')
export class AppController {
  constructor(private readonly appService: AppService) {}

  //@Get('create')
  @Get()
  //getHello() : {name: string} {
  getHello(): string {
    return this.appService.getHello();
    //return {name: 'Max'}
  }
}
