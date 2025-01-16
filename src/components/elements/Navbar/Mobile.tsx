import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { NAV_ROUTES } from './constant'  

export const Mobile: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="w-full fixed py-5 z-50 bg-gradient-to-b from-primary to-primary/0">
      <div className="flex justify-between max-w-[80%] mx-auto items-center">
        <Link href="#hero" className="flex items-center gap-5">
          <Image
            src="/profile/icon.png"
            alt="logo"
            width={50}
            height={50}
            className="rounded-full icon-rotate"
          />
        </Link>

        <button onClick={toggleMenu} className="flex items-center text-white font-manrope">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
      </div>

      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleMenu}
        ></div>
      )}
      <div
        className={`fixed top-0 right-0 w-3/4 h-full bg-primary p-5 text-white transform ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        } transition-transform duration-300 ease-in-out z-50`}
      >
        <ul className="flex flex-col gap-6 items-start mt-16">
          {NAV_ROUTES.map((route) => (
            <li key={route.name} onClick={toggleMenu}>
              <Link href={route.path} className="text-xl">
                {route.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
