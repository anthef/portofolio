import { SkillSet } from '../Skills/interface'

export interface ProjectType {
    name: string
    image?: string
    date: string
    description?: string
    links?: LinkType[]
    type: 'AI' | 'SE' | 'All'
    skills : SkillSet[]
  }
  
  interface LinkType {
    name: string
    link: string
  }