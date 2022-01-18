import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_SERVER_CONNECTION }),
    tagTypes: ['User'],
    endpoints: (builder) => ({
        getUsers: builder.query({
            query: () => 'users/',
        }),
        getUserToken: builder.mutation({
            query: (id) => ({ 
                url: `login/${id}`,
                method: 'POST',
                credentials: 'include'
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
                invalidatesTags: ['User'],
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
    useGetUserTokenMutation, 
    useGetRoomQuery,
    useLogoutUserMutation,
    useDeleteUserMutation,
} = api