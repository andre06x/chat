import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { appRouter } from './helloWorld';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  async hello() {
    const caller = appRouter.createCaller({});
    const result = await caller.updateGreeting(); // Substitua 'someUserId' pelo valor desejado
    return result;
  }

  @Get()
  async get() {
    const caller = appRouter.createCaller({});
    const result = await caller.greeting(); // Substitua 'someUserId' pelo valor desejado
    return result;
  }
}
