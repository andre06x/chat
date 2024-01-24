import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RedisModule } from './redis.module';
import { RedisController } from './redis.controller';
import { EventsModule } from './events/events.module';

@Module({
  imports: [EventsModule, RedisModule],
  controllers: [AppController, RedisController],
  providers: [AppService],
})
export class AppModule {}
