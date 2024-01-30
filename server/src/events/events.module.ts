import { Module } from '@nestjs/common';
import { EventsGateway } from './events.gateway';
import { RoomService } from 'src/services/room.service';
import { MongooseModule } from '@nestjs/mongoose';
import { RoomSchema, UserSchema } from 'src/schema/schema';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/chat'),
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'Room', schema: RoomSchema },
    ]),
  ],
  providers: [EventsGateway, RoomService],
})
export class EventsModule {}
