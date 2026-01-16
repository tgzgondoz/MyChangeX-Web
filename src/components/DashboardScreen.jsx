import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import Header from './Header';
import Footer from './Footer';

// Card Icons - Export these so Header can use WalletIcon
export const CardIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
    <line x1="1" y1="10" x2="23" y2="10"/>
  </svg>
);

export const WalletIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/>
    <path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/>
    <path d="M18 12a2 2 0 0 0 0 4h4v-4Z"/>
  </svg>
);

export const SendIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="22" y1="2" x2="11" y2="13"/>
    <polygon points="22 2 15 22 11 13 2 9 22 2"/>
  </svg>
);

export const ScanIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 7V5a2 2 0 0 1 2-2h2"/>
    <path d="M17 3h2a2 2 0 0 1 2 2v2"/>
    <path d="M21 17v2a2 2 0 0 1-2 2h-2"/>
    <path d="M7 21H5a2 2 0 0 1-2-2v-2"/>
    <line x1="7" y1="12" x2="17" y2="12"/>
  </svg>
);

const MyChangeXFullScreen = () => {
  const [activeScreen, setActiveScreen] = useState(0); // 0: splash, 1: home, 2: receive
  const [balance, setBalance] = useState(0.77);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [loading, setLoading] = useState(true);
  const textContainerRef = useRef(null);
  const phoneRef = useRef(null);
  const controls = useAnimation();

  const features = [
    {
      title: "Digital Change Revolution",
      description: "MyChangeX was born to solve Zimbabwe's small change problem. We digitize physical change, making every coin and note work for you in the digital economy.",
      icon: "🔄",
      color: "text-blue-600"
    },
    {
      title: "Complete Financial Ecosystem",
      description: "Beyond change, we've built a full financial platform. Send money instantly, pay bills, save securely, and access micro-loans - all in one app.",
      icon: "💼",
      color: "text-emerald-600"
    },
    {
      title: "Vendor & Consumer Friendly",
      description: "Designed for everyone. Vendors get instant digital change for customers. Consumers store change that grows through our savings features.",
      icon: "🏪",
      color: "text-purple-600"
    },
    {
      title: "The Future of Money",
      description: "We're building more than an app - we're creating Zimbabwe's financial future. Where every transaction is seamless, secure, and empowering.",
      icon: "🚀",
      color: "text-orange-600"
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (textContainerRef.current) {
        const scrollTop = textContainerRef.current.scrollTop;
        const scrollHeight = textContainerRef.current.scrollHeight - textContainerRef.current.clientHeight;
        const progress = scrollHeight > 0 ? scrollTop / scrollHeight : 0;
        setScrollProgress(progress);
        
        // Change phone screen based on scroll progress
        const screenIndex = Math.floor(progress * 2.99); // 0, 1, or 2
        setActiveScreen(screenIndex);
        
        // Animate phone based on scroll
        controls.start({
          y: -progress * 100,
          transition: { type: "spring", stiffness: 300 }
        });
      }
    };

    const container = textContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [controls]);

  useEffect(() => {
    // Simulate loading for splash screen
    if (activeScreen === 0) {
      setLoading(true);
      const timer = setTimeout(() => {
        setLoading(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [activeScreen]);

  const renderSplashScreen = () => (
    <div className="h-full flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-black">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold mb-4">MyChangeX</h1>
        <div className="flex justify-center space-x-2 mt-8">
          <motion.div
            animate={{ opacity: loading ? 1 : 0 }}
            className="h-2 w-2 bg-blue-500 rounded-full"
          />
          <motion.div
            animate={{ opacity: loading ? 0.6 : 0 }}
            className="h-2 w-2 bg-blue-500 rounded-full"
          />
          <motion.div
            animate={{ opacity: loading ? 0.3 : 0 }}
            className="h-2 w-2 bg-blue-500 rounded-full"
          />
        </div>
        {!loading && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8"
          >
            <p className="text-gray-400">Loading...</p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );

  const renderHomeScreen = () => (
    <div className="h-full bg-gradient-to-b from-gray-900 to-black p-6">
      {/* Header with user info */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold">Tatenda</h2>
        <p className="text-gray-400">+263 78 324 2506</p>
      </div>

      {/* Balance Section */}
      <div className="bg-gray-800/50 rounded-2xl p-6 mb-6">
        <div className="flex items-center mb-2">
          <input 
            type="checkbox" 
            className="mr-3 w-5 h-5 rounded-full border-2 border-gray-600"
            defaultChecked={false}
          />
          <span className="text-gray-300">Total Balance</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-4xl font-bold">${balance.toFixed(2)}</h3>
            <p className="text-gray-400 text-sm">USD</p>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="text-sm text-gray-400">Updated</span>
          </div>
        </div>
      </div>

      {/* Send/Receive Buttons */}
      <div className="flex space-x-4 mb-8">
        <button className="flex-1 py-4 bg-blue-600 rounded-xl font-semibold hover:bg-blue-700 transition">
          Send
        </button>
        <button className="flex-1 py-4 border border-gray-600 rounded-xl font-semibold hover:bg-gray-800 transition">
          Receive
        </button>
      </div>

      {/* Spend Your Change Section */}
      <div className="bg-gradient-to-r from-blue-600/20 to-indigo-600/20 rounded-2xl p-6 border border-blue-500/20">
        <h3 className="text-xl font-bold mb-2">Spend Your Change</h3>
        <p className="text-gray-300 mb-6">
          To pay for bills, airtime, and event tickets
        </p>
        <button className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl font-semibold hover:opacity-90 transition">
          Spend Now
        </button>
      </div>
    </div>
  );

  const renderReceiveScreen = () => (
    <div className="h-full bg-gradient-to-b from-gray-900 to-black p-6">
      <h2 className="text-2xl font-bold mb-8 text-center">Receive Coupons</h2>
      
      {/* QR Code Container */}
      <div className="bg-white p-8 rounded-2xl mb-6">
        <div className="aspect-square bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center">
          {/* Simulated QR Code Pattern */}
          <div className="grid grid-cols-9 gap-1">
            {Array.from({ length: 81 }).map((_, i) => (
              <div
                key={i}
                className={`w-3 h-3 rounded-sm ${
                  Math.random() > 0.5 ? 'bg-black' : 'bg-transparent'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
      
      <p className="text-center text-gray-300 mb-6">
        SCAN THIS CODE TO RECEIVE COUPONS
      </p>
      
      <div className="bg-gray-800/50 rounded-xl p-4 mb-8">
        <p className="text-center text-gray-400">
          Hold this code to the scanner
        </p>
      </div>
      
      <button className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl font-semibold hover:opacity-90 transition">
        View Transactions
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white overflow-hidden">
      <Header />
      
      {/* Main Split Layout */}
      <div className="flex min-h-screen pt-20">
        {/* Left Side - Scrolling Text Content */}
        <div 
          ref={textContainerRef}
          className="w-1/2 p-12 pr-24 overflow-y-auto scrollbar-hide"
          style={{ height: 'calc(100vh - 80px)' }}
        >
          <div className="max-w-2xl">
            {/* Hero Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-16"
            >
              <div className="inline-flex items-center px-4 py-2 bg-blue-500/10 rounded-full mb-6">
                <span className="text-blue-400">🚀 Revolutionizing Fintech</span>
              </div>
              <h1 className="text-6xl font-bold leading-tight mb-6">
                The Future of 
                <span className="bg-gradient-to-r from-blue-400 to-indigo-300 bg-clip-text text-transparent"> Money</span> 
                is Ours
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                Born in Zimbabwe to solve the small change problem, MyChangeX has evolved into a complete financial ecosystem. We're building the future of digital finance for Africa and beyond.
              </p>
            </motion.div>

            {/* Features List */}
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="mb-16 group"
              >
                <div className="flex items-start mb-4">
                  <div className="text-3xl mr-4 group-hover:scale-110 transition-transform">
                    {feature.icon}
                  </div>
                  <h2 className={`text-3xl font-bold ${feature.color}`}>
                    {feature.title}
                  </h2>
                </div>
                <p className="text-lg text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
                <div className="h-px bg-gradient-to-r from-gray-700 to-transparent mt-8"></div>
              </motion.div>
            ))}

            {/* Stats Section */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="grid grid-cols-2 gap-8 mb-16"
            >
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl">
                <div className="text-4xl font-bold text-blue-400">50K+</div>
                <div className="text-gray-400">Active Users</div>
              </div>
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl">
                <div className="text-4xl font-bold text-emerald-400">$2M+</div>
                <div className="text-gray-400">Processed</div>
              </div>
            </motion.div>

            {/* Call to Action */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-r from-blue-600/20 to-indigo-600/20 p-8 rounded-2xl border border-blue-500/20"
            >
              <h3 className="text-2xl font-bold mb-4">Ready to Join the Revolution?</h3>
              <p className="text-gray-300 mb-6">
                Download MyChangeX today and experience the future of digital finance. Send, receive, save, and grow your money seamlessly.
              </p>
              <div className="flex space-x-4">
                <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-lg font-semibold hover:opacity-90 transition">
                  Get Started Free
                </button>
                <button className="px-8 py-3 border border-gray-600 rounded-lg font-semibold hover:bg-gray-800 transition">
                  Watch Demo
                </button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Right Side - Phone Mockup */}
        <div className="w-1/2 flex items-center justify-center p-12">
          <motion.div
            ref={phoneRef}
            animate={controls}
            className="relative"
          >
            {/* Phone Frame */}
            <div className="relative w-80 h-[600px] bg-gradient-to-b from-gray-800 to-gray-900 rounded-[3rem] shadow-2xl overflow-hidden border-[14px] border-gray-900">
              {/* Phone Notch */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-40 h-6 bg-gray-900 rounded-b-2xl z-10"></div>
              
              {/* Phone Status Bar */}
              <div className="absolute top-6 left-0 right-0 px-6 flex justify-between items-center text-white/80 text-sm">
                <div>9:41</div>
                <div className="flex items-center space-x-1">
                  <div className="w-4 h-4 bg-white rounded-full"></div>
                  <span>MyChangeX</span>
                </div>
              </div>

              {/* Phone Screen Content */}
              <div className="pt-16 h-full overflow-hidden">
                <motion.div
                  key={activeScreen}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="h-full"
                >
                  {activeScreen === 0 && renderSplashScreen()}
                  {activeScreen === 1 && renderHomeScreen()}
                  {activeScreen === 2 && renderReceiveScreen()}
                </motion.div>
              </div>

              {/* Phone Home Indicator */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-white/30 rounded-full"></div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute -left-20 top-1/2 transform -translate-y-1/2">
              <div className="flex flex-col items-center">
                <div className="h-64 w-px bg-gradient-to-b from-blue-500 via-indigo-500 to-transparent">
                  <motion.div 
                    className="w-2 h-2 bg-blue-400 rounded-full -ml-0.5"
                    animate={{ y: scrollProgress * 256 }}
                  ></motion.div>
                </div>
                <span className="mt-4 text-sm text-gray-400 rotate-90 whitespace-nowrap">Scroll to explore</span>
              </div>
            </div>

            {/* Screen Indicator */}
            <div className="absolute -right-20 top-1/2 transform -translate-y-1/2">
              <div className="flex flex-col items-center space-y-4">
                {['Splash', 'Home', 'Receive'].map((label, index) => (
                  <div key={label} className="flex flex-col items-center">
                    <div
                      className={`w-3 h-3 rounded-full transition-all ${
                        activeScreen === index 
                          ? 'bg-blue-500 scale-125' 
                          : 'bg-gray-600'
                      }`}
                    />
                    <span className={`text-xs mt-2 transition-all ${
                      activeScreen === index 
                        ? 'text-blue-400 font-medium' 
                        : 'text-gray-500'
                    }`}>
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer/>
    </div>
  );
};

export default MyChangeXFullScreen;