import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SplashScreen from './components/SplashScreen';
import DashboardScreen from './components/DashboardScreen';
import DemoPage from './components/DemoPage';
import Header from './components/Header';
import Footer from './components/Footer';

// Remove MyChangeXFullScreen import since it doesn't exist

function App() {
  const [isLoading, setIsLoading] = useState(true);

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
    <BrowserRouter>
      <Routes>
        {/* Since MyChangeXFullScreen doesn't exist, you need to create it or use another component */}
        {/* For now, let's use DemoPage as the home page or create a new Home component */}
        <Route path="/" element={
          <>
            <Header />
            <DashboardScreen />
          </>
        } />
        <Route path="/demo" element={
          <>
            <Header />
            <DemoPage />
           
          </>
        } />
        <Route path="/dashboard" element={
          <>
            <Header />
            <DashboardScreen />
            <Footer />
          </>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;