import React from 'react'
import { props } from './interface'
import ProjectCard from './ProjectCard'
import ExperienceCard from './ExperienceCard'

export const Card: React.FC<props> = ({ variant, props }) => {
  // TODO: Write element's logic

  switch (variant) {
    case 0:
      return <ProjectCard {...props} />
    case 1:
      return <ExperienceCard {...props} />
    default:
    //   return <AchievementCard {...props} />
        return null
  }
}