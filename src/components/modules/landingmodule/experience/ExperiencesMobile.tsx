import { Card, Chips } from '@elements'
import React, { useState } from 'react'
import { EXPERIENCES } from 'src/constants/experience'
import { motion } from 'framer-motion'

const ExperiencesMobile = () => {
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
        className="px-6 py-3 backdrop-blur-lg relative"
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

      <div className="relative z-20 w-full max-w-7xl flex flex-col items-center">
        {EXPERIENCES[experienceMap[selectedTag]].map((experience, index) => {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const isLast =
            index === EXPERIENCES[experienceMap[selectedTag]].length - 1

          return (
            <div
              key={experience.name}
              className="flex items-center w-full mb-32 justify-center"
            >
              <div className="w-full max-w-3xl">
                <Card variant={2} props={experience} />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ExperiencesMobile
