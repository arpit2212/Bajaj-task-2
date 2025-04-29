import { useState } from 'react';
import { User } from '../types';

interface NavigationBarProps {
  user: User | null;
  onLoginClick: () => void;
  onLogout: () => void;
}

const NavigationBar = ({ user, onLoginClick, onLogout }: NavigationBarProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="bg-gray-900 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and Site Name */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-blue-400 font-bold text-xl">Student Account Form</span>
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <div className="text-gray-300 flex items-center">
                  <span className="bg-blue-600 text-white rounded-full h-8 w-8 flex items-center justify-center mr-2">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{user.name}</span>
                    <span className="text-xs text-gray-400">Roll: {user.rollNumber}</span>
                  </div>
                </div>
                <button 
                  onClick={onLogout}
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              <button 
                onClick={onLoginClick}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Login
              </button>
            )}
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={toggleMenu}
              className="text-gray-400 hover:text-white focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-gray-800 px-2 pt-2 pb-3 space-y-1">
          {user ? (
            <>
              <div className="flex items-center px-3 py-2">
                <span className="bg-blue-600 text-white rounded-full h-8 w-8 flex items-center justify-center mr-2">
                  {user.name.charAt(0).toUpperCase()}
                </span>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-white">{user.name}</span>
                  <span className="text-xs text-gray-400">Roll: {user.rollNumber}</span>
                </div>
              </div>
              <button 
                onClick={onLogout}
                className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium w-full text-left"
              >
                Logout
              </button>
            </>
          ) : (
            <button 
              onClick={onLoginClick}
              className="bg-blue-600 hover:bg-blue-700 text-white block px-3 py-2 rounded-md text-base font-medium w-full"
            >
              Login
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default NavigationBar;