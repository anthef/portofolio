
import Image from 'next/image';
import React from 'react';
import Typewriter from 'typewriter-effect';
import { CONTACTS } from '@constants';
import { motion } from 'framer-motion';
import SkillSlider from './SkillSlider';

const AboutDesktop = () => {
  return (
    <div className="flex flex-col items-center justify-center mt-20 pt-20 md:pt-0 md:min-h-screen gap-4 text-center md:text-left bg-gradient-to-b from-primary to-secondary">
      <div className="flex flex-col gap-2 lg:gap-2 z-10 justify-center items-center w-full md:w-2/3 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4 }}
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-10"
        >
          <span className="shine-text">
            <Typewriter
              options={{
                strings: ['a Data Scientist', 'a Full Stack Engineer'],
                autoStart: true,
                loop: true,
              }}
            />
          </span>
        </motion.div>
        <div className="flex flex-col items-center justify-center gap-6 relative">
          <div className="flex items-center justify-center w-full relative">
            <div className="w-1/3 hidden md:block relative">
              <div className="flex flex-col absolute inset-0 z-20" />
              <div className="relative z-10">
                <SkillSlider direction="left" speed={20} />
              </div>
              <div className="relative z-10">
                <SkillSlider direction="right" speed={20} />
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="relative w-[150px] h-[150px] md:w-[200px] md:h-[200px] lg:w-[350px] lg:h-[350px] overflow-hidden z-30"
            >
              <div className="absolute inset-0 rounded-full bg-primary opacity-70 animate-rotate">
                <div className="absolute inset-0 rounded-full bg-gradient-to-t from-primary via-primary to-transparent opacity-50"></div>
              </div>

              <div className="relative w-full h-full overflow-hidden ">
                <Image
                  src="/profile/personal_photo2.png"
                  fill
                  alt="Self Portrait"
                  className="object-cover relative z-30"
                />
              </div>
            </motion.div>

            <div className="w-1/3 hidden md:block relative">
              <div className="flex flex-col absolute inset-0 z-20" />
              <div className="relative z-10">
                <SkillSlider direction="right" speed={20} />
              </div>
              <div className="relative z-10">
                <SkillSlider direction="left" speed={20} />
              </div>
            </div>
          </div>
        </div>

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
                px-6 py-3 
                backdrop-blur-lg 
                relative
            "
            >
            <span className="text-2xl md:text-2xl lg:text-3xl font-medium text-white font-poppins">
                Anthony Edbert Feriyanto
            </span>
            </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="flex gap-5 justify-center md:justify-start mt-4"
        >
          {CONTACTS.map((contact) => (
            <motion.a
              key={contact.name}
              href={contact.url}
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.25 }}
              className="flex items-center gap-2 transition-transform transform"
              aria-label={contact.name}
            >
              {contact.icon}
            </motion.a>
          ))}
        </motion.div>
        <span className="font-medium text-white mt-2 shine-text2">
                Undergraduate Information System Student at University of Indonesia
            </span>
        </div>
    </div>
  );
};

export default AboutDesktop;
