'use client'
import React from 'react'
import { About } from './about/About'
import { Projects }from './projects/Projects'
import { Experiences } from './experience/Experiences'
import { Achievement } from './achievement/Achievement'
import { Education } from './education/Education'
import ChatBot from './chatbot/Chatbot'

export const LandingModule: React.FC = () => {

  return (
    <>
      <div>
        <About />        
        <Achievement/>
        <Experiences />
        <Projects />
        <Education />
        <ChatBot/>
      </div>
    </>
  )
}