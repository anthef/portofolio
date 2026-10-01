'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { FaExternalLinkAlt } from 'react-icons/fa'
import { PROJECTS } from '@constants'
import { linkIconMapping } from 'src/constants/linkicons'
import { GridFill, Reveal, Section, SectionHeader, Tabs, Tag } from '@elements'

type Project = (typeof PROJECTS)[number]
type Filter = 'all' | 'DS' | 'SE'

const TYPE_LABEL: Record<string, string> = {
  DS: 'data science',
  SE: 'software',
}

const INITIAL_VISIBLE = 4

const matchesFilter = (project: Project, filter: Filter) =>
  filter === 'all' || project.type === filter || project.type === 'All'

const ProjectCard: React.FC<{ project: Project; index: number }> = ({ project, index }) => {
  const [expanded, setExpanded] = useState(false)
  const { name, image, date, description, skills, links, type } = project
  const collaborators = 'collaborators' in project ? project.collaborators : undefined

  return (
    <article className="group flex h-full flex-col">
      <header className="flex h-10 items-center justify-between gap-4 border-b border-line px-5 font-mono text-[11.5px] md:px-6">
        <span>
          <span className="text-muted">projects</span>
          <span className="text-faint">[</span>
          <span className="text-series-2">{index}</span>
          <span className="text-faint">]</span>
        </span>
        <span className="truncate text-faint">
          {TYPE_LABEL[type] ?? type} · {date}
        </span>
      </header>

      <div className="flex flex-1 flex-col gap-4 p-5 md:p-6">
        {image && (
          <div className="relative aspect-[16/9] overflow-hidden rounded-[6px] border border-line bg-well">
            <Image
              src={`/projects/${image}`}
              alt={name}
              fill
              sizes="(min-width: 1024px) 600px, 100vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]"
            />
          </div>
        )}

        <h3 className="text-[18px] font-medium leading-snug text-ink">{name}</h3>

        {description && (
          <div>
            <p className={`text-[14.5px] leading-relaxed text-muted ${expanded ? '' : 'line-clamp-3'}`}>{description}</p>
            {description.length > 200 && (
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

        <div className="mt-auto flex flex-col gap-3 pt-1">
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
            <div className="flex flex-wrap gap-x-5 gap-y-1 border-t border-line pt-3">
              {links.map((link) => {
                const Icon = linkIconMapping[link.name] || FaExternalLinkAlt
                return (
                  <a
                    key={link.link + link.name}
                    href={link.link}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-[13px] text-accent underline-offset-4 hover:underline"
                  >
                    <Icon size={12} />
                    {link.name}
                  </a>
                )
              })}
            </div>
          )}
        </div>
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

  const code = filter === 'all' ? 'projects.head(4)' : `projects[projects.type == "${filter.toLowerCase()}"]`

  return (
    <Section id="projects" innerClassName="">
      <div className="frame-pad pb-8 pt-20 md:pt-28">
        <Reveal>
          <SectionHeader
            cell={7}
            code={showAll && filter === 'all' ? 'projects' : code}
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
      </div>

      <div className="cell-grid grid-cols-1 border-b-0 lg:grid-cols-2">
        {visible.map((project, index) => (
          <div key={`${project.name}-${index}`}>
            <Reveal delay={(index % 2) * 0.06} className="h-full">
              <ProjectCard project={project} index={PROJECTS.indexOf(project)} />
            </Reveal>
          </div>
        ))}
        <GridFill count={visible.length} md={1} lg={2} />
      </div>

      {filtered.length > INITIAL_VISIBLE && (
        <div className="flex justify-center border-t border-line py-6">
          <button
            type="button"
            onClick={() => setShowAll((v) => !v)}
            className="font-mono text-[12px] text-muted transition-colors hover:text-accent"
          >
            {showAll ? '[−] show less' : `[+] show all ${filtered.length} rows`}
          </button>
        </div>
      )}
    </Section>
  )
}
