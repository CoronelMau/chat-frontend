/* eslint-disable react/prop-types */
import { useState, useRef, useEffect } from 'react';
import { StyleSheetManager } from 'styled-components';

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

  const [messages, setMessages] = useState([
    { user: 'Mau', message: 'Text 3' },
    { user: 'Astrid', message: 'Text 4' },
    { user: 'Mau', message: 'Text 5' },
    { user: 'Astrid', message: 'Text 6' },
    { user: 'Mau', message: 'Text 7' },
    { user: 'Astrid', message: 'Text 8' },
    { user: 'Mau', message: 'Text 9' },
    { user: 'Astrid', message: 'Text 10' },
    { user: 'Mau', message: 'Text 11' },
    { user: 'Astrid', message: 'Text 12' },
  ]);

  const handleSendMessage = (e) => {
    if (e.keyCode === 13) {
      setMessages([
        ...messages,
        { user: currentUser, message: e.target.value },
      ]);

      e.target.value = '';
    }
  };

  useEffect(() => {
    // Hacer scroll hacia abajo
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <StyleSheetManager shouldForwardProp={(prop) => prop !== 'isFromContact'}>
      <MainSection>
        <Title>{currentUser}</Title>
        <ChatSection ref={messagesContainerRef}>
          {messages.map((e, index) => (
            <MessageContainer
              isFromContact={e.user === currentUser}
              key={index}
            >
              <p>{e.user}</p>
              <MessageText isFromContact={e.user === currentUser}>
                {e.message}
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
