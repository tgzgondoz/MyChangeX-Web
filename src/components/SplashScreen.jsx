import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const SplashScreen = ({ onLoadingComplete }) => {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsVisible(false);
            onLoadingComplete?.();
          }, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [onLoadingComplete]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#f8f9fb] flex items-center justify-center">
      <div className="flex flex-col items-center justify-between min-h-screen w-full max-w-md mx-auto py-12 px-6">
        {/* Top spacer (optional, creates balance) */}
        <div className="flex-1" />

        {/* Main content - perfectly centered */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center w-full flex-2"
        >
          {/* Logo container */}
          <div className="mb-12">
            <div className="w-32 h-32 bg-[#0136c0] rounded-full flex items-center justify-center ">
              <p className="text-white text-xl font-semibold tracking-tight">
                MyChangeX
              </p>
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
        </motion.div>

        {/* Copyright - fixed at bottom */}
        <div className="flex-1 flex flex-col justify-end">
          <motion.p
           
            className="text-gray-400 text-xs text-center w-full pt-8 border-t border-gray-100"
          >
            © 2026 MyChangeX. All rights reserved.
          </motion.p>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
