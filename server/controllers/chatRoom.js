// Import validation
import validate from '../modules/components/validate.js';
// Import User Model
import ChatRoomModel, { CHAT_ROOM_TYPES } from '../models/chatroom.js';

export default {
  initiate: async (req, res) => {
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
  postMessage: async (req, res) => { },
  getRecentConversation: async (req, res) => { },
  getConversationByRoomId: async (req, res) => { },
  markConversationReadByRoomId: async (req, res) => { },
};
