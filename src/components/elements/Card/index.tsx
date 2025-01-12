import React from 'react'
import { props } from './interface'
import ProjectCard from './ProjectCard'

export const Card: React.FC<props> = ({ variant, props }) => {
  // TODO: Write element's logic

  switch (variant) {
    case 0:
      return <ProjectCard {...props} />
    case 1:
      return null
    default:
    //   return <AchievementCard {...props} />
        return null
  }
}