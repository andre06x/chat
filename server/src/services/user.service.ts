// messages/messages.service.ts
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
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

  async auth(email: string, password: string) {
    const user = await this.messageModel.findOne({ email }).exec();
    if (!user) {
      throw new HttpException(
        { error: 'Email não encontrado' },
        HttpStatus.NOT_FOUND,
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new HttpException(
        { error: 'Senha não confere' },
        HttpStatus.UNAUTHORIZED,
      );
    }

    const userFull = {
      email: user.email,
      name: user.name,
      _id: user._id,
    };
    return userFull;
  }
}
