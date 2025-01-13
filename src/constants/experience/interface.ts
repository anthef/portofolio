import { SkillSet } from '../Skills/interface'

interface RoleType {
    name : string
    date : string
    description : string[]
}

interface LinkType {
    name : string
    link : string
}

export interface SingularExperienceType {
    name : string
    logo : string
    date? : string
    roles : RoleType[]
    location? : string
    skills? : SkillSet[]
    links? : LinkType[]
    headlineRole? : string 
}


export interface ExperienceType {
    Work : SingularExperienceType[]
    Org : SingularExperienceType[]
}