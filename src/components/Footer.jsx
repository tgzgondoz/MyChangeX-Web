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
          <a href="https://www.tiktok.com/@co.munity?_r=1&_t=ZS-93AXuGusQ9h" className="text-[12px] text-gray-600 hover:text-[#0136c0] transition">TikTok</a>
          <a href="https://www.instagram.com/mychange_x?igsh=MTRqcW1zNHRjZjlvNg%3D%3D&utm_source=qr" className="text-[12px] text-gray-600 hover:text-[#0136c0] transition">Instagram</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;