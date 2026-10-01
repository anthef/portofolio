'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FiDownload, FiMenu, FiX } from 'react-icons/fi'
import { CV_URL } from '@constants'
import { NAV_ROUTES } from './constant'
import { Button } from '../Button'
import { ThemeToggle } from '../ThemeToggle'

// Tracks which section is currently in the middle of the viewport.
const useActiveSection = () => {
  const [active, setActive] = useState<string>('')

  useEffect(() => {
    const sections = NAV_ROUTES.map((route) => document.querySelector(route.path)).filter(
      (el): el is Element => el !== null
    )
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`)
        })
      },
      { rootMargin: '-45% 0px -50% 0px' }
    )
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  return active
}

export const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const active = useActiveSection()

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setIsMenuOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <header className="pointer-events-none sticky top-0 z-50 w-full px-3 pt-3">
      <div className="frame pointer-events-auto">
        <div className="card-shadow flex h-14 items-center justify-between gap-4 rounded-full bg-[color-mix(in_srgb,var(--surface)_82%,transparent)] pl-2 pr-2 backdrop-blur-md">
          <Link
            href="#about"
            aria-label="Anthony Edbert Feriyanto — back to top"
            className="flex h-10 items-center gap-2.5 rounded-full bg-well pl-1 pr-3.5 transition-colors hover:bg-raised"
          >
            <Image src="/profile/icon.png" alt="" width={32} height={32} className="h-8 w-8 rounded-full bg-raised" />
            <span className="font-mono text-[13.5px] text-ink">
              anthony<span className="text-faint">.ipynb</span>
            </span>
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent" />
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
            {NAV_ROUTES.map((route) => (
              <Link
                key={route.path}
                href={route.path}
                className={`rounded-full px-3.5 py-2 text-[14px] transition-colors duration-200 ${
                  active === route.path ? 'bg-accent-soft text-accent' : 'text-muted hover:text-ink'
                }`}
              >
                {route.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1.5">
            <ThemeToggle />
            <Button href={CV_URL} target="_blank" rel="noreferrer" size="sm" className="hidden h-10 sm:inline-flex">
              <FiDownload size={14} />
              Resume
            </Button>
            <button
              type="button"
              onClick={() => setIsMenuOpen((open) => !open)}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-well text-ink lg:hidden"
            >
              {isMenuOpen ? <FiX size={16} /> : <FiMenu size={16} />}
            </button>
          </div>
        </div>

        <div
          id="mobile-menu"
          className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out lg:hidden ${
            isMenuOpen ? 'mt-2 grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
          }`}
        >
          <nav aria-label="Mobile" className="overflow-hidden">
            <ul className="card-shadow rounded-[26px] bg-surface p-2">
              {NAV_ROUTES.map((route, index) => (
                <li key={route.path}>
                  <Link
                    href={route.path}
                    onClick={() => setIsMenuOpen(false)}
                    tabIndex={isMenuOpen ? 0 : -1}
                    className="flex h-12 items-center justify-between rounded-full px-4 text-[15px] text-text transition-colors hover:bg-well"
                  >
                    <span>
                      <span className="mr-3 font-mono text-[12px] text-accent">[{index + 1}]</span>
                      {route.name}
                    </span>
                    <span className="text-faint">→</span>
                  </Link>
                </li>
              ))}
              <li className="p-2 sm:hidden">
                <Button href={CV_URL} target="_blank" rel="noreferrer" className="w-full" tabIndex={isMenuOpen ? 0 : -1}>
                  <FiDownload size={14} />
                  Download resume
                </Button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
}
