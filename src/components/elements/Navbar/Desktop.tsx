import Link from 'next/link'
import React from 'react'
import { NAV_ROUTES } from './constant'
import Image from 'next/image'

export const Desktop: React.FC = () => {

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
          <p className="text-white font-bold text-xl">Anthony</p>
        </Link>
        <div className="flex gap-14">
          {NAV_ROUTES.map((item, index) => (
            <Link href={item.path} key={index}>
              <button className="text-white hover:text-secondary transition-all">
                {item.name}
              </button>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}