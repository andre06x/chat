// messages/messages.controller.ts
import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { UserService } from 'src/services/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(
    @Body('email') email: string,
    @Body('password') password: string,
    @Body('name') name: string,
  ) {
    return this.userService.createUser(email, password, name);
  }

  @Get()
  async getAllUser() {
    return this.userService.getAllUser();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Post('auth')
  async auth(@Body('email') email: string, @Body('password') password: string) {
    return this.userService.auth(email, password);
  }
}
