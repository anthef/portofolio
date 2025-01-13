import { ExperienceType } from './interface'
import OrgExperience from './organization'
import WorkExperience from './work'

export const EXPERIENCES: ExperienceType = {
  Work: WorkExperience,
  Org: OrgExperience,
}