import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { activateDarkmode, updateDialog } from '../reducers/global';
import { updateUsers } from '../reducers/users';

import { useGetUsersQuery, useLogoutUserMutation, useDeleteUserMutation } from '../queries/api';

function UserPanel() {

    const [userPanelActive, activateUserPanel] = useState(false);

    const users = useSelector(state => state.usersStore.users);
    const darkmode = useSelector(state => state.globalStore.darkmode);
    const userOnThisDevice = useSelector(state => state.usersStore.userOnThisDevice);
    const dispatch = useDispatch();

    const { data, error, refetch, isLoading } = useGetUsersQuery();
    const [ logoutUser ] = useLogoutUserMutation();
    const [ deleteUser ] = useDeleteUserMutation();

    useEffect(function component_updateUsers() {
        if(!isLoading) {
            dispatch(updateUsers(data['users']));
        }
    }, [data, dispatch, isLoading]);

    function updatedDialog(boolean, user) {
        dispatch(updateDialog({
            opened: boolean,
            currentUserClicked: user
        }));
    }

    return (
        <div className={`user-panel ${userPanelActive ? 'active' : ''} ${darkmode ? 'darkmode' : ''}`}>
            <div className="settings">
                <i className="fas fa-sun" onClick={ () => { dispatch(activateDarkmode(false)) } }></i>
                <i className="fas fa-moon" onClick={ () => { dispatch(activateDarkmode(true)) } }></i>
                <i className="fas fa-plus"></i>
            </div>
            <div className="users">
                { users.map((user) => (
                    <div className="user" key={ user._id }>
                        <div className="user__image">
                            <i className="fas fa-user"></i>
                        </div>
                        <p className="user__name">{ user.firstName + ' ' + user.lastName}</p>
                        <i className="fas fa-power-off" onClick={ () => { updatedDialog(true, user) } }></i>
                        <i className="fas fa-trash-alt" onClick={ ()  => { 
                                if (userOnThisDevice.user) {
                                    if (user._id === userOnThisDevice.user._id && userOnThisDevice.loggedIn) {
                                        logoutUser();
                                        deleteUser(userOnThisDevice.user._id).unwrap().then((response) => {
                                            refetch();
                                        });
                                    }
                                }

                                deleteUser(user._id).unwrap().then((response) => {
                                    refetch();
                                });
                        }}></i>
                        { userOnThisDevice.loggedIn && user._id === userOnThisDevice.user._id ? 
                            <span className="user__status user__status--online"></span>
                        : 
                            <span className="user__status"></span>
                        }
                    </div>
                )) }
            </div>
            <i className="fas fa-arrow-right" onClick={ () => activateUserPanel(!userPanelActive) }></i>
        </div>
    );
}

export default UserPanel;