'use client'
import React from 'react'
import EducationDesktop  from './EducationDesktop'
import { useWindowSize } from '@hooks';
import EducationMobile from './EducationMobile'

export const Education: React.FC = () => {
  const { width } = useWindowSize()
  return width > 768 ? <EducationDesktop /> : <EducationMobile />
}