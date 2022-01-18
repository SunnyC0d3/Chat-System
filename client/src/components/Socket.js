import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { socket } from '../Socket';

import { updateUsers, updateUserOnThisDevice } from '../reducers/users';

import { useGetUsersQuery } from '../queries/api';

function Socket() {

    const dispatch = useDispatch();

    const { data, refetch, isSuccess } = useGetUsersQuery();
    const [socketUsers, setSocketUsers] = useState([]);

    useEffect(() => {
        socket.on('connect', () => {
            socket.emit('login_logout');
        });
     }, []);

     useEffect(() => {
        socket.on('getUsers', (socketUsers, refresh) => {
            if(refresh) {
                refetch();
            }
            setSocketUsers(socketUsers);
        });
     }, [refetch]);

     useEffect(() => {

        if(isSuccess) {

            let tempUsers = [];

            data['users'].forEach((user) => {
                tempUsers.push({
                    userId: user._id,
                    username: user.firstName + ' ' + user.lastName,
                    userFirstName: user.firstName,
                    userLastName: user.lastName,
                    userType: user.type,
                    userLoggedIn: false
                });   
            });

            if(tempUsers.length !== 0 && socketUsers.length !== 0) {
                tempUsers.forEach((user, index) => {
                    socketUsers.forEach((socketUser) => {
                        if(user.userId === socketUser.userId) {
                            const tempUser = { ...user };
                            tempUser.userLoggedIn = socketUser.userLoggedIn;
                            tempUsers[index] = tempUser;
                            if(socket.id === socketUser.socketId && tempUser.userLoggedIn) {
                                dispatch(updateUserOnThisDevice(tempUsers[index]));
                            }
                        }
                    });
                });
            }

            dispatch(updateUsers(tempUsers));
        } 
        
     }, [dispatch, isSuccess, socketUsers, data]);

     return null;

}

export default Socket;

//create user and refetch