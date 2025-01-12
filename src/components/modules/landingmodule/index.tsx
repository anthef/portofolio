'use client'
import React from 'react'
import About from './about/About'
import Projects from './projects/Projects'

export const LandingModule: React.FC = () => {

  return (
    <>
      <div>
        <About />
      </div>
      <div>
        <Projects />
      </div>

    </>
  )
}