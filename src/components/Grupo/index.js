import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import "./style.css";

export default function Grupo(){

    const [name, setName] = useState('');
    const [room, setRoom] = useState('');

    return (
        <div className="joinOuterContainer">
            <div className="joinInnerContainer">
                <h1 className="heading">Chat</h1>
                <div><input placeholder="Nome" className="joinInput" type="text" onChange={e => setName(e.target.value)} /></div>
                <div><input placeholder="Grupo" className="joinInput mt-20" type="text" onChange={e => setRoom(e.target.value)} /></div>
                <Link onClick={ e => (!name || !room) ? e.preventDefault() : null} to={`/chat?name=${name}&room=${room}`}>
                    <button className="button mt-20" type="submit">Entrar</button>
                </Link>
            </div>
        </div>
    )
}