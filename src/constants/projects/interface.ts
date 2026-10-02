import { SkillSet } from '../Skills/interface'

export interface ProjectType {
    name: string
    image?: string
    date: string
    description?: string
    links?: LinkType[]
    type: 'AI' | 'SE' | 'All'
    // Set when Anthony started the product, e.g. 'Founder'.
    role?: string
    skills : SkillSet[]
    collaborators?: Collaborator[]
    
  }
  
  interface LinkType {
    name: string
    link: string
  }

  interface Collaborator {
    name : string
    link : string
  }