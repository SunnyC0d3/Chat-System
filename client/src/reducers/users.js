import { createSlice } from '@reduxjs/toolkit';

export const users = createSlice({
  name: 'users',
  initialState: {
    users: [],
    userOnThisDevice: [],
    usersOnOtherDevices: [],
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

// Action creators are generated for each case reducer function
export const { updateUsers, updateUserOnThisDevice } = users.actions

export default users.reducer