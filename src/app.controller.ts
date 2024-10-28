import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { IsPublic } from './shared/decorators/is-public.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @IsPublic()
  @Get('/health')
  getHealth(): string {
    return this.appService.healthCheck();
  }
}
