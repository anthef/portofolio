'use client'
import React from 'react'
import AchievementDesktop  from './AchievementDesktop'
import { useWindowSize } from '@hooks';
import AchievementMobile from './AchievementMobile'

export const Achievement: React.FC = () => {
  const { width } = useWindowSize()
  return width > 768 ? <AchievementDesktop /> : <AchievementMobile />
}