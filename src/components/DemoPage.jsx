import React, { useState, useEffect, useRef } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

// SmoothReveal Component for Text Elements
const SmoothReveal = ({ children, delay = 0, className = "" }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay: delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      viewport={{ once: true, margin: "-50px" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const DemoPage = () => {
  const navigate = useNavigate();
  const [activeScreen, setActiveScreen] = useState(1);
  const [androidActiveScreen, setAndroidActiveScreen] = useState(1);
  const [balance] = useState(0.72);
  const [transactionInProgress, setTransactionInProgress] = useState(false);
  
  const textContainerRef = useRef(null);
  const controls = useAnimation();

  // Function to handle send from iPhone
  const handleIphoneSend = () => {
    if (window.location.pathname.includes('/demo')) {
      setTransactionInProgress(true);
      
      // iPhone shows sending state briefly
      setActiveScreen(1);
      
      // After a brief delay, Android shows receive screen
      setTimeout(() => {
        setAndroidActiveScreen(2);
        alert("Sending coupon from iPhone to Android...");
        setTransactionInProgress(false);
      }, 1000);
    }
  };

  // Function to handle send from Android
  const handleAndroidSend = () => {
    if (window.location.pathname.includes('/demo')) {
      setTransactionInProgress(true);
      
      // Android shows sending state briefly
      setAndroidActiveScreen(1);
      
      // After a brief delay, iPhone shows receive screen
      setTimeout(() => {
        setActiveScreen(2);
        alert("Sending coupon from Android to iPhone...");
        setTransactionInProgress(false);
      }, 1000);
    }
  };

  // Function to handle receive button (for both devices)
  const handleReceiveClick = (device) => {
    if (device === 'iphone') {
      setActiveScreen(2);
      setAndroidActiveScreen(1);
    } else {
      setAndroidActiveScreen(2);
      setActiveScreen(1);
    }
  };

  // Home screen component (reused for both iPhone and Android)
  const renderHomeScreen = (device) => (
    <div className="h-full bg-[#f8f9fb] flex flex-col p-4">
      {/* Header with user info */}
      <SmoothReveal delay={0.1}>
        <div className="mb-4">
          <h2 className="text-xl font-bold text-black">
            {device === 'iphone' ? 'Tatenda' : 'Frank'}
          </h2>
          <p className="text-gray-500 text-sm">
            {device === 'iphone' ? '+263 00 000 2506' : '+263 00 000 2507'}
          </p>
        </div>
      </SmoothReveal>

      {/* Balance Section */}
      <SmoothReveal delay={0.2}>
        <div className="mb-5 bg-white rounded-xl p-2 border border-gray-200">
          <div className="lex items-center mb-8">
            <div className="w-3 h-3 border-2 border-gray-400 rounded-full mr-1 flex items-center justify-center">
              
            </div>
            <span className="text-xs text-gray-600">Total Balance</span>
          </div>

          <div className="flex items-center justify-between">
            <h3 className="text-4xl font-bold text-black">
              ${balance.toFixed(2)}
            </h3>
            <div className="text-gray-500 text-sm">USD</div>
          </div>

          <div className="flex items-center justify-end mt-2">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
            <span className="text-xs text-gray-500">Updated</span>
          </div>
        </div>
      </SmoothReveal>

      {/* Circular Send/Receive Buttons */}
      <SmoothReveal delay={0.3}>
        <div className="flex justify-center space-x-12 mb-5">
          {/* Send Button */}
          <div className="flex flex-col items-center">
            <button
              className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 shadow-sm hover:shadow-md transition-all ${transactionInProgress ? 'opacity-50 cursor-not-allowed' : ''}`}
              style={{ 
                backgroundColor: device === 'iphone' ? '#0136c0' : '#01c853'
              }}
              onClick={() => {
                if (transactionInProgress) return;
                if (device === 'iphone') {
                  handleIphoneSend();
                } else {
                  handleAndroidSend();
                }
              }}
              disabled={transactionInProgress}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
              >
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
            <span className="text-sm text-black font-medium">Send</span>
          </div>

          {/* Receive Button */}
          <div className="flex flex-col items-center">
            <button
              className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 shadow-sm hover:shadow-md transition-all ${transactionInProgress ? 'opacity-50 cursor-not-allowed' : ''}`}
              style={{ 
                backgroundColor: device === 'iphone' ? '#01c853' : '#0136c0'
              }}
              onClick={() => {
                if (transactionInProgress) return;
                handleReceiveClick(device);
              }}
              disabled={transactionInProgress}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
              >
                <path d="M3 7V5a2 2 0 0 1 2-2h2" />
                <path d="M17 3h2a2 2 0 0 1 2 2v2" />
                <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
                <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
                <line x1="7" y1="12" x2="17" y2="12" />
              </svg>
            </button>
            <span className="text-sm text-black font-medium">Receive</span>
          </div>
        </div>
      </SmoothReveal>

      {/* Spend Your Change Section */}
      <SmoothReveal delay={0.4} className="mt-auto">
        <div className="mb-8">
          <p className="text-black font-semibold text-center text-sm mb-2">
            Spend Your Change
          </p>
          <p className="text-gray-600 text-xs text-center mb-4">
             To pay for bills, airtime, and event tickets
          </p>
          <button
            className="w-full py-3 bg-[#0136c0] text-white rounded-lg font-semibold text-sm hover:bg-[#012da0] transition-all shadow-sm"
            onClick={() => alert("Spend feature demo - This is a demo.")}
          >
            Spend Now
          </button>
        </div>
      </SmoothReveal>

      {/* Transaction Status Indicator */}
      {transactionInProgress && (
        <SmoothReveal delay={0.5}>
          <div className="mt-3 p-2 bg-blue-50 rounded-lg">
            <p className="text-blue-600 text-sm text-center">
              {device === 'iphone' ? 'Sending to Android...' : 'Sending to iPhone...'}
            </p>
          </div>
        </SmoothReveal>
      )}
    </div>
  );

  // Receive screen component (reused for both iPhone and Android)
  const renderReceiveScreen = (device) => (
    <div className="h-full bg-[#f8f9fb] flex flex-col p-4">
      {/* Header with Back to Home button */}
      <SmoothReveal delay={0.1}>
        <div className="flex justify-between items-center mb-4">
          <button
            className="text-blue-600 font-medium flex items-center text-sm"
            onClick={() => {
              if (device === 'iphone') {
                setActiveScreen(1);
              } else {
                setAndroidActiveScreen(1);
              }
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-1"
            >
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            
          </button>
          <h3 className="text-lg font-bold text-gray-800">
            Receive Coupons
          </h3>
          <div className="w-16"></div>
        </div>
      </SmoothReveal>

      <SmoothReveal delay={0.2}>
        <p className="text-center text-gray-500 mb-3 text-sm font-medium">
          SCAN THIS CODE TO RECEIVE COUPONS
        </p>
      </SmoothReveal>

      {/* QR Code Container */}
      <SmoothReveal delay={0.3} className="flex-1 flex items-center justify-center">
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
          <div className="w-36 h-36 flex items-center justify-center mx-auto">
            <div className="relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="144"
                height="144"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#0136c0"
                strokeWidth="2"
                className="drop-shadow-sm"
              >
                <rect x="3" y="3" width="7" height="7" rx="1" />
                <rect x="3" y="14" width="7" height="7" rx="1" />
                <rect x="14" y="3" width="7" height="7" rx="1" />
                <line x1="14" y1="14" x2="17" y2="17" />
                <line x1="17" y1="14" x2="14" y2="17" />
                <line x1="20" y1="14" x2="20" y2="17" />
                <line x1="14" y1="20" x2="17" y2="20" />
              </svg>
            </div>
          </div>
        </div>
      </SmoothReveal>

      <SmoothReveal delay={0.4}>
        <p className="text-center text-gray-600 mb-3 text-sm font-medium tracking-wide">
          hold this code to the scanner
        </p>
      </SmoothReveal>

      <SmoothReveal delay={0.5}>
        <div className="flex justify-center">
          <button
            className="px-5 py-2.5 text-blue-600 font-semibold text-center transition-all text-sm hover:text-blue-700"
            onClick={() => alert("View Transactions - This is a demo.")}
          >
            View Transactions
          </button>
        </div>
      </SmoothReveal>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f8f9fb] text-gray-800 overflow-hidden">
      <Header />

      {/* Main Content */}
      <div className="pt-20 pb-16 px-4 max-w-7xl mx-auto">
        {/* Page Header with Back Button */}
        <div className="text-center mb-10 relative">
          <SmoothReveal delay={0.1}>
            <button
              onClick={() => navigate("/")}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 flex items-center text-gray-600 hover:text-black transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
              <span className="ml-2 text-base">Back to Home</span>
            </button>
          </SmoothReveal>

          <SmoothReveal>
            <h1 className="text-3xl font-black text-black mb-4">
              Live Demo - Send Coupons
            </h1>
          </SmoothReveal>
          
          <SmoothReveal delay={0.1}>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Experience how MyChangeX revolutionizes digital coupon transactions
              across different devices
            </p>
          </SmoothReveal>
        </div>

        {/* Demo Content */}
        <div className="mb-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* iPhone - Sender */}
            <SmoothReveal delay={0.2}>
              <div className="flex flex-col items-center">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    iPhone 
                  </h2>
                  <p className="text-gray-600">
                    Home screen and send/receive functionality
                  </p>
                </div>

                <div className="relative w-72 h-[560px] bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 rounded-[2.5rem] shadow-2xl overflow-hidden border-[10px] border-gray-800 mb-4">
                  {/* iPhone Dynamic Island */}
                  <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-24 h-6 bg-black rounded-full z-20 flex items-center justify-center">
                    <div className="absolute right-2 w-3 h-3 bg-gray-600 rounded-full"></div>
                  </div>

                  {/* Screen */}
                  <div className="absolute inset-2 bg-gradient-to-br from-gray-50 to-white rounded-[2rem] overflow-hidden">
                    {/* Status Bar - iPhone Style */}
                    <div className="absolute top-2 left-0 right-0 px-6 flex justify-between items-center text-black text-[11px] font-medium">
                      <div className="flex items-center space-x-1">
                        <div className="text-xs font-semibold">9:41</div>
                      </div>
                      <div className="flex items-center space-x-0.5">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="mr-0.5"
                        >
                          <path d="M5 12.55a11 11 0 0 1 14.08 0" />
                          <path d="M1.42 9a16 16 0 0 1 21.16 0" />
                          <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
                          <circle cx="12" cy="20" r="1" />
                        </svg>

                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="relative"
                        >
                          <rect
                            x="2"
                            y="7"
                            width="18"
                            height="10"
                            rx="2"
                            ry="2"
                            fill="none"
                          />
                          <line x1="22" x2="22" y1="10" y2="14" />
                          <rect
                            x="4"
                            y="9"
                            width="14"
                            height="6"
                            rx="1"
                            ry="1"
                            fill="#4CAF50"
                            stroke="none"
                          />
                        </svg>
                      </div>
                    </div>
                    
                    {/* Phone Screen Content with Smooth Transitions */}
                    <div className="pt-10 h-full overflow-hidden">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={activeScreen}
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -10 }}
                          transition={{ duration: 0.4, ease: "easeInOut" }}
                          className="h-full w-full"
                        >
                          {activeScreen === 0 && (
                            <div className="h-full flex flex-col items-center justify-center bg-[#f8f9fb] p-4">
                              <div className="flex-1 flex items-center justify-center">
                                <div className="w-28 h-28 bg-[#0136c0] rounded-full flex items-center justify-center">
                                  <p className="text-white text-xl font-medium">MyChangeX</p>
                                </div>
                              </div>
                              <div className="mb-8">
                                <motion.div
                                  className="w-10 h-10 rounded-full border-2 border-[#0136c0] border-t-transparent"
                                  animate={{ rotate: 360 }}
                                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                />
                              </div>
                              <div className="mb-8">
                                <h1 className="text-gray-500 text-base">Loading...</h1>
                              </div>
                            </div>
                          )}
                          {activeScreen === 1 && renderHomeScreen('iphone')}
                          {activeScreen === 2 && renderReceiveScreen('iphone')}
                        </motion.div>
                      </AnimatePresence>
                    </div>

                    {/* iPhone Home Indicator */}
                    <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-0.5 bg-gray-800/30 rounded-full"></div>
                  </div>
                </div>
              </div>
            </SmoothReveal>

            {/* Android - Receiver */}
            <SmoothReveal delay={0.3}>
              <div className="flex flex-col items-center">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    Android 
                  </h2>
                  <p className="text-gray-600">
                    Home screen and send/receive functionality
                  </p>
                </div>

                <div className="relative w-72 h-[560px] bg-gradient-to-b from-gray-800 to-gray-900 rounded-3xl shadow-2xl overflow-hidden border-[6px] border-gray-700 mb-4">
                  {/* Android Notch */}
                  <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-black rounded-b-xl" />

                  {/* Screen */}
                  <div className="absolute inset-1 bg-gradient-to-br from-gray-100 to-white rounded-[1.5rem] overflow-hidden">
                    
                    <div className="pt-4 px-4 flex justify-center items-center text-black text-sm space-x-20">
                      <div className="font-semibold">9:41</div>
                      <div className="w-3 h-3 bg-gray-600 rounded-full" />
                      <div className="flex items-center space-x-1">
                        <div className="w-5 h-3 bg-gray-500 rounded-full" />
                        <span className="text-sm">4G</span>
                      </div>
                    </div>

                    {/* Android Screen Content with Smooth Transitions */}
                    <div className="h-full overflow-hidden">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={androidActiveScreen}
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -10 }}
                          transition={{ duration: 0.4, ease: "easeInOut" }}
                          className="h-full w-full"
                        >
                          {androidActiveScreen === 0 && (
                            <div className="h-full flex flex-col items-center justify-center bg-[#f8f9fb] p-4">
                              <div className="flex-1 flex items-center justify-center">
                                <div className="w-28 h-28 bg-[#0136c0] rounded-full flex items-center justify-center">
                                  <p className="text-white text-xl font-medium">MyChangeX</p>
                                </div>
                              </div>
                              <div className="mb-8">
                                <motion.div
                                  className="w-10 h-10 rounded-full border-2 border-[#0136c0] border-t-transparent"
                                  animate={{ rotate: 360 }}
                                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                />
                              </div>
                              <div className="mb-8">
                                <h1 className="text-gray-500 text-base">Loading...</h1>
                              </div>
                            </div>
                          )}
                          {androidActiveScreen === 1 && renderHomeScreen('android')}
                          {androidActiveScreen === 2 && renderReceiveScreen('android')}
                        </motion.div>
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* Android Navigation */}
                  <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gray-600 rounded-full" />
                </div>
              </div>
            </SmoothReveal>
          </div>
        </div>

        {/* CTA Section */}
        <SmoothReveal delay={0.4}>
          <div className="rounded-lg p-8 text-center mb-12">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              Ready to Experience MyChangeX?
            </h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Join thousands of users who have revolutionized their digital transactions with our secure and intuitive platform.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                className="px-8 py-3 text-[#0136c0] rounded-lg font-semibold text-base"
                onClick={() => alert("Download app - This is a demo.")}
              >
                Download App
              </button>
              <button
                className="px-8 py-3 text-gray-800 rounded-lg font-semibold text-base"
                onClick={() => navigate("/")}
              >
                Back to Home
              </button>
            </div>
          </div>
        </SmoothReveal>
      </div>

      <Footer />
    </div>
  );
};

export default DemoPage;