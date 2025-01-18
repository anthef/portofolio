import { SkillSet } from '../Skills/interface'

export interface AchievementType {
  name: string
  issuer: string
  image?: string
  date: string
  medal: 'gold' | 'silver' | 'bronze' | '4th' | '5th' | 'top-10' | 'unranked'
  description?: string
  skills: SkillSet[] 
  links?: LinkType[]
  jenjang : 'university' | 'highschool' | 'middle' | 'elementary' | 'All'
}

interface LinkType {
  name: string
  link: string
}