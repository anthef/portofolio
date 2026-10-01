'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { EDUCATION } from '@constants'
import { Reveal, Section, SectionHeader, Tag } from '@elements'

const SERIES = ['var(--accent)', 'var(--series-2)', 'var(--series-3)', 'var(--muted)']

const spans = EDUCATION.map((education) => {
  const [start, end] = education.year.split('-').map(Number)
  return { ...education, start, end }
})

const AXIS_START = Math.min(...spans.map((s) => s.start))
const AXIS_END = Math.max(...spans.map((s) => s.end)) + 1
const AXIS_YEARS = AXIS_END - AXIS_START
const pos = (year: number) => `${((year - AXIS_START) / AXIS_YEARS) * 100}%`
const TICKS = Array.from({ length: AXIS_YEARS + 1 }, (_, i) => AXIS_START + i)

const ROW = 'grid grid-cols-1 gap-x-8 gap-y-3 md:grid-cols-[minmax(0,320px)_minmax(0,1fr)] md:items-center'

// Fractional current year, resolved on the client so a statically built page
// never shows a stale "now" marker. Null outside the axis range.
const useNowYear = () => {
  const [now, setNow] = useState<number | null>(null)
  useEffect(() => {
    const today = new Date()
    const year = today.getFullYear() + today.getMonth() / 12
    setNow(year >= AXIS_START && year <= AXIS_END ? year : null)
  }, [])
  return now
}

// Year gridlines + today marker drawn behind every bar track.
const Track: React.FC<{ now: number | null; children?: React.ReactNode }> = ({ now, children }) => (
  <div
    className="relative h-10"
    style={{
      backgroundImage: 'linear-gradient(90deg, var(--grid-major) 1px, transparent 1px)',
      backgroundSize: `calc(100% / ${AXIS_YEARS}) 100%`,
    }}
  >
    {now !== null && (
      <span aria-hidden className="absolute inset-y-0 w-0 border-l border-dashed border-accent" style={{ left: pos(now) }} />
    )}
    {children}
  </div>
)

export const Education: React.FC = () => {
  const now = useNowYear()
  return (
    <Section id="education">
      <Reveal>
        <SectionHeader
          cell={7}
          code={`plt.barh(schools, width=duration, left=start)`}
          title="Where I studied."
          description="From SDN Pondok Labu to the Faculty of Computer Science at Universitas Indonesia."
        />
      </Reveal>

      <Reveal delay={0.1} className="mt-12">
        <ol className="flex flex-col gap-2">
          {spans.map((education, index) => {
            const color = SERIES[index % SERIES.length]
            // Anything after today is still "expected", drawn hatched.
            const doneUntil = now !== null ? Math.min(Math.max(now, education.start), education.end) : education.end
            return (
              <li key={education.institution} className={`${ROW} py-3`}>
                <div className="flex min-w-0 items-center gap-3.5">
                  <span className="card-shadow relative h-11 w-11 shrink-0 overflow-hidden rounded-full bg-white">
                    <Image src={education.image} alt="" fill sizes="44px" className="object-cover" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[15.5px] font-medium leading-tight text-ink">{education.title}</span>
                    <span className="block truncate text-[13.5px] text-muted">{education.institution}</span>
                    <span className="block font-mono text-[11.5px] text-faint md:hidden">
                      {education.start} — {education.end}
                    </span>
                  </span>
                </div>
                <Track now={now}>
                  <span
                    className="absolute inset-y-[8px] flex items-center overflow-hidden rounded-full"
                    style={{
                      left: pos(education.start),
                      width: `calc(${pos(education.end)} - ${pos(education.start)})`,
                      background: `repeating-linear-gradient(-45deg, color-mix(in srgb, ${color} 45%, transparent) 0 5px, transparent 5px 9px)`,
                    }}
                  >
                    <span
                      className="absolute inset-y-0 left-0 rounded-full"
                      style={{
                        width: `${((doneUntil - education.start) / (education.end - education.start)) * 100}%`,
                        background: color,
                      }}
                    />
                    <span className="relative hidden truncate px-3 font-mono text-[11px] text-on-inverse sm:inline">
                      {education.start} → {education.end}
                    </span>
                  </span>
                </Track>

                {(education.detail || education.courses) && (
                  <div className="flex flex-col gap-3 md:col-span-2 md:pl-[58px]">
                    {education.detail && <p className="font-mono text-[12px] text-accent">{education.detail}</p>}
                    {education.courses && (
                      <div className="flex flex-wrap gap-1.5">
                        {education.courses.map((course) => (
                          <Tag key={course}>{course}</Tag>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </li>
            )
          })}
        </ol>

        <div aria-hidden className={`${ROW} pt-3`}>
          <span className="hidden font-mono text-[11px] text-faint md:block">year →</span>
          <div className="relative h-5 font-mono text-[10.5px] text-faint">
            {TICKS.map((year) => (
              <span
                key={year}
                className={`absolute top-0 -translate-x-1/2 ${(year - AXIS_START) % 2 ? 'hidden sm:inline' : ''}`}
                style={{ left: pos(year) }}
              >
                {String(year).slice(2)}
              </span>
            ))}
            {now !== null && (
              <span
                className="absolute -top-0.5 -translate-x-[calc(100%+6px)] rounded-full bg-accent px-1.5 text-[10px] text-on-inverse"
                style={{ left: pos(now) }}
              >
                now
              </span>
            )}
          </div>
        </div>
      </Reveal>
    </Section>
  )
}
