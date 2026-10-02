'use client'
import React, { useState } from 'react'
import { FaExternalLinkAlt } from 'react-icons/fa'
import { PROJECTS } from '@constants'
import { linkIconMapping } from 'src/constants/linkicons'
import { Blob, Button, Reveal, Section, SectionHeader, Tabs, Tag } from '@elements'
import { Cover } from './Covers'
import { Filter, Workbench } from './Workbench'

type Project = (typeof PROJECTS)[number]

const TYPE_LABEL: Record<string, string> = {
  DS: 'data science',
  SE: 'software',
}

const INITIAL_VISIBLE = 4

const matchesFilter = (project: Project, filter: Filter) =>
  filter === 'all' || project.type === filter || project.type === 'All'

const COUNTS: Record<Filter, number> = {
  all: PROJECTS.length,
  DS: PROJECTS.filter((project) => matchesFilter(project, 'DS')).length,
  SE: PROJECTS.filter((project) => matchesFilter(project, 'SE')).length,
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

  const select = (value: Filter) => {
    setFilter(value)
    setShowAll(false)
  }

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
      <div className="grid grid-cols-1 items-center gap-x-10 gap-y-10 lg:grid-cols-2 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.25fr)]">
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
        <Reveal delay={0.15} className="lg:col-start-2 lg:row-span-2 lg:row-start-1">
          <Workbench filter={filter} counts={COUNTS} onSelect={select} />
        </Reveal>
        <Reveal delay={0.1}>
          <Tabs
            ariaLabel="Filter projects"
            value={filter}
            onChange={select}
            options={options.map((option) => ({ ...option, count: COUNTS[option.value] }))}
          />
        </Reveal>
      </div>

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
