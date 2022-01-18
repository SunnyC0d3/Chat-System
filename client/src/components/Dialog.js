import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { socket } from '../Socket';

import { updateDialog } from '../reducers/global';
import { updateUserOnThisDevice } from '../reducers/users';

import { useGetUserTokenMutation } from '../queries/api';

function Dialog() {

    const darkmode = useSelector(state => state.globalStore.darkmode);
    const dialogState = useSelector(state => state.globalStore.dialog);
    const dispatch = useDispatch();

    const [ getUserToken ] = useGetUserTokenMutation();

    return (
        <div className={`dialog ${darkmode ? 'darkmode' : ''} ${dialogState.opened ? 'active' : ''}`}>
            <i className="fas fa-times" onClick={ () => { 
                dispatch(updateDialog({
                    opened: false,
                    currentUserClicked: ''
                })); } }></i>
            <h3>Log in as: <span>{ dialogState.currentUserClicked.userFirstName + ' ' + dialogState.currentUserClicked.userLastName }</span></h3>
            <div className="btns">
                <button className="btns__btn btns__btn--yes" onClick={ () => { 
                    getUserToken(dialogState.currentUserClicked.userId).unwrap().then((response) => { 
                        dispatch(updateUserOnThisDevice(dialogState.currentUserClicked));
                        socket.emit('login_logout', dialogState.currentUserClicked.userId, true, 'addRemoveUser');
                        dispatch(updateDialog({
                            opened: false,
                            currentUserClicked: ''
                        }));
                    }) 
                }}>Yes</button>
                <button className="btns__btn btns__btn--no" onClick={ () => { 
                    dispatch(updateDialog({
                        opened: false,
                        currentUserClicked: ''
                    })); } }>No</button>
            </div>  
        </div>
    );
}

export default Dialog;