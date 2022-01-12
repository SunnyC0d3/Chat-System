import React, { useState, useEffect, useContext } from 'react';
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

    const [socketConnected, setSocketConnected] = useState(false);

    useEffect(() => {
        socket.on('connect', () => {
            setSocketConnected(true);
        });
    
        socket.emit('identity', 'test');
    
        socket.on('sendUsers', (users) => {
            //console.log(users);
        });
     }, []);

    function updatedDialog(boolean = false, user = '') {
        dispatch(updateDialog({
            opened: boolean,
            currentUserClicked: user
        }));
    }

    return (
        <div className={`dialog ${darkmode ? 'darkmode' : ''} ${dialogState.opened ? 'active' : ''}`}>
            <i className="fas fa-times" onClick={ () => { updatedDialog() } }></i>
            <h3>Log in as: <span>{ dialogState.currentUserClicked.firstName + ' ' + dialogState.currentUserClicked.lastName }</span></h3>
            <div className="btns">
                <button className="btns__btn btns__btn--yes" onClick={ () => { getUserToken(dialogState.currentUserClicked._id).unwrap().then(
                (response) => { 
                    dispatch(updateUserOnThisDevice({
                        loggedIn: true,
                        user: dialogState.currentUserClicked
                    }));
                    updatedDialog(false, dialogState.currentUserClicked);
                }) }}>Yes</button>
                <button className="btns__btn btns__btn--no" onClick={ () => { updatedDialog() } }>No</button>
            </div>  
        </div>
    );
}

export default Dialog;