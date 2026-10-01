'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { FaExternalLinkAlt } from 'react-icons/fa'
import { PROJECTS } from '@constants'
import { linkIconMapping } from 'src/constants/linkicons'
import { Blob, Button, Reveal, Section, SectionHeader, Tabs, Tag } from '@elements'

type Project = (typeof PROJECTS)[number]
type Filter = 'all' | 'DS' | 'SE'

const TYPE_LABEL: Record<string, string> = {
  DS: 'data science',
  SE: 'software',
}

const INITIAL_VISIBLE = 4
const SERIES = ['var(--accent)', 'var(--series-2)', 'var(--series-3)']
// Placeholder artwork in /public/projects that reads better as a generated cover.
const PLACEHOLDERS = ['tba.png', 'coming_soon.jpeg']

const matchesFilter = (project: Project, filter: Filter) =>
  filter === 'all' || project.type === filter || project.type === 'All'

// Small seeded PRNG so generated covers render identically on server and client.
const seeded = (seed: string) => {
  let a = 0
  for (let i = 0; i < seed.length; i++) a = Math.imul(a ^ seed.charCodeAt(i), 2654435761)
  return () => {
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

// Server and browser Math.cos/exp can differ in the last bits; round so hydration matches.
const r1 = (n: number) => Math.round(n * 10) / 10

// Clustered scatter + fitted curve, seeded by the project name, for projects without artwork.
const GeneratedCover: React.FC<{ seed: string }> = ({ seed }) => {
  const rand = seeded(seed)
  const centers = SERIES.map(() => ({ x: r1(60 + rand() * 280), y: r1(50 + rand() * 150) }))
  const points = Array.from({ length: 72 }, (_, i) => {
    const c = centers[i % centers.length]
    const r = 14 + rand() * 34
    const a = rand() * Math.PI * 2
    return { x: r1(c.x + Math.cos(a) * r), y: r1(c.y + Math.sin(a) * r * 0.8), color: SERIES[i % SERIES.length] }
  })
  const curve = Array.from({ length: 9 }, (_, i) => {
    const x = 20 + i * 45
    return `${x},${r1(215 - 170 * (1 - Math.exp(-i / (2 + rand() * 2))) + rand() * 10)}`
  }).join(' ')

  return (
    <svg aria-hidden viewBox="0 0 400 250" preserveAspectRatio="xMidYMid slice" className="h-full w-full">
      <defs>
        <pattern id={`grid-${seed.length}`} width="25" height="25" patternUnits="userSpaceOnUse">
          <path d="M25 0H0V25" fill="none" stroke="var(--grid-minor)" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="400" height="250" fill={`url(#grid-${seed.length})`} />
      {centers.map((c, i) => (
        <circle key={i} cx={c.x} cy={c.y} r="58" fill={SERIES[i]} opacity="0.1" />
      ))}
      <polyline points={curve} fill="none" stroke="var(--ink)" strokeWidth="1.5" strokeDasharray="4 5" opacity="0.5" />
      {points.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="3.4" fill={p.color} opacity="0.85" />
      ))}
      {centers.map((c, i) => (
        <g key={`c-${i}`} stroke="var(--ink)" strokeWidth="2">
          <path d={`M${c.x - 6} ${c.y - 6}L${c.x + 6} ${c.y + 6}M${c.x + 6} ${c.y - 6}L${c.x - 6} ${c.y + 6}`} />
        </g>
      ))}
    </svg>
  )
}

