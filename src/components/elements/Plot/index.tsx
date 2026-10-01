import React from 'react'

interface PlotProps {
  caption?: React.ReactNode
  xTicks: (string | number)[]
  yTicks: (string | number)[]
  className?: string
  areaClassName?: string
  children: React.ReactNode
}

const pct = (i: number, n: number) => `${(i / Math.max(n - 1, 1)) * 100}%`

// Matplotlib-style axes around arbitrary content: tick marks + labels on the left and bottom.
export const Plot: React.FC<PlotProps> = ({ caption, xTicks, yTicks, className = '', areaClassName = '', children }) => (
  <figure className={`flex flex-col gap-2 ${className}`}>
    <div className="grid flex-1 grid-cols-[34px_minmax(0,1fr)] grid-rows-[minmax(0,1fr)_22px]">
      <div aria-hidden className="relative font-mono text-[10px] leading-none text-faint">
        {yTicks.map((tick, i) => (
          <span key={tick} className="absolute right-2 translate-y-1/2" style={{ bottom: pct(i, yTicks.length) }}>
            {tick}
          </span>
        ))}
      </div>
      <div className={`relative border-b border-l border-line-strong ${areaClassName}`}>
        {yTicks.map((tick, i) => (
          <span
            key={tick}
            aria-hidden
            className="absolute -left-[5px] h-px w-[5px] bg-line-strong"
            style={{ bottom: pct(i, yTicks.length) }}
          />
        ))}
        {xTicks.map((tick, i) => (
          <span
            key={tick}
            aria-hidden
            className="absolute -bottom-[5px] h-[5px] w-px bg-line-strong"
            style={{ left: pct(i, xTicks.length) }}
          />
        ))}
        {children}
      </div>
      <span />
      <div aria-hidden className="relative font-mono text-[10px] leading-none text-faint">
        {xTicks.map((tick, i) => (
          <span key={tick} className="absolute top-2 -translate-x-1/2" style={{ left: pct(i, xTicks.length) }}>
            {tick}
          </span>
        ))}
      </div>
    </div>
    {caption && <figcaption className="pl-[34px] font-mono text-[11.5px] text-faint">{caption}</figcaption>}
  </figure>
)
