'use client'
import React, { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import { ACHIEVEMENTS } from '@constants'
import { AchievementType } from 'src/constants/achievements/interface'
import { Blob, Button, Reveal, Section, SectionHeader, Tabs, Tag } from '@elements'

type Level = 'all' | Exclude<AchievementType['jenjang'], 'All'>
type Medal = AchievementType['medal']

// Rendered as an object-detection label on each photo and as a rank stamp.
const MEDALS: Record<Medal, { rank: number; label: string; color: string }> = {
  gold: { rank: 1, label: '1st_place', color: '#c9971c' },
  silver: { rank: 2, label: '2nd_place', color: '#8a929b' },
  bronze: { rank: 3, label: '3rd_place', color: '#b8692e' },
  '4th': { rank: 4, label: '4th_place', color: 'var(--accent)' },
  '5th': { rank: 5, label: '5th_place', color: 'var(--accent)' },
  '6th': { rank: 6, label: '6th_place', color: 'var(--accent)' },
  'top-10': { rank: 7, label: 'top_10', color: 'var(--series-3)' },
  unranked: { rank: 8, label: 'honorable', color: 'var(--faint)' },
}

const LEVELS: { value: Level; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'university', label: 'University' },
  { value: 'highschool', label: 'High school' },
  { value: 'middle', label: 'Middle school' },
  { value: 'elementary', label: 'Elementary' },
]

const INITIAL_VISIBLE = 9
// Small, repeating tilts so the board reads as pinned-up prints rather than a grid.
const TILTS = [-1.6, 1.1, -0.6, 1.4, -1.2, 0.7, 1.8, -0.9, 0.4]

const matchesLevel = (achievement: AchievementType, level: Level) =>
  level === 'all' || achievement.jenjang === level || achievement.jenjang === 'All'

// Number of masonry columns for the current viewport (md: 2, lg: 3).
const useColumns = () => {
  const [columns, setColumns] = useState(3)

  useEffect(() => {
    const lg = window.matchMedia('(min-width: 1024px)')
    const md = window.matchMedia('(min-width: 768px)')
    const update = () => setColumns(lg.matches ? 3 : md.matches ? 2 : 1)
    update()
    lg.addEventListener('change', update)
    md.addEventListener('change', update)
    return () => {
      lg.removeEventListener('change', update)
      md.removeEventListener('change', update)
    }
  }, [])

  return columns
}

const RankStamp: React.FC<{ medal: Medal }> = ({ medal }) => {
  const badge = MEDALS[medal] ?? MEDALS.unranked
  if (badge.rank > 6) return null
  return (
    <span
      aria-hidden
      className="absolute -right-3 -top-3 z-10 flex h-14 w-14 rotate-[12deg] flex-col items-center justify-center rounded-full font-display text-[22px] leading-none text-on-inverse shadow-[0_6px_16px_-6px_rgba(0,0,0,0.35)] transition-transform duration-500 group-hover:rotate-0 group-hover:scale-105"
      style={{ background: badge.color }}
    >
      #{badge.rank}
    </span>
  )
}

