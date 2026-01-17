import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const DemoPage = () => {
  const navigate = useNavigate();
  const [activeScreen, setActiveScreen] = useState(1); // iPhone: 0: splash, 1: home, 2: receive
  const [androidActiveScreen, setAndroidActiveScreen] = useState(1); // Android: 0: splash, 1: home, 2: receive
  const [balance] = useState(0.77);
  const [transactionInProgress, setTransactionInProgress] = useState(false);

  // Function to handle send from iPhone
  const handleIphoneSend = () => {
    if (window.location.pathname.includes('/demo')) {
      setTransactionInProgress(true);
      
      // iPhone shows sending state briefly
      setActiveScreen(1); // Stay on home but we could add a sending animation
      
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
      setAndroidActiveScreen(1); // Stay on home
      
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
      setAndroidActiveScreen(1); // Reset android to home when iPhone shows receive
    } else {
      setAndroidActiveScreen(2);
      setActiveScreen(1); // Reset iPhone to home when Android shows receive
    }
  };

  // Home screen component (reused for both iPhone and Android)
  const renderHomeScreen = (device) => (
    <div className="h-full bg-[#f8f9fb] p-4">
      {/* Header with user info */}
      <div className="mb-4">
        <h2 className="text-xl font-bold text-black">
          {device === 'iphone' ? 'Tatenda' : 'Alex'}
        </h2>
        <p className="text-gray-500 text-sm">
          {device === 'iphone' ? '+263 00 000 2506' : '+263 00 000 2507'}
        </p>
      </div>

      {/* Balance Section */}
      <div className="mb-6 bg-white rounded-2xl p-4 border border-gray-200">
        <div className="flex items-center mb-3">
          <div className="w-4 h-4 border-2 border-gray-400 rounded-full mr-3 flex items-center justify-center">
            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
          </div>
          <span className="text-sm text-gray-600">Total Balance</span>
        </div>

        <div className="flex items-center justify-between mb-2">
          <h3 className="text-3xl font-bold text-black">
            ${balance.toFixed(2)}
          </h3>
          <div className="text-gray-500 text-sm">USD</div>
        </div>

        <div className="flex items-center justify-right space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span className="text-xs text-gray-500">Updated</span>
        </div>
      </div>

      {/* Circular Send/Receive Buttons */}
      <div className="flex justify-center space-x-16 mb-6">
        {/* Send Button - Blue */}
        <div className="flex flex-col items-center">
          <button
            className={`w-14 h-14 rounded-full flex items-center justify-center mb-2 shadow-sm hover:shadow-md transition-all ${transactionInProgress ? 'opacity-50 cursor-not-allowed' : ''}`}
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
              width="20"
              height="20"
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

        {/* Receive Button - Green/Blue */}
        <div className="flex flex-col items-center">
          <button
            className={`w-14 h-14 rounded-full flex items-center justify-center mb-2 shadow-sm hover:shadow-md transition-all ${transactionInProgress ? 'opacity-50 cursor-not-allowed' : ''}`}
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
              width="20"
              height="20"
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

      {/* Spend Your Change Section */}
      <div className="mt-8 rounded-2xl p-2 text-white">
        <p className="text-black font-semibold text-center">
          Spend Your Change
        </p>
        <p className="text-gray-500 text-sm text-center">
          To pay for bills, airtime, and event tickets
        </p>
        <button
          className="w-full py-2 bg-[#0136c0] text-white rounded-xl font-semibold hover:bg-[#012da0] transition border border-white/30"
          onClick={() => alert("Spend feature demo - This is a demo.")}
        >
          Spend Now
        </button>
      </div>

      {/* Transaction Status Indicator */}
      {transactionInProgress && (
        <div className="mt-4 p-2 bg-blue-50 rounded-lg">
          <p className="text-blue-600 text-sm text-center">
            {device === 'iphone' ? 'Sending to Android...' : 'Sending to iPhone...'}
          </p>
        </div>
      )}
    </div>
  );

  // Receive screen component (reused for both iPhone and Android)
  const renderReceiveScreen = (device) => (
    <div className="h-full bg-[#f8f9fb] p-4">
      {/* Header with Back to Home button */}
      <div className="flex justify-between items-center mb-4">
        <button
          className="text-blue-600 font-medium flex items-center"
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
        <h3 className="text-xl font-bold text-gray-800">
          Receive Coupons
        </h3>
        <div className="w-16"></div> {/* Spacer for alignment */}
      </div>

      <p className="text-center text-gray-500 mb-2 text-sm font-sm">
        SCAN THIS CODE TO RECEIVE COUPONS
      </p>

      {/* QR Code Container - Centered with proper sizing */}
      <div className="mb-5 flex justify-center">
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
          {/* QR Code with reduced but still scannable size */}
          <div className="w-40 h-40 flex items-center justify-center mx-auto">
            <div className="relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="160"
                height="160"
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
      </div>

      <p className="text-center text-gray-600 mb-3 text-sm font-sm tracking-wide">
        hold this code to the scanner
      </p>

      <div className="flex justify-center">
        <button
          className="mx-11 py-3 text-blue-600 font-semi text-center"
          onClick={() => alert("View Transactions - This is a demo.")}
        >
          View Transactions
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f8f9fb] text-gray-800">
      <Header />

      {/* Main Content */}
      <div className="pt-20 pb-16 px-4 max-w-7xl mx-auto">
        {/* Page Header with Back Button */}
        <div className="text-center mb-12 relative">
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
            <span className="ml-2">Back to Home</span>
          </button>

          <h1 className="text-4xl font-black text-black mb-4">
            Live Demo - Send Coupons
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Experience how MyChangeX revolutionizes digital coupon transactions
            across different devices
          </p>
        </div>

        {/* Demo Content */}
        <div className="mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* iPhone - Sender - Using screens from MyChangeXFullScreen */}
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
                <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-24 h-6 bg-black rounded-full z-20" />
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
                      {/* WiFi Icon */}
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

                      {/* Battery Icon with Green Fill */}
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
                  
                  {/* Phone Screen Content */}
                  <div className="pt-10 h-full overflow-hidden">
                    <motion.div
                      key={activeScreen}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="h-full"
                    >
                      {activeScreen === 0 && (
                        <div className="h-full flex flex-col items-center justify-center bg-[#f8f9fb] p-6">
                          <div className="flex-1 flex items-center justify-center">
                            <div className="w-28 h-28 bg-[#0136c0] rounded-full flex items-center justify-center">
                              <p className="text-white text-1xl font-medium">MyChangeX</p>
                            </div>
                          </div>
                          <div className="mb-8">
                            <motion.div
                              className="w-8 h-8 rounded-full border-2 border-[#0136c0] border-t-transparent"
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            />
                          </div>
                          <div className="mb-16">
                            <h1 className="text-gray-500 text-sm">Loading...</h1>
                          </div>
                        </div>
                      )}
                      {activeScreen === 1 && renderHomeScreen('iphone')}
                      {activeScreen === 2 && renderReceiveScreen('iphone')}
                    </motion.div>
                  </div>

                  {/* iPhone Home Indicator */}
                  <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-0.5 bg-gray-800/30 rounded-full"></div>
                </div>
              </div>

              {/* Screen Controls */}
              <div className="flex space-x-4 mt-4">
                <button
                  className={`px-4 py-2 rounded-lg ${activeScreen === 1 ? 'bg-[#0136c0] text-white' : 'bg-gray-200 text-gray-700'}`}
                  onClick={() => setActiveScreen(1)}
                >
                  Home Screen
                </button>
                <button
                  className={`px-4 py-2 rounded-lg ${activeScreen === 2 ? 'bg-[#0136c0] text-white' : 'bg-gray-200 text-gray-700'}`}
                  onClick={() => setActiveScreen(2)}
                >
                  Receive Screen
                </button>
              </div>
            </div>

            {/* Android - Receiver - Now with the same home/send/receive functionality */}
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
                  
                  <div className="pt-4 px-4 flex justify-center items-center text-black text-xs space-x-20">
                    <div className="font-semibold">9:41</div>
                    <div className="w-4 h-4 bg-gray-600 rounded-full" />
                    <div className="flex items-center space-x-1">
                      <div className="w-5 h-3 bg-gray-500 rounded-full" />
                      <span className="text-xs">4G</span>
                    </div>
                  </div>

                  {/* Android Screen Content */}
                  <div className="h-full overflow-hidden">
                    <motion.div
                      key={androidActiveScreen}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="h-full"
                    >
                      {androidActiveScreen === 0 && (
                        <div className="h-full flex flex-col items-center justify-center bg-[#f8f9fb] p-6">
                          <div className="flex-1 flex items-center justify-center">
                            <div className="w-28 h-28 bg-[#0136c0] rounded-full flex items-center justify-center">
                              <p className="text-white text-1xl font-medium">MyChangeX</p>
                            </div>
                          </div>
                          <div className="mb-8">
                            <motion.div
                              className="w-8 h-8 rounded-full border-2 border-[#0136c0] border-t-transparent"
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            />
                          </div>
                          <div className="mb-16">
                            <h1 className="text-gray-500 text-sm">Loading...</h1>
                          </div>
                        </div>
                      )}
                      {androidActiveScreen === 1 && renderHomeScreen('android')}
                      {androidActiveScreen === 2 && renderReceiveScreen('android')}
                    </motion.div>
                  </div>
                </div>

                {/* Android Navigation */}
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gray-600 rounded-full" />
              </div>

              {/* Android Screen Controls */}
              <div className="flex space-x-4 mt-4">
                <button
                  className={`px-4 py-2 rounded-lg ${androidActiveScreen === 1 ? 'bg-[#01c853] text-white' : 'bg-gray-200 text-gray-700'}`}
                  onClick={() => setAndroidActiveScreen(1)}
                >
                  Home Screen
                </button>
                <button
                  className={`px-4 py-2 rounded-lg ${androidActiveScreen === 2 ? 'bg-[#01c853] text-white' : 'bg-gray-200 text-gray-700'}`}
                  onClick={() => setAndroidActiveScreen(2)}
                >
                  Receive Screen
                </button>
              </div>
            </div>
          </div>

          {/* Demo Instructions */}
          <div className="mt-8 p-6 bg-blue-50 rounded-xl max-w-2xl mx-auto">
            <h3 className="text-lg font-bold text-blue-800 mb-3">Demo Instructions:</h3>
            <ul className="text-blue-700 space-y-2">
              <li>• Click <strong>Send</strong> on iPhone → Android automatically shows Receive screen</li>
              <li>• Click <strong>Send</strong> on Android → iPhone automatically shows Receive screen</li>
              <li>• Click <strong>Receive</strong> on either device to show QR code</li>
              <li>• Use the screen control buttons to manually switch screens</li>
            </ul>
          </div>
        </div>

        {/* CTA Section */}
        <div className="rounded-lg p-8 text-center mb-12">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            Ready to Experience MyChangeX?
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Join thousands of users who have revolutionized their digital transactions with our secure and intuitive platform.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              className="px-8 py-3  text-[#0136c0] rounded-lg font-semibold "
              onClick={() => alert("Download app - This is a demo.")}
            >
              Download App
            </button>
            <button
              className="px-8 py-3  text-gray-800 rounded-lg font-semibold "
              onClick={() => navigate("/")}
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default DemoPage;