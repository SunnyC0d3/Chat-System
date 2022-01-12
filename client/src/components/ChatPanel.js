import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

function ChatPanel() {

    const darkmode = useSelector(state => state.globalStore.darkmode);

    return (
        <div className={`chat-panel ${darkmode ? 'darkmode' : ''}`}>
            <div className="messages">
                <p className="message message--current-user">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi in tellus ante. Phasellus id molestie leo. Sed dignissim velit eget neque porttitor malesuada</p>
                <p className="message message--other-user">Lorem ipsum dolor sit amet,</p>
                <p className="message message--current-user">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi in tellus ante. Phasellus id molestie leo. Sed dignissim velit eget neque porttitor malesuada</p>
                <p className="message message--other-user">Lorem ipsum dolor sit amet,</p>
                <p className="message message--current-user">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi in tellus ante. Phasellus id molestie leo. Sed dignissim velit eget neque porttitor malesuada</p>
                <p className="message message--other-user">Lorem ipsum dolor sit amet,</p>
                <p className="message message--current-user">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi in tellus ante. Phasellus id molestie leo. Sed dignissim velit eget neque porttitor malesuada</p>
                <p className="message message--other-user">Lorem ipsum dolor sit amet,</p>
                <p className="message message--current-user">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi in tellus ante. Phasellus id molestie leo. Sed dignissim velit eget neque porttitor malesuada</p>
                <p className="message message--other-user">Lorem ipsum dolor sit amet,</p>
                <p className="message message--current-user">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi in tellus ante. Phasellus id molestie leo. Sed dignissim velit eget neque porttitor malesuada</p>
                <p className="message message--other-user">Lorem ipsum dolor sit amet,</p>
                <p className="message message--current-user">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi in tellus ante. Phasellus id molestie leo. Sed dignissim velit eget neque porttitor malesuada</p>
                <p className="message message--other-user">Lorem ipsum dolor sit amet,</p>
            </div>
            <div className="input-field">
                <textarea placeholder="Type a message ..." />
            </div>
        </div>
    );

}
  
export default ChatPanel;