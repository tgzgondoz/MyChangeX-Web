import React from "react";

export const LoadingScreen = () => {
  return (
    <div className="loading-container">
      <div className="loading-content">
        {/* Logo */}
        <div className="loading-logo">
          <h1>MyChangeX</h1>
          <div className="loading-tagline">Digital banking reimagined</div>
        </div>
        
        {/* Spinner */}
        <div className="loading-spinner">
          <div className="spinner-inner"></div>
        </div>
        
        {/* Text with animated dots */}
        <div className="loading-text">
          Loading
          <div className="loading-dots">
            <span>.</span>
            <span>.</span>
            <span>.</span>
          </div>
        </div>
        
        {/* Subtext */}
        <div className="loading-subtext">Preparing your experience</div>
        
        {/* Progress bar */}
        <div className="loading-progress-container">
          <div className="loading-progress-bar"></div>
        </div>
        
        {/* Branding */}
        <div className="loading-brand">
          MyChangeX Web Application • Secure Banking
        </div>
      </div>

      <style jsx>{`
        .loading-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #2D5BFF 0%, #6C1BCC 100%);
          color: white;
          text-align: center;
          padding: 1rem;
        }
        
        .loading-content {
          max-width: 400px;
          padding: 2rem;
        }
        
        .loading-logo h1 {
          font-size: 2.5rem;
          font-weight: 800;
          background: linear-gradient(to right, #FFFFFF, #E6E6FF);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 0.5rem;
        }
        
        .loading-tagline {
          font-size: 1rem;
          opacity: 0.85;
          font-weight: 300;
          margin-bottom: 2.5rem;
        }
        
        .loading-spinner {
          width: 80px;
          height: 80px;
          margin: 0 auto 2rem;
          position: relative;
        }
        
        .spinner-inner {
          width: 100%;
          height: 100%;
          border: 3px solid rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          position: relative;
        }
        
        .spinner-inner:after {
          content: '';
          position: absolute;
          top: -3px;
          left: -3px;
          width: 100%;
          height: 100%;
          border: 3px solid transparent;
          border-top-color: #fff;
          border-radius: 50%;
          animation: spin 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
        }
        
        .loading-text {
          font-size: 1.4rem;
          font-weight: 500;
          margin-bottom: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 2px;
        }
        
        .loading-dots span {
          display: inline-block;
          animation: dot 1.8s infinite;
          opacity: 0;
        }
        
        .loading-dots span:nth-child(1) {
          animation-delay: 0.2s;
        }
        
        .loading-dots span:nth-child(2) {
          animation-delay: 0.4s;
        }
        
        .loading-dots span:nth-child(3) {
          animation-delay: 0.6s;
        }
        
        .loading-subtext {
          font-size: 0.95rem;
          opacity: 0.8;
          margin-bottom: 2.5rem;
          font-weight: 300;
        }
        
        .loading-progress-container {
          width: 240px;
          height: 4px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 4px;
          margin: 0 auto 3rem;
          overflow: hidden;
        }
        
        .loading-progress-bar {
          height: 100%;
          width: 40%;
          background: #fff;
          border-radius: 4px;
          animation: progress 2s ease-in-out infinite;
        }
        
        .loading-brand {
          font-size: 0.85rem;
          opacity: 0.7;
          margin-top: 2rem;
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes dot {
          0% { opacity: 0; transform: translateY(0); }
          25% { opacity: 1; transform: translateY(-3px); }
          50%, 100% { opacity: 0; transform: translateY(0); }
        }
        
        @keyframes progress {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(250%); }
        }
        
        @media (max-width: 480px) {
          .loading-content {
            padding: 1.5rem;
          }
          
          .loading-logo h1 {
            font-size: 2rem;
          }
          
          .loading-spinner {
            width: 70px;
            height: 70px;
          }
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;