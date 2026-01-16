import React, { useState, useEffect } from 'react';
import SplashScreen from './components/SplashScreen';
import DashboardScreen from './components/DashboardScreen';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoading ? (
        <SplashScreen onLoadingComplete={() => setIsLoading(false)} />
      ) : (
        <DashboardScreen />
      )}
    </>
  );
}

export default App;