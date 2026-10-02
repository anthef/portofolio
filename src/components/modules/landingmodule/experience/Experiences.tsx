'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { EXPERIENCES } from '@constants'
import { ExperienceType, SingularExperienceType } from 'src/constants/experience/interface'
import { Blob, Button, Code, Reveal, Section, SectionHeader, Tabs, Tag } from '@elements'

type Kind = keyof ExperienceType
type Filter = 'all' | Kind

const BRANCHES: Record<Kind, { ref: string; color: string }> = {
  Work: { ref: 'main', color: 'var(--accent)' },
  Org: { ref: 'org', color: 'var(--series-2)' },
}

const FILTERS: { value: Filter; label: string; command: string }[] = [
  { value: 'all', label: 'All', command: 'git log --graph --all' },
  { value: 'Work', label: 'Work', command: 'git log --graph main' },
  { value: 'Org', label: 'Organization', command: 'git log --graph org' },
]

const INITIAL_VISIBLE = 7
const LANE_GAP = 22
const DOT_Y = 21

const MONTHS = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec']

interface Commit {
  kind: Kind
  experience: SingularExperienceType
  date: string
  start: number
  current: boolean
  hash: string
}

// "Apr 2026 - Present" -> 2026 * 12 + 3, used to interleave both branches by start date.
const startOf = (date: string) => {
  const match = date.match(/([A-Za-z]{3})[a-z]*\s+(\d{4})/)
  if (!match) return 0
  return Number(match[2]) * 12 + Math.max(0, MONTHS.indexOf(match[1].toLowerCase()))
}

// Stable pseudo commit hash so every entry keeps the same id between renders.
const shortHash = (seed: string) => {
  let h = 0x811c9dc5
  for (let i = 0; i < seed.length; i++) h = Math.imul(h ^ seed.charCodeAt(i), 0x01000193)
  return (h >>> 0).toString(16).padStart(8, '0').slice(0, 7)
}

const monogram = (name: string) =>
  name
    .replace(/^PT\.?\s+/i, '')
    .split(/\s+/)
    .filter((word) => /^[A-Za-z]/.test(word))
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join('')

const COMMITS: Commit[] = (Object.keys(BRANCHES) as Kind[])
  .flatMap((kind) =>
    EXPERIENCES[kind].map((experience) => {
      const date = (experience.date ?? experience.roles[0].date).trim()
      return {
        kind,
        experience,
        date,
        start: startOf(date),
        current: experience.roles.some((role) => role.date.includes('Present')),
        hash: shortHash(`${kind}:${experience.name}:${experience.roles[0].name}`),
      }
    })
  )
  .sort((a, b) => b.start - a.start)

const Logo: React.FC<{ experience: SingularExperienceType; color: string }> = ({ experience, color }) =>
  experience.logo ? (
    <span className="card-shadow relative h-11 w-11 shrink-0 overflow-hidden rounded-full bg-white">
      <Image src={`/experiences/${experience.logo}`} alt="" fill sizes="44px" className="object-contain p-1" />
    </span>
  ) : (
    <span
      aria-hidden
      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full font-mono text-[13px] font-medium"
      style={{ background: `color-mix(in srgb, ${color} 14%, var(--surface))`, color }}
    >
      {monogram(experience.name)}
    </span>
  )

// One row of the commit graph: lane lines above/below the dot plus the dot itself.
const Graph: React.FC<{ lanes: Kind[]; commit: Commit; above: Set<Kind>; below: Set<Kind> }> = ({
  lanes,
  commit,
  above,
  below,
}) => (
  <div aria-hidden className="relative" style={{ width: (lanes.length - 1) * LANE_GAP + 16 }}>
    {lanes.map((lane, i) => {
      const x = i * LANE_GAP + 7
      const color = BRANCHES[lane].color
      return (
        <React.Fragment key={lane}>
          {above.has(lane) && (
            <span className="absolute top-0 w-[2px] rounded-full" style={{ left: x, height: DOT_Y, background: color }} />
          )}
          {below.has(lane) && (
            <span
              className="absolute bottom-0 w-[2px] rounded-full"
              style={{ left: x, top: DOT_Y, background: color }}
            />
          )}
          {lane === commit.kind && (
            <span
              className="absolute h-4 w-4 rounded-full border-[2.5px] bg-bg"
              style={{ left: x - 7, top: DOT_Y - 8, borderColor: color, background: commit.current ? color : undefined }}
            >
              {commit.current && (
                <span className="absolute -inset-[2.5px] animate-ping rounded-full opacity-40" style={{ background: color }} />
              )}
            </span>
          )}
        </React.Fragment>
      )
    })}
  </div>
)

