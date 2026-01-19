import React from "react";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-8 py-4 flex justify-between items-center bg-white border-b border-gray-200">
      <div className="flex items-center space-x-2">
        <h1 className="text-2xl font-bold text-black">MyChangeX</h1>
      </div>
      <div className="hidden md:flex items-center space-x-8">
        <a
          href="#"
          className="text-gray-700 hover:text-[#0136c0] transition font-medium"
        >
          Features
        </a>
        <a
          href="#"
          className="text-gray-700 hover:text-[#0136c0] transition font-medium"
        >
          Solutions
        </a>
        <a
          href="#"
          className="text-gray-700 hover:text-[#0136c0] transition font-medium"
        >
          Pricing
        </a>
        <a
          href="#"
          className="text-gray-700 hover:text-[#0136c0] transition font-medium"
        >
          About
        </a>
      </div>
      <div className=" flex items-center space-x-6  mr-1 text-[#0136c0] text-lg font-medium">
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
     
      <button className="px-6 py-2 bg-[#0136c0] text-white rounded-lg font-semibold hover:bg-blue-800 transition">
        Download App
      </button>
    </nav>
  );
};

export default Header;