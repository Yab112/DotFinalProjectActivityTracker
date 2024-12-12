import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import SettingsPage from './pages/Settings';

const App: React.FC = () => {
  const token = localStorage.getItem('token');

  return (
    <Routes>
      <Route path="/" element={<Navigate to={token ? "/home" : "/login"} />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/home" element={token ? <Home /> : <Navigate to="/login" />} />
      <Route path='/settings' element={token ? <SettingsPage /> :<Navigate to="/login"/>}/>
    </Routes>
  );
}

export default App;
