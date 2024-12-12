import React, { useState } from 'react';
import { BookOpen, Home, User, Settings, Menu } from 'lucide-react';
import AddBookDialog from './AddBookDialog';
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex flex-wrap items-center justify-between">
        <a href="/" className="flex items-center space-x-2 text-gray-900">
          <BookOpen className="h-7 w-7 text-cyan-500" />
          <span className="font-bold text-xl">MonochromeReads</span>
        </a>

        {/* Hamburger Menu for Small Screens */}
        <div className="lg:hidden">
          <Menu 
            className="h-6 w-6 text-cyan-500 cursor-pointer" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          />
        </div>

        {/* Navigation Links */}
        <nav 
          className={`${
    isMenuOpen ? 'block' : 'hidden'
  } lg:flex lg:items-center lg:space-x-4 w-full lg:w-auto mt-4 lg:mt-0`}
        >
          <a href="/" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors flex items-center">
            <Home className="h-4 w-4 inline-block mr-1 text-cyan-400" />
            Home
          </a>
          <a href="/settings" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors flex items-center">
            <Settings className="h-4 w-4 inline-block mr-1 text-cyan-400" />
            Settings
          </a>
        </nav>

        {/* Actions */}
        <div className="flex justify-end w-full lg:w-auto gap-2 mt-4 lg:mt-0">
          <AddBookDialog />
          <div 
            className="bg-cyan-400 text-sm text-slate-200 font-semibold px-4 py-1 text-center rounded-lg cursor-pointer flex justify-center items-center hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-slate-500 transition duration-150"
            role="button"
            aria-label="Logout"
            onClick={handleLogout}
          >
            Logout
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
