import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { useToast } from "../hooks/use-toast";
import axios from 'axios';
import { set } from 'react-hook-form';

interface FormData {
  username: string;
  email: string;
  password: string;
  profilePicture: string;
}

const MyForm: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    username: '',
    email: '',
    password: '',
    profilePicture: ''
  });
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    setLoading(true);
    const response = await axios.post('https://dotbackendexpresswithjs.vercel.app/api/auth/register', formData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    setLoading(false);
    navigate('/login');
    toast({
      title: "Success",
      description: `${response.data.message}`,
    });
  } catch (error: any) {
    console.error("Error details:", error);

    if (error.response) {
      setLoading(false);
      console.error("Server responded with:", error.response.data);
      toast({
        title: "Error",
        description: error.response.data.message || "An error occurred",
      });
    } else {
      setLoading(false);
      console.error("Request failed:", error.message);
      toast({
        title: "Error",
        description: "Failed to register. Please try again.",
      });
    }
  }
};

  

  return (
    <div className="container mx-auto flex items-center justify-center h-screen">
      <div className="flex max-w-7xl h-96 w-full bg-gradient-to-r from-green-400 to-blue-500 rounded-lg shadow-xl overflow-hidden">
        {/* Form Section */}
        <div className="w-1/3 p-6 flex flex-col justify-center space-y-6 bg-white">
          <h2 className="text-3xl font-bold text-gray-800 text-center">Create an Account</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              type="submit"
              disabled={loading} 
              className={`w-full py-2 rounded-lg text-white font-semibold focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {loading ? "registering..." : "SignUp"}
            </button>
          </form>
        </div>

        {/* Illustration Section */}
        <div className="w-1/2 p-6 flex flex-col justify-center items-center bg-cover bg-center" >
          <h3 className="text-4xl font-bold text-white text-center">Welcome to Our Community</h3>
          <p className="text-lg text-white mt-4 text-center">Join us and Store YOur world.Store, Read, and grow toget Here.</p>
          <div className="mt-6">
            <span role="img" aria-label="sparkles" className="text-6xl">✨</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyForm;
