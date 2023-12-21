import styled from 'styled-components';

export const MainSection = styled.div`
  background-color: #f0ece5;
  width: 80vw;
  height: 90vh;
  border-radius: 2rem;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const Title = styled.h1`
  width: 100%;
  font-size: 2rem;
  padding: 1rem;
  background-color: #31304d;
  box-sizing: border-box;
  border-radius: 2rem 2rem 0 0;
  text-align: center;
  color: #f0ece5;
`;

export const ChatBar = styled.div`
  width: 100%;
  height: 4rem;
  background-color: #31304d;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0 0 2rem 2rem;
`;

export const ChatSection = styled.div`
  width: 80vw;
  height: 80vh;
  overflow-y: auto;
`;

export const MessageContainer = styled.div`
  margin: 1rem;
  text-align: ${(prop) => (prop.isFromContact ? 'right' : 'left')};
`;

export const MessageText = styled.p`
  background-color: ${(prop) => (prop.isFromContact ? 'white' : '#31304d')};
  color: ${(prop) => (prop.isFromContact ? '#31304d' : '#f0ece5')};
  font-size: 1.2rem;
  display: inline-block;
  padding: 0.5rem;
  border-radius: 0.5rem;
  max-width: 50%;
`;

export const InfoMessage = styled.p`
  opacity: 0;

  ${MessageContainer}:hover & {
    opacity: 1;
  }
`;

export const ChatInput = styled.input`
  width: 90%;
  height: 2rem;
  border: none;
  border-radius: 2rem;
  padding-left: 2rem;
  font-size: 1.2rem;
`;
