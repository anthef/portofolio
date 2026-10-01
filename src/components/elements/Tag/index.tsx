import React from 'react'

interface TagProps {
  children: React.ReactNode
  href?: string
  className?: string
}

// Lowercase mono tag for skills and types.
export const Tag: React.FC<TagProps> = ({ children, href, className = '' }) => {
  const classes = `inline-flex h-6 items-center gap-1.5 whitespace-nowrap rounded-full bg-raised px-2.5 font-mono text-[11.5px] lowercase text-muted ${className}`
  if (href) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={`${classes} transition-colors hover:bg-accent-soft hover:text-accent`}>
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

// Soft pill tabs with superscript counts.
export const Tabs = <T extends string | number>({ value, onChange, options, className = '', ariaLabel }: TabsProps<T>) => (
  <div
    role="tablist"
    aria-label={ariaLabel}
    className={`scrollbar-none inline-flex max-w-full gap-1 overflow-x-auto rounded-full bg-well p-1 ${className}`}
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
          className={`flex h-9 shrink-0 items-center gap-1.5 rounded-full px-4 text-[14px] transition-all duration-300 ease-out ${
            active ? 'card-shadow bg-surface text-ink' : 'text-muted hover:text-ink'
          }`}
        >
          {option.label}
          {option.count !== undefined && (
            <span className={`font-mono text-[11px] ${active ? 'text-accent' : 'text-faint'}`}>{option.count}</span>
          )}
        </button>
      )
    })}
  </div>
)
