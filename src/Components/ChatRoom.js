import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import useInput from "../Hooks/useInput";
import axios from "axios";
const ChatRoomBlock = styled.div``;

const ChatRoom = ({ chats, setChats, socket, socketLoading }) => {
  const message = useInput("");
  useEffect(() => {
    if (!socketLoading) {
      socket.on("/newChat", (chat) => {
        console.log("이게 chat이다", chat);
        setChats((prev) => [...prev, chat]);
      });
    }
  }, [socketLoading]);
  const onSubmit = async (e) => {
    e.preventDefault();
    console.log("axios onSubmit 고고");
    message.setValue("");
    await axios.post("https://mini-chat-mongo.herokuapp.com//chat", {
      chat: message.value,
    });
  };
  return (
    <ChatRoomBlock>
      <div>ChatRoom Title</div>
      {chats && chats.map((chat) => <div>{chat.chat}</div>)}
      <form onSubmit={onSubmit}>
        <input
          placeholder={"메세지 입력해라"}
          value={message.value}
          onChange={message.onChange}
        />
        <button type="submit">MSG 전송</button>
      </form>
    </ChatRoomBlock>
  );
};
export default ChatRoom;
