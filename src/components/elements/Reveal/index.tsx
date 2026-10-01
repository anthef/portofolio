'use client'
import React from 'react'
import { motion } from 'framer-motion'

interface RevealProps {
  children: React.ReactNode
  className?: string
  delay?: number
  y?: number
  // Above-the-fold content: animate with pure CSS on first paint instead of
  // waiting for hydration + an IntersectionObserver.
  onLoad?: boolean
}

// Fades content up once when it scrolls into view.
export const Reveal: React.FC<RevealProps> = ({ children, className = '', delay = 0, y = 14, onLoad = false }) =>
  onLoad ? (
    <div className={`animate-rise ${className}`} style={{ animationDelay: `${delay}s` }}>
      {children}
    </div>
  ) : (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -60px 0px' }}
      transition={{ duration: 0.6, delay, ease: [0.2, 0.8, 0.2, 1] }}
    >
      {children}
    </motion.div>
  )
