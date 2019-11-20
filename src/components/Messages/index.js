import React from 'react';

import ScroolToBottom from 'react-scroll-to-bottom';

import Message from '../Message';

import './style.css';

export default function Messages({ messages, name }) {

    return (
        <ScroolToBottom className="messages">
            {messages.map((message, i) => <div key={i}><Message message={message} name={name} /></div>)}
        </ScroolToBottom>
    )
}
