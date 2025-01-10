import Image from 'next/image';
import React from 'react';
import Typewriter from 'typewriter-effect';
import { CONTACTS } from '@constants';
import { motion } from 'framer-motion';
import { FiDownload as Download } from 'react-icons/fi';
import SkillSlider from './SkillSlider';

const About = () => {
  return (
    <div className="flex flex-col items-center justify-center mt-20 pt-20 md:pt-0 md:min-h-screen gap-8 text-center md:text-left ">
      <div className="flex flex-col gap-6 lg:gap-8 z-10 justify-center items-center w-full md:w-2/3 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4 }}
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-white"
        >
          <span className="shine-text">
            <Typewriter
              options={{
                strings: [
                  'a Data Scientist',
                  'a Full Stack Engineer',
                ],
                autoStart: true,
                loop: true,
              }}
            />
          </span>
        </motion.div>
        <div className="flex flex-col items-center justify-center gap-8 relative">
          <div className="flex items-center justify-center w-full relative">
     
            <div className="w-1/3 hidden md:block relative">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20 z-20" />
              <div className="relative z-10">
                <SkillSlider direction="left" speed={20} />
              </div>
            </div>
            

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="relative w-[150px] h-[150px] md:w-[200px] md:h-[200px] lg:w-[250px] lg:h-[250px] overflow-hidden z-30 rounded-full border shadow-2xl"
            >
              <div className="absolute inset-0 ring-4 ring-white/10 rounded-full z-40" />
              <Image
                src="/profile/personal_photo2.png"
                fill
                alt="Self Portrait"
                className="object-cover"
              />
            </motion.div>
            
            <div className="w-1/3 hidden md:block relative">
              <div className="absolute inset-0 bg-gradient-to-l from-transparent to-black/20 z-20" />
              <div className="relative z-10">
                <SkillSlider direction="right" speed={20} />
              </div>
            </div>
          </div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4 }}
          className="px-6 py-3 rounded-lg border-2 border-secondary bg-[#0B3866]/25 backdrop-blur-md shadow-xl"
        >
          <span className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">
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
              whileHover={{ scale: 1.75 }}
              className="flex items-center gap-2 transition-transform transform"
              aria-label={contact.name}
            >
              {contact.icon}
            </motion.a>
          ))}
        </motion.div>

        <motion.a
          href="/documents/cv.pdf"
          download="Anthony_Edbert_Feriyanto_CV.pdf"
          className="flex items-center gap-2 px-6 py-3 bg-secondary text-white rounded-full hover:bg-secondary-dark hover:scale-105 active:scale-95 transition-transform duration-300 mt-6"
        >
          <Download size={24} />
          <span className="text-sm md:text-base font-semibold">Download CV</span>
        </motion.a>
      </div>
    </div>
  );
};

export default About;