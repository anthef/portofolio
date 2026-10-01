import { IconType } from 'react-icons'
import {
  SiDjango,
  SiDocker,
  SiFirebase,
  SiFlutter,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiPython,
  SiReact,
  SiTailwindcss,
  SiTensorflow,
  SiTypescript,
} from 'react-icons/si'
import { Ahli } from '.'
import { SkillSet } from './interface'

export interface StackItem {
  skill: SkillSet
  icon: IconType
  // Hover tint when the brand color is too dark to read on the dark theme.
  hover?: string
}

// Monochrome logo strip shown under the hero.
export const STACK: StackItem[] = [
  { skill: Ahli.Python, icon: SiPython },
  { skill: Ahli.TensorFlow, icon: SiTensorflow },
  { skill: Ahli.NextJS, icon: SiNextdotjs, hover: 'var(--ink)' },
  { skill: Ahli.React, icon: SiReact },
  { skill: Ahli.TypeScript, icon: SiTypescript },
  { skill: Ahli.NodeJS, icon: SiNodedotjs },
  { skill: Ahli.Django, icon: SiDjango, hover: '#44B78B' },
  { skill: Ahli.Flutter, icon: SiFlutter },
  { skill: Ahli.Docker, icon: SiDocker },
  { skill: Ahli.MongoDB, icon: SiMongodb },
  { skill: Ahli.Firebase, icon: SiFirebase },
  { skill: Ahli.TailwindCSS, icon: SiTailwindcss },
]
