// ChatRoom Model

import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export const CHAT_ROOM_TYPES = {
  CONSUMER_TO_CONSUMER: 'consumer-to-consumer',
  CONSUMER_TO_SUPPORT: 'consumer-to-support',
};

const chatRoomSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: () => uuidv4().replace(/\-/g, ''),
    },
    userIds: Array,
    type: String,
    chatInitiator: String,
  },
  {
    timestamps: true,
    collection: 'chatrooms',
  },
);

// eslint-disable-next-line func-names
chatRoomSchema.statics.initiateChat = async function (userIds, type, chatInitiator) {
  try {
    const availableRoom = await this.findOne({
      userIds: {
        $size: userIds.length,
        $all: [...userIds],
      },
      type,
    });
    if (availableRoom) {
      return {
        isNew: false,
        message: 'retrieving an old chat room',
        // eslint-disable-next-line no-underscore-dangle
        chatRoomId: availableRoom._doc._id,
        // eslint-disable-next-line no-underscore-dangle
        type: availableRoom._doc.type,
      };
    }

    const newRoom = await this.create({ userIds, type, chatInitiator });
    return {
      isNew: true,
      message: 'creating a new chatroom',
      // eslint-disable-next-line no-underscore-dangle
      chatRoomId: newRoom._doc._id,
      // eslint-disable-next-line no-underscore-dangle
      type: newRoom._doc.type,
    };
  } catch (error) {
    console.log('error on start chat method', error);
    throw error;
  }
};

chatRoomSchema.statics.getChatRoomByRoomId = async function (roomId) {
  const room = await this.findOne({ _id: roomId });
  return room;
};

export default mongoose.model('ChatRoom', chatRoomSchema);
