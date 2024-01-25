import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { EventsModule } from './events/events.module';
import { MongooseModule } from '@nestjs/mongoose';
import { RoomSchema, UserSchema } from './schema/schema';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { RoomController } from './controllers/room.controller';
import { RoomService } from './services/room.service';

@Module({
  imports: [
    EventsModule,
    MongooseModule.forRoot('mongodb://localhost/chat'),
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'Room', schema: RoomSchema },
    ]),
  ],
  controllers: [AppController, UserController, RoomController],
  providers: [AppService, UserService, RoomService],
})
export class AppModule {}
