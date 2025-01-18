'use client'
import React from 'react'
import { About } from './about/About'
import { Projects }from './projects/Projects'
import { Experiences } from './experience/Experiences'

export const LandingModule: React.FC = () => {

  return (
    <>
      <div>
        <About />
        <Experiences />
        <Projects />
      </div>
    </>
  )
}