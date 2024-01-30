import {
  SubscribeMessage,
  WebSocketGateway,
  MessageBody,
  ConnectedSocket,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { Observable, of } from 'rxjs';
import { initTRPC } from '@trpc/server';
import { observable } from '@trpc/server/observable';
import { z } from 'zod';
import { RoomService } from 'src/services/room.service';

interface Message {
  user: string;
  content: string;
}

interface Room {
  name: string;
  messages: Message[];
}

const t = initTRPC.create();

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly roomService: RoomService) {}

  @WebSocketServer() server: Server;

  private rooms: Room[] = [];

  handleConnection(client: Socket, ...args: any[]) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('joinRoom')
  joinRoom(
    @MessageBody() roomId: string,
    @ConnectedSocket() client: Socket,
  ): Observable<string> {
    console.log('chegou');
    client.join(roomId);

    client.emit('roomMessages', roomId);

    return of(`Joined room: ${roomId}`);
  }

  @SubscribeMessage('sendMessage')
  async sendMessage(
    @MessageBody()
    { id, content, idRoom }: { id: string; idRoom: string; content: string },
    @ConnectedSocket() client: Socket,
  ) {
    // Find the room
    const targetRoom = await this.roomService.sendMenssage(content, id, idRoom);
    if (targetRoom) {
      console.log(targetRoom);
      client.to(idRoom).emit('newMessage', targetRoom);
      return JSON.stringify(targetRoom);
    }
  }

  private handleMessage(message: Message) {
    // Your tRPC logic here
    // For example, call your tRPC procedures with the received message
    t.procedure
      .input(
        z.object({
          user: z.string(),
          content: z.string(),
        }),
      )
      .mutation((opts) => {
        // Handle the tRPC mutation
        console.log(
          `Received message from ${opts.input.user}: ${opts.input.content}`,
        );
        // Add your logic to save the message to the database, etc.
        return true;
      });
  }
}
