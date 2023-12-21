/* eslint-disable react/prop-types */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { LogIn, Input, Title, Button } from '../../styles/Login';

export default function LogInPage(props) {
  const [user, setUser] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser(e.target.value);
  };

  const handleEntry = (e) => {
    if (e.keyCode === 13) {
      sendName();
    }
  };

  const sendName = () => {
    if (user != '') {
      props.onSendUser(user);
      navigate('/chat');
    } else {
      alert('user not valid');
      navigate('/');
    }
  };

  return (
    <LogIn>
      <Title>Welcome!</Title>
      <Input
        placeholder="Username"
        onChange={handleChange}
        onKeyUp={handleEntry}
      />
      <Button onClick={sendName}>Log In</Button>
    </LogIn>
  );
}
