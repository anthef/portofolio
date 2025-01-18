'use client'
import React from 'react'
import { About } from './about/About'
import { Projects }from './projects/Projects'
import { Experiences } from './experience/Experiences'
import { Achievement } from './achievement/Achievement'
import Education from './education/Education'

export const LandingModule: React.FC = () => {

  return (
    <>
      <div>
        <About />
        <Education />
        <Achievement/>
        <Experiences />
        <Projects />
      </div>
    </>
  )
}