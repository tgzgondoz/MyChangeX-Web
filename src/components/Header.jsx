import React from "react";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";

const Header = () => {
  const downloadLink = "https://expo.dev/accounts/tatenda_gondo/projects/mychangex-proper/builds/0a2e17c9-d05c-43fc-98c4-384c62c1e04d";

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
      <div className="flex items-center space-x-6 mr-1 text-[#0136c0] text-lg font-medium">
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>

      {/* Download Button - Only shows when signed in */}
      <SignedIn>
        <a
          href={downloadLink}
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-2 bg-[#0136c0] text-white rounded-lg font-semibold hover:bg-blue-800 transition inline-block"
        >
          Download App
        </a>
      </SignedIn>
      
      {/* Sign In button styled like download button when signed out */}
      <SignedOut>
        <SignInButton mode="modal">
          <button className="px-6 py-2 bg-[#0136c0] text-white rounded-lg font-semibold hover:bg-blue-800 transition cursor-pointer">
            Download App
          </button>
        </SignInButton>
      </SignedOut>
    </nav>
  );
};

export default Header;