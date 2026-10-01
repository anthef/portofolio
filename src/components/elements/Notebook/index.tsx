import React from 'react'
import { Code } from '../Code'

export const StatusDot: React.FC<{ className?: string; tone?: 'live' | 'accent' }> = ({
  className = '',
  tone = 'live',
}) => (
  <span className={`relative inline-flex h-2 w-2 shrink-0 ${className}`}>
    <span className={`absolute inset-0 animate-ping rounded-full opacity-60 ${tone === 'live' ? 'bg-live' : 'bg-accent'}`} />
    <span className={`relative h-2 w-2 rounded-full ${tone === 'live' ? 'bg-live' : 'bg-accent'}`} />
  </span>
)

interface PanelProps {
  title: React.ReactNode
  meta?: React.ReactNode
  footer?: React.ReactNode
  className?: string
  bodyClassName?: string
  children: React.ReactNode
}

// A bordered output surface with a file-tab style header.
export const Panel: React.FC<PanelProps> = ({ title, meta, footer, className = '', bodyClassName = '', children }) => (
  <div className={`card-shadow overflow-hidden rounded-[26px] bg-surface ${className}`}>
    <div className="flex h-12 items-center justify-between gap-4 px-5">
      <span className="flex min-w-0 items-center gap-2 font-mono text-[12px] text-ink">
        <span aria-hidden className="h-2.5 w-2.5 shrink-0 rounded-full bg-accent" />
        <span className="truncate">{title}</span>
      </span>
      {meta && <span className="shrink-0 font-mono text-[11.5px] text-faint">{meta}</span>}
    </div>
    <div className={bodyClassName}>{children}</div>
    {footer && (
      <div className="flex min-h-10 items-center justify-between gap-4 px-5 py-2 font-mono text-[11.5px] text-muted">
        {footer}
      </div>
    )}
  </div>
)

interface NotebookCellProps {
  n: number | string
  code: string
  // Rendered as the cell's `Out[n]:` block when present.
  children?: React.ReactNode
  className?: string
}

// Jupyter-style input/output pair.
export const NotebookCell: React.FC<NotebookCellProps> = ({ n, code, children, className = '' }) => (
  <div className={`grid grid-cols-1 gap-y-1.5 sm:grid-cols-[64px_minmax(0,1fr)] sm:gap-x-3 ${className}`}>
    <span className="font-mono text-[11.5px] text-accent sm:pt-[7px] sm:text-right">In [{n}]:</span>
    <div className="overflow-x-auto rounded-[12px] bg-well px-3.5 py-1.5 text-[12.5px] leading-6 scrollbar-none">
      <Code className="whitespace-pre">{code}</Code>
    </div>
    {children && (
      <>
        <span className="mt-1 font-mono text-[11.5px] text-series-2 sm:mt-0 sm:pt-[3px] sm:text-right">Out[{n}]:</span>
        <div className="min-w-0">{children}</div>
      </>
    )}
  </div>
)
