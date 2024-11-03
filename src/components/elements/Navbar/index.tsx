'use client'
import React from 'react'
import { Desktop } from './Desktop'
import { useWindowSize } from '@hooks';
import { Mobile } from './Mobile'

export const Navbar: React.FC = () => {
  const { width } = useWindowSize()
  return width > 768 ? <Desktop /> : <Mobile />
}