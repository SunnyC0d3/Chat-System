import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { socket } from '../Socket';

import { activateDarkmode, updateDialog, updateChatRoom, updateSocketMessages } from '../reducers/global';
import { updateUserOnThisDevice } from '../reducers/users';

import { useLogoutUserMutation, useDeleteUserMutation, useInitiateChatMutation } from '../queries/api';

function UserPanel() {

    const [userPanelActive, activateUserPanel] = useState(false);

    const users = useSelector(state => state.usersStore.users);
    const darkmode = useSelector(state => state.globalStore.darkmode);
    const userOnThisDevice = useSelector(state => state.usersStore.userOnThisDevice);
    const dispatch = useDispatch();

    const [ logoutUser ] = useLogoutUserMutation();
    const [ deleteUser ] = useDeleteUserMutation();
    const [ initiateChat ] = useInitiateChatMutation();

    return (
        <div className={`user-panel ${userPanelActive ? 'active' : ''} ${darkmode ? 'darkmode' : ''}`}>
            <div className="settings">
                <i className="fas fa-sun" onClick={ () => { dispatch(activateDarkmode(false)) } }></i>
                <i className="fas fa-moon" onClick={ () => { dispatch(activateDarkmode(true)) } }></i>
                <i className="fas fa-plus" onClick={ () => {
                    dispatch(updateDialog({
                        opened: true,
                        currentUserClicked: '',
                        state: 'createUser'
                    }));
                } }></i>
            </div>
            <div className="users">
                { users.map((user) => (
                    <div className="user" key={ user.userId }>
                        <div className="user__image">
                            <i className="fas fa-user"></i>
                        </div>
                        <p className="user__name" onClick={ () => {
                            if(userOnThisDevice.userLoggedIn) {
                                if(userOnThisDevice.userId !== user.userId) {
                                    let type = userOnThisDevice.userType + '-to-' + user.userType;

                                    if(type === 'support-to-consumer') {
                                        type = 'consumer-to-support';
                                    }

                                    initiateChat({ userIds: [user.userId, userOnThisDevice.userId], type }).unwrap().then((response) => {
                                        dispatch(updateChatRoom({ id: response.chatRoom.chatRoomId }));
                                        dispatch(updateSocketMessages([]));
                                        socket.emit('subscribe', response.chatRoom.chatRoomId, user.userId);
                                    });

                                }  
                            } else {
                                dispatch(updateDialog({
                                    opened: true,
                                    currentUserClicked: user,
                                    state: 'notLoggedIn'
                                }));
                            }
                        }}>{ user.userFirstName + ' ' + user.userLastName}</p>
                        <i className="fas fa-power-off" onClick={ () => {
                            if(userOnThisDevice.length === 0) {
                                if(!user.userLoggedIn && !userOnThisDevice.userLoggedIn) {
                                    dispatch(updateDialog({
                                        opened: true,
                                        currentUserClicked: user,
                                        state: 'login'
                                    }));
                                }
                            }                        
                        } }></i>
                        <i className="fas fa-trash-alt" onClick={ ()  => { 
                            if(userOnThisDevice) {
                                if(user.userId === userOnThisDevice.userId && userOnThisDevice.userLoggedIn) {
                                    logoutUser();
                                    socket.emit('login_logout', user.userId, false, '', 'changeLoginStatus');
                                    deleteUser(user.userId).unwrap().then((response) => {
                                        socket.emit('deleteUser', user.userId);
                                        socket.emit('do_refresh', '');
                                    });
                                    dispatch(updateUserOnThisDevice([]));
                                }
                            }
                        }}></i>
                        <span className={ `user__status ${ user.userLoggedIn ? 'user__status--online' : '' }` }></span> 
                    </div>
                )) }
            </div>
            <i className="fas fa-arrow-right" onClick={ () => activateUserPanel(!userPanelActive) }></i>
        </div>
    );
}

export default UserPanel;