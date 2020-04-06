import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import socketio from "socket.io-client";
import ChatRoom from "./Components/ChatRoom";
import axios from "axios";
function App() {
  const [chats, setChats] = useState([]);
  const [socket, setSocket] = useState(null);
  const [socketLoading, setSocketLoading] = useState(true);
  useEffect(() => {
    setSocketLoading(true);
    const fetchData = async () => {
      const { data: _chats } = await axios.get(
        "https://mini-chat-mongo.herokuapp.com/"
      );
      console.log("chats", _chats);
      setChats(_chats);
      const _socket = socketio.connect(
        "https://mini-chat-mongo.herokuapp.com/"
      );
      setSocket(_socket);
      setSocketLoading(false);
    };
    fetchData();
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <ChatRoom
          chats={chats}
          setChats={setChats}
          socket={socket}
          socketLoading={socketLoading}
        />
      </header>
    </div>
  );
}

export default App;
