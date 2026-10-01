'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { ACHIEVEMENTS, EDUCATION, EXPERIENCES, PROJECTS, STACK } from '@constants'
import {
  Arrow,
  Button,
  ClusterField,
  ClusterStats,
  Code,
  NotebookCell,
  Plot,
  Reveal,
  StatusDot,
} from '@elements'

const ROLES = ['Data Scientist', 'Full Stack Engineer']

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
    .map((role) => ({ role: role.name, at: experience.name }))
)

const STATS = [
  { key: 'achievements', value: ACHIEVEMENTS.length },
  { key: 'podium_finishes', value: ACHIEVEMENTS.filter((a) => ['gold', 'silver', 'bronze'].includes(a.medal)).length },
  { key: 'projects', value: PROJECTS.length },
  { key: 'experiences', value: EXPERIENCES.Work.length + EXPERIENCES.Org.length },
]
const STATS_MAX = Math.max(...STATS.map((s) => s.value))

const SummaryRow: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <tr className="border-b border-line last:border-b-0">
    <th scope="row" className="w-[104px] py-2 pr-3 text-left align-top font-normal text-faint">
      {label}
    </th>
    <td className="py-2 text-ink">{children}</td>
  </tr>
)

export const About: React.FC = () => {
  const typed = useTypewriter(ROLES)
  const [stats, setStats] = useState<ClusterStats>({ iter: 0, inertia: 0, converged: false })
  const [now] = currentRoles
  const university = EDUCATION[0]

  return (
    <section id="about" className="relative scroll-mt-16">
      <div className="frame">
        {/* Intro + live plot */}
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <div className="frame-pad flex flex-col justify-center py-16 md:py-24">
            {now && (
              <Reveal onLoad>
                <a
                  href="#experiences"
                  className="group inline-flex max-w-full items-center gap-2.5 font-mono text-[12px] text-muted transition-colors hover:text-ink"
                >
                  <span className="flex h-6 shrink-0 items-center gap-1.5 rounded-[5px] border border-line bg-surface px-2 text-accent">
                    <StatusDot tone="accent" /> now
                  </span>
                  <span className="truncate">
                    {now.role} <span className="text-faint">@</span> {now.at}
                  </span>
                </a>
              </Reveal>
            )}

            <Reveal onLoad delay={0.05}>
              <h1 className="mt-7 font-display text-[50px] font-medium leading-[0.98] tracking-[-0.01em] text-ink sm:text-[68px] xl:text-[84px]">
                Anthony Edbert
                <br />
                Feriyanto
              </h1>
            </Reveal>

            <Reveal onLoad delay={0.1}>
              <p className="mt-6 flex flex-wrap items-baseline gap-x-3 gap-y-1" aria-label={`${ROLES.join(' and ')}`}>
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
                Information Systems undergraduate at Universitas Indonesia, working across machine learning and
                full-stack web development.
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
                {ACHIEVEMENTS.length} achievements <Arrow />
              </Button>
            </Reveal>
          </div>

          <Reveal onLoad delay={0.15} className="flex flex-col border-t border-line bg-well lg:border-l lg:border-t-0">
            <div className="flex h-11 items-center justify-between gap-3 border-b border-line px-4 text-[12px]">
              <span className="truncate">
                <span className="mr-2 font-mono text-faint">In [1]:</span>
                <Code>KMeans(n_clusters=3).fit(X)</Code>
              </span>
              <span className="flex shrink-0 items-center gap-1.5 font-mono text-[11px] text-faint">
                <StatusDot /> live
              </span>
            </div>
            <div className="graph-paper relative min-h-[360px] flex-1 p-5 pr-6 md:min-h-[420px]">
              <Plot xTicks={['0.0', '0.25', '0.5', '0.75', '1.0']} yTicks={['0.0', '0.5', '1.0']} className="h-full">
                <ClusterField onStats={setStats} />
              </Plot>
            </div>
            <div className="grid h-11 grid-cols-3 items-center border-t border-line px-4 font-mono text-[11.5px] text-muted">
              <span>
                iter <span className="text-ink">{String(stats.iter).padStart(2, '0')}</span>
              </span>
              <span className="text-center">
                inertia <span className="text-ink">{stats.inertia.toFixed(1)}</span>
              </span>
              <span className={`text-right ${stats.converged ? 'text-live' : 'text-faint'}`}>
                {stats.converged ? '✓ converged' : '… fitting'}
              </span>
            </div>
          </Reveal>
        </div>

        {/* Profile band */}
        <div className="grid grid-cols-1 border-t border-line lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)]">
          <Reveal className="frame-pad py-10 lg:border-r lg:border-line">
            <Plot
              xTicks={[0, 300, 608]}
              yTicks={[0, 400, 777]}
              caption={
                <>
                  <span className="text-accent">plt</span>.imshow(portrait) <span className="opacity-70"># 608×777</span>
                </>
              }
            >
              <div className="graph-paper relative aspect-[608/777] w-full">
                <Image
                  src="/profile/personal_photo2.png"
                  alt="Portrait of Anthony Edbert Feriyanto"
                  fill
                  priority
                  sizes="(min-width: 1024px) 360px, 90vw"
                  className="object-contain object-bottom"
                />
              </div>
            </Plot>
          </Reveal>

          <div className="frame-pad flex flex-col justify-center gap-8 py-10">
            <Reveal>
              <NotebookCell n={2} code="profile = Anthony().summary()">
                <table className="w-full font-mono text-[12.5px] leading-5">
                  <tbody>
                    <SummaryRow label="name">Anthony Edbert Feriyanto</SummaryRow>
                    <SummaryRow label="role">Data Scientist · Full Stack Engineer</SummaryRow>
                    {currentRoles.map(({ role, at }) => (
                      <SummaryRow key={`${role}-${at}`} label="now">
                        {role} <span className="text-faint">@</span> {at}
                      </SummaryRow>
                    ))}
                    <SummaryRow label="education">
                      {university.institution} <span className="text-faint">({university.year})</span>
                    </SummaryRow>
                  </tbody>
                </table>
              </NotebookCell>
            </Reveal>

            <Reveal delay={0.08}>
              <NotebookCell n={3} code={`pd.Series(stats).plot.barh()`}>
                <ul className="flex flex-col gap-2 pt-1 font-mono text-[12px]">
                  {STATS.map((stat, i) => (
                    <li key={stat.key} className="grid grid-cols-[124px_minmax(0,1fr)_32px] items-center gap-3">
                      <span className="text-muted">{stat.key}</span>
                      <span className="h-3 rounded-[2px] bg-raised">
                        <span
                          className="block h-full rounded-[2px]"
                          style={{
                            width: `${(stat.value / STATS_MAX) * 100}%`,
                            background: ['var(--accent)', 'var(--series-2)', 'var(--series-3)', 'var(--accent)'][i],
                          }}
                        />
                      </span>
                      <span className="text-right text-ink">{stat.value}</span>
                    </li>
                  ))}
                </ul>
              </NotebookCell>
            </Reveal>
          </div>
        </div>

        {/* Stack */}
        <div className="border-t border-line">
          <div className="frame-pad flex h-12 items-center justify-between gap-4 text-[12.5px]">
            <span className="truncate">
              <span className="mr-2 font-mono text-faint">In [4]:</span>
              <Code>from anthony import stack</Code>
            </span>
            <span className="shrink-0 font-mono text-[11.5px] text-faint">{STACK.length} modules</span>
          </div>
          <ul aria-label="Tech stack" className="cell-grid grid-cols-2 border-b-0 sm:grid-cols-3 lg:grid-cols-6">
            {STACK.map(({ skill, icon: Icon, hover }, index) => (
              <li key={skill.name}>
                <a
                  href={skill.link}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex h-[108px] flex-col justify-between p-4 transition-colors hover:bg-well"
                  style={{ '--brand': hover ?? skill.color } as React.CSSProperties}
                >
                  <span className="flex items-center justify-between font-mono text-[11px] text-faint">
                    [{String(index).padStart(2, '0')}]
                    <span className="opacity-0 transition-opacity group-hover:opacity-100">↗</span>
                  </span>
                  <span className="flex items-center gap-2.5">
                    <Icon
                      size={20}
                      className="shrink-0 text-muted transition-colors duration-300 group-hover:text-[var(--brand)]"
                    />
                    <span className="truncate text-[14px] text-ink">{skill.name}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
