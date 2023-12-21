import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './styles/App.css';
import { AppStyles } from './styles/App';

import LogInPage from './components/LogIn';
import Chat from './components/Main';

export default function App() {
  const [user, setUser] = useState('');

  const setNewUser = (newUser) => {
    setUser(newUser);
  };

  return (
    <Router>
      <AppStyles>
        <Routes>
          <Route path="/" element={<LogInPage onSendUser={setNewUser} />} />
          <Route path="/chat" element={<Chat currentUser={user} />} />
        </Routes>
      </AppStyles>
    </Router>
  );
}
