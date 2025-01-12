export interface SkillSet {
    name : string
    color : string
    link : string
    logo : string
}


export interface SkillType {
    [key:string] : SkillSet
}