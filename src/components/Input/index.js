import React from 'react';

import './style.css';

export default function Input({ message, setMessage, sendMessage }) {

    return (
        <form className="form">
            <input
                className="input"
                type="text"
                placeholder="Digite uma mensagem"
                value={message} 
                onChange={(event) => setMessage(event.target.value)}
                onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}
             />

             <button className="sendButton" onClick={(event) => sendMessage(event)}>Enviar</button>
        </form>
    )
}