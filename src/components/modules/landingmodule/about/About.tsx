import { useWindowSize } from '@hooks';
import Image from 'next/image';
import React, { useState } from 'react';
import Typewriter from 'typewriter-effect';
import { CONTACTS } from '@constants';
import { motion, AnimatePresence } from 'framer-motion';
import { FiEye as Eye, FiEyeOff as EyeOff, FiDownload as Download } from 'react-icons/fi';

const About = () => {
  const { width } = useWindowSize();
  const [showContacts, setShowContacts] = useState(false);

  const toggleContacts = () => {
    setShowContacts((prev) => !prev);
  };

    return (
        <div
        className="flex pt-40 md:pt-0 md:min-h-screen items-center justify-center md:justify-between gap-8 text-center md:text-left"
        >
        <div className="flex flex-col gap-4 lg:gap-8 z-10" style={{ maxWidth: width > 768 ? '50%' : '100%' }}>
            <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-5xl md:text-6xl lg:text-[64px] leading-none font-bold"
            >
            <span className="glowing-text-about">Hello Siri, I’m </span>
            <span style={{ animation: 'pulse 5s ease infinite alternate' }}>
                <Typewriter
                options={{
                    strings: [
                    'Anthony Edbert',
                    'a Data Scientist',
                    'a Full Stack Engineer',
                    ],
                    autoStart: true,
                    loop: true,
                }}
                />
            </span>
            </motion.div>

            <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            onClick={() => window.open('https://cs.ui.ac.id/', '_blank')}
            className="bg-[#0B3866]/25 px-[30px] py-[15px] rounded-[30px] flex flex-col gap-8 text-left backdrop-blur-md shadow-xl w-full max-w-[450px] cursor-pointer hover:shadow-[#9BF6FF]/25 hover:shadow-2xl transition-all duration-300 ease-in-out"
            >
            <div className="flex gap-8">
                <div className="relative w-24 h-24 self-center">
                <Image
                    src="/profile/fasilkom.png"
                    alt="UI"
                    fill
                    priority
                    className="rounded-full object-cover bg-white object-center shadow-lg shadow-[#9BF6FF]/25"
                />
                </div>
                <div className="space-y-1">
                <p className="text-sm md:text-lg font-bold">
                    Undergraduate Information System
                </p>
                <p className="text-sm md:text-lg">University of Indonesia</p>
                <p className="text-xs md:text-sm">2023-Present</p>
                </div>
            </div>
            </motion.div>

            <div className="flex flex-col items-center md:items-start gap-4 mt-4">
            <div className="flex gap-4">
                <motion.button
                onClick={toggleContacts}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 py-2 bg-secondary text-white rounded-full hover:bg-secondary-dark transition-all"
                >
                {showContacts ? <EyeOff size={24} /> : <Eye size={24} />}
                <span className="text-sm md:text-base font-semibold">Know Me More</span>
                </motion.button>

                <a
                href="/documents/cv.pdf"
                download="Anthony_Edbert_Feriyanto_CV.pdf"
                className="flex items-center gap-2 px-4 py-2 bg-secondary text-white rounded-full hover:bg-secondary-dark hover:scale-115 active:scale-95 transition-all transform duration-300"
                >
                <Download size={24} />
                <span className="text-sm md:text-base font-semibold">View CV</span>
                </a>
            </div>

            <AnimatePresence>
                {showContacts && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="flex gap-5 justify-center md:justify-start mt-4"
                >
                    {CONTACTS.map((contact) => (
                    <motion.a
                        key={contact.name}
                        href={contact.url}
                        target="_blank"
                        rel="noreferrer"
                        whileHover={{ scale: 1.75 }}
                        className="flex items-center gap-2 transition-all cursor-pointer"
                    >
                        {contact.icon}
                    </motion.a>
                    ))}
                </motion.div>
                )}
            </AnimatePresence>
            </div>
        </div>

        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="z-10 hidden lg:flex lg:items-center overflow-hidden rounded-full border-4 border-[#0B3866]"
        >
            <div className="relative w-[350px] h-[450px] rounded-full overflow-hidden">
            <Image
                src="/profile/personal_photo.jpg"
                alt="self-portrait"
                fill
                className="object-cover"
            />
            </div>
        </motion.div>
        </div>
    );
};

export default About;
