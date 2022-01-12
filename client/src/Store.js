import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import globalReducer from './reducers/global';

import usersReducer from './reducers/users';
import { api } from './queries/api';



export const store = configureStore({
  reducer: {
    globalStore: globalReducer, 
    usersStore: usersReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
})

setupListeners(store.dispatch)