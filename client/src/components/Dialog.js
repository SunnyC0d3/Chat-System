import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { socket } from '../Socket';

import Cookies from 'js-cookie';

import { updateDialog } from '../reducers/global';
import { updateUserOnThisDevice } from '../reducers/users';

import { useGetUserTokenMutation } from '../queries/api';

function Dialog() {

    const darkmode = useSelector(state => state.globalStore.darkmode);
    const dialogState = useSelector(state => state.globalStore.dialog);
    const dispatch = useDispatch();

    const [ getUserToken ] = useGetUserTokenMutation();

    const [createUser, setCreateUser] = useState({
        firstName: '',
        lastName: '',
        type: ''
    });

    const handleFirstNameInputChange = (event) => {
        event.persist();
        setCreateUser((values) => ({
            ...values,
            firstName: event.target.value,
        }));
    };

    const handleLastNameInputChange = (event) => {
        event.persist();
        setCreateUser((values) => ({
            ...values,
            lastName: event.target.value,
        }));
    };

    const handleTypeInputChange = (event) => {
        event.persist();
        setCreateUser((values) => ({
            ...values,
            type: event.target.value,
        }));
    };

    function handleSubmit(event) {
        event.preventDefault();
        console.log(createUser);
    }

    if(dialogState.state === 'login') {
        return (
            <div className={`dialog ${darkmode ? 'darkmode' : ''} ${dialogState.opened ? 'active' : ''}`}>
                <i className="fas fa-times" onClick={ () => { 
                    dispatch(updateDialog({
                        opened: false,
                        currentUserClicked: '',
                        state: ''
                    })); } }></i>
                <h3>Log in as: <span>{ dialogState.currentUserClicked.userFirstName + ' ' + dialogState.currentUserClicked.userLastName }</span></h3>
                <div className="btns">
                    <button className="btns__btn btns__btn--yes" onClick={ () => { 
                        getUserToken(dialogState.currentUserClicked.userId).unwrap().then((response) => {                 
                            dispatch(updateUserOnThisDevice(dialogState.currentUserClicked));
                            socket.emit('login_logout', dialogState.currentUserClicked.userId, true, Cookies.get('uniqueDeviceID'), 'addRemoveUser');
                            dispatch(updateDialog({
                                opened: false,
                                currentUserClicked: '',
                                state: ''
                            }));
                        }) 
                    }}>Yes</button>
                    <button className="btns__btn btns__btn--no" onClick={ () => { 
                        dispatch(updateDialog({
                            opened: false,
                            currentUserClicked: '',
                            state: ''
                        })); } }>No</button>
                </div> 
            </div>
        );
    }

    if(dialogState.state === 'createUser') {
        return (
            <div className={`dialog ${darkmode ? 'darkmode' : ''} ${dialogState.opened ? 'active' : ''}`}>
                <i className="fas fa-times" onClick={ () => { 
                    dispatch(updateDialog({
                        opened: false,
                        currentUserClicked: '',
                    })); } }></i>
                <h3>Create new user:</h3>
                <form onSubmit={ handleSubmit }>
                    <input type="text" placeholder="Firstname" value={ createUser.firstName } onChange={ handleFirstNameInputChange } />
                    <input type="text" placeholder="Lastname" value={ createUser.lastName } onChange={ handleLastNameInputChange } />
                    <select onChange={ handleTypeInputChange }>
                        <option value="consumer">Consumer</option>
                        <option value="support">Support</option>
                    </select>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        );
    }

    return null;

}

export default Dialog;