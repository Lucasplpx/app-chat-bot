import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';
import sendMessageBot from '../../controllers/chatwatson';
import './style.css';

import Loader from 'react-loader-spinner'

import InfoBar from '../InfoBar';
import Input from '../Input';
import Messages from '../Messages';

const { REACT_APP_API } = process.env;

let socket;

export default function Chat({ location }){
    
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [users, setUsers] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);  
    const [load, setLoad] = useState(false); 
    const ENDPOINT = REACT_APP_API;
    
    useEffect(()=> {
        const { name, room} = queryString.parse(location.search);
        
        socket = io(ENDPOINT);

        setName(name);
        setRoom(room);

        socket.emit('grupo', { name, room }, ()=> { 

        });

        return () => {
            socket.emit('disconnect');

            socket.off();
        }

    } , [ENDPOINT, location.search])

    useEffect(()=> {
        socket.on('message', (message)=> {
            setMessages([...messages, message])
        });

        socket.on('roomData', ({ users }) => {
            setUsers(users);    
        });
      
        return () => {
        socket.emit('disconnect');
    
        socket.off();
        }

    }, [messages]);

    const sendMessage = async (event) => { 
        event.preventDefault();       
        setLoad(true);
        if(message){            
            socket.emit('sendMessage', message, () => setMessage(''));
            
            if(message.toUpperCase().includes("BOT")){
                const resp_txt =  `BOT-T${await sendMessageBot(message)}`;
                socket.emit('sendMessage', resp_txt, () => setMessage(''));
            }
        }
        setLoad(false);
    }

    return (
        <div className="outerContainer">
            <div className="container">               
                <InfoBar room={room} />              
                <Messages messages={messages} name={name} user={users} />
                {load ? (<h1 class="alingH1">Loading <Loader type="Bars" color="#000" height={50} width={100} /></h1>) : ""} 
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
            </div>
            
        </div>
    )

}
