/* eslint-disable react/prop-types */
import { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import './styles/App.css';
import { AppStyles } from './styles/App';

import LogInPage from './components/LogIn';
import Chat from './components/Main';
import SignUp from './components/SignUp';

export default function App() {
  const [user, setUser] = useState('');

  const setNewUser = (newUser) => {
    setUser(newUser);
  };

  function isAuthenticated() {
    const jwt = localStorage.getItem('token');
    return !!jwt;
  }

  function ProtectedRoute({ children }) {
    if (isAuthenticated()) return children;

    return <Navigate to="/" replace />;
  }

  return (
    <Router>
      <AppStyles>
        <Routes>
          <Route path="/" element={<LogInPage onSendUser={setNewUser} />} />
          <Route
            path="/chat"
            element={
              <ProtectedRoute>
                <Chat currentUser={user} />
              </ProtectedRoute>
            }
          />
          <Route path="/sign-up" element={<SignUp onSendUser={setNewUser} />} />
        </Routes>
      </AppStyles>
    </Router>
  );
}
