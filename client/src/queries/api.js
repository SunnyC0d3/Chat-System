import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_SERVER_CONNECTION }),
    refetchOnMountOrArgChange: true,
    endpoints: (builder) => ({
        getUsers: builder.query({
            query: () => 'users',
        }),
        userToken: builder.mutation({
            query: (id) => ({ 
                url: `login/${id}`,
                method: 'POST',
                credentials: 'include'
            }),
        }),
        makeUser: builder.mutation({
            query: ({ ...user }) => ({
                url: `users`,
                method: 'POST',
                body: user,
            }),
        }),
        logoutUser: builder.mutation({
            query: () => ({
                url: `logout`,
                method: 'POST',
                credentials: 'include'
            }),
        }),
        deleteUser: builder.mutation({
            query: (userId) => ({
                url: `users/${userId}`,
                method: 'DELETE',
            }),
        }),
        initiateChat: builder.mutation({
            query: (arg) => ({
                url: `room/initiate`,
                method: 'POST',
                body: { ...arg }, 
                credentials: 'include',
            }),
        }),
        postMessage: builder.mutation({
            query: (arg) => ({
                url: `room/${arg.roomId}/message`,
                method: 'POST',
                body: { ...arg }, 
                credentials: 'include',
            }),
        }),
        getChatRoomConversation: builder.query({
            query: (roomId) => ({
                url: `room/${roomId}`,
                credentials: 'include',
                providesTags: ['Messages'],
            }),
        })
    }),
})

export const { 
    useGetUsersQuery, 
    useGetChatRoomConversationQuery,
    useUserTokenMutation, 
    useInitiateChatMutation,
    useMakeUserMutation,
    useLogoutUserMutation,
    useDeleteUserMutation,
    usePostMessageMutation,
} = api