import React from 'react'

interface TagProps {
  children: React.ReactNode
  href?: string
  className?: string
}

// Lowercase mono tag for skills and types.
export const Tag: React.FC<TagProps> = ({ children, href, className = '' }) => {
  const classes = `inline-flex h-6 items-center gap-1.5 whitespace-nowrap rounded-[5px] border border-line bg-surface px-2 font-mono text-[11.5px] lowercase text-muted ${className}`
  if (href) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={`${classes} transition-colors hover:border-accent hover:text-accent`}>
        {children}
      </a>
    )
  }
  return <span className={classes}>{children}</span>
}

interface TabsProps<T extends string | number> {
  value: T
  onChange: (value: T) => void
  options: { value: T; label: string; count?: number }[]
  className?: string
  ariaLabel: string
}

// Underlined tab row with superscript counts.
export const Tabs = <T extends string | number>({ value, onChange, options, className = '', ariaLabel }: TabsProps<T>) => (
  <div
    role="tablist"
    aria-label={ariaLabel}
    className={`scrollbar-none flex max-w-full gap-5 overflow-x-auto border-b border-line ${className}`}
  >
    {options.map((option) => {
      const active = option.value === value
      return (
        <button
          key={option.value}
          type="button"
          role="tab"
          aria-selected={active}
          onClick={() => onChange(option.value)}
          className={`relative -mb-px flex h-10 shrink-0 items-start gap-1 border-b-2 pt-2.5 text-[14.5px] transition-colors duration-200 ${
            active ? 'border-accent text-ink' : 'border-transparent text-muted hover:text-ink'
          }`}
        >
          {option.label}
          {option.count !== undefined && (
            <sup className={`top-0 font-mono text-[10.5px] ${active ? 'text-accent' : 'text-faint'}`}>{option.count}</sup>
          )}
        </button>
      )
    })}
  </div>
)
