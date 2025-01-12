export interface AchievementType {
  name: string
  issuer: string
  image?: string
  date: string
  medal: 'gold' | 'silver' | 'bronze' | 'none'
  description?: string
  links?: LinkType[]
}

interface LinkType {
  name: string
  link: string
}