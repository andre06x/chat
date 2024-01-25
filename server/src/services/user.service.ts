// messages/messages.service.ts
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
//import { Message } from './message.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly messageModel: any) {}

  async createUser(email, password, name) {
    password = await bcrypt.hash(password, 10);

    const createdMessage = new this.messageModel({ email, password, name });
    return createdMessage.save();
  }

  async getAllUser() {
    return this.messageModel.find({}).exec();
  }

  async findOne(id: string) {
    return this.messageModel.find({ _id: id }).exec();
  }
}
