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
    @MessageBody() roomName: string,
    @ConnectedSocket() client: Socket,
  ): Observable<string> {
    client.join(roomName);

    // Check if the room already exists
    let room = this.rooms.find((r) => r.name === roomName);
    if (!room) {
      // If not, create a new room
      room = { name: roomName, messages: [] };
      this.rooms.push(room);
    }

    // Send existing messages to the client
    client.emit('roomMessages', room.messages);

    return of(`Joined room: ${roomName}`);
  }

  @SubscribeMessage('sendMessage')
  sendMessage(
    @MessageBody() { room, message }: { room: string; message: Message },
    @ConnectedSocket() client: Socket,
  ): void {
    // Find the room
    const targetRoom = this.rooms.find((r) => r.name === room);

    if (targetRoom) {
      // Add the message to the room
      targetRoom.messages.push(message);

      // Broadcast the message to all clients in the room
      client.to(room).emit('newMessage', message);

      // Use tRPC to handle the message
      this.handleMessage(message);
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
