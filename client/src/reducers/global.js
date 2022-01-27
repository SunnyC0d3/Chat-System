import { createSlice } from '@reduxjs/toolkit';

export const global = createSlice({
  name: 'global',
  initialState: {
    darkmode: false,
    dialog: {
      opened: false,
      currentUserClicked: '',
      state: ''
    },
    chatRoom: {
      id: ''
    },
    socketMessages: []
  },
  reducers: {
    activateDarkmode: (state, action) => {
      state.darkmode = action.payload;
    },
    updateDialog: (state, action) => {
      state.dialog = action.payload;
    },
    updateChatRoom: (state, action) => {
      state.chatRoom = { ...action.payload };
    },
    updateSocketMessages: (state, action) => {
      if(action.payload.length !== 0) {
        state.socketMessages = [ ...state.socketMessages, action.payload ];
      } else {
        state.socketMessages = action.payload;
      }
    },
  }
})

export const { activateDarkmode, updateDialog, updateChatRoom, updateSocketMessages } = global.actions

export default global.reducer