import React from 'react'
import { props } from './interface'
import ProjectCard from './ProjectCard'
import ExperienceCard from './ExperienceCard'
import ExperienceMobileCard from './ExperienceMobileCard'
import ProjectMobileCard from './ProjectMobileCard'
import AchievementCard from './AchievementCard'
import AchievementMobileCard from './AchievementMobileCard'

export const Card: React.FC<props> = ({ variant, props }) => {

  switch (variant) {
    case 0:
      return <ProjectCard {...props} />
    case 1:
      return <ExperienceCard {...props} />
    case 2:
      return <ExperienceMobileCard {...props} />
    case 3 : 
      return <ProjectMobileCard {...props} />
    case 4 : 
      return <AchievementCard {...props} />
    case 5 :
      return <AchievementMobileCard {...props} />
    
  }
}