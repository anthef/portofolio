'use client'
import React, { useMemo, useState } from 'react'
import Image from 'next/image'
import { ACHIEVEMENTS } from '@constants'
import { AchievementType } from 'src/constants/achievements/interface'
import { GridFill, Reveal, Section, SectionHeader, Tabs, Tag } from '@elements'

type Level = 'all' | Exclude<AchievementType['jenjang'], 'All'>
type Medal = AchievementType['medal']

// Rendered as an object-detection label on each photo.
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

const INITIAL_VISIBLE = 6

const matchesLevel = (achievement: AchievementType, level: Level) =>
  level === 'all' || achievement.jenjang === level || achievement.jenjang === 'All'

const AchievementCard: React.FC<{ achievement: AchievementType }> = ({ achievement }) => {
  const [expanded, setExpanded] = useState(false)
  const { name, issuer, date, image, medal, description, skills, links } = achievement
  const badge = MEDALS[medal] ?? MEDALS.unranked
  const text = description?.replace(/^[•\s]+/, '')

  return (
    <article className="group flex h-full flex-col">
      {image && (
        <div className="p-4 pb-0">
          <div className="relative aspect-[16/10] overflow-hidden rounded-[6px] bg-well">
            <Image
              src={`/achievements/${image}`}
              alt={name}
              fill
              sizes="(min-width: 1024px) 400px, (min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-[10%] border-[1.5px] transition-[inset] duration-500 ease-out group-hover:inset-[5%]"
              style={{ borderColor: badge.color }}
            >
              <span
                className="absolute -left-[1.5px] top-0 -translate-y-full whitespace-nowrap px-1.5 py-[3px] font-mono text-[10.5px] leading-none text-on-inverse"
                style={{ background: badge.color }}
              >
                {badge.label}
              </span>
            </div>
          </div>
        </div>
      )}
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-center justify-between gap-3 font-mono text-[11.5px] text-faint">
          <span className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full" style={{ background: badge.color }} />
            {badge.label.replace('_', ' ')}
          </span>
          <span>{date}</span>
        </div>
        <h3 className="text-[16px] font-medium leading-snug text-ink">{name}</h3>
        <p className="text-[13px] leading-snug text-faint">{issuer}</p>
        {text && (
          <div>
            <p className={`text-[14px] leading-relaxed text-muted ${expanded ? '' : 'line-clamp-3'}`}>{text}</p>
            {text.length > 160 && (
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
        <div className="mt-auto flex flex-col gap-3 pt-2">
          {skills.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {skills.map((skill) => (
                <Tag key={skill.name} href={skill.link}>
                  {skill.name}
                </Tag>
              ))}
            </div>
          )}
          {links && links.length > 0 && (
            <div className="flex flex-wrap gap-x-4 gap-y-1">
              {links.map((link) => (
                <a
                  key={link.link + link.name}
                  href={link.link}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[13px] text-accent underline-offset-4 hover:underline"
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

  // The cell label mirrors the current filter and sort, like a real query.
  const query = `achievements${level === 'all' ? '' : `.query("level == '${level}'")`}.sort_values("rank"${
    bestFirst ? '' : ', ascending=False'
  })`

  return (
    <Section id="achievements" innerClassName="">
      <div className="frame-pad pb-8 pt-20 md:pt-28">
        <Reveal>
          <SectionHeader
            cell={5}
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
        <Reveal delay={0.1} className="mt-10 flex items-end justify-between gap-4 border-b border-line">
          <Tabs
            ariaLabel="Filter achievements by level"
            className="border-b-0"
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
            className="mb-2 flex h-8 shrink-0 items-center gap-1.5 rounded-[6px] border border-line bg-surface px-2.5 font-mono text-[11.5px] text-muted transition-colors hover:border-line-strong hover:text-ink"
            aria-label={bestFirst ? 'Sorted by best rank first' : 'Sorted by lowest rank first'}
          >
            rank {bestFirst ? '↑' : '↓'}
          </button>
        </Reveal>
      </div>

      <div className="cell-grid grid-cols-1 border-b-0 md:grid-cols-2 lg:grid-cols-3">
        {visible.map((achievement, index) => (
          <div key={`${achievement.name}-${achievement.issuer}-${index}`}>
            <Reveal delay={(index % 3) * 0.06} className="h-full">
              <AchievementCard achievement={achievement} />
            </Reveal>
          </div>
        ))}
        <GridFill count={visible.length} />
      </div>

      {sorted.length > INITIAL_VISIBLE && (
        <div className="flex justify-center border-t border-line py-6">
          <button
            type="button"
            onClick={() => setShowAll((v) => !v)}
            className="font-mono text-[12px] text-muted transition-colors hover:text-accent"
          >
            {showAll ? '[−] show less' : `[+] show all ${sorted.length} rows`}
          </button>
        </div>
      )}
    </Section>
  )
}
