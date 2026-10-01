import React from 'react'
import { Code } from '../Code'

// Square node drawn where a section rule meets the ruler rails.
export const RailNode: React.FC<{ className?: string }> = ({ className = '' }) => (
  <span
    aria-hidden
    className={`pointer-events-none absolute hidden h-[7px] w-[7px] border border-line-strong bg-bg md:block ${className}`}
  />
)

interface SectionProps {
  id?: string
  className?: string
  innerClassName?: string
  children: React.ReactNode
  // Content rendered full-bleed behind the frame.
  backdrop?: React.ReactNode
  rule?: boolean
}

export const Section: React.FC<SectionProps> = ({
  id,
  className = '',
  innerClassName = 'frame-pad py-20 md:py-28',
  children,
  backdrop,
  rule = true,
}) => (
  <section id={id} className={`relative scroll-mt-16 ${className}`}>
    {backdrop}
    <div className={`frame ${rule ? 'border-t border-line' : ''}`}>
      {rule && (
        <>
          <RailNode className="-left-[4px] -top-[4px]" />
          <RailNode className="-right-[4px] -top-[4px]" />
        </>
      )}
      <div className={`relative ${innerClassName}`}>{children}</div>
    </div>
  </section>
)

interface SectionHeaderProps {
  // Notebook execution count shown as `In [n]:`.
  cell: number
  // One-line snippet that "produces" the section.
  code: string
  title: React.ReactNode
  description?: React.ReactNode
  align?: 'left' | 'center'
  className?: string
  children?: React.ReactNode
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  cell,
  code,
  title,
  description,
  align = 'left',
  className = '',
  children,
}) => {
  const centered = align === 'center'
  return (
    <div className={`flex flex-col gap-5 ${centered ? 'items-center text-center' : 'items-start'} ${className}`}>
      <p className="max-w-full overflow-x-auto whitespace-nowrap text-[12.5px] scrollbar-none">
        <span className="mr-2 font-mono text-faint">In [{cell}]:</span>
        <Code>{code}</Code>
      </p>
      <h2 className="text-balance font-display text-[32px] font-medium leading-[1.04] text-ink md:text-[46px]">
        {title}
      </h2>
      {description && (
        <p className={`max-w-[540px] text-[16px] leading-relaxed text-muted md:text-[17px] ${centered ? 'mx-auto' : ''}`}>
          {description}
        </p>
      )}
      {children}
    </div>
  )
}

// Graph-paper placeholders that complete the last row of a `.cell-grid`
// so the hairline background never shows through as a solid block.
export const GridFill: React.FC<{ count: number; md?: number; lg?: number }> = ({ count, md = 2, lg = 3 }) => {
  const fillMd = (md - (count % md)) % md
  const fillLg = (lg - (count % lg)) % lg
  return (
    <>
      {Array.from({ length: Math.max(fillMd, fillLg) }, (_, i) => (
        <div
          key={i}
          aria-hidden
          className={`graph-paper hidden ${i < fillMd ? 'md:block' : 'md:hidden'} ${i < fillLg ? 'lg:block' : 'lg:hidden'}`}
        />
      ))}
    </>
  )
}
