'use client'
import { useCallback, useEffect, useState } from 'react'

export type Theme = 'light' | 'dark'

const readTheme = (): Theme =>
  document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light'

// The initial theme is set by an inline script in the root layout; this hook
// mirrors it into React state and keeps every consumer in sync.
export const useTheme = () => {
  const [theme, setThemeState] = useState<Theme>('light')

  useEffect(() => {
    setThemeState(readTheme())
    const observer = new MutationObserver(() => setThemeState(readTheme()))
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    })
    return () => observer.disconnect()
  }, [])

  const setTheme = useCallback((next: Theme) => {
    document.documentElement.dataset.theme = next
    try {
      localStorage.setItem('theme', next)
    } catch {
      // Storage can be unavailable (private mode); the theme still applies for this visit.
    }
  }, [])

  const toggleTheme = useCallback(() => {
    setTheme(readTheme() === 'dark' ? 'light' : 'dark')
  }, [setTheme])

  return { theme, setTheme, toggleTheme }
}
