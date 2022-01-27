import { createSlice } from '@reduxjs/toolkit';

export const users = createSlice({
  name: 'users',
  initialState: {
    users: [],
    userOnThisDevice: []
  },
  reducers: {
    updateUsers: (state, action) => {
      state.users = action.payload;
    },
    updateUserOnThisDevice: (state, action) => {
      state.userOnThisDevice = action.payload;
    },
  }
})

export const { updateUsers, updateUserOnThisDevice } = users.actions

export default users.reducer