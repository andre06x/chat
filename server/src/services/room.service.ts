// messages/messages.service.ts
import { Injectable } from '@nestjs/common';
import mongoose, { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
//import { Message } from './message.interface';
import * as bcrypt from 'bcrypt';
import { log } from 'console';

@Injectable()
export class RoomService {
  constructor(
    @InjectModel('Room') private readonly roomModel: any,
    @InjectModel('User') private readonly userModel: any,
  ) {}

  async createRoom(name: string, userAdmId: string) {
    const user = await this.userModel.find({ _id: userAdmId }).exec();
    console.log(user);
    const requests = [
      {
        user: user[0],
        // status: { type: Boolean, default: true },
        // show: { type: Boolean, default: false },
        timestamp: { type: Date, default: Date.now },
      },
    ];
    const createdMessage = new this.roomModel({
      userAdmId,
      name,
      requests,
    });
    return createdMessage.save();
  }

  async lastMessages(id) {
    try {
      const userId = new mongoose.Types.ObjectId(id);
      const ss = await this.roomModel.aggregate([
        {
          $match: {
            'requests.user._id': userId,
            'requests.status': true,
          },
        },
        {
          $project: {
            _id: 1,
            name: 1,
            messages: { $slice: ['$messages', 50] }, // Limita a 50 mensagens por sala
          },
        },
      ]);
      return ss;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  async sendMenssage(content, id, idRoom) {
    const user = await this.userModel.find({ _id: id }).exec();

    const mensagemNova = {
      content,
      name: user[0].name,
      _id: user[0]._id,
    };

    const filtro = { _id: idRoom };

    const atualizacao = {
      $push: { messages: mensagemNova },
    };

    const opcoes = { new: true };

    return this.roomModel.findOneAndUpdate(filtro, atualizacao, opcoes);
  }

  async requestRoom(idUser, idRoom) {
    const user = await this.userModel.find({ _id: idUser }).exec();

    const novoRequest = {
      user: user[0],
      status: false,
      show: true,
    };

    const filtro = { _id: idRoom };

    const atualizacao = {
      $push: { requests: novoRequest },
    };

    const opcoes = { new: true };

    return this.roomModel.findOneAndUpdate(filtro, atualizacao, opcoes);
  }

  async listRequests(id, idRoom) {
    try {
      const userId = new mongoose.Types.ObjectId(id);
      const roomIdS = new mongoose.Types.ObjectId(idRoom);
      const requests = await this.roomModel.aggregate([
        {
          $match: {
            _id: roomIdS,
            userAdmId: userId,
            'requests.status': false,
            'requests.show': true,
          },
        },
        {
          $project: {
            userAdmId: 1,
            requests: 1,
          },
        },
      ]);
      return requests;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  async updatedRequest(id, idRoom, idAprove) {
    const userId = new mongoose.Types.ObjectId(id);
    const roomIdS = new mongoose.Types.ObjectId(idRoom);
    const idAproveS = new mongoose.Types.ObjectId(idAprove);

    try {
      const result = await this.roomModel.updateOne(
        {
          _id: new mongoose.Types.ObjectId(roomIdS),
          userAdmId: new mongoose.Types.ObjectId(userId),
          'requests.user._id': new mongoose.Types.ObjectId(idAproveS),
        },
        {
          $set: {
            'requests.$.status': true,
            'requests.$.show': false,
          },
        },
      );

      return result;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  async searchRoom(room) {
    const regex = new RegExp(room, 'i');
    try {
      return this.roomModel
        .find({ name: { $regex: regex } }, { _id: 1, name: 1 })
        .exec();
    } catch (err) {
      throw err;
    }
  }
}
