import React, { useEffect, useRef } from 'react';
import ReactLoading from 'react-loading';
import { useSelector } from 'react-redux';
import backgroundImage from '../../public/backgroundImage.png';
import "./index.css";

function ChatContainer({ renderMessageContent, chatPage }) {
  const { chats, currentChatIndex, loading } = useSelector((state) => state.chat);
  const chatEndRef = useRef(null);

  // const scrollToBottom = () => {
  //   chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  // };

  // useEffect(() => {
  //   scrollToBottom();
  // }, [chats[currentChatIndex]?.messages]);

  return (
    <div id="chat-container" style={{
      // backgroundImage: `url(${backgroundImage})`,
      backgroundSize: "cover",
      display: !chatPage && "none"
    }}>
      {chats[currentChatIndex]?.messages.map((message, index) => (
        <div key={index} className={`message ${message.role}`}>
          {renderMessageContent(message.content)}
        </div>
      ))}
      {loading === true && (
        <div className="message-assistant">
          <ReactLoading type="bubbles" color="#000" height={24} width={24} />
        </div>
      )}
      <div ref={chatEndRef} />
    </div>
  );
}

export default ChatContainer;

