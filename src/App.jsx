import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SplashScreen from './components/SplashScreen';
import DashboardScreen from './components/DashboardScreen';
import DemoPage from './components/DemoPage'; // Changed from DemoScreen to DemoPage
import MyChangeXFullScreen from './components/MyChangeXFullScreen'; // Add this import
import Header from './components/Header';
import Footer from './components/Footer';

// Wrap the main app logic
function AppContent() {
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
    <div className="min-h-screen flex flex-col bg-[#f8f9fb]">
      <Routes>
        <Route path="/" element={<MyChangeXFullScreen />} />
        <Route path="/demo" element={<DemoPage />} />
        <Route path="/dashboard" element={<DashboardScreen />} />
        {/* Add more routes as needed */}
      </Routes>
    </div>
  );
}

// Alternative: If you want Header/Footer on all pages except SplashScreen
function AppWithLayout() {
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
    <div className="min-h-screen flex flex-col bg-[#f8f9fb]">
      <Routes>
        <Route path="/" element={
          <>
            <Header />
            <MyChangeXFullScreen />
            <Footer />
          </>
        } />
        <Route path="/demo" element={
          <>
            <Header />
            <DemoPage />
            <Footer />
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
    </div>
  );
}

// OR Option 3: If Header/Footer are already inside MyChangeXFullScreen and DemoPage
function AppSimple() {
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
    <Routes>
      <Route path="/" element={<MyChangeXFullScreen />} />
      <Route path="/demo" element={<DemoPage />} />
      <Route path="/dashboard" element={<DashboardScreen />} />
    </Routes>
  );
}

// Main App component with Router
function App() {
  // Choose which structure you want:
  
  // Option 1: Header/Footer inside components (Use this if MyChangeXFullScreen and DemoPage already have them)
  return (
    <BrowserRouter>
      <AppSimple />
    </BrowserRouter>
  );

  // Option 2: Header/Footer outside components
  // return (
  //   <BrowserRouter>
  //     <AppWithLayout />
  //   </BrowserRouter>
  // );
}

export default App;