import validate from '../modules/components/validate.js';

import ChatRoomModel, { CHAT_ROOM_TYPES } from '../models/chatroom.js';
import ChatMessageModel from '../models/chatmessage.js';
import UserModel, { USER_TYPES } from '../models/user.js';

export default {
  initiate: async (req, res) => {
    console.log(req.body);
    try {
      const validation = validate((types) => ({
        payload: req.body,
        checks: {
          userIds: {
            type: types.array,
            options: { unique: true, empty: false, stringOnly: true },
          },
          type: { type: types.enum, options: { enum: CHAT_ROOM_TYPES } },
        },
      }));
      if (!validation.success) return res.status(400).json(validation);

      const { userIds, type } = req.body;
      const { userId: chatInitiator } = req;

      const allUserIds = [...userIds, chatInitiator];
      const chatRoom = await ChatRoomModel.initiateChat(allUserIds, type, chatInitiator);
      return res.status(200).json({ success: true, chatRoom });
    } catch (error) {
      return res.status(500).json({ success: false, error });
    }
  },
  postMessage: async (req, res) => {
    try {
      const { roomId } = req.params;
      const validation = validate((types) => ({
        payload: req.body,
        checks: {
          messageText: { type: types.string },
        },
      }));
      if (!validation.success) return res.status(400).json(validation);

      const messagePayload = {
        messageText: req.body.messageText,
      };
      const currentLoggedUser = req.userId;
      // eslint-disable-next-line max-len
      const post = await ChatMessageModel.createPostInChatRoom(roomId, messagePayload, currentLoggedUser);
      global.io.sockets.in(roomId).emit('new message', { message: post });
      return res.status(200).json({ success: true, post });
    } catch (error) {
      return res.status(500).json({ success: false, error });
    }
  },
  getConversationByRoomId: async (req, res) => {
    try {
      const { roomId } = req.params;
      const room = await ChatRoomModel.getChatRoomByRoomId(roomId);
      if (!room) {
        return res.status(400).json({
          success: false,
          message: 'No room exists for this id',
        });
      }
      const users = await UserModel.getUserByIds(room.userIds);
      const options = {
        page: parseInt(req.query.page, 10) || 0,
        limit: parseInt(req.query.limit, 10) || 10,
      };
      const conversation = await ChatMessageModel.getConversationByRoomId(roomId, options);
      return res.status(200).json({
        success: true,
        conversation,
        users,
      });
    } catch (error) {
      return res.status(500).json({ success: false, error });
    }
  },
  markConversationReadByRoomId: async (req, res) => {
    try {
      const { roomId } = req.params;
      const room = await ChatRoomModel.getChatRoomByRoomId(roomId);
      if (!room) {
        return res.status(400).json({ success: false, message: 'No room exists for this id' });
      }
      const currentLoggedUser = req.userId;
      const result = await ChatMessageModel.markMessageRead(roomId, currentLoggedUser);
      return res.status(200).json({ success: true, data: result });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ success: false, error });
    }
  },
};
