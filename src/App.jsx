// src/App.jsx - Make sure it looks like this
import './index.css'  // Ensure the path is correct;

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-blue-600 mb-4">
        Welcome to MyChangeX!
      </h1>
      <p className="text-gray-700 text-lg">
        Start building your amazing project 🚀
      </p>
      <button className="mt-6 px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-300">
        Get Started
      </button>
    </div>
  )
}

// MAKE SURE THIS LINE EXISTS:
export default App