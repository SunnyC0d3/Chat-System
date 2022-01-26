import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { useGetChatRoomConversationQuery } from '../queries/api';

import { usePostMessageMutation } from '../queries/api';

function ChatPanel() {

    const [messages, setMessages] = useState('');
    const [createMessage, setMessage] = useState('');

    const scrollToBottom = useRef(null);

    const darkmode = useSelector(state => state.globalStore.darkmode);
    const chatRoom = useSelector(state => state.globalStore.chatRoom);
    const socketMessages = useSelector(state => state.globalStore.socketMessages);
    const userOnThisDevice = useSelector(state => state.usersStore.userOnThisDevice);
    
    const { data, isSuccess } = useGetChatRoomConversationQuery(chatRoom.id);

    const [ postMessage ] = usePostMessageMutation();

    const scrollToBottomFunc = () => {
        scrollToBottom.current.scrollIntoView(false);
    }

    useEffect(() => {

        if(isSuccess) {
            setMessages(data['conversation']);
            scrollToBottomFunc();
        }

    }, [isSuccess, data, socketMessages]);

    const handleTextAreaChange = (event) => {
        event.persist();
        setMessage(event.target.value);
    };

    function handleSubmit(e) {
        e.preventDefault();

        if(userOnThisDevice.length !== 0) {
            if(userOnThisDevice.userLoggedIn && chatRoom.id !== '') {
                postMessage({ roomId: chatRoom.id, messageText: createMessage });
                setMessage('');
            }
        }
    }

    return (
        <div className={`chat-panel ${darkmode ? 'darkmode' : ''}`}>
            { chatRoom.id !== '' ?
                <div className="messages">
                    {
                        messages.length !== 0 ? 
                            messages.map((message) => (
                                <p key={ message._id } className={`message ${message.postedByUser._id === userOnThisDevice.userId ? 'message--current-user' : 'message--other-user' }`}>{ message.message.messageText }</p>
                            ))
                        :
                            ''
                    }
                    {
                        socketMessages.length !== 0 
                        ? 
                            socketMessages.map((message) => (
                                <p key={ message.postId } className={`message ${message.postedByUser._id === userOnThisDevice.userId ? 'message--current-user' : 'message--other-user' }`}>{ message.message.messageText }</p>
                            ))
                        :
                            ''
                    }
                    <div ref={scrollToBottom} />
                </div>
            : 
            
            '' }
            <div className="input-field">
                <form onSubmit={ handleSubmit }>
                    <textarea placeholder="Type a message ..." value={ createMessage } onChange={ handleTextAreaChange } />
                    <input type="submit" value="Submit" />
                </form>
            </div>
        </div>
    );

}
  
export default ChatPanel;