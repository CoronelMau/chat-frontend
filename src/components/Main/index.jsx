/* eslint-disable react/prop-types */
import { useState, useRef, useEffect } from 'react';
import { StyleSheetManager } from 'styled-components';
import io from 'socket.io-client';

import {
  MainSection,
  Title,
  ChatSection,
  ChatInput,
  ChatBar,
  MessageContainer,
  MessageText,
  InfoMessage,
} from '../../styles/Main';

export default function Chat({ currentUser }) {
  let date = new Date();
  let month = date.getMonth();
  let day = date.getDate();
  let hour = date.getHours();
  let minutes = date.getMinutes();

  const messagesContainerRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io('http://localhost:3000', { forceNew: true });
    setSocket(newSocket);

    newSocket.on('new-message', (messageReceived) => {
      setMessages((prevMessages) => [...prevMessages, messageReceived]);
    });

    fetch('http://localhost:3000/chat')
      .then((res) => res.json())
      .then((res) => setMessages(res))
      .catch((error) => console.error('Error to load messages: ', error));
  }, []);

  const handleSendMessage = (e) => {
    if (e.keyCode === 13 && e.target.value !== '') {
      const newMessage = { user: currentUser, message: e.target.value };
      socket.emit('new-message', newMessage);
      e.target.value = '';
    }
  };

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, []);

  return (
    <StyleSheetManager shouldForwardProp={(prop) => prop !== 'isFromContact'}>
      <MainSection>
        <Title>General Chat</Title>
        <ChatSection ref={messagesContainerRef}>
          {messages.map((e, index) => (
            <MessageContainer
              isFromContact={e.user === currentUser}
              key={index}
            >
              <p>{e.user}</p>
              <MessageText isFromContact={e.user === currentUser}>
                {e.text}
              </MessageText>
              <InfoMessage>
                {month +
                  '/' +
                  day +
                  ' ' +
                  hour +
                  ':' +
                  (minutes < 10 ? '0' + minutes : minutes)}
              </InfoMessage>
            </MessageContainer>
          ))}
        </ChatSection>
        <ChatBar>
          <ChatInput placeholder="Aa" onKeyUp={handleSendMessage} autoFocus />
        </ChatBar>
      </MainSection>
    </StyleSheetManager>
  );
}
