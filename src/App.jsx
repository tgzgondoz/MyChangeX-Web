// App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import SplashScreen from './components/SplashScreen';
import DashboardScreen from './components/DashboardScreen';
import DemoScreen from './components/DemoScreen';

// Wrap the main app logic
function AppContent() {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <SplashScreen onLoadingComplete={() => setIsLoading(false)} />;
  }

  return (
    <Routes>
      <Route path="/" element={<DashboardScreen />} />
      <Route path="/demo" element={<DemoScreen />} />
      {/* Add more routes as needed */}
    </Routes>
  );
}

// Main App component with Router
function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;