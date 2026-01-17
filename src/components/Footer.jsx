import React from 'react';

const Footer = () => {
  return (
    <footer className="border-t border-gray-200 py-8 px-12 bg-white">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <span className="text-lg font-bold text-black">MyChangeX</span>
        </div>
        <div className="text-[12px] text-gray-600">
          © 2026 MyChangeX. The Future of Money is Ours.
        </div>
        <div className="flex space-x-4">
          <a href="#" className="text-[12px] text-gray-600 hover:text-[#0136c0] transition">Twitter</a>
          <a href="#" className="text-[12px] text-gray-600 hover:text-[#0136c0] transition">LinkedIn</a>
          <a href="#" className="text-[12px] text-gray-600 hover:text-[#0136c0] transition">Instagram</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;