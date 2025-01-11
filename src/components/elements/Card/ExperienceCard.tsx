'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import { Chips } from '../Chips'
import { SingularExperienceType } from 'src/constants/experience/interface'

const ExperienceCard = ({
  name,
  headlineRole,
  logo,
  links,
  date,
  location,
  roles,
  skills,
}: SingularExperienceType) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className="bg-[#0B3866]/25 px-[30px] pt-[25px] pb-[15px] rounded-[30px] flex flex-col gap-[25px] backdrop-blur-md shadow-xl w-full max-w-[350px] md:max-w-[600px]">
      <div className="grid grid-cols-5 md:grid-cols-4 gap-8">
        <div className="relative w-24 h-24 self-center col-span-2 md:col-span-1">
          <Image
            src={`/assets/${logo}`}
            alt={name}
            fill
            priority
            className="rounded-full object-cover bg-white object-center shadow-lg shadow-[#9BF6FF]/25"
          />
        </div>
        <div className="col-span-3 self-center space-y-1">
          <h2>{headlineRole ?? roles[0].name}</h2>
          <h3>{name}</h3>
          <p className="text-sm md:text-lg">{date ?? roles[0].date}</p>
          <p className="text-xs md:text-sm">{location}</p>
        </div>
      </div>
      {isOpen && (
        <div className="flex flex-col gap-4 md:gap-[25px]">
          {roles.map((role) => (
            <div className="flex flex-col gap-1" key={role.name}>
              {roles.length > 1 && (
                <div>
                  <p className="font-bold">{role.name}</p>
                  <p>{role.date}</p>
                </div>
              )}
              {role.description?.map((desc, idx) => (
                <div className="flex gap-2 text-sm md:text-lg" key={idx}>
                  <p>✨</p>
                  <p>{desc}</p>
                </div>
              ))}
            </div>
          ))}

          {skills && (
            <div className="flex gap-1 overflow-x-auto py-2">
              {skills.map((skill) => (
                <Chips
                  key={skill.name}
                  text={skill.name}
                  color={skill.color}
                  className="text-sm"
                  onClick={() => window.open(skill.link, '_blank')}
                />
              ))}
            </div>
          )}

          {links && (
            <div className="flex flex-wrap gap-2 font-bold text-sm md:text-lg">
              Links:{' '}
              {links.map((link, idx) => (
                <span className="text-secondary underline" key={idx}>
                  <a
                    href={link.link}
                    className="font-r-flex font-normal"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {link.name}
                  </a>
                </span>
              ))}
            </div>
          )}
        </div>
      )}
      <div className="w-full">
        <ChevronDownIcon
          className={`w-8 h-8 mx-auto cursor-pointer transition-all ${
            isOpen && 'rotate-180'
          }`}
          onClick={() => setIsOpen(!isOpen)}
        />
      </div>
    </div>
  )
}

export default ExperienceCard