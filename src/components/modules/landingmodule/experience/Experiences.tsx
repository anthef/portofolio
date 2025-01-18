'use client'
import React from 'react'
import { useWindowSize } from '@hooks';
import ExperiencesMobile from './ExperiencesMobile'
import ExperiencesDesktop  from './ExperiencesDesktop'

export const Experiences: React.FC = () => {
  const { width } = useWindowSize()
  return width > 768 ? <ExperiencesDesktop /> : <ExperiencesMobile />
}