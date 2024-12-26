import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import SettingsPage from './pages/Settings';
import VerifyEmail from './pages/VerifyEmail';
import RegistrationSuccess from './pages/RegistrationSuccess';
import EmailVerified from './pages/EmailVerified';
import SetToken from './pages/SetToken';

const App: React.FC = () => {
  const token = localStorage.getItem('token');

  return (
    <Routes>
      <Route path="/" element={<Navigate to={token ? "/home" : "/login"} />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/home" element={token ? <Home /> : <Navigate to="/login" />} />
      <Route path='/settings' element={token ? <SettingsPage /> :<Navigate to="/login"/>}/>
      <Route path="/verify-email" element={<VerifyEmail />} />
      <Route path="/registration-success" element={<RegistrationSuccess />} />
      <Route path="/email-verified" element={<EmailVerified />} />
      <Route path="/set-token" element={<SetToken/>} />
    </Routes>
  );
}

export default App;
