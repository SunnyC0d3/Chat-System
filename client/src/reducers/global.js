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
  },
  reducers: {
    activateDarkmode: (state, action) => {
      state.darkmode = action.payload;
    },
    updateDialog: (state, action) => {
      state.dialog = action.payload;
    },
  }
})

// Action creators are generated for each case reducer function
export const { activateDarkmode, updateDialog } = global.actions

export default global.reducer