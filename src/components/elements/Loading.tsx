'use client'
import React from 'react';
import { motion } from 'framer-motion';

const Loading: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-primary z-50 flex items-center justify-center">
      <div className="relative">
        {/* Main loading circle */}
        <motion.div
          className="w-20 h-20 border-4 border-gray-600 border-t-accent rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Inner glow circle */}
        <motion.div
          className="absolute top-2 left-2 w-16 h-16 border-2 border-gray-700 border-b-highlight rounded-full"
          animate={{ rotate: -360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Center dot */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-accent rounded-full animate-pulse" />
        
        {/* Loading text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="absolute top-24 left-1/2 transform -translate-x-1/2 text-white font-medium tracking-wider"
        >
          <span className="shimmer-text">Loading Portfolio...</span>
        </motion.div>
        
        {/* Floating particles */}
        <div className="absolute -top-4 -left-4">
          <motion.div
            className="w-2 h-2 bg-accent rounded-full"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
        
        <div className="absolute -bottom-4 -right-4">
          <motion.div
            className="w-1.5 h-1.5 bg-highlight rounded-full"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
          />
        </div>
        
        <div className="absolute top-0 -right-6">
          <motion.div
            className="w-1 h-1 bg-white rounded-full"
            animate={{
              scale: [1, 2, 1],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{ duration: 2.5, repeat: Infinity, delay: 1 }}
          />
        </div>
      </div>
    </div>
  );
};

export default Loading;
