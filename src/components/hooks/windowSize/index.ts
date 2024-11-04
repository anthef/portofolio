'use client'
import { useEffect, useState } from 'react'
import { props } from './interface'

export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState<props>({
    width: 0,
    height: 0,
  })
  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }
    window.addEventListener('resize', handleResize)
    handleResize()
    return () => window.removeEventListener('resize', handleResize)
  }, []) 
  return windowSize
}