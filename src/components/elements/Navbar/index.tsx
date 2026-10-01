'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FiDownload, FiMenu, FiX } from 'react-icons/fi'
import { CV_URL } from '@constants'
import { NAV_ROUTES } from './constant'
import { Button } from '../Button'
import { RailNode } from '../Section'
import { ThemeToggle } from '../ThemeToggle'

// Tracks which section is currently under the header.
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
    <header className="sticky top-0 z-50 w-full border-b border-line bg-[color-mix(in_srgb,var(--bg)_82%,transparent)] backdrop-blur-md">
      <div className="frame frame-pad flex h-16 items-center justify-between gap-6">
        <RailNode className="-bottom-[4px] -left-[4px]" />
        <RailNode className="-bottom-[4px] -right-[4px]" />

        <Link
          href="#about"
          aria-label="Anthony Edbert Feriyanto — back to top"
          className="group flex h-9 items-center gap-2.5 rounded-[8px] border border-line bg-surface pl-1 pr-3 transition-colors hover:border-line-strong"
        >
          <Image
            src="/profile/icon.png"
            alt=""
            width={26}
            height={26}
            className="rounded-[6px] bg-raised"
          />
          <span className="font-mono text-[13.5px] text-ink">
            anthony<span className="text-faint">.ipynb</span>
          </span>
          <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent" title="saved" />
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex">
          {NAV_ROUTES.map((route) => (
            <Link
              key={route.path}
              href={route.path}
              className={`relative text-[14.5px] transition-colors duration-200 ${
                active === route.path ? 'text-ink' : 'text-muted hover:text-ink'
              }`}
            >
              {route.name}
              <span
                aria-hidden
                className={`absolute -bottom-[23px] left-0 h-[2px] w-full bg-accent transition-transform duration-300 ease-out ${
                  active === route.path ? 'scale-x-100' : 'scale-x-0'
                }`}
              />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button href={CV_URL} target="_blank" rel="noreferrer" size="sm" className="hidden sm:inline-flex">
            <FiDownload size={14} />
            Resume
          </Button>
          <button
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            className="flex h-9 w-9 items-center justify-center rounded-[8px] border border-line-strong bg-surface text-ink lg:hidden"
          >
            {isMenuOpen ? <FiX size={16} /> : <FiMenu size={16} />}
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        className={`grid border-line transition-[grid-template-rows] duration-300 ease-out lg:hidden ${
          isMenuOpen ? 'grid-rows-[1fr] border-t' : 'grid-rows-[0fr]'
        }`}
      >
        <nav aria-label="Mobile" className="overflow-hidden">
          <ul className="frame">
            {NAV_ROUTES.map((route, index) => (
              <li key={route.path} className="border-b border-line last:border-b-0">
                <Link
                  href={route.path}
                  onClick={() => setIsMenuOpen(false)}
                  tabIndex={isMenuOpen ? 0 : -1}
                  className="frame-pad flex h-12 items-center justify-between font-mono text-[13px] uppercase tracking-[0.06em] text-text"
                >
                  <span>
                    <span className="mr-3 text-faint">{String(index + 1).padStart(2, '0')}</span>
                    {route.name}
                  </span>
                  <span className="text-faint">→</span>
                </Link>
              </li>
            ))}
            <li className="frame-pad py-4 sm:hidden">
              <Button
                href={CV_URL}
                target="_blank"
                rel="noreferrer"
                className="w-full"
                tabIndex={isMenuOpen ? 0 : -1}
              >
                <FiDownload size={14} />
                Download resume
              </Button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
