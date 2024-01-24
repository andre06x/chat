import * as bcrypt from 'bcrypt';
// redis.service.ts
import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService {
  private readonly redisClient: Redis;

  constructor() {
    this.redisClient = new Redis({
      host: 'localhost',
      port: 6379, // Sua porta Redis
      //password: 'sua_senha_se_necessario',
    });
  }

  async set(key: string, value: string): Promise<void> {
    await this.redisClient.set(key, value);
  }

  async get(key: string): Promise<string | null> {
    return await this.redisClient.get(key);
  }

  async setUser(userId: string, userData: any): Promise<void> {
    const key = `user:${userId}`;
    userData.password = await bcrypt.hash(userData.password, 10);

    await this.redisClient.set(key, JSON.stringify(userData));
  }

  async getUser(userId: string): Promise<string | null> {
    const key = `user:${userId}`;
    const user = await this.redisClient.get(key);
    return JSON.parse(user);
  }

  async setMessage(messageId: string, messageData: string): Promise<void> {
    const key = `message:${messageId}`;
    await this.redisClient.set(key, messageData);
  }

  async getMessage(messageId: string): Promise<string | null> {
    const key = `message:${messageId}`;
    return await this.redisClient.get(key);
  }

  async setRoom(roomId: string, roomData: string): Promise<void> {
    const key = `room:${roomId}`;
    await this.redisClient.set(key, roomData);
  }

  async getRoom(roomId: string): Promise<string | null> {
    const key = `room:${roomId}`;
    return await this.redisClient.get(key);
  }
}
