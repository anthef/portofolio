import React from 'react'
import { props } from './interface'
import ProjectCard from './ProjectCard'
import ExperienceCard from './ExperienceCard'
import ExperienceMobileCard from './ExperienceMobileCard'

export const Card: React.FC<props> = ({ variant, props }) => {

  switch (variant) {
    case 0:
      return <ProjectCard {...props} />
    case 1:
      return <ExperienceCard {...props} />
    case 2:
      return <ExperienceMobileCard {...props} />
    
  }
}