const Cover: React.FC<{ project: Project; index: number; flip: boolean }> = ({ project, index, flip }) => {
  const image = 'image' in project && project.image && !PLACEHOLDERS.includes(project.image) ? project.image : undefined
  const tint = SERIES[index % SERIES.length]

  return (
    <div className={`relative ${flip ? 'lg:order-last' : ''}`}>
      <span
        aria-hidden
        className={`absolute inset-0 rounded-[34px] transition-transform duration-700 ease-out ${
          flip ? '-rotate-2 group-hover:-rotate-3' : 'rotate-2 group-hover:rotate-3'
        }`}
        style={{ background: `color-mix(in srgb, ${tint} 22%, transparent)` }}
      />
      <div className="card-shadow relative aspect-[16/10] overflow-hidden rounded-[34px] bg-surface transition-transform duration-700 ease-out group-hover:-translate-y-1">
        {image ? (
          <Image
            src={`/projects/${image}`}
            alt={project.name}
            fill
            sizes="(min-width: 1024px) 620px, 100vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
        ) : (
          <GeneratedCover seed={project.name} />
        )}
        <span className="absolute left-4 top-4 rounded-full bg-[color-mix(in_srgb,var(--surface)_86%,transparent)] px-3 py-1 font-mono text-[11.5px] text-ink backdrop-blur">
          projects<span className="text-faint">[</span>
          <span className="text-series-2">{index}</span>
          <span className="text-faint">]</span>
          {!image && <span className="text-faint"> # generated</span>}
        </span>
      </div>
    </div>
  )
}

const ProjectRow: React.FC<{ project: Project; index: number; flip: boolean }> = ({ project, index, flip }) => {
  const [expanded, setExpanded] = useState(false)
  const { name, date, description, skills, links, type } = project
  const collaborators = 'collaborators' in project ? project.collaborators : undefined

  return (
    <article className="group grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
      <Cover project={project} index={index} flip={flip} />

      <div className="flex min-w-0 flex-col gap-4">
        <div className="flex items-end gap-4">
          <span className="font-display text-[64px] leading-[0.8] text-line-strong transition-colors duration-500 group-hover:text-accent md:text-[80px]">
            {String(index + 1).padStart(2, '0')}
          </span>
          <span className="pb-1 font-mono text-[11.5px] text-faint">
            {TYPE_LABEL[type] ?? type} · {date}
          </span>
        </div>

        <h3 className="text-balance text-[22px] font-medium leading-snug text-ink md:text-[26px]">{name}</h3>

        {description && (
          <div>
            <p className={`text-[15px] leading-relaxed text-muted ${expanded ? '' : 'line-clamp-4'}`}>{description}</p>
            {description.length > 260 && (
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

        {skills.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {skills.map((skill) => (
              <Tag key={skill.name} href={skill.link}>
                {skill.name}
              </Tag>
            ))}
          </div>
        )}

        {collaborators && collaborators.length > 0 && (
          <p className="text-[13px] text-faint">
            <span className="font-mono text-[11.5px]">with = </span>
            {collaborators.map((person, i) => (
              <React.Fragment key={person.link}>
                {i > 0 && ', '}
                <a href={person.link} target="_blank" rel="noreferrer" className="text-muted hover:text-accent hover:underline">
                  {person.name}
                </a>
              </React.Fragment>
            ))}
          </p>
        )}

        {links && links.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-1">
            {links.map((link) => {
              const Icon = linkIconMapping[link.name] || FaExternalLinkAlt
              return (
                <a
                  key={link.link + link.name}
                  href={link.link}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-9 items-center gap-2 rounded-full bg-well px-4 text-[13px] text-ink transition-colors hover:bg-accent-soft hover:text-accent"
                >
                  <Icon size={12} />
                  {link.name}
                </a>
              )
            })}
          </div>
        )}
      </div>
    </article>
  )
}

export const Projects: React.FC = () => {
  const [filter, setFilter] = useState<Filter>('all')
  const [showAll, setShowAll] = useState(false)

  const filtered = PROJECTS.filter((project) => matchesFilter(project, filter))
  const visible = showAll ? filtered : filtered.slice(0, INITIAL_VISIBLE)

  const options: { value: Filter; label: string }[] = [
    { value: 'all', label: 'All' },
    { value: 'DS', label: 'Data science' },
    { value: 'SE', label: 'Software' },
  ]

  const base = filter === 'all' ? 'projects' : `projects[projects.type == "${filter.toLowerCase()}"]`
  const code = showAll ? base : `${base}.head(${INITIAL_VISIBLE})`

  return (
    <Section
      id="projects"
      className="overflow-hidden"
      backdrop={
        <>
          <Blob className="-left-40 top-1/4 h-[400px] w-[400px]" color="var(--series-3)" />
          <Blob className="-right-32 bottom-1/4 h-[380px] w-[380px]" color="var(--series-2)" />
        </>
      }
    >
      <Reveal>
        <SectionHeader
          cell={6}
          code={code}
          title={
            <>
              Things I&apos;ve built
              <br className="hidden md:block" /> & shipped.
            </>
          }
          description="Machine learning models, competition work, and full-stack products — built solo and with teams."
        />
      </Reveal>
      <Reveal delay={0.1} className="mt-10">
        <Tabs
          ariaLabel="Filter projects"
          value={filter}
          onChange={(value) => {
            setFilter(value)
            setShowAll(false)
          }}
          options={options.map((option) => ({
            ...option,
            count: PROJECTS.filter((project) => matchesFilter(project, option.value)).length,
          }))}
        />
      </Reveal>

      <div className="mt-16 flex flex-col gap-24 md:gap-32">
        {visible.map((project, index) => (
          <Reveal key={project.name}>
            <ProjectRow project={project} index={PROJECTS.indexOf(project)} flip={index % 2 === 1} />
          </Reveal>
        ))}
      </div>

      {filtered.length > INITIAL_VISIBLE && (
        <div className="mt-20 flex justify-center">
          <Button variant="secondary" onClick={() => setShowAll((v) => !v)}>
            {showAll ? 'Show fewer projects' : `Show all ${filtered.length} projects`}
            <span className="font-mono text-[12px] text-faint">
              {showAll ? '−' : `+${filtered.length - INITIAL_VISIBLE}`}
            </span>
          </Button>
        </div>
      )}
    </Section>
  )
}
