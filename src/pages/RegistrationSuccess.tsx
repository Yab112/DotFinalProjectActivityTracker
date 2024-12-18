import React from "react";
import { Link } from "react-router-dom";

const RegistrationSuccess: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-3xl font-bold text-green-600 mb-4">Registration Successful!</h1>
        <p className="text-gray-700 mb-6">
          Please check your email to verify your account. Once verified, you can log in.
        </p>
      </div>
    </div>
  );
};

export default RegistrationSuccess;
