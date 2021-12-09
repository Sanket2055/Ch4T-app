import "./Chat.css";
import io from "socket.io-client";
import React, { useState, useEffect } from "react";
import queryString from "query-string";
import { useLocation } from "react-router-dom";
import Input from '../Input/Input.js';
import InfoBar from "../InfoBar/InfoBar";
import Messages from "../Messages/Messages";
let socket;

const Chat = () => {
  const location = useLocation();
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const ENDPOINT = "localhost:5000";
  useEffect(() => {
    const { name, room } = queryString.parse(location.search);
    socket = io(ENDPOINT);
    setName(name);
    setRoom(room);
    socket.emit("join", { name, room } ,(error)=>{
        if(error){
            alert(error);
        }
    });

    return () => {
      socket.disconnect();
      socket.off();
    };
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages([...messages, message]);
    });
  }, [messages]);

  // function to send messages
  const sendMessage=(event)=>{
      event.preventDefault();

    if(message){
        socket.emit('sendMessage'  , message , ()=>{
            setMessage('');
        })
    }
  }


  return (
    <div className="outerContainer">
      <div className="container">
          {/* <input value={message} onChange={(event)=>setMessage(event.target.value)}  
          onKeyPress={event=>event.key === 'Enter' ? sendMessage(event): null} /> */}
          <InfoBar room={room}/>
          <Messages  messages={messages} name={name}/>
          <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />

      
    </div>
    </div>
  );
};
export default Chat;
