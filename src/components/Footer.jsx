import React from 'react'

function footer() {
  return (
        <footer className="border-t border-gray-800 py-8 px-12">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-lg"></div>
          <span className="text-lg font-bold">MyChangeX</span>
        </div>
        <div className="text-gray-400">
          © 2024 MyChangeX. The Future of Money is Ours.
        </div>
        <div className="flex space-x-4">
          <a href="#" className="text-gray-400 hover:text-white">Twitter</a>
          <a href="#" className="text-gray-400 hover:text-white">LinkedIn</a>
          <a href="#" className="text-gray-400 hover:text-white">Instagram</a>
        </div>
      </div>
    </footer>
  )
}

export default footer