import './App.css';
import { useEffect, useState } from 'react';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import SignIn from 'pages/auth/sign_in';
import SignUp from 'pages/auth/sign_up';
import Dashboard from 'pages/user/dashboard';
import { UserProvider } from 'provider/userProvider';

function App() {
  const [token, setToken] = useState('');

  useEffect(() => {
    setToken(localStorage.getItem('token') as string);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <UserProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Navigate to="/auth/sign_in" />} />
              <Route
                path="auth/sign_in"
                element={
                  !token ? <SignIn /> : <Navigate to="/user/dashboard" />
                }
              />
              <Route
                path="auth/sign_up"
                element={
                  !token ? <SignUp /> : <Navigate to="/user/dashboard" />
                }
              />
              <Route
                path="user/dashboard"
                element={
                  token ? <Dashboard /> : <Navigate to="/auth/sign_in" />
                }
              />
            </Routes>
          </BrowserRouter>
        </UserProvider>
      </header>
    </div>
  );
}

export default App;
