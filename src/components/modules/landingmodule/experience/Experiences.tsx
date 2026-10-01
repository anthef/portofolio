'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { EXPERIENCES } from '@constants'
import { ExperienceType, SingularExperienceType } from 'src/constants/experience/interface'
import { Reveal, Section, SectionHeader, StatusDot, Tabs, Tag } from '@elements'

type Kind = keyof ExperienceType

const KINDS: Record<Kind, { label: string; query: string }> = {
  Work: { label: 'Work', query: 'work' },
  Org: { label: 'Organization', query: 'organization' },
}

const COLUMNS = 'md:grid-cols-[44px_minmax(0,1.25fr)_minmax(0,1fr)_190px_28px]'

const isCurrent = (experience: SingularExperienceType) =>
  experience.roles.some((role) => role.date.includes('Present'))

const ExperienceRow: React.FC<{
  experience: SingularExperienceType
  index: number
  open: boolean
  onToggle: () => void
}> = ({ experience, index, open, onToggle }) => {
  const { name, logo, location, roles, skills, links, headlineRole } = experience
  const date = (experience.date ?? roles[0].date).trim()
  const current = isCurrent(experience)
  const panelId = `exp-${index}-${name}`.replace(/\W+/g, '-')

  return (
    <li className="border-b border-line">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={panelId}
        className={`frame-pad grid w-full grid-cols-[28px_minmax(0,1fr)_20px] items-center gap-x-3 gap-y-1 py-4 text-left transition-colors hover:bg-well md:gap-x-4 ${COLUMNS} ${open ? 'bg-well' : ''}`}
      >
        <span className="row-span-3 self-start pt-0.5 font-mono text-[12px] text-faint md:row-span-1 md:self-center md:pt-0">
          {index}
        </span>
        <span className="text-[15px] font-medium leading-snug text-ink">{headlineRole ?? roles[0].name}</span>
        <span
          aria-hidden
          className={`row-span-3 self-start text-center font-mono text-[15px] text-faint transition-transform duration-300 md:order-last md:row-span-1 md:self-center ${open ? 'rotate-45 text-accent' : ''}`}
        >
          +
        </span>
        <span className="flex min-w-0 items-center gap-2.5">
          <span className="relative h-6 w-6 shrink-0 overflow-hidden rounded-[5px] border border-line bg-white">
            <Image src={`/experiences/${logo}`} alt="" fill sizes="24px" className="object-contain" />
          </span>
          <span className="truncate text-[14px] text-muted">{name}</span>
        </span>
        <span className={`flex items-center gap-2 font-mono text-[12px] ${current ? 'text-live' : 'text-faint'}`}>
          {current && <StatusDot />}
          {date}
        </span>
      </button>

      <div
        id={panelId}
        className={`grid transition-[grid-template-rows] duration-300 ease-out ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
      >
        <div className="overflow-hidden">
          <div className="frame-pad bg-well pb-6 pt-1">
            <div className="flex flex-col gap-5 pl-[40px] md:pl-[60px]">
              {location && <p className="font-mono text-[11.5px] text-faint">location = &apos;{location}&apos;</p>}
              {roles.map((role) => (
                <div key={role.name + role.date} className="flex max-w-[760px] flex-col gap-2">
                  {roles.length > 1 && (
                    <p className="flex flex-wrap items-baseline gap-x-3 text-[14px] font-medium text-ink">
                      {role.name}
                      <span className="font-mono text-[11.5px] font-normal text-faint">{role.date}</span>
                    </p>
                  )}
                  <ul className="flex flex-col gap-1.5">
                    {role.description?.map((desc) => (
                      <li key={desc} className="flex gap-2.5 text-[14px] leading-relaxed text-muted">
                        <span aria-hidden className="font-mono text-accent">
                          ›
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
          </div>
        </div>
      </div>
    </li>
  )
}

export const Experiences: React.FC = () => {
  const [kind, setKind] = useState<Kind>('Work')
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const list = EXPERIENCES[kind]

  return (
    <Section id="experiences" innerClassName="">
      <div className="frame-pad pb-8 pt-20 md:pt-28">
        <Reveal>
          <SectionHeader
            cell={6}
            code={`experience[experience.type == "${KINDS[kind].query}"]`}
            title={
              <>
                Where I&apos;ve worked,
                <br className="hidden md:block" /> taught & led.
              </>
            }
            description="Industry roles, teaching assistantships, and student organizations. Open any row for the details."
          />
        </Reveal>
        <Reveal delay={0.1} className="mt-10">
          <Tabs
            ariaLabel="Experience type"
            value={kind}
            onChange={(value) => {
              setKind(value)
              setOpenIndex(0)
            }}
            options={(Object.keys(KINDS) as Kind[]).map((key) => ({
              value: key,
              label: KINDS[key].label,
              count: EXPERIENCES[key].length,
            }))}
          />
        </Reveal>
      </div>

      <Reveal delay={0.15}>
        <div
          aria-hidden
          className={`frame-pad hidden h-10 items-center gap-x-4 border-y border-line bg-well font-mono text-[11.5px] text-faint md:grid ${COLUMNS}`}
        >
          <span />
          <span>role</span>
          <span>organization</span>
          <span>period</span>
          <span />
        </div>
        <ul className="border-t border-line md:border-t-0">
          {list.map((experience, index) => (
            <ExperienceRow
              key={`${kind}-${experience.name}-${index}`}
              experience={experience}
              index={index}
              open={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </ul>
        <p className="frame-pad py-4 font-mono text-[11.5px] text-faint">
          {list.length} rows × 4 columns
        </p>
      </Reveal>
    </Section>
  )
}
