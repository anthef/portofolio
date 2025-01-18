'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import { ChipsExperience } from '../ChipsExperience'
import { SingularExperienceType } from 'src/constants/experience/interface'

const ExperienceMobileCard = ({
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
    <div className="bg-[#0B3866]/25 px-4 py-3 rounded-[30px] flex flex-col gap-4 backdrop-blur-md shadow-xl w-full max-w-[350px] md:max-w-[600px] mx-auto">
      <div className="grid grid-cols-4 gap-x-1 gap-y-3 md:grid-cols-5 md:gap-x-4">
        <div className="relative w-16 h-16 self-center col-span-2 md:col-span-1">
          <Image
            src={`/experiences/${logo}`}
            alt={name}
            fill
            priority
            className="rounded-full object-cover bg-white object-center shadow-lg shadow-[#9BF6FF]/25"
          />
        </div>
        
        <div className="col-span-2 md:col-span-3 self-center space-y-1">
          <div className="text-lg md:text-xl font-semibold font-poppins">{headlineRole ?? roles[0].name}</div>
          <h3 className="text-md md:text-lg font-normal text-gray-400">{name}</h3>
          <p className="text-sm md:text-md">{date ?? roles[0].date}</p>
        </div>
      </div>
      
      {isOpen && (
        <div className="flex flex-col gap-3 md:gap-5">
          {roles.map((role) => (
            <div className="flex flex-col gap-2" key={role.name}>
              {roles.length > 1 && (
                <div>
                  <p className="font-bold">{role.name}</p>
                  <p>{role.date}</p>
                </div>
              )}
              {role.description?.map((desc, idx) => (
                <div className="flex gap-2 text-sm md:text-lg" key={idx}>
                  <p>✅</p>
                  <p>{desc}</p>
                </div>
              ))}
            </div>
          ))}

          {skills && (
            <div className="flex flex-col">
              <div
                className={`flex gap-1 md:gap-2 ${
                  skills.length > 1
                    ? "flex-nowrap overflow-x-auto pr-2 scrollbar scrollbar-custom"
                    : "flex-wrap overflow-hidden"
                }`}
              >
                {skills.length > 0 ? (
                  skills.map((skill, idx) => {
                    if (!skill || !skill.name) {
                      console.warn(`Skill at index ${idx} is invalid:`, skill);
                      return null;
                    }
                    return (
                      <ChipsExperience 
                        key={skill.logo}
                        text={''}
                        color={skill.color}
                        leftIcon={skill.logo}
                        className="text-xs md:text-sm flex-shrink-0"
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(skill.link, "_blank");
                        }}
                      />
                    )
                  })
                ) : (
                  <p className="text-xs md:text-sm text-gray-500">No skills listed.</p>
                )}
              </div>
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
      
      <div className="flex items-center justify-start w-full">
        <button onClick={() => setIsOpen(!isOpen)} className="flex items-center">
          <ChevronDownIcon
            className={`w-6 h-6 cursor-pointer transition-transform ${isOpen ? 'rotate-180' : ''}`}
          />
        </button>
        <p className="text-xs md:text-sm ml-2">{location}</p>
      </div>
      
    </div>
  )
}

export default ExperienceMobileCard
