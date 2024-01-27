// messages/messages.controller.ts
import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { RoomService } from 'src/services/room.service';

@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Post()
  async createRoom(
    @Body('name') name: string,
    @Body('userAdmId') userAdmId: string,
  ) {
    return this.roomService.createRoom(name, userAdmId);
  }

  @Post('last-messages')
  async lastMessages(@Body('id') id: string) {
    return this.roomService.lastMessages(id);
  }

  @Post('messages')
  async sendMenssage(
    @Body('id') id: string,
    @Body('content') content: string,
    @Body('idRoom') idRoom: string,
  ) {
    return this.roomService.sendMenssage(content, id, idRoom);
  }

  @Post('request-room')
  async requestRoom(@Body('id') id: string, @Body('idRoom') idRoom: string) {
    return this.roomService.requestRoom(id, idRoom);
  }

  @Post('list-request-room')
  async listRequests(@Body('id') id: string, @Body('idRoom') idRoom: string) {
    return this.roomService.listRequests(id, idRoom);
  }

  @Post('update-request')
  async updatedRequest(
    @Body('id') id: string,
    @Body('idRoom') idRoom: string,
    @Body('idAprove') idAprove: string,
  ) {
    return this.roomService.updatedRequest(id, idRoom, idAprove);
  }

  @Post('search')
  async searchRoom(@Body('room') room: string) {
    return this.roomService.searchRoom(room);
  }
}
