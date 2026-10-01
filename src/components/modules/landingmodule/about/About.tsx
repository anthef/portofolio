'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { ACHIEVEMENTS, EDUCATION, EXPERIENCES, PROJECTS, STACK } from '@constants'
import {
  Arrow,
  Blob,
  Button,
  ClusterField,
  ClusterStats,
  Code,
  MarginLine,
  Plot,
  Reveal,
  StatusDot,
} from '@elements'

const ROLES = ['AI / LLM Engineer', 'Software Engineer', 'Data Scientist']

// Types, holds, deletes and cycles through `words`. Starts fully typed so the
// server render (and no-JS visitors) see a complete phrase.
const useTypewriter = (words: string[], typeMs = 70, deleteMs = 38, holdMs = 2200) => {
  const [index, setIndex] = useState(0)
  const [text, setText] = useState(words[0])
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const word = words[index]

    if (!deleting && text === word) {
      const t = setTimeout(() => setDeleting(true), holdMs)
      return () => clearTimeout(t)
    }
    if (deleting && text === '') {
      setDeleting(false)
      setIndex((i) => (i + 1) % words.length)
      return
    }
    const t = setTimeout(
      () => setText(deleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1)),
      deleting ? deleteMs : typeMs
    )
    return () => clearTimeout(t)
  }, [text, deleting, index, words, typeMs, deleteMs, holdMs])

  return text
}

const currentRoles = EXPERIENCES.Work.flatMap((experience) =>
  experience.roles
    .filter((role) => role.date.includes('Present'))
    .map((role) => ({ role: experience.headlineRole ?? role.name, at: experience.name }))
)

const university = EDUCATION[0]
const gpa = university.detail?.match(/cGPA ([\d.]+ \/ [\d.]+)/)?.[1]

const STATS = [
  { key: 'awards', value: ACHIEVEMENTS.length },
  { key: 'podium_finishes', value: ACHIEVEMENTS.filter((a) => ['gold', 'silver', 'bronze'].includes(a.medal)).length },
  { key: 'projects', value: PROJECTS.length },
  { key: 'experiences', value: EXPERIENCES.Work.length + EXPERIENCES.Org.length },
]
const STATS_MAX = Math.max(...STATS.map((s) => s.value))
const SERIES = ['var(--accent)', 'var(--series-2)', 'var(--series-3)', 'var(--accent)']

// Python-literal tokens for the pretty-printed profile dict.
const Str: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="text-accent">&apos;{children}&apos;</span>
)
const Key: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="text-series-3">&apos;{children}&apos;</span>
)
const Punct: React.FC<{ children: React.ReactNode }> = ({ children }) => <span className="text-faint">{children}</span>

// Hand-drawn, matplotlib `annotate()`-style arrow.
const CurvedArrow: React.FC<{ className?: string; flip?: boolean }> = ({ className = '', flip }) => (
  <svg
    aria-hidden
    viewBox="0 0 64 40"
    className={`h-8 w-14 text-faint ${flip ? '-scale-x-100' : ''} ${className}`}
    fill="none"
    stroke="currentColor"
    strokeWidth="1.3"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 6 C 24 2, 46 10, 56 30" />
    <path d="M49 27 L 56 31 L 58 23" />
  </svg>
)

const Annotation: React.FC<{ className?: string; flip?: boolean; children: React.ReactNode }> = ({
  className = '',
  flip,
  children,
}) => (
  <div className={`absolute z-10 flex flex-col ${flip ? 'items-end' : 'items-start'} ${className}`}>
    <span className="card-shadow whitespace-nowrap rounded-full bg-surface px-3 py-1.5 font-mono text-[11.5px] text-ink">
      {children}
    </span>
    <CurvedArrow flip={flip} className={`mt-0.5 ${flip ? 'mr-6' : 'ml-6'}`} />
  </div>
)

const Prompt: React.FC<{ n: number; className?: string }> = ({ n, className = '' }) => (
  <span className={`block font-mono text-[12px] text-accent lg:mb-0 lg:pt-[3px] lg:text-right ${className}`}>In [{n}]:</span>
)

