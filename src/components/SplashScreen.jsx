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
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#f8f9fb]">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center justify-center w-full"
      >
        {/* Logo/Icon */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8 flex flex-col items-center"
        >
          <div className="w-28 h-28 bg-[#0136c0] rounded-full flex items-center justify-center mb-4">
            <span className="text-1xl font-bold text-white">MyChangeX</span>
          </div>
        </motion.div>
        <br />
        <br />
        {/* Loading Spinner & Text */}
        <div className="flex flex-col items-center mb-10">
          <div className="relative w-9 h-9 mb-1">
            <motion.div
              className="absolute top-0 left-0 w-full h-full border-[3px] border-transparent border-t-[#0136c0] border-r-[#0136c0] rounded-full"
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          </div>
          <br />
          <br />
          <p className="text-gray-600 mb-1">Loading ...</p>
          <br />
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm text-gray-600"
          >
            {loadingProgress}%
          </motion.p>
        </div>
      </motion.div>

      {/* Copyright - centered at bottom */}
      <motion.p
      
        className="absolute bottom-8 text-gray-500 text-sm text-center w-full"
      >
        © 2026 MyChangeX. All rights reserved.
      </motion.p>
    </div>
  );
};

export default SplashScreen;
