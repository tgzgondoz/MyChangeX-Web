import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import Header from './Header';


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
  const [activeCard, setActiveCard] = useState(0);
  const [balance, setBalance] = useState(1250.75);
  const [scrollProgress, setScrollProgress] = useState(0);
  const textContainerRef = useRef(null);
  const phoneRef = useRef(null);
  const controls = useAnimation();

  const cards = [
    { 
      id: 1, 
      type: 'Primary Card', 
      lastFour: '4234', 
      color: 'bg-gradient-to-br from-blue-600 to-indigo-700',
      holder: 'JOHN DOE',
      expires: '08/26',
      balance: 850.25
    },
    { 
      id: 2, 
      type: 'Savings Card', 
      lastFour: '5678', 
      color: 'bg-gradient-to-br from-emerald-600 to-green-700',
      holder: 'JOHN DOE',
      expires: '11/27',
      balance: 400.50
    },
    { 
      id: 3, 
      type: 'Business Card', 
      lastFour: '9012', 
      color: 'bg-gradient-to-br from-purple-600 to-pink-700',
      holder: 'JOHN DOE',
      expires: '05/26',
      balance: 0
    },
  ];

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

  const transactions = [
    { id: 1, merchant: 'SuperMart', amount: -45.60, time: 'Today, 10:30 AM', icon: '🛒', type: 'Grocery' },
    { id: 2, merchant: 'Fuel Station', amount: -32.15, time: 'Today, 09:15 AM', icon: '⛽', type: 'Transport' },
    { id: 3, merchant: 'John Doe', amount: 150.00, time: 'Yesterday, 02:45 PM', icon: '👤', type: 'Personal' },
    { id: 4, merchant: 'Coffee Shop', amount: -8.50, time: 'Yesterday, 08:30 AM', icon: '☕', type: 'Food' },
  ];

  const quickActions = [
    { icon: <SendIcon />, label: 'Send', action: 'send' },
    { icon: <ScanIcon />, label: 'Scan', action: 'scan' },
    { icon: <CardIcon />, label: 'Cards', action: 'cards' },
    { icon: <WalletIcon />, label: 'Wallet', action: 'wallet' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (textContainerRef.current) {
        const scrollTop = textContainerRef.current.scrollTop;
        const scrollHeight = textContainerRef.current.scrollHeight - textContainerRef.current.clientHeight;
        const progress = scrollHeight > 0 ? scrollTop / scrollHeight : 0;
        setScrollProgress(progress);
        
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

  const handleCardAction = (action) => {
    switch(action) {
      case 'tap':
        // Simulate tap to pay
        if (phoneRef.current) {
          phoneRef.current.classList.add('ring-4', 'ring-green-400');
          setTimeout(() => {
            phoneRef.current.classList.remove('ring-4', 'ring-green-400');
          }, 500);
        }
        break;
      case 'flip':
        // Simulate card flip
        setActiveCard((prev) => (prev + 1) % cards.length);
        break;
      default:
        break;
    }
  };

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
              <div className="pt-16 h-full overflow-y-auto scrollbar-hide">
                {/* Balance Card */}
                <div className="p-6">
                  <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-6 shadow-xl">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <p className="text-blue-200 text-sm">MyChangeX Balance</p>
                        <h2 className="text-3xl font-bold mt-2">${balance.toFixed(2)}</h2>
                        <p className="text-blue-200 text-sm mt-1">Available to spend</p>
                      </div>
                      <div className="bg-white/20 p-3 rounded-xl">
                        <WalletIcon />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Active Card Display */}
                <div className="px-6 mb-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">Your Cards</h3>
                    <button 
                      onClick={() => handleCardAction('flip')}
                      className="text-sm text-blue-400 hover:text-blue-300"
                    >
                      Next Card →
                    </button>
                  </div>
                  
                  <motion.div
                    key={activeCard}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className={`${cards[activeCard].color} rounded-2xl p-6 shadow-xl`}
                  >
                    <div className="flex justify-between items-start mb-8">
                      <div>
                        <p className="text-white/80 text-sm">{cards[activeCard].type}</p>
                        <div className="flex items-center mt-4 space-x-2">
                          <div className="text-2xl">••••</div>
                          <div className="text-2xl">••••</div>
                          <div className="text-2xl">••••</div>
                          <div className="text-2xl font-bold">{cards[activeCard].lastFour}</div>
                        </div>
                      </div>
                      <div className="bg-white/20 p-3 rounded-xl">
                        <CardIcon />
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-white/80 text-xs">Card Holder</p>
                        <p className="font-medium">{cards[activeCard].holder}</p>
                      </div>
                      <div>
                        <p className="text-white/80 text-xs">Expires</p>
                        <p className="font-medium">{cards[activeCard].expires}</p>
                      </div>
                      <div className="w-12 h-8 bg-white/30 rounded-lg"></div>
                    </div>
                    
                    <button 
                      onClick={() => handleCardAction('tap')}
                      className="w-full mt-6 py-3 bg-white/20 rounded-xl font-semibold hover:bg-white/30 transition"
                    >
                      💳 Tap to Pay
                    </button>
                  </motion.div>
                </div>

                {/* Quick Actions */}
                <div className="px-6 mb-6">
                  <div className="grid grid-cols-4 gap-3">
                    {quickActions.map((action, index) => (
                      <button
                        key={index}
                        className="flex flex-col items-center p-3 bg-gray-800/50 rounded-xl hover:bg-gray-700/50 transition"
                      >
                        <div className="text-blue-400 mb-2">
                          {action.icon}
                        </div>
                        <span className="text-sm">{action.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Recent Transactions */}
                <div className="px-6">
                  <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
                  <div className="space-y-3">
                    {transactions.map((transaction) => (
                      <div key={transaction.id} className="flex items-center justify-between p-3 bg-gray-800/30 rounded-xl hover:bg-gray-700/30 transition">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-gray-700/50 rounded-lg flex items-center justify-center mr-3">
                            <span className="text-lg">{transaction.icon}</span>
                          </div>
                          <div>
                            <p className="font-medium">{transaction.merchant}</p>
                            <p className="text-sm text-gray-400">{transaction.type}</p>
                          </div>
                        </div>
                        <div className={`font-semibold ${transaction.amount > 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                          {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Phone Home Indicator */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-white/30 rounded-full"></div>
            </div>

            {/* Floating Action Button */}
            <button className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-14 h-14 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform">
              <ScanIcon />
            </button>

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
          </motion.div>
        </div>
      </div>


      
    </div>
  );
};

export default MyChangeXFullScreen;