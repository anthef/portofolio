import { Card, Chips } from '@elements'
import React, { useState } from 'react'
import { EXPERIENCES } from 'src/constants/experience'
import { motion } from 'framer-motion'

const ExperiencesDesktop = () => {
  const [selectedTag, setSelectedTag] = useState<number>(0)
  const experienceMap: ('Work' | 'Org')[] = ['Work', 'Org']

  return (
    <div
      id="experiences"
      className="relative flex flex-col items-center justify-center gap-8 z-10 py-28 md:py-40 px-2 max-w-screen-2xl mx-auto"
    >
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
        <h1 className="text-4xl md:text-4xl lg:text-4xl font-semibold text-white">
          Experiences
        </h1>
      </motion.div>

      <div className="flex gap-2 z-10 py-2">
        <Chips
          enabled={selectedTag === 0}
          onClick={() => setSelectedTag(0)}
          text="Work"
          color="#9BF6FF"
        />
        <Chips
          enabled={selectedTag === 1}
          onClick={() => setSelectedTag(1)}
          text="Organization"
          color="#9BF6FF"
        />
      </div>

      <div className="translate-x-20 relative z-20 w-full max-w-7xl">
        {EXPERIENCES[experienceMap[selectedTag]].map((experience, index) => {
          const isLeft = index % 2 === 0
          const isLast =
            index === EXPERIENCES[experienceMap[selectedTag]].length - 1

          return (
            <div
              key={experience.name}
              className="flex items-center w-full mb-32"
            >
              {isLeft && (
                <div className="relative hidden md:flex w-6/12 justify-end pr-24">
                  <div className="w-full max-w-3xl translate-x-20">
                    <Card variant={1} props={experience} />
                  </div>
                  <div className="translate-x-20 absolute top-1/2 -right-20 -translate-y-1/2 w-40 border-t-2 border-white"></div> 
                </div>
              )}

              <div className="w-2/12 flex justify-center relative translate-x-20">
                <div className="w-6 h-6 bg-white rounded-full z-10"></div>

                {!isLast && (
                  <div className="absolute top-9 left-1/2 -translate-x-1/2 w-px h-40 bg-white"></div> 
                )}
              </div>
              
              {!isLeft && (
                <div className="relative hidden md:flex w-6/12 justify-start pl-24"> 
                  <div className="w-full max-w-3xl translate-x-40">
                    <Card variant={1} props={experience} />
                  </div>
                  <div className="translate-x-40 absolute top-1/2 -left-40 -translate-y-1/2 w-60 border-t-2 border-white"></div> 
                </div>
              )}

              <div className="md:hidden w-full mt-12 relative px-4">
                <Card variant={1} props={experience} />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-12 bg-white"></div> 
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ExperiencesDesktop
