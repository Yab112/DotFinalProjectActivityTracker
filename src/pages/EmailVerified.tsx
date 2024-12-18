import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const EmailVerified: React.FC = () => {

  useEffect(()=>{
    setTimeout(() => {
      
      navigate('/login')
    }, 1000);
  },[])
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-3xl font-bold text-green-600 mb-4">
          Email Verified Successfully!
        </h1>
        <p className="text-gray-700 mb-6">
          Your email has been verified. You can now log in to your account.
        </p>
      </div>
    </div>
  );
};

export default EmailVerified;
