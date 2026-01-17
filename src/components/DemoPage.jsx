import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const DemoPage = () => {
  const navigate = useNavigate();

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
            {/* iPhone - Sender */}
            <div className="flex flex-col items-center">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  iPhone - Sender
                </h2>
                <p className="text-gray-600">
                  Create and send digital coupons instantly
                </p>
              </div>

              <div className="relative w-72 h-[560px] bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 rounded-[2.5rem] shadow-2xl overflow-hidden border-[10px] border-gray-800 mb-4">
                {/* iPhone Dynamic Island */}
                <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-24 h-6 bg-black rounded-full z-20" />

                {/* Screen */}
                <div className="absolute inset-2 bg-gradient-to-br from-gray-50 to-white rounded-[2rem] overflow-hidden">
                  {/* Status Bar */}
                  <div className="pt-2 px-6 flex justify-between items-center text-black text-xs">
                    <div className="font-semibold">9:41</div>
                    <div className="flex items-center space-x-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="mr-0.5"
                      >
                        <path d="M5 12.55a11 11 0 0 1 14.08 0" />
                        <path d="M1.42 9a16 16 0 0 1 21.16 0" />
                        <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
                        <circle cx="12" cy="20" r="1" />
                      </svg>
                      <span className="text-xs">4G</span>
                    </div>
                  </div>

                  {/* App Content */}
                  <div className="p-6 h-full">
                    <div className="mb-6">
                      <h3 className="text-xl font-bold text-gray-800">
                        Send Coupon
                      </h3>
                      <p className="text-gray-600 text-sm">
                        To: John's Supermarket
                      </p>
                    </div>

                    {/* Coupon Details */}
                    <div className="bg-blue-50 rounded-xl p-4 mb-6 border border-blue-200">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-700 font-medium">
                          $5.00 Coupon
                        </span>
                        <span className="text-green-600 font-bold">ACTIVE</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">
                        Valid for groceries at John's Supermarket
                      </p>
                      <div className="flex items-center text-sm text-gray-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          className="mr-1"
                        >
                          <rect
                            x="3"
                            y="4"
                            width="18"
                            height="18"
                            rx="2"
                            ry="2"
                          />
                          <line x1="16" y1="2" x2="16" y2="6" />
                          <line x1="8" y1="2" x2="8" y2="6" />
                          <line x1="3" y1="10" x2="21" y2="10" />
                        </svg>
                        <span>Expires: Dec 30, 2024</span>
                      </div>
                    </div>

                    {/* Coupon Amount Input */}
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Amount
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                          $
                        </span>
                        <input
                          type="number"
                          min="0.01"
                          step="0.01"
                          defaultValue="5.00"
                          className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="0.00"
                        />
                      </div>
                    </div>

                    {/* Send Button */}
                    <div className="absolute bottom-6 left-6 right-6">
                      <button
                        className="w-full py-3 bg-[#0136c0] text-white rounded-xl font-semibold hover:bg-[#012da0] transition active:scale-95 shadow-lg"
                        onClick={() => {
                          alert("Coupon sent successfully! This is a demo.");
                        }}
                      >
                        Send Now
                      </button>
                    </div>
                  </div>
                </div>

                {/* iPhone Home Indicator */}
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-0.5 bg-gray-800/30 rounded-full"></div>
              </div>
            </div>

            {/* Android - Receiver */}
            <div className="flex flex-col items-center">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  Android - Receiver
                </h2>
                <p className="text-gray-600">
                  Receive and manage incoming coupons
                </p>
              </div>

              <div className="relative w-72 h-[560px] bg-gradient-to-b from-gray-800 to-gray-900 rounded-3xl shadow-2xl overflow-hidden border-[6px] border-gray-700 mb-4">
                {/* Android Notch */}
                <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-black rounded-b-xl" />

                {/* Screen */}
                <div className="absolute inset-1 bg-gradient-to-br from-gray-100 to-white rounded-[1.5rem] overflow-hidden">
                  {/* Status Bar */}
                  <div className="pt-8 px-6 flex justify-between items-center text-black text-xs">
                    <div className="font-semibold">9:41</div>
                    <div className="flex items-center space-x-1">
                      <div className="w-3 h-3 bg-green-500 rounded-full" />
                      <span className="text-xs">4G</span>
                    </div>
                  </div>

                  {/* App Content */}
                  <div className="p-6 h-full">
                    <div className="mb-6">
                      <h3 className="text-xl font-bold text-gray-800">
                        Receive Coupon
                      </h3>
                      <p className="text-gray-600 text-sm">From: Sarah M.</p>
                    </div>

                    {/* Incoming Coupon */}
                    <div className="relative mb-6">
                      {/* Incoming Animation */}
                      <motion.div
                        className="absolute -top-2 -right-2 z-10"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                      >
                        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                          <span className="text-white text-xs">1</span>
                        </div>
                      </motion.div>

                      <div className="bg-green-50 rounded-xl p-4 border-2 border-green-300 border-dashed shadow-sm">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-gray-700 font-medium">
                            New Coupon!
                          </span>
                          <span className="text-blue-600 font-bold text-lg">
                            $5.00
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">
                          Sarah sent you a grocery coupon
                        </p>

                        {/* Accept/Decline Buttons */}
                        <div className="flex space-x-2">
                          <button
                            className="flex-1 py-3 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition active:scale-95 shadow-md"
                            onClick={() => {
                              alert(
                                "Coupon accepted! Added to your wallet. This is a demo.",
                              );
                            }}
                          >
                            Accept
                          </button>
                          <button
                            className="flex-1 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition active:scale-95"
                            onClick={() =>
                              alert("Coupon declined. This is a demo.")
                            }
                          >
                            Decline
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Transaction History */}
                    <div className="mt-8">
                      <h4 className="text-sm font-semibold text-gray-700 mb-3">
                        Recent Transactions
                      </h4>
                      <div className="space-y-2">
                        {[
                          {
                            name: "Mike T.",
                            amount: "$2.50",
                            time: "10:30 AM",
                            status: "received",
                          },
                          {
                            name: "Lisa K.",
                            amount: "$3.00",
                            time: "9:15 AM",
                            status: "sent",
                          },
                          {
                            name: "John S.",
                            amount: "$1.75",
                            time: "Yesterday",
                            status: "received",
                          },
                        ].map((transaction, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="flex justify-between items-center text-sm p-3 bg-white rounded-lg hover:bg-gray-50 transition-colors border border-gray-100 shadow-sm"
                          >
                            <div className="flex items-center">
                              <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                                  transaction.status === "received"
                                    ? "bg-green-100"
                                    : "bg-blue-100"
                                }`}
                              >
                                <span
                                  className={`text-xs font-medium ${
                                    transaction.status === "received"
                                      ? "text-green-600"
                                      : "text-blue-600"
                                  }`}
                                >
                                  {transaction.status === "received"
                                    ? "↓"
                                    : "↑"}
                                </span>
                              </div>
                              <div>
                                <span className="text-gray-700 font-medium block">
                                  {transaction.name}
                                </span>
                                <span className="text-gray-400 text-xs">
                                  {transaction.time}
                                </span>
                              </div>
                            </div>
                            <span
                              className={`font-bold ${
                                transaction.status === "received"
                                  ? "text-green-600"
                                  : "text-blue-600"
                              }`}
                            >
                              {transaction.amount}
                            </span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Android Navigation */}
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gray-600 rounded-full" />
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className=" rounded-lg p-8 text-center   mb-12">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            Ready to Experience MyChangeX?
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Join thousands of users who have revolutionized their digital
            transactions with our secure and intuitive platform.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              className="px-8 py-3  text-gray-800 rounded-lg font-semibold  hover:bg-gray-50 transition"
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
