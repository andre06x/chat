// redis.controller.ts
import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { RedisService } from './redis.service';

@Controller('redis')
export class RedisController {
  constructor(private readonly redisService: RedisService) {}

  @Post(':key')
  async setValue(
    @Param('key') key: string,
    @Body('value') value: string,
  ): Promise<void> {
    await this.redisService.set(key, value);
  }

  @Get(':key')
  async getValue(@Param('key') key: string): Promise<string | null> {
    return this.redisService.get(key);
  }

  @Post('user/:userId')
  async saveUser(
    @Param('userId') userId: string,
    @Body() userData: any,
  ): Promise<void> {
    console.log(userData);
    await this.redisService.setUser(userId, userData);
  }

  @Get('user/:userId')
  async getUser(@Param('userId') userId: string): Promise<string | null> {
    return this.redisService.getUser(userId);
  }

  @Post('message/:messageId')
  async saveMessage(
    @Param('messageId') messageId: string,
    @Body('messageData') messageData: string,
  ): Promise<void> {
    await this.redisService.setMessage(messageId, messageData);
  }

  @Get('message/:messageId')
  async getMessage(
    @Param('messageId') messageId: string,
  ): Promise<string | null> {
    return this.redisService.getMessage(messageId);
  }

  @Post('room/:roomId')
  async saveRoom(
    @Param('roomId') roomId: string,
    @Body('roomData') roomData: string,
  ): Promise<void> {
    await this.redisService.setRoom(roomId, roomData);
  }

  @Get('room/:roomId')
  async getRoom(@Param('roomId') roomId: string): Promise<string | null> {
    return this.redisService.getRoom(roomId);
  }
}
