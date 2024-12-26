import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SetToken: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    console.log('SetToken component is mounted');
    
    // Parse query parameters
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    const username = params.get('username');
    const userId = params.get('userId');

    if (token && username && userId) {
      // Store values in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('username', username);
      localStorage.setItem('userId', userId);

      // Redirect to the home page
      navigate('/home');
    } else {
      // Redirect to login if any value is missing
      navigate('/login');
    }
  }, [navigate]);

  return <div>Redirecting...</div>;
};

export default SetToken;
