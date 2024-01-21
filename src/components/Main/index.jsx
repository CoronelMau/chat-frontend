/* eslint-disable react/prop-types */
import { useState, useRef, useEffect } from 'react';
import { StyleSheetManager } from 'styled-components';
import io from 'socket.io-client';
import { useNavigate } from 'react-router-dom';

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

export default function Chat() {
  const messagesContainerRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  const [currentUser, setCurrentUser] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const newSocket = io('http://localhost:3000', { forceNew: true });
    setSocket(newSocket);

    newSocket.on('new-message', (messageReceived) => {
      setMessages((prevMessages) => [...prevMessages, messageReceived]);
    });

    const jwt = JSON.parse(localStorage.getItem('token'));

    const config = {
      method: 'GET',
      headers: {
        authorization: `Bearer ${jwt}`,
      },
    };

    fetch('http://localhost:3000/user/chat', config)
      .then((res) => {
        // console.log(res);

        if (res.status === 401) {
          localStorage.removeItem('token');
          navigate('/');
        }
        return res.json();
      })
      .then((res) => {
        // console.log(res);
        setMessages(res);
      })
      .catch((error) => console.error('Error to load messages: ', error));
  }, []);

  useEffect(() => {
    const jwt = JSON.parse(localStorage.getItem('token'));

    const config = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    };

    fetch('http://localhost:3000/user/profile', config)
      .then((res) => {
        if (res.status === 401) {
          localStorage.removeItem('token');
          navigate('/');
        }

        return res.json();
      })
      .then((res) => {
        setCurrentUser(res.user);
      })
      .catch((error) => console.error(error));
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
              <InfoMessage>{e.date}</InfoMessage>
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