const AchievementCard: React.FC<{ achievement: AchievementType; tilt: number }> = ({ achievement, tilt }) => {
  const [expanded, setExpanded] = useState(false)
  const { name, issuer, date, medal, description, skills, links } = achievement
  // Placeholder artwork reads better as a plain note.
  const image = achievement.image === 'coming_soon.png' ? undefined : achievement.image
  const badge = MEDALS[medal] ?? MEDALS.unranked
  const text = description?.replace(/^[•\s]+/, '')

  return (
    <article
      className="group relative rotate-[var(--tilt)] transition-transform duration-500 ease-out hover:-translate-y-1 hover:rotate-0"
      style={{ '--tilt': `${tilt}deg` } as React.CSSProperties}
    >
      <RankStamp medal={medal} />
      {!image && (
        // Washi tape holding up the note.
        <span
          aria-hidden
          className="absolute -top-2.5 left-1/2 z-10 h-5 w-20 -translate-x-1/2 -rotate-3 rounded-[3px] opacity-80"
          style={{ background: 'color-mix(in srgb, var(--series-2) 35%, transparent)' }}
        />
      )}
      <div
        className={`card-shadow rounded-[24px] ${image ? 'bg-surface p-2.5 pb-5' : 'px-2.5 pb-5 pt-4'}`}
        style={image ? undefined : { background: `color-mix(in srgb, ${badge.color} 10%, var(--surface))` }}
      >
        {image && (
          <div className="relative aspect-[16/11] overflow-hidden rounded-[16px] bg-well">
            <Image
              src={`/achievements/${image}`}
              alt={name}
              fill
              sizes="(min-width: 1024px) 380px, (min-width: 768px) 50vw, 100vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-[12%] rounded-[4px] border-[1.5px] transition-[inset] duration-500 ease-out group-hover:inset-[6%]"
              style={{ borderColor: badge.color }}
            >
              <span
                className="absolute -left-[1.5px] top-0 -translate-y-full whitespace-nowrap rounded-t-[3px] px-1.5 py-[3px] font-mono text-[10.5px] leading-none text-on-inverse"
                style={{ background: badge.color }}
              >
                {badge.label} {(0.99 - (badge.rank - 1) * 0.04).toFixed(2)}
              </span>
            </div>
          </div>
        )}

        <div className="flex flex-col gap-2.5 px-3 pt-4">
          <div
            className={`flex items-center justify-between gap-3 font-mono text-[11.5px] text-faint ${
              !image && badge.rank <= 6 ? 'pr-10' : ''
            }`}
          >
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full" style={{ background: badge.color }} />
              {badge.label.replace('_', ' ')}
            </span>
            <span>{date}</span>
          </div>
          <h3 className="text-[16.5px] font-medium leading-snug text-ink">{name}</h3>
          <p className="text-[13px] leading-snug text-faint">{issuer}</p>
          {text && (
            <div>
              <p className={`text-[14px] leading-relaxed text-muted ${expanded ? '' : 'line-clamp-3'}`}>{text}</p>
              {text.length > 150 && (
                <button
                  type="button"
                  onClick={() => setExpanded((open) => !open)}
                  className="mt-1 font-mono text-[11.5px] text-faint transition-colors hover:text-accent"
                >
                  {expanded ? '[−] less' : '[+] more'}
                </button>
              )}
            </div>
          )}
          {!!(skills.length || links?.length) && (
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              {skills.map((skill) => (
                <Tag key={skill.name} href={skill.link}>
                  {skill.name}
                </Tag>
              ))}
              {links?.map((link) => (
                <a
                  key={link.link + link.name}
                  href={link.link}
                  target="_blank"
                  rel="noreferrer"
                  className="ml-1 text-[13px] text-accent underline-offset-4 hover:underline"
                >
                  {link.name} ↗
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </article>
  )
}

export const Achievement: React.FC = () => {
  const [level, setLevel] = useState<Level>('all')
  const [bestFirst, setBestFirst] = useState(true)
  const [showAll, setShowAll] = useState(false)
  const columns = useColumns()

  const levels = LEVELS.map((option) => ({
    ...option,
    count: ACHIEVEMENTS.filter((a) => matchesLevel(a, option.value)).length,
  })).filter((option) => option.value === 'all' || option.count > 0)

  const sorted = useMemo(
    () =>
      ACHIEVEMENTS.filter((a) => matchesLevel(a, level)).sort((a, b) => {
        const diff = (MEDALS[a.medal]?.rank ?? 8) - (MEDALS[b.medal]?.rank ?? 8)
        return bestFirst ? diff : -diff
      }),
    [level, bestFirst]
  )
  const visible = showAll ? sorted : sorted.slice(0, INITIAL_VISIBLE)

  // Deal cards round-robin so reading order stays row-major across the masonry columns.
  const stacks = Array.from({ length: columns }, (_, column) =>
    visible.map((achievement, index) => ({ achievement, index })).filter(({ index }) => index % columns === column)
  )

  // The cell label mirrors the current filter and sort, like a real query.
  const query = `achievements${level === 'all' ? '' : `.query("level == '${level}'")`}.sort_values("rank"${
    bestFirst ? '' : ', ascending=False'
  })`

  return (
    <Section
      id="achievements"
      className="overflow-hidden"
      backdrop={
        <>
          <Blob className="-left-32 top-40 h-[380px] w-[380px]" color="var(--series-2)" />
          <Blob className="-right-24 bottom-20 h-[340px] w-[340px]" color="var(--series-3)" />
        </>
      }
    >
      <Reveal>
        <SectionHeader
          cell={4}
          code={query}
          title={
            <>
              Competitions, rankings
              <br className="hidden md:block" /> & recognitions.
            </>
          }
          description="Data science competitions, datathons, and academic awards — from high school to university."
        />
      </Reveal>

      <Reveal delay={0.1} className="mt-10 flex flex-wrap items-center justify-between gap-3">
        <Tabs
          ariaLabel="Filter achievements by level"
          value={level}
          onChange={(value) => {
            setLevel(value)
            setShowAll(false)
          }}
          options={levels}
        />
        <button
          type="button"
          onClick={() => setBestFirst((v) => !v)}
          className="flex h-11 shrink-0 items-center gap-2 rounded-full bg-well px-4 font-mono text-[12px] text-muted transition-colors hover:text-ink"
          aria-label={bestFirst ? 'Sorted by best rank first' : 'Sorted by lowest rank first'}
        >
          sort: rank <span className="text-accent">{bestFirst ? '↑' : '↓'}</span>
        </button>
      </Reveal>

      <div className="mt-14 grid gap-9" style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}>
        {stacks.map((stack, column) => (
          <div key={column} className={`flex flex-col gap-9 ${column === 1 ? 'lg:pt-12' : ''}`}>
            {stack.map(({ achievement, index }) => (
              <Reveal key={`${achievement.name}-${achievement.issuer}`} delay={(index % columns) * 0.06}>
                <AchievementCard achievement={achievement} tilt={TILTS[index % TILTS.length]} />
              </Reveal>
            ))}
          </div>
        ))}
      </div>

      {sorted.length > INITIAL_VISIBLE && (
        <div className="mt-14 flex justify-center">
          <Button variant="secondary" onClick={() => setShowAll((v) => !v)}>
            {showAll ? 'Show less' : `Show all ${sorted.length} awards`}
            <span className="font-mono text-[12px] text-faint">{showAll ? '−' : `+${sorted.length - INITIAL_VISIBLE}`}</span>
          </Button>
        </div>
      )}
    </Section>
  )
}
