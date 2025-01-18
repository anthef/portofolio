'use client'
import React from 'react'
import ProjectsDesktop  from './ProjectsDesktop'
import { useWindowSize } from '@hooks';
import ProjectsMobile from './ProjectsMobile'

export const Projects: React.FC = () => {
  const { width } = useWindowSize()
  return width > 768 ? <ProjectsDesktop /> : <ProjectsMobile />
}