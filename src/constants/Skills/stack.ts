import { IconType } from 'react-icons'
import {
  SiClickhouse,
  SiDjango,
  SiFlutter,
  SiGo,
  SiGooglecloud,
  SiNestjs,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPython,
  SiPytorch,
  SiReact,
  SiSpringboot,
  SiStreamlit,
  SiTensorflow,
  SiTerraform,
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

// Tech stack shown under the hero, following the CV's skills section.
export const STACK: StackItem[] = [
  { skill: Ahli.Python, icon: SiPython },
  { skill: Ahli.TypeScript, icon: SiTypescript },
  { skill: Ahli.Golang, icon: SiGo },
  { skill: Ahli.PyTorch, icon: SiPytorch },
  { skill: Ahli.TensorFlow, icon: SiTensorflow },
  { skill: Ahli.NextJS, icon: SiNextdotjs, hover: 'var(--ink)' },
  { skill: Ahli.React, icon: SiReact },
  { skill: Ahli.NodeJS, icon: SiNodedotjs },
  { skill: Ahli.NestJS, icon: SiNestjs },
  { skill: Ahli.Django, icon: SiDjango, hover: '#44B78B' },
  { skill: Ahli.SpringBoot, icon: SiSpringboot },
  { skill: Ahli.Flutter, icon: SiFlutter },
  { skill: Ahli.Streamlit, icon: SiStreamlit },
  { skill: Ahli.PostgreSQL, icon: SiPostgresql },
  { skill: Ahli.ClickHouse, icon: SiClickhouse },
  { skill: Ahli.GCP, icon: SiGooglecloud },
  { skill: Ahli.Terraform, icon: SiTerraform },
]
