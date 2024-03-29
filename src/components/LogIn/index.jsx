/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { LogIn, Input, Title, Button, Form } from '../../styles/Login';

export default function LogInPage() {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleChangeUser = (e) => {
    setUser(e.target.value);
  };

  const handleChangePwd = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

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

    fetch('http://localhost:3000/user/login', config)
      .then((res) => res.json())
      .then((res) => {
        localStorage.setItem('token', JSON.stringify(res.jwt));
        navigate('/chat');
      })
      .catch((err) => console.error(err));
  };

  return (
    <LogIn>
      <Title>Welcome!</Title>
      <Form>
        <Input placeholder="Username" onChange={handleChangeUser} />
        <Input
          placeholder="Password"
          type="password"
          onChange={handleChangePwd}
        />
      </Form>
      <Button onClick={handleSubmit}>Log In</Button>

      <Link to="/sign-up">
        <Button>Sign up</Button>
      </Link>
    </LogIn>
  );
}
