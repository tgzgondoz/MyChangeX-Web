import React, { useState, useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import Header from "./Header";
import Footer from "./Footer";

// Export icons for Header
export const WalletIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
    <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
    <path d="M18 12a2 2 0 0 0 0 4h4v-4Z" />
  </svg>
);

export const SendIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);

export const ScanIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M3 7V5a2 2 0 0 1 2-2h2" />
    <path d="M17 3h2a2 2 0 0 1 2 2v2" />
    <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
    <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
    <line x1="7" y1="12" x2="17" y2="12" />
  </svg>
);

const MyChangeXFullScreen = () => {
  const [activeScreen, setActiveScreen] = useState(0); // 0: splash, 1: home, 2: receive
  const [balance, setBalance] = useState(0.77);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const textContainerRef = useRef(null);
  const phoneRef = useRef(null);
  const controls = useAnimation();

  const features = [
    {
      title: "Digital Change Revolution",
      description:
        "MyChangeX was born to solve Zimbabwe's small change problem. We digitize physical change, making every coin and note work for you in the digital economy.",
      icon: "🔄",
      color: "text-blue-600",
    },
    {
      title: "Complete Financial Ecosystem",
      description:
        "Beyond change, we've built a full financial platform. Send money instantly, pay bills, save securely, and access micro-loans - all in one app.",
      icon: "💼",
      color: "text-emerald-600",
    },
    {
      title: "Vendor & Consumer Friendly",
      description:
        "Designed for everyone. Vendors get instant digital change for customers. Consumers store change that grows through our savings features.",
      icon: "🏪",
      color: "text-purple-600",
    },
    {
      title: "The Future of Money",
      description:
        "We're building more than an app - we're creating Zimbabwe's financial future. Where every transaction is seamless, secure, and empowering.",
      icon: "🚀",
      color: "text-orange-600",
    },
  ];

  // Static QR code pattern (consistent, no animation)
  const qrPattern = [
    [1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 0, 1, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1],
    [1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1],
    [1, 0, 1, 1, 1, 0, 1, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 0],
    [1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 1],
    [1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 1, 1, 0, 0, 1],
    [1, 0, 1, 1, 1, 0, 1, 0, 0, 1, 1, 1, 0, 0, 1, 0, 1],
    [1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 0, 1, 1, 1, 0, 1, 0],
    [1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1],
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (textContainerRef.current) {
        const scrollTop = textContainerRef.current.scrollTop;
        const scrollHeight =
          textContainerRef.current.scrollHeight -
          textContainerRef.current.clientHeight;
        const progress = scrollHeight > 0 ? scrollTop / scrollHeight : 0;
        setScrollProgress(progress);

        // Change phone screen based on scroll progress
        const screenIndex = Math.floor(progress * 2.99); // 0, 1, or 2
        setActiveScreen(screenIndex);

        // Animate phone based on scroll
        controls.start({
          y: -progress * 100,
          transition: { type: "spring", stiffness: 300 },
        });
      }
    };

    const container = textContainerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, [controls]);

  // Loading progress animation for splash screen
  useEffect(() => {
    if (activeScreen === 0) {
      const interval = setInterval(() => {
        setLoadingProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 1;
        });
      }, 30);

      return () => clearInterval(interval);
    } else {
      setLoadingProgress(0);
    }
  }, [activeScreen]);

  const renderSplashScreen = () => (
    <div className="h-full flex flex-col items-center justify-center bg-[#f8f9fb] p-6">
      {/* Circular blue background with white text - CENTERED */}
      <div className="flex-1 flex items-center justify-center">
        <div className="w-24 h-24 bg-[#0136c0] rounded-full flex items-center justify-center">
          <p className="text-white text-1xl font-medium">MyChangeX</p>
        </div>
      </div>

      {/* Circular progress indicator */}
      <div className="mb-8">
        <motion.div
          className="w-8 h-8 rounded-full border-2 border-[#0136c0] border-t-transparent"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Loading text */}
      <div className="mb-16">
        <h1 className="text-gray-500 text-sm">Loading...</h1>
      </div>
    </div>
  );

  const renderHomeScreen = () => (
    <div className="h-full bg-[#f8f9fb] p-4">
      {/* Header with user info */}
      <div className="mb-4">
        <h2 className="text-xl font-bold text-black">Tatenda</h2>
        <p className="text-gray-500 text-sm">+263 00 000 2506</p>
      </div>

      {/* Balance Section */}
      <div className="mb-6 bg-white rounded-2xl p-4 shadow-sm border border-gray-200">
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
          <button className="w-14 h-14 bg-[#0136c0] rounded-full flex items-center justify-center mb-2 shadow-sm hover:shadow-md transition-all">
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

        {/* Receive Button - Green */}
        <div className="flex flex-col items-center">
          <button className="w-14 h-14 bg-[#01c853] rounded-full flex items-center justify-center mb-2 shadow-sm hover:shadow-md transition-all">
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
      <div className="mt-8  rounded-2xl p-2 text-white">
        <p className="text-black font-semibold text-center ">
          Spend Your Change
        </p>
        <p className="text-gray-500 text-sm text-center ">
          To pay for bills, airtime, and event tickets
        </p>
        <button className="w-full py-2  bg-[#0136c0]  text-white rounded-xl font-semibold hover:bg-white/30 transition border border-white/30">
          Spend Now
        </button>
      </div>
    </div>
  );

  const renderReceiveScreen = () => (
    <div className="h-full bg-[#f8f9fb] p-4">
      <h3 className="text-xl font-bold mb-4 text-center text-gray-800">
        Receive Coupons
      </h3>

      <p className="text-center text-gray-500 mb-2 text-sm font-sm ">
        SCAN THIS CODE TO RECEIVE COUPONS
      </p>

      {/* QR Code Container - Centered with QR icon */}
      <div className="mb-5">
        <div className="bg-white p-5 rounded-2xl shadow-md border border-gray-200 mx-auto max-w-xs">
          <div className="w-full aspect-square flex items-center justify-center  ">
            {/* QR Code Icon with enhanced design */}
            <div className="relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="120"
                height="120"
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

              {/* Subtle animation effect */}
              <motion.div
                className="absolute inset-0 border-2 border-blue-200 rounded-lg"
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <p className="text-center text-gray-600 mb-3 text-sm font-sm tracking-wide">
        hold this code to the scanner
      </p>

      <button className="mx-11 py-8  text-blue-600 font-semi  text-center ">
        View Transactions
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f8f9fb] text-gray-800 overflow-hidden">
      <Header />

      {/* Main Split Layout */}
      <div className="flex min-h-screen pt-16">
        {/* Left Side - Scrolling Text Content */}
        <div
          ref={textContainerRef}
          className="w-1/2 p-8 pr-16 overflow-y-auto scrollbar-hide"
          style={{ height: "calc(100vh - 64px)" }}
        >
          <div className="max-w-2xl">
            {/* Hero Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-12"
            >
              <h1 className="text-5xl font-bold leading-tight mb-6 text-black">
                The Future of Money is Ours
              </h1>
              <div className="mb-8">
                <p className="text-lg text-black leading-relaxed">
                  MyChangeX is a revolutionary fintech super-app born out of the
                  need to solve the longstanding problem of small change in
                  Zimbabwe. Initially designed to digitize and store change for
                  consumers and vendors, the platform has evolved into a
                  full-scale financial ecosystem, enabling transactions,
                  micro-payments, savings, donations, digital vouchers, and
                  more.
                </p>
              </div>
            </motion.div>

            {/* Features List */}
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="mb-12 group"
              >
                <div className="mb-4">
                  <h2 className={`text-2xl font-bold text-black`}>
                    {feature.title}
                  </h2>
                </div>
                <p className="text-base text-black leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}

            {/* Call to Action */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="pt-8"
            >
              <h3 className="text-xl font-bold mb-4 text-black">
                Ready to Join the Revolution?
              </h3>
              <p className="text-black mb-6">
                Download MyChangeX today and experience the future of digital
                finance.
              </p>
              <div className="flex space-x-4">
                <button className="px-6 py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition">
                  Get Started Free
                </button>
                <button className="px-6 py-3 border border-black text-black rounded-lg font-semibold hover:bg-gray-100 transition">
                  Watch Demo
                </button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Right Side - Phone Mockup */}
        <div className="w-1/2 flex items-center justify-center p-8">
          <motion.div ref={phoneRef} animate={controls} className="relative">
            {/* iPhone Frame - Silver/Gray with more realistic styling */}
            <div className="relative w-72 h-[560px] bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 rounded-[2.5rem] shadow-2xl overflow-hidden border-[10px] border-gray-800">
              {/* iPhone Dynamic Island */}
              <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-24 h-6 bg-black rounded-full z-20 flex items-center justify-center">
                <div className="absolute right-2 w-3 h-3 bg-gray-600 rounded-full"></div>
              </div>

              {/* iPhone Bezel Shine Effect */}
              <div className="absolute inset-0 rounded-[2.5rem] pointer-events-none border-[1px] border-gray-700/50"></div>

              {/* iPhone Side Buttons */}
              <div className="absolute -left-1 top-24 w-1 h-8 bg-gray-800 rounded-r-sm"></div>
              <div className="absolute -left-1 top-40 w-1 h-8 bg-gray-800 rounded-r-sm"></div>
              <div className="absolute -right-1 top-32 w-1 h-12 bg-gray-800 rounded-l-sm"></div>

              {/* iPhone Volume Buttons */}
              <div className="absolute -left-1 top-64 w-1 h-10 bg-gradient-to-b from-gray-800 to-gray-700 rounded-r-sm"></div>
              <div className="absolute -left-1 top-80 w-1 h-10 bg-gradient-to-b from-gray-800 to-gray-700 rounded-r-sm"></div>

              {/* iPhone Screen */}
              <div className="absolute inset-2 bg-gradient-to-br from-gray-50 to-white rounded-[2rem] overflow-hidden">
                {/* Status Bar - iPhone Style */}
                <div className="absolute top-2 left-0 right-0 px-6 flex justify-between items-center text-black text-[11px] font-medium">
                  <div className="flex items-center space-x-1">
                    <div className="text-xs font-semibold">9:41</div>
                  </div>
                  <div className="flex items-center space-x-0.5">
                    <span className="font-bold">100%</span>
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
                    {activeScreen === 0 && renderSplashScreen()}
                    {activeScreen === 1 && renderHomeScreen()}
                    {activeScreen === 2 && renderReceiveScreen()}
                  </motion.div>
                </div>

                {/* iPhone Home Indicator */}
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-0.5 bg-gray-800/30 rounded-full"></div>
              </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute -left-16 top-1/2 transform -translate-y-1/2">
              <div className="flex flex-col items-center">
                <div className="h-48 w-px bg-gradient-to-b from-blue-500 via-indigo-500 to-transparent">
                  <motion.div
                    className="w-2 h-2 bg-blue-500 rounded-full -ml-0.5"
                    animate={{ y: scrollProgress * 192 }}
                  ></motion.div>
                </div>
                <span className="mt-4 text-xs text-gray-500 rotate-90 whitespace-nowrap">
                  Scroll to explore
                </span>
              </div>
            </div>

            {/* Screen Indicator */}
            <div className="absolute -right-16 top-1/2 transform -translate-y-1/2">
              <div className="flex flex-col items-center space-y-4">
                {["Splash", "Home", "Receive"].map((label, index) => (
                  <div key={label} className="flex flex-col items-center">
                    <div
                      className={`w-2 h-2 rounded-full transition-all ${
                        activeScreen === index
                          ? "bg-blue-500 scale-125"
                          : "bg-gray-400"
                      }`}
                    />
                    <span
                      className={`text-xs mt-1 transition-all ${
                        activeScreen === index
                          ? "text-blue-600 font-medium"
                          : "text-gray-500"
                      }`}
                    >
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default MyChangeXFullScreen;
