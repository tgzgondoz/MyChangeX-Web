import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const DemoScreen = ({ onClose }) => {
  // Close on Escape key press
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  // Close on backdrop click
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()} // Prevent clicks inside modal from closing
      >
        {/* Header with close button */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center z-10">
          <h2 className="text-xl font-bold text-gray-800">Live Demo - Send Coupons</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors p-1 rounded-full hover:bg-gray-100"
            aria-label="Close demo"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Demo Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* iPhone - Sender */}
            <div className="flex flex-col items-center">
              <div className="relative w-64 h-[500px] bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 rounded-[2.5rem] shadow-2xl overflow-hidden border-[10px] border-gray-800 mb-4">
                {/* iPhone Dynamic Island */}
                <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-24 h-6 bg-black rounded-full z-20" />
                
                {/* Screen */}
                <div className="absolute inset-2 bg-gradient-to-br from-gray-50 to-white rounded-[2rem] overflow-hidden">
                  {/* Status Bar */}
                  <div className="pt-2 px-4 flex justify-between items-center text-black text-xs">
                    <div>9:41</div>
                    <div className="flex items-center space-x-1">
                      <div className="w-3 h-3 bg-green-500 rounded-full" />
                      <span className="text-xs">4G</span>
                    </div>
                  </div>
                  
                  {/* App Content */}
                  <div className="p-4 h-full">
                    <div className="mb-6">
                      <h3 className="text-lg font-bold text-gray-800">Send Coupon</h3>
                      <p className="text-gray-600 text-sm">To: John's Supermarket</p>
                    </div>
                    
                    {/* Coupon Details */}
                    <div className="bg-blue-50 rounded-xl p-4 mb-4 border border-blue-200">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-700 font-medium">$5.00 Coupon</span>
                        <span className="text-green-600 font-bold">ACTIVE</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">Valid for groceries at John's Supermarket</p>
                      <div className="flex items-center text-sm text-gray-500">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mr-1">
                          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                          <line x1="16" y1="2" x2="16" y2="6" />
                          <line x1="8" y1="2" x2="8" y2="6" />
                          <line x1="3" y1="10" x2="21" y2="10" />
                        </svg>
                        <span>Expires: 30 Dec 2024</span>
                      </div>
                    </div>
                    
                    {/* Send Button */}
                    <div className="absolute bottom-4 left-4 right-4">
                      <button 
                        className="w-full py-3 bg-[#0136c0] text-white rounded-xl font-semibold hover:bg-[#012da0] transition active:scale-95"
                        onClick={() => alert('Coupon sent! This is a demo.')}
                      >
                        Send Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <span className="text-sm font-medium text-gray-700">iPhone - Sender</span>
            </div>

            {/* Android - Receiver */}
            <div className="flex flex-col items-center">
              <div className="relative w-64 h-[500px] bg-gradient-to-b from-gray-800 to-gray-900 rounded-3xl shadow-2xl overflow-hidden border-[6px] border-gray-700 mb-4">
                {/* Android Notch */}
                <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-black rounded-b-xl" />
                
                {/* Screen */}
                <div className="absolute inset-1 bg-gradient-to-br from-gray-100 to-white rounded-[1.5rem] overflow-hidden">
                  {/* Status Bar */}
                  <div className="pt-8 px-4 flex justify-between items-center text-black text-xs">
                    <div>9:41</div>
                    <div className="flex items-center space-x-1">
                      <div className="w-3 h-3 bg-green-500 rounded-full" />
                      <span className="text-xs">4G</span>
                    </div>
                  </div>
                  
                  {/* App Content */}
                  <div className="p-4 h-full">
                    <div className="mb-6">
                      <h3 className="text-lg font-bold text-gray-800">Receive Coupon</h3>
                      <p className="text-gray-600 text-sm">From: Sarah M.</p>
                    </div>
                    
                    {/* Incoming Coupon */}
                    <div className="relative">
                      {/* Incoming Animation */}
                      <motion.div 
                        className="absolute -top-2 -right-2"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                      >
                        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">1</span>
                        </div>
                      </motion.div>
                      
                      <div className="bg-green-50 rounded-xl p-4 border-2 border-green-300 border-dashed">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-gray-700 font-medium">New Coupon!</span>
                          <span className="text-blue-600 font-bold">$5.00</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">Sarah sent you a grocery coupon</p>
                        
                        {/* Accept/Decline Buttons */}
                        <div className="flex space-x-2">
                          <button 
                            className="flex-1 py-2 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition active:scale-95"
                            onClick={() => alert('Coupon accepted! This is a demo.')}
                          >
                            Accept
                          </button>
                          <button 
                            className="flex-1 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition active:scale-95"
                            onClick={() => alert('Coupon declined. This is a demo.')}
                          >
                            Decline
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    {/* Transaction History */}
                    <div className="mt-8">
                      <h4 className="text-sm font-semibold text-gray-700 mb-2">Recent Transactions</h4>
                      <div className="space-y-2">
                        {[
                          { name: 'Mike T.', amount: '$2.50', time: '10:30 AM' },
                          { name: 'Lisa K.', amount: '$3.00', time: '9:15 AM' },
                          { name: 'John S.', amount: '$1.75', time: 'Yesterday' }
                        ].map((transaction, idx) => (
                          <motion.div 
                            key={idx}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="flex justify-between items-center text-sm p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                          >
                            <div>
                              <span className="text-gray-600">{transaction.name}</span>
                              <span className="text-gray-400 text-xs block">{transaction.time}</span>
                            </div>
                            <span className="text-green-600 font-medium">{transaction.amount}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Android Navigation */}
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gray-600 rounded-full" />
              </div>
              <span className="text-sm font-medium text-gray-700">Android - Receiver</span>
            </div>
          </div>
          
          {/* Demo Instructions */}
          <div className="mt-8 p-4 bg-gray-50 rounded-xl border border-gray-200">
            <h3 className="font-semibold text-gray-800 mb-2">How It Works:</h3>
            <ol className="list-decimal list-inside space-y-1 text-sm text-gray-600">
              <li>User on iPhone creates and sends a digital coupon</li>
              <li>Receiver on Android gets instant notification</li>
              <li>Coupon can be accepted and used immediately</li>
              <li>All transactions are secured and recorded</li>
            </ol>
          </div>
          
          {/* Action Buttons */}
          <div className="mt-6 flex justify-center space-x-4">
            <button 
              className="px-6 py-3 bg-[#0136c0] text-white rounded-lg font-semibold hover:bg-[#012da0] transition active:scale-95"
              onClick={() => {
                onClose();
                // You could add navigation to actual demo page here
                alert('Redirecting to live demo...');
              }}
            >
              Try Live Demo
            </button>
            <button 
              onClick={onClose}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition active:scale-95"
            >
              Close Demo
            </button>
          </div>

          {/* Demo Stats */}
          <div className="mt-6 grid grid-cols-3 gap-4 text-center">
            <div className="p-3 bg-blue-50 rounded-lg">
              <div className="text-lg font-bold text-[#0136c0]">50K+</div>
              <div className="text-xs text-gray-600">Active Users</div>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <div className="text-lg font-bold text-green-600">$2M+</div>
              <div className="text-xs text-gray-600">Transactions</div>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <div className="text-lg font-bold text-purple-600">99.9%</div>
              <div className="text-xs text-gray-600">Uptime</div>
            </div>
          </div>

          {/* Footer Note */}
          <div className="mt-6 pt-4 border-t border-gray-200 text-center">
            <p className="text-xs text-gray-500">
              This is an interactive demo. Real app functionality may vary.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default DemoScreen;