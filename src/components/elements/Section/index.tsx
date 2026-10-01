import React from 'react'
import { Code } from '../Code'

// Dashed notebook margin running down the page, between the prompt gutter and the content.
export const MarginLine: React.FC = () => (
  <span
    aria-hidden
    className="pointer-events-none absolute inset-y-0 left-[152px] hidden border-l border-dashed border-line-strong lg:block"
  />
)

interface SectionProps {
  id?: string
  className?: string
  innerClassName?: string
  children: React.ReactNode
  // Content rendered full-bleed behind the column (colour fields, etc.).
  backdrop?: React.ReactNode
}

export const Section: React.FC<SectionProps> = ({
  id,
  className = '',
  innerClassName = 'py-16 md:py-24',
  children,
  backdrop,
}) => (
  <section id={id} className={`relative scroll-mt-20 ${className}`}>
    {backdrop}
    <div className="frame frame-pad">
      <MarginLine />
      <div className={`nb-body relative ${innerClassName}`}>{children}</div>
    </div>
  </section>
)

interface SectionHeaderProps {
  // Notebook execution count shown as `In [n]:` in the gutter.
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
    <div className={`nb-gutter ${className}`}>
      <span className="mb-2 block font-mono text-[12px] text-accent lg:mb-0 lg:pt-[2px] lg:text-right">
        In [{cell}]:
      </span>
      <div className={`flex min-w-0 flex-col gap-5 ${centered ? 'items-center text-center' : 'items-start'}`}>
        <p className="max-w-full overflow-x-auto whitespace-nowrap text-[12.5px] scrollbar-none">
          <Code>{code}</Code>
        </p>
        <h2 className="text-balance font-display text-[34px] font-medium leading-[1.04] text-ink md:text-[48px]">
          {title}
        </h2>
        {description && (
          <p className={`max-w-[540px] text-[16px] leading-relaxed text-muted md:text-[17px] ${centered ? 'mx-auto' : ''}`}>
            {description}
          </p>
        )}
        {children}
      </div>
    </div>
  )
}

// Soft blurred colour field used as a section backdrop.
export const Blob: React.FC<{ className?: string; color?: string }> = ({ className = '', color = 'var(--accent)' }) => (
  <span aria-hidden className={`blob ${className}`} style={{ background: color }} />
)
