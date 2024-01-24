import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { appRouter } from './helloWorld';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  async greet(@Body() payload: { name: string }) {
    const caller = appRouter.createCaller({});
    return await caller.updateGreeting(payload);
  }

  @Get()
  async get() {
    const caller = appRouter.createCaller({});
    const result = await caller.greeting(); // Substitua 'someUserId' pelo valor desejado
    return result;
  }
}
