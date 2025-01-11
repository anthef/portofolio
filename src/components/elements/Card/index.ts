import React from 'react'
import ExperienceCard from './ExperienceCard'
import { props } from './interface'
import ProjectCard from './ProjectCard'
import AchievementCard from './AchievementCard'

export const Card: React.FC<props> = ({ variant, props }) => {
  // TODO: Write element's logic

  switch (variant) {
    case 0:
      return <ProjectCard {...props} />
    case 1:
      return <ExperienceCard {...props} />
    default:
      return <AchievementCard {...props} />
  }
}