import Image from 'next/image';
import React from 'react';
import Typewriter from 'typewriter-effect';
import { CONTACTS } from '@constants';
import { motion } from 'framer-motion';

const AboutMobile = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen pt-10 sm:pt-20 bg-gradient-to-b from-primary to-secondary px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 sm:gap-6 z-10 items-center w-full max-w-4xl">

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4 }}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8 sm:mb-10 text-center"
        >
          <span className="shine-text">
            <Typewriter
              options={{
                strings: ['AFBAEJNDA', 'LAMO PLAAOPNOIWDA'],
                autoStart: true,
                loop: true,
              }}
            />
          </span>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="relative w-36 h-36 sm:w-40 sm:h-40 md:w-52 md:h-52 lg:w-80 lg:h-80 overflow-hidden z-30"
        >
          <div className="absolute inset-0 rounded-full bg-primary opacity-70 animate-rotate">
            <div className="absolute inset-0 rounded-full bg-gradient-to-t from-primary via-primary to-transparent opacity-50"></div>
          </div>

          <div className="relative w-full h-full overflow-hidden">
            <Image
              src="/profile/personal_photo2.png"
              layout="fill"
              alt="Self Portrait"
              className="object-cover relative z-30"
              priority
            />
          </div>
        </motion.div>

        {/* Name Display with Styling */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4 }}
          style={{
            backgroundImage: 'linear-gradient(to right, #348B96, #2A717A, #24475B, #24475B)',
            boxShadow: `
              0 4px 6px rgba(0, 0, 0, 0.1),
              0 10px 15px rgba(0, 0, 0, 0.2),
              0 20px 25px rgba(0, 0, 0, 0.15),
              0 30px 35px rgba(0, 0, 0, 0.1)
            `,
            border: '2px solid #24475B',
            borderRadius: '9999px',
            outline: '3px solid rgba(36, 71, 91, 0.5)',
          }}
          className="
            px-4 sm:px-6 md:px-8 
            py-2 sm:py-3 md:py-4 
            backdrop-blur-lg 
            relative
            mx-auto
            max-w-xs sm:max-w-sm md:max-w-md
            text-center
          "
        >
          <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium text-white">
            Anthony Edbert Feriyanto
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="flex flex-wrap gap-3 sm:gap-5 justify-center mt-4"
        >
          {CONTACTS.map((contact) => (
            <motion.a
              key={contact.name}
              href={contact.url}
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.25 }}
              className="flex items-center justify-center gap-2 transition-transform transform"
              aria-label={contact.name}
            >
              {contact.icon}
            </motion.a>
          ))}
        </motion.div>

        <span className="font-medium text-white mt-2 text-sm sm:text-base md:text-lg shine-text2 text-center">
          Undergraduate Information System Student at University of Indonesia
        </span>
      </div>
    </div>
  );
};

export default AboutMobile;