export const About: React.FC = () => {
  const typed = useTypewriter(ROLES)
  const [stats, setStats] = useState<ClusterStats>({ iter: 0, inertia: 0, converged: false })
  const [now] = currentRoles

  return (
    <section id="about" className="relative scroll-mt-20 overflow-hidden">
      <Blob className="-right-32 top-10 h-[420px] w-[420px]" />
      <Blob className="-left-40 top-[560px] h-[360px] w-[360px]" color="var(--series-2)" />
      <Blob className="right-[18%] top-[1180px] h-[300px] w-[300px]" color="var(--series-3)" />

      <div className="frame frame-pad">
        <MarginLine />
        <div className="nb-body relative">
          {/* In [1]: intro + live clustering */}
          <div className="nb-gutter pt-12 md:pt-20">
            <Prompt n={1} className="mb-5" />
            <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
              <div>
                {now && (
                  <Reveal onLoad>
                    <a
                      href="#experiences"
                      className="card-shadow inline-flex max-w-full items-center gap-2.5 rounded-full bg-surface py-1.5 pl-1.5 pr-4 text-[13px] text-muted transition-colors hover:text-ink"
                    >
                      <span className="flex h-6 shrink-0 items-center gap-1.5 rounded-full bg-accent-soft px-2.5 font-mono text-[11.5px] text-accent">
                        <StatusDot tone="accent" /> now
                      </span>
                      <span className="truncate">
                        {now.role} <span className="text-faint">@</span> {now.at}
                      </span>
                    </a>
                  </Reveal>
                )}

                <Reveal onLoad delay={0.05}>
                  <h1 className="mt-8 font-display text-[50px] font-medium leading-[0.98] tracking-[-0.01em] text-ink sm:text-[64px] xl:text-[76px]">
                    Anthony Edbert
                    <br />
                    Feriyanto
                  </h1>
                </Reveal>

                <Reveal onLoad delay={0.1}>
                  <p className="mt-6 flex flex-wrap items-baseline gap-x-3 gap-y-1" aria-label={ROLES.join(', ')}>
                    <span className="font-mono text-[12px] text-series-2">Out[1]:</span>
                    <span aria-hidden className="font-display text-[26px] font-medium leading-tight text-accent sm:text-[34px]">
                      &apos;{typed}
                      <span className="ml-[0.06em] inline-block h-[0.82em] w-[0.42em] translate-y-[0.08em] animate-blink bg-ink" />
                      &apos;
                    </span>
                  </p>
                </Reveal>

                <Reveal onLoad delay={0.15}>
                  <p className="mt-6 max-w-[520px] text-[16px] leading-relaxed text-muted md:text-[17px]">
                    Computer Science student at Universitas Indonesia (cGPA 4.00) and full-time software engineer —
                    building LLM systems, machine learning, and large-scale software in production.
                  </p>
                </Reveal>

                <Reveal onLoad delay={0.2} className="mt-9 flex flex-wrap items-center gap-3">
                  <Button href="#chat" kbd="/">
                    Ask my AI
                  </Button>
                  <Button href="#projects" variant="secondary">
                    View projects
                  </Button>
                  <Button href="#achievements" variant="ghost">
                    {ACHIEVEMENTS.length} awards <Arrow />
                  </Button>
                </Reveal>
              </div>

              <Reveal onLoad delay={0.2}>
                <div className="mb-4 flex flex-wrap items-center justify-between gap-3 pl-[34px]">
                  <span className="card-shadow rounded-full bg-surface px-3.5 py-1.5 text-[12px]">
                    <Code>KMeans(n_clusters=3).fit(X)</Code>
                  </span>
                  <span className="flex items-center gap-1.5 font-mono text-[11px] text-faint">
                    <StatusDot /> live
                  </span>
                </div>
                <div className="aspect-[5/4] w-full">
                  <Plot xTicks={['0.0', '0.25', '0.5', '0.75', '1.0']} yTicks={['0.0', '0.5', '1.0']} className="h-full">
                    <ClusterField onStats={setStats} />
                  </Plot>
                </div>
                <div className="mt-5 flex flex-wrap gap-2 pl-[34px] font-mono text-[11.5px]">
                  <span className="rounded-full bg-well px-3 py-1 text-muted">
                    iter <span className="text-ink">{String(stats.iter).padStart(2, '0')}</span>
                  </span>
                  <span className="rounded-full bg-well px-3 py-1 text-muted">
                    inertia <span className="text-ink">{stats.inertia.toFixed(1)}</span>
                  </span>
                  <span className={`rounded-full px-3 py-1 ${stats.converged ? 'bg-accent-soft text-live' : 'bg-well text-faint'}`}>
                    {stats.converged ? '✓ converged' : '… fitting'}
                  </span>
                </div>
              </Reveal>
            </div>
          </div>

          {/* In [2]: annotated portrait + profile */}
          <div className="nb-gutter mt-28 md:mt-36">
            <Prompt n={2} className="mb-8" />
            <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
              <Reveal className="relative mx-auto w-full max-w-[300px] sm:max-w-[360px]">
                {/* Bust pops out of a graph-paper disc; the photo is clipped to the disc's lower half. */}
                <div aria-hidden className="graph-paper absolute inset-x-0 bottom-0 aspect-square rounded-full bg-accent-soft" />
                <div
                  aria-hidden
                  className="absolute -inset-x-3 -bottom-3 aspect-square animate-orbit sm:-inset-x-5 sm:-bottom-5 rounded-full border border-dashed border-line-strong"
                >
                  <span className="absolute left-1/2 top-0 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent" />
                </div>
                <div className="relative aspect-[720/972] w-full overflow-hidden rounded-b-full">
                  <Image
                    src="/profile/portrait-cutout.webp"
                    alt="Portrait of Anthony Edbert Feriyanto"
                    fill
                    sizes="(min-width: 1024px) 360px, 80vw"
                    className="object-cover object-top"
                  />
                </div>
                {gpa && <Annotation className="left-0 top-4 sm:-left-12">cgpa = {gpa}</Annotation>}
                <Annotation flip className="right-0 top-[34%] sm:-right-14">
                  awards = {ACHIEVEMENTS.length}
                </Annotation>
                <Annotation className="bottom-[16%] left-0 sm:-left-16">roles_now = {currentRoles.length}</Annotation>
              </Reveal>

              <div className="flex min-w-0 flex-col gap-12">
                <Reveal>
                  <p className="text-[12.5px]">
                    <Code>profile = Anthony().summary()</Code>
                  </p>
                  <pre className="mt-4 overflow-x-auto whitespace-pre-wrap font-mono text-[12.5px] leading-7 text-text scrollbar-none">
                    <Punct>{'{'}</Punct>
                    <Key>name</Key>
                    <Punct>: </Punct>
                    <Str>Anthony Edbert Feriyanto</Str>
                    <Punct>,</Punct>
                    {'\n '}
                    <Key>now</Key>
                    <Punct>: [</Punct>
                    {currentRoles.map(({ role, at }, i) => (
                      <React.Fragment key={`${role}-${at}`}>
                        {i > 0 && '\n         '}
                        <Str>
                          {role} @ {at}
                        </Str>
                        <Punct>{i < currentRoles.length - 1 ? ',' : ']'}</Punct>
                      </React.Fragment>
                    ))}
                    <Punct>,</Punct>
                    {'\n '}
                    <Key>education</Key>
                    <Punct>: </Punct>
                    <Str>{university.title}, Universitas Indonesia</Str>
                    <Punct>,</Punct>
                    {'\n '}
                    <Key>focus</Key>
                    <Punct>: [</Punct>
                    <Str>llm systems</Str>
                    <Punct>, </Punct>
                    <Str>machine learning</Str>
                    <Punct>, </Punct>
                    <Str>software engineering</Str>
                    <Punct>]{'}'}</Punct>
                  </pre>
                </Reveal>

                <Reveal delay={0.08}>
                  <p className="text-[12.5px]">
                    <Code>pd.Series(stats).plot.barh()</Code>
                  </p>
                  <ul className="mt-5 flex flex-col gap-3.5 font-mono text-[12px]">
                    {STATS.map((stat, i) => (
                      <li key={stat.key} className="grid grid-cols-[124px_minmax(0,1fr)_28px] items-center gap-3">
                        <span className="text-muted">{stat.key}</span>
                        <span className="h-2.5 rounded-full bg-well">
                          <span
                            className="block h-full rounded-full"
                            style={{ width: `${(stat.value / STATS_MAX) * 100}%`, background: SERIES[i] }}
                          />
                        </span>
                        <span className="text-right text-ink">{stat.value}</span>
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </div>
            </div>
          </div>

          {/* In [3]: stack as a loose cloud of pills */}
          <div className="nb-gutter mt-28 pb-8 md:mt-36">
            <Prompt n={3} className="mb-3" />
            <Reveal>
              <p className="flex flex-wrap items-baseline justify-between gap-3 text-[12.5px]">
                <Code>from anthony import stack</Code>
                <span className="font-mono text-[11.5px] text-faint"># {STACK.length} modules loaded</span>
              </p>
              <ul aria-label="Tech stack" className="mt-7 flex flex-wrap gap-x-2.5 gap-y-3">
                {STACK.map(({ skill, icon: Icon, hover }, index) => (
                  <li key={skill.name} className="animate-float" style={{ animationDelay: `${(index % 7) * -0.85}s` }}>
                    <a
                      href={skill.link}
                      target="_blank"
                      rel="noreferrer"
                      className="card-shadow group flex h-11 items-center gap-2.5 rounded-full bg-surface pl-3.5 pr-4 transition-transform duration-300 ease-out hover:-translate-y-0.5"
                      style={{ '--brand': hover ?? skill.color } as React.CSSProperties}
                    >
                      <Icon
                        size={17}
                        className="shrink-0 text-muted transition-colors duration-300 group-hover:text-[var(--brand)]"
                      />
                      <span className="text-[14px] text-ink">{skill.name}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
