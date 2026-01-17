import React, { useState, useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import { useNavigate } from "react-router-dom"; // Add this import
import Header from "./Header";
import Footer from "./Footer";
// Removed DemoScreen import since we're using navigation

// Export icons for Header (keep these)
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
  const navigate = useNavigate(); // Initialize navigation

  const features = [
    {
      title: "Digital Change Revolution",
      description:
        "MyChangeX was born to solve Zimbabwe's small change problem. We digitize physical change, making every coin and note work for you in the digital economy.",
    },
    {
      title: "Complete Financial Ecosystem",
      description:
        "Beyond change, we've built a full financial platform. Send money instantly, pay bills, save securely, and access micro-loans - all in one app.",
    },
    {
      title: "Vendor & Consumer Friendly",
      description:
        "Designed for everyone. Vendors get instant digital change for customers. Consumers store change that grows through our savings features.",
    },
    {
      title: "The Future of Money",
      description:
        "We're building more than an app - we're creating Zimbabwe's financial future. Where every transaction is seamless, secure, and empowering.",
    },
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
        <div className="w-28 h-28 bg-[#0136c0] rounded-full flex items-center justify-center">
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
      <div className="mt-8 rounded-2xl p-2 text-white">
        <p className="text-black font-semibold text-center">
          Spend Your Change
        </p>
        <p className="text-gray-500 text-sm text-center">
          To pay for bills, airtime, and event tickets
        </p>
        <button className="w-full py-2 bg-[#0136c0] text-white rounded-xl font-semibold hover:bg-[#012da0] transition border border-white/30">
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

      <button className="mx-11 py-8 text-blue-600 font-semi text-center">
        View Transactions
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f8f9fb] text-gray-800 overflow-hidden">
      <Header />

      {/* Main Split Layout */}
      <div className="flex min-h-screen pt-16">
        {/* Left Side - Black & White Text Content with Font Size 11/12 */}
        <div
          ref={textContainerRef}
          className="w-1/2 p-8 pr-16 overflow-y-auto"
          style={{ height: "calc(100vh - 64px)" }}
        >
          {/* Custom Scrollbar Styles */}
          <style jsx>{`
            /* For Webkit browsers (Chrome, Safari, Edge) */
            div::-webkit-scrollbar {
              width: 8px;
            }

            div::-webkit-scrollbar-track {
              background: transparent;
            }

            div::-webkit-scrollbar-thumb {
              background: rgba(0, 0, 0, 0.1);
              border-radius: 10px;
              border: 2px solid transparent;
              background-clip: padding-box;
              transition: all 0.3s ease;
            }

            div::-webkit-scrollbar-thumb:hover {
              background: rgba(0, 0, 0, 0.2);
              border: 1px solid transparent;
              background-clip: padding-box;
            }

            /* For Firefox */
            div {
              scrollbar-width: thin;
              scrollbar-color: rgba(0, 0, 0, 0.1) transparent;
            }

            /* Smooth scrolling */
            div {
              scroll-behavior: smooth;
            }
          `}</style>

          <div className="max-w-2xl mx-auto">
            {/* Hero Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-14"
            >
              <div className="relative mb-7">
                <div className="absolute -left-5 top-0 bottom-0 w-0.5 bg-gradient-to-b from-black to-transparent"></div>
                <h1 className="text-4xl font-black leading-tight mb-5 text-black tracking-tight">
                  The Future of Money is
                  <span className="block text-black">Ours to Create</span>
                </h1>
              </div>

              <div className="mb-7">
                <p className="text-sm leading-relaxed mb-5 text-[#747474]">
                  MyChangeX is a revolutionary fintech super-app born out of the
                  critical need to solve Zimbabwe's longstanding problem with
                  physical small change. We transform coins and notes into
                  digital assets that work harder for you in today's economy.
                </p>

                <div className="border-l-3 border-black pl-4 py-2 my-5">
                  <p className="text-sm font-medium text-black italic">
                    "Digitizing change isn't just about convenience—it's about
                    empowering every Zimbabwean to participate fully in the
                    digital economy."
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Mission Statement */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="mb-14 relative"
            >
              <h2 className="text-base font-bold mb-5 text-black relative">
                Our Mission
                <div className="w-14 h-0.5 bg-black mt-1.5"></div>
              </h2>
              <p className="text-sm leading-relaxed text-[#747474] space-y-3">
                <span className="block">
                  We're building more than an app—we're creating Zimbabwe's
                  financial infrastructure for the 21st century. From street
                  vendors to corporate offices, MyChangeX provides the tools for
                  seamless, secure, and empowering financial interactions.
                </span>
                <span className="block font-medium">
                  Our platform has evolved from a simple change digitization
                  tool into a comprehensive financial ecosystem that supports
                  transactions, micro-payments, savings, donations, digital
                  vouchers, and much more.
                </span>
              </p>
            </motion.div>

            {/* Features List */}
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="mb-14 group relative"
              >
                <div className="mb-4">
                  <h2 className="text-base font-bold mb-3 text-black">
                    {feature.title}
                  </h2>
                </div>

                <p className="text-sm leading-relaxed text-[#747474]">
                  {feature.description}
                </p>

                {/* Subtle decorative line */}
                <div className="mt-5 pt-5 border-t border-gray-300"></div>
              </motion.div>
            ))}

            {/* Impact Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="mb-14 relative"
            >
              <h2 className="text-base font-bold mb-5 text-black">
                The MyChangeX Impact
                <div className="w-14 h-0.5 bg-black mt-1.5"></div>
              </h2>

              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="mr-3 mt-1">
                    <div className="w-2.5 h-2.5 bg-black rounded-full"></div>
                  </div>
                  <p className="text-sm text-[#747474]">
                    <span className="font-semibold text-black">
                      Financial Inclusion:
                    </span>{" "}
                    Bringing digital financial services to every corner of
                    Zimbabwe
                  </p>
                </div>

                <div className="flex items-start">
                  <div className="mr-3 mt-1">
                    <div className="w-2.5 h-2.5 bg-black rounded-full"></div>
                  </div>
                  <p className="text-sm text-[#747474]">
                    <span className="font-semibold text-black">
                      Economic Empowerment:
                    </span>{" "}
                    Enabling small businesses and individuals to grow their
                    wealth
                  </p>
                </div>

                <div className="flex items-start">
                  <div className="mr-3 mt-1">
                    <div className="w-2.5 h-2.5 bg-black rounded-full"></div>
                  </div>
                  <p className="text-sm text-[#747474]">
                    <span className="font-semibold text-black">
                      Digital Transformation:
                    </span>{" "}
                    Accelerating Zimbabwe's journey toward a cashless economy
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Technology Stack */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="mb-14"
            >
              <h2 className="text-base font-bold mb-5 text-black">
                Built on Trust & Innovation
                <div className="w-14 h-0.5 bg-black mt-1.5"></div>
              </h2>
              <p className="text-sm leading-relaxed text-[#747474] mb-5">
                Our platform combines military-grade security with intuitive
                design. Every transaction is encrypted, every account is
                protected, and every user's privacy is our top priority.
              </p>
              <div className="flex flex-wrap gap-3 mt-4">
                <span className="px-4 py-2 bg-gray-100 text-black rounded-full text-sm font-medium border border-gray-300">
                  Bank-Level Security
                </span>
                <span className="px-4 py-2 bg-gray-100 text-black rounded-full text-sm font-medium border border-gray-300">
                  24/7 Availability
                </span>
                <span className="px-4 py-2 bg-gray-100 text-black rounded-full text-sm font-medium border border-gray-300">
                  Instant Transactions
                </span>
                <span className="px-4 py-2 bg-gray-100 text-black rounded-full text-sm font-medium border border-gray-300">
                  No Hidden Fees
                </span>
              </div>
            </motion.div>

            {/* Call to Action */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="pt-8 mb-20 relative"
            >
              <div className="absolute -left-5 top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent to-black"></div>

              <h3 className="text-base font-bold mb-5 text-black">
                Ready to Join Zimbabwe's Financial Revolution?
              </h3>

              <p className="text-sm text-[#747474] mb-7 leading-relaxed">
                Be part of the movement that's transforming how Zimbabwe handles
                money. From spare change to significant savings, MyChangeX puts
                financial power back in your hands.
              </p>

              <div className="flex space-x-5">
                <button className="px-7 py-3.5 bg-black text-white rounded-lg font-semibold text-sm hover:bg-gray-800 transition-all transform hover:-translate-y-0.5 inline-block text-center">
                  Start Your Journey
                </button>
                
                {/* UPDATED: Navigate to demo page */}
                <button
                  onClick={() => navigate('/demo')}
                  className="px-7 py-3.5 border border-black text-black rounded-lg font-semibold text-sm hover:bg-black hover:text-white transition-all inline-block text-center"
                >
                  Watch Demo
                </button>
              </div>

              <p className="mt-5 text-sm text-gray-600">
                Join over 50,000 Zimbabweans who trust MyChangeX with their
                daily transactions
              </p>
            </motion.div>

            {/* Footer Note */}
            <div className="pt-8 border-t border-gray-300">
              <p className="text-sm text-gray-600 text-center">
                MyChangeX is licensed and regulated by the Reserve Bank of
                Zimbabwe
              </p>
            </div>
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
                      {/* Battery outline */}
                      <rect
                        x="2"
                        y="7"
                        width="18"
                        height="10"
                        rx="2"
                        ry="2"
                        fill="none"
                      />
                      {/* Battery terminal */}
                      <line x1="22" x2="22" y1="10" y2="14" />
                      {/* Green battery fill (full) */}
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

      {/* REMOVED: Modal rendering */}
      {/* {showDemo && <DemoScreen onClose={() => setShowDemo(false)} />} */}

      <Footer />
    </div>
  );
};

export default MyChangeXFullScreen;