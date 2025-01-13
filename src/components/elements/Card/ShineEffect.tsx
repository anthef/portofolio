// src/components/elements/Card/ShineEffect.tsx

import React from 'react'
import { motion } from 'framer-motion'

const ShineEffect = () => {
  const shineVariants = {
    hidden: { opacity: 0, x: '-100%' },
    visible: {
      opacity: 1,
      x: '100%',
      transition: {
        duration: 2,
        ease: 'easeInOut',
        repeat: Infinity,
        repeatType: 'loop',
      },
    },
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white to-transparent opacity-25"
        variants={shineVariants}
        initial="hidden"
        animate="visible"
      />
      <motion.div
        className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white to-transparent opacity-25"
        variants={shineVariants}
        initial="hidden"
        animate="visible"
        style={{ top: '20%', left: '-50%' }}
        transition={{ duration: 3, ease: 'easeInOut', repeat: Infinity, repeatType: 'loop' }}
      />
      <motion.div
        className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white to-transparent opacity-25"
        variants={shineVariants}
        initial="hidden"
        animate="visible"
        style={{ top: '40%', left: '-100%' }}
        transition={{ duration: 4, ease: 'easeInOut', repeat: Infinity, repeatType: 'loop' }}
      />
    </div>
  )
}

export default ShineEffect