// The commit "diff": every role's bullet points rendered as added lines.
const CommitDetail: React.FC<{ commit: Commit }> = ({ commit }) => {
  const { roles, skills, links, headlineRole } = commit.experience
  const color = BRANCHES[commit.kind].color
  const insertions = roles.reduce((sum, role) => sum + (role.description?.length ?? 0), 0)

  return (
    <div className="flex flex-col gap-5">
      <p className="font-mono text-[11.5px] text-faint">
        {roles.length} {roles.length === 1 ? 'role' : 'roles'} changed,{' '}
        <span style={{ color }}>
          {insertions} insertion{insertions === 1 ? '' : 's'}(+)
        </span>
      </p>
      {roles.map((role) => (
        <div key={role.name + role.date} className="flex flex-col gap-2.5">
          {(roles.length > 1 || headlineRole) && (
            <p className="flex flex-wrap items-baseline gap-x-3 text-[14px] font-medium text-ink">
              {role.name}
              <span className="font-mono text-[11.5px] font-normal text-faint">{role.date}</span>
            </p>
          )}
          <ul className="flex flex-col gap-2.5">
            {role.description?.map((desc) => (
              <li key={desc} className="grid grid-cols-[14px_minmax(0,1fr)] gap-2 text-[14px] leading-relaxed text-muted">
                <span aria-hidden className="font-mono" style={{ color }}>
                  +
                </span>
                <span>{desc}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
      {!!(skills?.length || links?.length) && (
        <div className="flex flex-wrap items-center gap-1.5">
          {skills?.map((skill) => (
            <Tag key={skill.name} href={skill.link}>
              {skill.name}
            </Tag>
          ))}
          {links?.map((link) => (
            <a
              key={link.link}
              href={link.link}
              target="_blank"
              rel="noreferrer"
              className="ml-2 text-[13px] text-accent underline-offset-4 hover:underline"
            >
              {link.name} ↗
            </a>
          ))}
        </div>
      )}
    </div>
  )
}

const Refs: React.FC<{ refs: string[] }> = ({ refs }) => (
  <>
    {refs.map((ref) => (
      <span
        key={ref}
        className={`rounded-full px-2 py-0.5 ${ref.startsWith('HEAD') ? 'bg-accent-soft text-accent' : 'bg-raised text-muted'}`}
      >
        {ref}
      </span>
    ))}
  </>
)

const CommitRow: React.FC<{
  commit: Commit
  refs: string[]
  lanes: Kind[]
  above: Set<Kind>
  below: Set<Kind>
  // `selected` expands the inline diff below lg; `shown` marks the commit in the desktop panel.
  selected: boolean
  shown: boolean
  onSelect: () => void
}> = ({ commit, refs, lanes, above, below, selected, shown, onSelect }) => {
  const { experience, kind, date, current, hash } = commit
  const { name, roles, headlineRole } = experience
  const color = BRANCHES[kind].color
  const panelId = `commit-${hash}`

  return (
    <li className="flex gap-4 md:gap-6">
      <Graph lanes={lanes} commit={commit} above={above} below={below} />
      <div className="min-w-0 flex-1 pb-3">
        <button
          type="button"
          onClick={onSelect}
          aria-expanded={selected}
          aria-controls={panelId}
          className={`group -ml-4 flex w-[calc(100%+16px)] flex-col gap-2.5 rounded-[22px] px-4 py-3 text-left transition-colors duration-300 hover:bg-well ${
            selected ? 'bg-well' : ''
          } ${shown ? 'lg:bg-well' : ''}`}
        >
          <span className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[11.5px]">
            <span className="text-series-2">{hash}</span>
            <Refs refs={refs} />
            <span className={current ? 'text-live' : 'text-faint'}>{date}</span>
          </span>
          <span className="flex items-center gap-3.5">
            <Logo experience={experience} color={color} />
            <span className="min-w-0 flex-1">
              <span className="block text-[16px] font-medium leading-snug text-ink">{headlineRole ?? roles[0].name}</span>
              <span className="mt-0.5 block truncate text-[14px] text-muted">{name}</span>
            </span>
            <span
              aria-hidden
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-mono text-[15px] transition-all duration-300 lg:hidden ${
                selected ? 'rotate-45 bg-accent-soft text-accent' : 'text-faint group-hover:bg-raised'
              }`}
            >
              +
            </span>
            <span
              aria-hidden
              className={`hidden h-8 w-8 shrink-0 items-center justify-center rounded-full font-mono text-[14px] transition-all duration-300 lg:flex ${
                shown ? 'translate-x-1 bg-accent-soft text-accent' : 'text-faint opacity-0 group-hover:opacity-100'
              }`}
            >
              →
            </span>
          </span>
        </button>

        {/* Below lg the diff opens inline; on desktop it lives in the side panel. */}
        <div
          id={panelId}
          className={`grid transition-[grid-template-rows] duration-300 ease-out lg:hidden ${
            selected ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
          }`}
        >
          <div className="overflow-hidden">
            <div className="pb-4 pt-4 sm:pl-[58px]">
              <CommitDetail commit={commit} />
            </div>
          </div>
        </div>
      </div>
    </li>
  )
}

// Desktop-only `git show` panel that follows the list while scrolling.
const ShowPanel: React.FC<{ commit: Commit; refs: string[] }> = ({ commit, refs }) => {
  const { experience, kind, date, current, hash } = commit
  const { name, location, roles, headlineRole } = experience

  return (
    <div className="card-shadow max-h-[calc(100vh-136px)] overflow-y-auto overscroll-contain rounded-[28px] bg-surface p-7 scrollbar-none">
      <div key={hash} className="animate-rise">
        <p className="text-[12.5px]">
          <Code>{`git show ${hash}`}</Code>
        </p>
        <div className="mt-5 flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[11.5px]">
          <span className="text-series-2">commit {hash}</span>
          <Refs refs={refs} />
        </div>
        <div className="mt-4 flex items-center gap-4">
          <Logo experience={experience} color={BRANCHES[kind].color} />
          <div className="min-w-0">
            <h3 className="text-[21px] font-medium leading-snug text-ink">{headlineRole ?? roles[0].name}</h3>
            <p className="mt-0.5 text-[14px] text-muted">
              {name}
              {location && <span className="text-faint"> · {location}</span>}
            </p>
          </div>
        </div>
        <p className={`mt-3 font-mono text-[11.5px] ${current ? 'text-live' : 'text-faint'}`}>Date: {date}</p>
        <div className="mt-6 border-t border-dashed border-line-strong pt-6">
          <CommitDetail commit={commit} />
        </div>
      </div>
    </div>
  )
}

export const Experiences: React.FC = () => {
  const [filter, setFilter] = useState<Filter>('all')
  // Nothing is expanded on mobile at first; the desktop panel falls back to the newest commit.
  const [selected, setSelected] = useState<string | null>(null)
  const [showAll, setShowAll] = useState(false)

  const commits = COMMITS.filter((commit) => filter === 'all' || commit.kind === filter)
  const visible = showAll ? commits : commits.slice(0, INITIAL_VISIBLE)
  const lanes = (Object.keys(BRANCHES) as Kind[]).filter((kind) => visible.some((commit) => commit.kind === kind))
  // Each branch line runs from its newest to its oldest commit; it keeps going
  // past the last row when older commits on that branch are still collapsed.
  const first = new Map<Kind, number>()
  const last = new Map<Kind, number>()
  visible.forEach((commit, index) => {
    if (!first.has(commit.kind)) first.set(commit.kind, index)
    last.set(commit.kind, index)
  })
  commits.slice(visible.length).forEach((commit) => last.set(commit.kind, Infinity))
  const command = FILTERS.find((option) => option.value === filter)?.command ?? ''
  // The side panel always shows something, falling back to the newest commit.
  const shown = visible.find((commit) => commit.hash === selected) ?? visible[0]

  // Newest commit per branch carries the branch ref, like `git log --decorate`.
  const headOf = new Map<Kind, string>()
  visible.forEach((commit) => !headOf.has(commit.kind) && headOf.set(commit.kind, commit.hash))
  const refsFor = (commit: Commit) => {
    if (headOf.get(commit.kind) !== commit.hash) return []
    const ref = BRANCHES[commit.kind].ref
    return commit.kind === 'Work' ? [`HEAD -> ${ref}`] : [ref]
  }

  return (
    <Section
      id="experiences"
      // clip (not hidden) so the sticky diff panel still sticks to the viewport
      className="overflow-x-clip"
      backdrop={<Blob className="-right-40 top-1/3 h-[420px] w-[420px]" />}
    >
      <Reveal>
        <SectionHeader
          cell={5}
          code={command}
          title={
            <>
              Where I&apos;ve worked,
              <br className="hidden md:block" /> taught & led.
            </>
          }
          description="Industry roles, teaching assistantships, and student organizations — one commit at a time. Pick a commit to see its diff."
        />
      </Reveal>

      <Reveal delay={0.1} className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
        <Tabs
          ariaLabel="Experience type"
          value={filter}
          onChange={(value) => {
            setFilter(value)
            setShowAll(false)
            setSelected(null)
          }}
          options={FILTERS.map((option) => ({
            value: option.value,
            label: option.label,
            count: option.value === 'all' ? COMMITS.length : EXPERIENCES[option.value].length,
          }))}
        />
        <span className="flex items-center gap-4 font-mono text-[11.5px] text-faint">
          {(Object.keys(BRANCHES) as Kind[]).map((kind) => (
            <span key={kind} className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: BRANCHES[kind].color }} />
              {BRANCHES[kind].ref}
            </span>
          ))}
        </span>
      </Reveal>

      <Reveal delay={0.15} className="mt-12 grid grid-cols-1 items-start gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <div>
          <ol>
            {visible.map((commit, index) => {
              const above = new Set(lanes.filter((lane) => first.get(lane)! < index && index <= last.get(lane)!))
              const below = new Set(lanes.filter((lane) => first.get(lane)! <= index && index < last.get(lane)!))
              return (
                <CommitRow
                  key={commit.hash}
                  commit={commit}
                  refs={refsFor(commit)}
                  lanes={lanes}
                  above={above}
                  below={below}
                  selected={selected === commit.hash}
                  shown={shown?.hash === commit.hash}
                  onSelect={() => {
                    // Desktop re-clicks keep the panel; mobile re-clicks collapse the row.
                    const desktop = window.matchMedia('(min-width: 1024px)').matches
                    setSelected(!desktop && selected === commit.hash ? null : commit.hash)
                  }}
                />
              )
            })}
          </ol>
          {commits.length > INITIAL_VISIBLE && (
            <div className="mt-3 flex flex-wrap items-center gap-4">
              <Button variant="secondary" size="sm" onClick={() => setShowAll((v) => !v)}>
                {showAll ? 'Collapse history' : `Show ${commits.length - INITIAL_VISIBLE} older commits`}
              </Button>
              <span className="font-mono text-[11.5px] text-faint">
                {commits.length} commits on {lanes.length > 1 ? `${lanes.length} branches` : BRANCHES[lanes[0]].ref}
              </span>
            </div>
          )}
        </div>

        {shown && (
          <div className="sticky top-24 hidden lg:block">
            <ShowPanel commit={shown} refs={refsFor(shown)} />
          </div>
        )}
      </Reveal>
    </Section>
  )
}
