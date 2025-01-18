'use client'
import React from 'react'
import { About } from './about/About'
import { Projects }from './projects/Projects'
import { Experiences } from './experience/Experiences'
import { Achievement } from './achievement/Achievement'

export const LandingModule: React.FC = () => {

  return (
    <>
      <div>
        <About />
        <Achievement/>
        <Experiences />
        <Projects />
      </div>
    </>
  )
}