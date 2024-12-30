import React, { useState } from 'react';
import { Dumbbell, Home, User, Settings, Menu } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { FaUser } from 'react-icons/fa';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <header className= "backdrop-brightness-50 fixed top-0 left-0 right-0 z-50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4 flex flex-wrap items-center justify-between">
        <a href="/" className="flex items-center space-x-2 text-gray-900">
          <Dumbbell className="h-7 w-7 text-green-500" />
          <span className="font-bold text-xl text-slate-200">FitLife Gym</span>
        </a>

        {/* Hamburger Menu for Small Screens */}
        <div className="lg:hidden">
          <Menu 
            className="h-6 w-6 text-slate-200 cursor-pointer" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          />
        </div>

        {/* Navigation Links */}
        <nav 
          className={`${
    isMenuOpen ? 'block' : 'hidden'
  } lg:flex lg:items-center lg:space-x-4 w-full lg:w-auto mt-4 lg:mt-0`}
        >
          <a href="/" className="text-sm font-medium text-gray-200 hover:text-slate-400 transition-colors flex items-center">
            <Home className="h-4 w-4 inline-block mr-1 text-cyan-200" />
            Home
          </a>
          <a href="/workouts" className="text-sm font-medium text-gray-200 hover:text-slate-400 transition-colors flex items-center">
            <Dumbbell className="h-4 w-4 inline-block mr-1 text-green-400" />
            Workouts
          </a>
          <a href="/trainers" className="text-sm font-medium text-gray-200 hover:text-slate-400 transition-colors flex items-center">
            <User className="h-4 w-4 inline-block mr-1 text-green-400" />
            Trainers
          </a>
          <a href="/settings" className="text-sm font-medium text-gray-200 hover:text-slate-400 transition-colors flex items-center">
            <Settings className="h-4 w-4 inline-block mr-1 text-green-400" />
            Settings
          </a>
        </nav>

        {/* Actions */}
        <div className="flex justify-end w-full lg:w-auto gap-2 mt-4 lg:mt-0">
          <button 
            className="   text-sm text-slate-200 font-semibold px-4 py-1 text-center rounded-lg cursor-pointer flex justify-center items-center hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-slate-500 transition duration-150"
            role="button"
            aria-label="Logout"
            onClick={handleLogout}
          >
            <FaUser className="h-4 w-4 inline-block mr-1 text-green-400 hover:text-white" />
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
