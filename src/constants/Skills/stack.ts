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

// Where a module sits in the stack, from models down to infrastructure.
export type StackLayer = 'ml' | 'apps' | 'backend' | 'data' | 'infra'
export const STACK_LAYERS: StackLayer[] = ['ml', 'apps', 'backend', 'data', 'infra']

export interface StackItem {
  skill: SkillSet
  icon: IconType
  layer: StackLayer
  // Hover tint when the brand color is too dark to read on the dark theme.
  hover?: string
}

// Tech stack shown under the hero, following the CV's skills section.
export const STACK: StackItem[] = [
  { skill: Ahli.Python, icon: SiPython, layer: 'ml' },
  { skill: Ahli.TypeScript, icon: SiTypescript, layer: 'apps' },
  { skill: Ahli.Golang, icon: SiGo, layer: 'backend' },
  { skill: Ahli.PyTorch, icon: SiPytorch, layer: 'ml' },
  { skill: Ahli.TensorFlow, icon: SiTensorflow, layer: 'ml' },
  { skill: Ahli.NextJS, icon: SiNextdotjs, layer: 'apps', hover: 'var(--ink)' },
  { skill: Ahli.React, icon: SiReact, layer: 'apps' },
  { skill: Ahli.NodeJS, icon: SiNodedotjs, layer: 'backend' },
  { skill: Ahli.NestJS, icon: SiNestjs, layer: 'backend' },
  { skill: Ahli.Django, icon: SiDjango, layer: 'backend', hover: '#44B78B' },
  { skill: Ahli.SpringBoot, icon: SiSpringboot, layer: 'backend' },
  { skill: Ahli.Flutter, icon: SiFlutter, layer: 'apps' },
  { skill: Ahli.Streamlit, icon: SiStreamlit, layer: 'ml' },
  { skill: Ahli.PostgreSQL, icon: SiPostgresql, layer: 'data' },
  { skill: Ahli.ClickHouse, icon: SiClickhouse, layer: 'data' },
  { skill: Ahli.GCP, icon: SiGooglecloud, layer: 'infra' },
  { skill: Ahli.Terraform, icon: SiTerraform, layer: 'infra' },
]
