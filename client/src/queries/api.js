import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_SERVER_CONNECTION }),
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
                //credentials: 'include'
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
        getRoom: builder.query({
            query: (roomId) => ({
                url: `room/${roomId}`,
                credentials: 'include'
            }),
        }),
    }),
})

export const { 
    useGetUsersQuery, 
    useUserTokenMutation, 
    useGetRoomQuery,
    useMakeUserMutation,
    useLogoutUserMutation,
    useDeleteUserMutation,
} = api