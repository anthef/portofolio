'use client'
import React from 'react'
import AboutDesktop  from './AboutDesktop'
import { useWindowSize } from '@hooks';
import AboutMobile from './AboutMobile'

export const About: React.FC = () => {
  const { width } = useWindowSize()
  return width > 768 ? <AboutDesktop /> : <AboutMobile />
}