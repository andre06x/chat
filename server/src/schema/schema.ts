import * as mongoose from 'mongoose';
import { boolean } from 'zod';

export const UserSchema = new mongoose.Schema({
  email: String,
  name: String,
  password: String,
});

export const RoomSchema = new mongoose.Schema({
  userAdmId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name: String,
  messages: [
    {
      content: String,
      _id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      name: String,
      timestamp: { type: Date, default: Date.now },
    },
  ],
  requests: [
    {
      _idUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      name: String,
      email: String,
      status: {
        type: Boolean,
        required: false,
        default: true,
      },
      show: {
        type: Boolean,
        required: false,
        default: false,
      },

      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});
