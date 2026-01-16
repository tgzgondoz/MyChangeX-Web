import React from 'react';
import { WalletIcon } from './DashboardScreen.jsx'; // We'll need to export this from DashboardScreen

const Header = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-8 py-4 flex justify-between items-center backdrop-blur-md bg-black/30">
      <div className="flex items-center space-x-2">
        <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center">
          <WalletIcon />
        </div>
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-300 bg-clip-text text-transparent">
          MyChangeX
        </h1>
      </div>
      <div className="hidden md:flex items-center space-x-8">
        <a href="#" className="hover:text-blue-400 transition">Features</a>
        <a href="#" className="hover:text-blue-400 transition">Solutions</a>
        <a href="#" className="hover:text-blue-400 transition">Pricing</a>
        <a href="#" className="hover:text-blue-400 transition">About</a>
      </div>
      <button className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-lg font-semibold hover:opacity-90 transition">
        Download App
      </button>
    </nav>
  );
};

export default Header;