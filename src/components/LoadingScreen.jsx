import React, { useEffect, useRef } from 'react';
import './LoadingScreen.css';

const LoadingScreen = () => {
  const progressRef = useRef(null);
  
  useEffect(() => {
    // Simulate progress animation
    const interval = setInterval(() => {
      if (progressRef.current) {
        const currentWidth = parseFloat(progressRef.current.style.width || '0');
        const newWidth = Math.min(currentWidth + 10, 100);
        progressRef.current.style.width = `${newWidth}%`;
        
        if (newWidth >= 100) {
          clearInterval(interval);
        }
      }
    }, 300);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="loading-container">
      <div className="loading-content">
        {/* Spinner */}
        <div className="spinner"></div>
        
        {/* App title with animations */}
        <h1 className="loading-title">MyChangeX</h1>
        
        {/* Loading text */}
        <p className="loading-subtitle">Loading your experience...</p>
        
        {/* Progress indicator */}
        <div className="progress-container">
          <div ref={progressRef} className="progress-bar"></div>
        </div>
        
        {/* Additional message */}
        <p className="loading-message">Preparing something amazing for you</p>
        
        {/* Animated dots */}
        <div className="dots-container">
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;