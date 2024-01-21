import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { LogIn, Title, Form, Input, Button } from '../../styles/Login';

export default function SignUp() {
  const navigate = useNavigate();
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');

  const handleChangeUser = (e) => {
    setUser(e.target.value);
  };

  const handleChangePwd = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = () => {
    const data = {
      user,
      password,
    };

    const config = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };

    fetch('http://localhost:3000/user/register', config)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setUser('');
        setPassword('');
        navigate('/');
      })
      .catch((err) => console.error(err));
  };

  return (
    <LogIn>
      <Title>Sign-In</Title>
      <Form>
        <Input placeholder="Username" onChange={handleChangeUser} />
        <Input
          placeholder="Password"
          type="password"
          onChange={handleChangePwd}
        />
      </Form>
      <Button onClick={handleSubmit}>Sign-Up</Button>
    </LogIn>
  );
}
