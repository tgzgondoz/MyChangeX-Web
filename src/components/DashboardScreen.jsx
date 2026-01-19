import React, { useState, useEffect, useRef } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

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

const MyChangeXFullScreen = () => {
  const [activeScreen, setActiveScreen] = useState(0);
  const [balance, setBalance] = useState(0.77);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [inView, setInView] = useState([]);
  
  const textContainerRef = useRef(null);
  const phoneRef = useRef(null);
  const controls = useAnimation();
  const parallaxRef = useRef(null);
  const elementsRef = useRef([]);
  const navigate = useNavigate();

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

        const screenIndex = Math.floor(progress * 2.99);
        setActiveScreen(screenIndex);

        controls.start({
          y: -progress * 100,
          transition: { type: "spring", stiffness: 300 },
        });
      }
    };

    const container = textContainerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      
      // Parallax effect
      const handleParallaxScroll = () => {
        if (parallaxRef.current && textContainerRef.current) {
          const scrollTop = textContainerRef.current.scrollTop;
          const parallaxSpeed = 0.3;
          parallaxRef.current.style.transform = `translateY(${scrollTop * parallaxSpeed}px)`;
        }
      };
      
      container.addEventListener('scroll', handleParallaxScroll);

      // Intersection Observer for reveal animations
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const id = entry.target.getAttribute('data-animate-id');
              if (id && !inView.includes(id)) {
                setInView(prev => [...prev, id]);
              }
            }
          });
        },
        {
          threshold: 0.1,
          rootMargin: '0px 0px -50px 0px'
        }
      );

      // Observe all elements with data-animate-id
      setTimeout(() => {
        elementsRef.current.forEach(element => {
          if (element) observer.observe(element);
        });
      }, 100);

      return () => {
        container.removeEventListener("scroll", handleScroll);
        container.removeEventListener('scroll', handleParallaxScroll);
        observer.disconnect();
      };
    }
  }, [controls, inView]);

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
    <div className="h-full flex flex-col items-center justify-center bg-[#f8f9fb] p-4">
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

      <div className="mb-8">
        <h1 className="text-gray-500 text-sm">Loading...</h1>
      </div>
    </div>
  );

  const renderHomeScreen = () => (
    <div className="h-full bg-[#f8f9fb] flex flex-col">
      <div className="p-4 flex-1 flex flex-col justify-between">
        {/* Top Section */}
        <div>
          <div className="mb-4">
            <h2 className="text-lg font-bold text-black">Tatenda</h2>
            <p className="text-gray-500 text-xs">+263 00 000 2506</p>
          </div>

          {/* Balance Card - Compact */}
          <div className="mb-5 bg-white rounded-xl p-3 border border-gray-200">
            <div className="flex items-center mb-8">
              <div className="w-3 h-3 border-2 border-gray-400 rounded-full mr-2 flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
              </div>
              <span className="text-xs text-gray-600">Total Balance</span>
            </div>

            <div className="flex items-center justify-between">
              <h3 className="text-4xl font-bold text-black">
                ${balance.toFixed(2)}
              </h3>
              <div className="text-gray-500 text-xs">USD</div>
            </div>

            <div className="flex items-center justify-end mt-1">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1"></div>
              <span className="text-xs text-gray-500">Updated</span>
            </div>
          </div>
        </div>

        {/* Middle Section - Send/Receive Buttons */}
        <div className="flex justify-center space-x-10 mb-4">
          <div className="flex flex-col items-center">
            <button className="w-12 h-12 bg-[#0136c0] rounded-full flex items-center justify-center mb-1 shadow-sm hover:shadow-md transition-all">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
              >
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
            <span className="text-xs text-black font-medium">Send</span>
          </div>

          <div className="flex flex-col items-center">
            <button className="w-12 h-12 bg-[#01c853] rounded-full flex items-center justify-center mb-1 shadow-sm hover:shadow-md transition-all">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
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
            <span className="text-xs text-black font-medium">Receive</span>
          </div>
        </div>

        {/* Bottom Section - Spend Button */}
        <div className="mb-8">
          <p className="text-black font-semibold text-center text-sm mb-2">
            Spend Your Change
          </p>
          <p className="text-gray-600 text-xs text-center mb-4">
            To pay for bills, airtime, and event tickets
          </p>
          <button className="w-full py-2 bg-[#0136c0] text-white rounded-lg font-semibold text-sm hover:bg-[#012da0] transition-all shadow-sm">
            Spend Now
          </button>
        </div>
      </div>
    </div>
  );

  const renderReceiveScreen = () => (
    <div className="h-full bg-[#f8f9fb] p-4 overflow-y-auto">
      <div className="flex flex-col items-center justify-center h-full">
        <h3 className="text-lg font-bold mb-3 text-center text-gray-800">
          Receive Coupons
        </h3>

        <p className="text-center text-gray-500 mb-3 text-xs font-medium">
          SCAN THIS CODE TO RECEIVE COUPONS
        </p>

        <div className="mb-4 flex justify-center">
          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
            <div className="w-32 h-32 flex items-center justify-center mx-auto">
              <div className="relative">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="128"
                  height="128"
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

        <p className="text-center text-gray-600 mb-4 text-xs font-medium tracking-wide">
          hold this code to the scanner
        </p>

        <button className="px-4 py-2 text-blue-600 font-semibold text-center border border-blue-200 rounded-lg hover:bg-blue-50 transition-all text-sm">
          View Transactions
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f8f9fb] text-gray-800 overflow-hidden">
      <Header />

      <div className="flex min-h-screen pt-16">
        {/* Left Side - Text Content with Animations */}
        <div
          ref={textContainerRef}
          className="w-1/2 p-8 pr-16 overflow-y-auto"
          style={{ height: "calc(100vh - 64px)" }}
        >
          <style jsx>{`
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
            div {
              scrollbar-width: thin;
              scrollbar-color: rgba(0, 0, 0, 0.1) transparent;
              scroll-behavior: smooth;
            }
          `}</style>

          <div className="max-w-2xl mx-auto">
            {/* Hero Section with Parallax */}
            <div 
              ref={parallaxRef}
              className="mb-14 transition-transform duration-700 ease-out"
            >
              <SmoothReveal>
                <div className="relative">
                  <div className="absolute -left-5 top-0 bottom-0 w-0.5 bg-gradient-to-b from-black to-transparent"></div>
                  <h1 className="text-4xl font-black leading-tight mb-5 text-black tracking-tight">
                    The Future of Money is
                    <span className="block text-black">Ours to Create</span>
                  </h1>
                </div>
              </SmoothReveal>

              <SmoothReveal delay={0.1}>
                <p className="text-sm leading-relaxed mb-5 text-[#747474]">
                  MyChangeX is a revolutionary fintech super-app born out of the
                  critical need to solve Zimbabwe's longstanding problem with
                  physical small change. We transform coins and notes into
                  digital assets that work harder for you in today's economy.
                </p>
              </SmoothReveal>

              <SmoothReveal delay={0.2}>
                <div className="border-l-3 border-black pl-4 py-2 my-5">
                  <p className="text-sm font-medium text-black italic">
                    "Digitizing change isn't just about convenience—it's about
                    empowering every Zimbabwean to participate fully in the
                    digital economy."
                  </p>
                </div>
              </SmoothReveal>
            </div>

            {/* Mission Statement */}
            <SmoothReveal delay={0.1}>
              <div className="mb-14 relative">
                <h2 className="text-base font-bold mb-5 text-black relative">
                  Our Mission
                  <div className="w-14 h-0.5 bg-black mt-1.5"></div>
                </h2>
                <div className="space-y-3">
                  <p className="text-sm leading-relaxed text-[#747474]">
                    We're building more than an app—we're creating Zimbabwe's
                    financial infrastructure for the 21st century. From street
                    vendors to corporate offices, MyChangeX provides the tools for
                    seamless, secure, and empowering financial interactions.
                  </p>
                  <p className="text-sm leading-relaxed text-[#747474] font-medium">
                    Our platform has evolved from a simple change digitization
                    tool into a comprehensive financial ecosystem that supports
                    transactions, micro-payments, savings, donations, digital
                    vouchers, and much more.
                  </p>
                </div>
              </div>
            </SmoothReveal>

            {/* Features List */}
            {features.map((feature, index) => (
              <SmoothReveal key={index} delay={index * 0.1}>
                <div className="mb-14 group relative">
                  <div className="mb-4">
                    <h2 className="text-base font-bold mb-3 text-black">
                      {feature.title}
                    </h2>
                  </div>

                  <p className="text-sm leading-relaxed text-[#747474]">
                    {feature.description}
                  </p>

                  <div className="mt-5 pt-5 border-t border-gray-300"></div>
                </div>
              </SmoothReveal>
            ))}

            {/* Impact Section */}
            <SmoothReveal delay={0.2}>
              <div className="mb-14 relative">
                <h2 className="text-base font-bold mb-5 text-black">
                  The MyChangeX Impact
                  <div className="w-14 h-0.5 bg-black mt-1.5"></div>
                </h2>

                <div className="space-y-4">
                  {[
                    "Financial Inclusion: Bringing digital financial services to every corner of Zimbabwe",
                    "Economic Empowerment: Enabling small businesses and individuals to grow their wealth",
                    "Digital Transformation: Accelerating Zimbabwe's journey toward a cashless economy"
                  ].map((item, idx) => (
                    <SmoothReveal key={idx} delay={0.2 + idx * 0.1}>
                      <div className="flex items-start">
                        <div className="mr-3 mt-1">
                          <div className="w-2.5 h-2.5 bg-black rounded-full"></div>
                        </div>
                        <p className="text-sm text-[#747474]">
                          <span className="font-semibold text-black">
                            {item.split(":")[0]}:
                          </span>{" "}
                          {item.split(":")[1]}
                        </p>
                      </div>
                    </SmoothReveal>
                  ))}
                </div>
              </div>
            </SmoothReveal>

            {/* Technology Stack */}
            <SmoothReveal delay={0.3}>
              <div className="mb-14">
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
                  {["Bank-Level Security", "24/7 Availability", "Instant Transactions", "No Hidden Fees"].map((tag, idx) => (
                    <SmoothReveal key={tag} delay={0.4 + idx * 0.1}>
                      <span className="px-4 py-2 bg-gray-100 text-black rounded-full text-sm font-medium border border-gray-300">
                        {tag}
                      </span>
                    </SmoothReveal>
                  ))}
                </div>
              </div>
            </SmoothReveal>

            {/* Call to Action */}
            <SmoothReveal delay={0.4}>
              <div className="pt-8 mb-20 relative">
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
                  <button
                    onClick={() => navigate("/demo")}
                    className="px-7 py-3.5 border border-black text-black rounded-lg font-semibold text-sm hover:bg-black hover:text-white transition-all inline-block text-center"
                  >
                    Watch Demo
                  </button>
                </div>

                <SmoothReveal delay={0.5}>
                  <p className="mt-5 text-sm text-gray-600">
                    Join over 50,000 Zimbabweans who trust MyChangeX with their
                    daily transactions
                  </p>
                </SmoothReveal>
              </div>
            </SmoothReveal>

            {/* Footer Note */}
            <SmoothReveal delay={0.5}>
              <div className="pt-8 border-t border-gray-300">
                <p className="text-sm text-gray-600 text-center">
                  MyChangeX is licensed and regulated by the Reserve Bank of
                  Zimbabwe
                </p>
              </div>
            </SmoothReveal>
          </div>
        </div>

        {/* Right Side - Phone Mockup */}
        <div className="w-1/2 flex items-center justify-center p-8">
          <motion.div ref={phoneRef} animate={controls} className="relative">
            <div className="relative w-72 h-[560px] bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 rounded-[2.5rem] shadow-2xl overflow-hidden border-[10px] border-gray-800">
              <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-24 h-6 bg-black rounded-full z-20 flex items-center justify-center">
                <div className="absolute right-2 w-3 h-3 bg-gray-600 rounded-full"></div>
              </div>

              <div className="absolute inset-0 rounded-[2.5rem] pointer-events-none border-[1px] border-gray-700/50"></div>

              <div className="absolute -left-1 top-24 w-1 h-8 bg-gray-800 rounded-r-sm"></div>
              <div className="absolute -left-1 top-40 w-1 h-8 bg-gray-800 rounded-r-sm"></div>
              <div className="absolute -right-1 top-32 w-1 h-12 bg-gray-800 rounded-l-sm"></div>

              <div className="absolute -left-1 top-64 w-1 h-10 bg-gradient-to-b from-gray-800 to-gray-700 rounded-r-sm"></div>
              <div className="absolute -left-1 top-80 w-1 h-10 bg-gradient-to-b from-gray-800 to-gray-700 rounded-r-sm"></div>

              <div className="absolute inset-2 bg-gradient-to-br from-gray-50 to-white rounded-[2rem] overflow-hidden">
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
                      {activeScreen === 0 && renderSplashScreen()}
                      {activeScreen === 1 && renderHomeScreen()}
                      {activeScreen === 2 && renderReceiveScreen()}
                    </motion.div>
                  </AnimatePresence>
                </div>

                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-0.5 bg-gray-800/30 rounded-full"></div>
              </div>
            </div>

            <div className="absolute -left-16 top-1/2 transform -translate-y-1/2">
              <div className="flex flex-col items-center">
                <div className="h-48 w-px bg-gradient-to-b from-blue-500 via-indigo-500 to-transparent mb-4">
                  <motion.div
                    className="w-2 h-2 bg-blue-500 rounded-full -ml-0.5"
                    animate={{ y: scrollProgress * 192 }}
                  ></motion.div>
                </div>
                <br />
                <br />
                <span className="text-xs text-gray-500 rotate-90 whitespace-nowrap">
                  Scroll to explore
                </span>
              </div>
            </div>
            
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