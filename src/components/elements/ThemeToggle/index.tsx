'use client'
import React from 'react'
import { FiMoon, FiSun } from 'react-icons/fi'
import { useTheme } from '@hooks'

export const ThemeToggle: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { theme, toggleTheme } = useTheme()
  const next = theme === 'dark' ? 'light' : 'dark'

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${next} theme`}
      title={`Switch to ${next} theme`}
      className={`flex h-9 w-9 items-center justify-center rounded-[8px] border border-line-strong bg-surface text-muted transition-colors hover:border-ink hover:text-ink ${className}`}
    >
      {/* Icons swap via CSS so the first paint already matches the theme. */}
      <FiSun size={15} className="hidden dark:block" />
      <FiMoon size={15} className="dark:hidden" />
    </button>
  )
}
