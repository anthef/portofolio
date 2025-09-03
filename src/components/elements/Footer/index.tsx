import Image from 'next/image';
import React from 'react';
import { CONTACTS } from '@constants';
import { FiDownload as Download } from 'react-icons/fi';

export const Footer: React.FC = () => {
  return (
    <>
      <div className="flex w-full select-none flex-col items-center justify-between bg-primary py-4 px-5 md:flex-row md:py-8 md:px-16 animate-fadeIn bg-[#123655]">
        <div className="flex flex-col items-center justify-center text-center md:flex-row md:text-left gap-4 text-white max-w-full md:max-w-[60%] lg:max-w-[40%]">
          <Image
            src="/profile/icon.png"
            alt="logo"
            width={50}
            height={50}
            className="rounded-full animate-bounce hover:scale-105 transition-all duration-300"
          />
          <div className="flex flex-col gap-2">
            <div className="flex">
              <h3 className="text-base md:text-md lg:text-md shimmer-text">
                {new Date().getFullYear()} Anthony Edbert Feriyanto. All rights reserved
              </h3>
            </div>
            <p className="text-xs md:text-sm lg:text-base text-white">
              Created by{' '}
              <a
                href=""
                target="_blank"
                rel="noreferrer"
                className="text-secondary underline underline-offset-4 font-bold hover:text-white transition-colors duration-300"
              >
                Anthony Edbert Feriyanto
              </a>
            </p>
          </div>
        </div>

        <div className="mt-6 flex select-none flex-col items-center md:items-end md:mt-0">
          <div className="flex gap-4 mb-4 justify-center md:justify-start">
            {CONTACTS.map((contact, index) => (
              <a
                key={contact.name}
                href={contact.url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 hover:scale-125 transition-all cursor-pointer animate-fadeIn"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {contact.icon}
              </a>
            ))}
          </div>
          <a
            href="/documents/CV - Anthony Edbert Feriyanto.pdf"
            download="Anthony_Edbert_Feriyanto_CV.pdf"
            className="flex items-center gap-2 px-4 py-2 md:px-6 md:py-3 bg-secondary text-white rounded-lg font-bold shadow-lg hover:bg-secondary-dark transition-all transform hover:scale-105 active:scale-95 border border-white text-sm md:text-base"
          >
            <Download size={15} className="mr-2" /> 
            <div className='text-xs'>View CV</div>
          </a>
        </div>
      </div>
    </>
  );
};
