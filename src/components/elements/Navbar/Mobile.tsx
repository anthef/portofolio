import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

export const Mobile: React.FC = () => {
  return (
    <div className="w-full fixed py-5 z-50 bg-gradient-to-b from-primary to-primary/0">
      <div className="flex justify-center max-w-[80%] mx-auto items-center">
        <Link href="#hero" className="flex items-center gap-5">
          <Image
            src="/assets/images/logo.jpg"
            alt="logo"
            width={50}
            height={50}
            className="rounded-full"
          />
          <p className="text-white font-bold text-xl">Anthony</p>
        </Link>
      </div>
    </div>
  )
}