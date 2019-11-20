import React from 'react';

import './style.css';

import ReactEmoji from 'react-emoji';
import html from "react-inner-html";

export default function Message({ message: { user, text }, name }) {
    let isSentByCurrentUser = false;

    const trimmedName = name.trim().toLowerCase();

    if (user === trimmedName) {
        isSentByCurrentUser = true;
    }

    return (
        isSentByCurrentUser
            ? (
                <div className="messageContainer justifyEnd">
                    <p className="sentText pr-10">{trimmedName}</p>
                    <div className="messageBox backgroundBlue">
                        <p className="messageText colorWhite">{ReactEmoji.emojify(text)}</p>
                    </div>
                </div>
            )
            : (
                <div className="messageContainer justifyStart">            
                    <div className="messageBox backgroundLight">
                        <p className="messageText colorDark"><div {...html(ReactEmoji.emojify(text))}></div></p>
                    </div>
                    <p className="sentText pl-10">{user}</p>
                </div>
            )
    )
}
