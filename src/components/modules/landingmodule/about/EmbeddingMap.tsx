'use client'
import React, { useState } from 'react'
import { ACHIEVEMENTS, EXPERIENCES, PROJECTS } from '@constants'
import { Code } from '@elements'

type Cluster = 'llm' | 'ds' | 'software' | 'community'
type Kind = 'project' | 'award' | 'role'

const W = 500
const H = 440

// Cluster centres are hand-placed in the viewBox; the label sits on the halo edge at `labelAngle` (degrees, y down).
const CLUSTERS: Record<Cluster, { label: string; color: string; cx: number; cy: number; labelAngle: number }> = {
  llm: { label: 'llm systems', color: 'var(--accent)', cx: 400, cy: 90, labelAngle: -90 },
  ds: { label: 'data science', color: 'var(--series-2)', cx: 170, cy: 152, labelAngle: -90 },
  software: { label: 'software', color: 'var(--series-3)', cx: 390, cy: 292, labelAngle: -90 },
  community: { label: 'academics & community', color: 'var(--muted)', cx: 118, cy: 330, labelAngle: 90 },
}
const CLUSTER_KEYS = Object.keys(CLUSTERS) as Cluster[]

// First match wins, so the narrow buckets come before the broad ones.
const RULES: [Cluster, RegExp][] = [
  ['community', /teaching assistant|scholarship|ambassador|human resources|public relation|business competition|robotic|ijazah|asesmen|try out|kihajar/i],
  ['llm', /\b(llm|agents?|tutor|retrieval|colbert|langfuse|mcp|language models?)\b/i],
  ['software', /\b(hackathon|dashboard|website|django|full stack)\b/i],
  ['ds', /\b(data|machine learning|datathon|models?|classification|segmentation|predict\w*|regression|ocr|yolo|catboost|ensemble|statistics)\b/i],
  ['software', /\b(web|apps?|mobile|developer|software|platform)\b/i],
]
const classify = (text: string, fallback: Cluster = 'community') => RULES.find(([, re]) => re.test(text))?.[0] ?? fallback

const MEDAL_WEIGHT: Record<string, number> = { gold: 3, silver: 2.5, bronze: 2, '4th': 1.5 }

interface Item {
  key: string
  kind: Kind
  cluster: Cluster
  title: string
  meta: string
  weight: number
}

const ITEMS: Item[] = [
  ...(['Work', 'Org'] as const).flatMap((type) =>
    EXPERIENCES[type].map((experience): Item => {
      const role = experience.headlineRole ?? experience.roles[0].name
      const current = experience.roles.some((r) => r.date.includes('Present'))
      return {
        key: `role:${experience.name}:${role}`,
        kind: 'role',
        cluster: classify(
          [experience.name, role, ...experience.roles.map((r) => r.name), ...(experience.skills ?? []).map((s) => s.name)].join(' ')
        ),
        title: role,
        meta: `${experience.name} · ${(experience.date ?? experience.roles[0].date).trim()}`,
        weight: current ? 3 : 1,
      }
    })
  ),
  ...ACHIEVEMENTS.map(
    (award): Item => ({
      key: `award:${award.name}:${award.issuer}`,
      kind: 'award',
      cluster: classify(`${award.name} ${award.description ?? ''}`),
      title: award.name,
      meta: `${award.issuer} · ${award.date}`,
      weight: MEDAL_WEIGHT[award.medal] ?? 1,
    })
  ),
  ...PROJECTS.map(
    (project): Item => ({
      key: `project:${project.name}`,
      kind: 'project',
      cluster: project.type === 'DS' ? (RULES[1][1].test(`${project.name} ${project.description}`) ? 'llm' : 'ds') : 'software',
      title: project.name,
      meta: `project · ${project.date}`,
      weight: 1.2,
    })
  ),
]

// Seeded PRNG so the layout is identical on server and client.
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
// Server and browser Math.cos can differ in the last bits; round so hydration matches.
const r1 = (n: number) => Math.round(n * 10) / 10
const GOLDEN = Math.PI * (3 - Math.sqrt(5))

const RADIUS = Object.fromEntries(
  CLUSTER_KEYS.map((c) => [c, 15 * Math.sqrt(ITEMS.filter((i) => i.cluster === c).length) + 8])
) as Record<Cluster, number>

// Sunflower layout per cluster: strongest items (current roles, podiums) sit at the core.
const POINTS = CLUSTER_KEYS.flatMap((cluster) => {
  const items = ITEMS.filter((item) => item.cluster === cluster).sort((a, b) => b.weight - a.weight)
  const { cx, cy } = CLUSTERS[cluster]
  return items.map((item, i) => {
    const rand = seeded(item.key)
    const r = RADIUS[cluster] * Math.sqrt((i + 0.5) / items.length) * (0.85 + rand() * 0.3)
    const angle = i * GOLDEN + (rand() - 0.5) * 0.7
    return { ...item, x: r1(cx + Math.cos(angle) * r), y: r1(cy + Math.sin(angle) * r), index: i }
  })
})
type Point = (typeof POINTS)[number]

const pctX = (x: number) => `${(x / W) * 100}%`
const pctY = (y: number) => `${(y / H) * 100}%`

const Marker: React.FC<{ point: Point; color: string; active: boolean }> = ({ point, color, active }) => {
  const { x, y, kind, weight } = point
  const s = 3.6 + weight * 0.55 + (active ? 2 : 0)
  if (kind === 'award')
    return <polygon points={`${x},${y - s * 1.25} ${x + s * 1.25},${y} ${x},${y + s * 1.25} ${x - s * 1.25},${y}`} fill={color} />
  if (kind === 'role')
    return <circle cx={x} cy={y} r={s} fill="var(--bg)" stroke={color} strokeWidth={2} />
  return <circle cx={x} cy={y} r={s} fill={color} />
}

const KIND_LABEL: Record<Kind, string> = { project: 'project', award: 'award', role: 'role' }

export const EmbeddingMap: React.FC = () => {
  const [active, setActive] = useState<Point | null>(null)
  const [focus, setFocus] = useState<Cluster | null>(null)
  const highlighted = active?.cluster ?? focus

  return (
    <figure onPointerLeave={() => setActive(null)}>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <span className="card-shadow rounded-full bg-surface px-3.5 py-1.5 text-[12px]">
          <Code>umap(embed(anthony)).plot()</Code>
        </span>
        <span className="font-mono text-[11px] text-faint"># n = {POINTS.length}</span>
      </div>

      <div className="relative">
        <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full overflow-visible" aria-hidden>
          <path d={`M6 4 V${H - 6} H${W - 4}`} fill="none" stroke="var(--line-strong)" strokeWidth="1" />
          {CLUSTER_KEYS.map((cluster) => {
            const { cx, cy, color } = CLUSTERS[cluster]
            const dimmed = highlighted !== null && highlighted !== cluster
            return (
              <g key={cluster} className="transition-opacity duration-300" style={{ opacity: dimmed ? 0.16 : 1 }}>
                <circle cx={cx} cy={cy} r={RADIUS[cluster] + 14} fill={color} opacity={0.09} />
                {POINTS.filter((point) => point.cluster === cluster).map((point) => (
                  <g
                    key={point.key}
                    className="animate-pop cursor-pointer"
                    style={{ transformBox: 'fill-box', transformOrigin: 'center', animationDelay: `${0.25 + point.index * 0.035}s` }}
                    onPointerEnter={() => setActive(point)}
                    onClick={() => setActive((current) => (current?.key === point.key ? null : point))}
                  >
                    <circle cx={point.x} cy={point.y} r={11} fill="transparent" />
                    {active?.key === point.key && (
                      <circle cx={point.x} cy={point.y} r={13} fill="none" stroke={color} strokeWidth={1} opacity={0.5} />
                    )}
                    <Marker point={point} color={color} active={active?.key === point.key} />
                  </g>
                ))}
              </g>
            )
          })}
        </svg>

        <span className="pointer-events-none absolute left-3 top-0 font-mono text-[10.5px] text-faint">umap₂</span>
        <span className="pointer-events-none absolute -bottom-5 right-0 font-mono text-[10.5px] text-faint">umap₁ →</span>

        {CLUSTER_KEYS.map((cluster) => {
          const { cx, cy, color, label, labelAngle } = CLUSTERS[cluster]
          const rad = (labelAngle * Math.PI) / 180
          const distance = RADIUS[cluster] + 22
          const cos = Math.cos(rad)
          const x = cx + cos * distance
          const y = cy + Math.sin(rad) * distance
          const shiftX = cos > 0.35 ? '0%' : cos < -0.35 ? '-100%' : '-50%'
          const count = POINTS.filter((point) => point.cluster === cluster).length
          return (
            <button
              key={cluster}
              type="button"
              onPointerEnter={() => setFocus(cluster)}
              onPointerLeave={() => setFocus(null)}
              onFocus={() => setFocus(cluster)}
              onBlur={() => setFocus(null)}
              className="absolute whitespace-nowrap font-mono text-[11.5px] transition-opacity duration-300"
              style={{
                left: pctX(x),
                top: pctY(y),
                transform: `translate(${shiftX}, -50%)`,
                color,
                opacity: highlighted !== null && highlighted !== cluster ? 0.35 : 1,
              }}
            >
              {label} <span className="text-faint">{count}</span>
            </button>
          )
        })}

        {active && (
          <div
            className="card-shadow pointer-events-none absolute z-10 w-max max-w-[250px] rounded-[16px] bg-surface px-3.5 py-2.5"
            style={{
              left: pctX(active.x),
              top: pctY(active.y),
              transform: `translate(${active.x > W * 0.7 ? '-100%' : active.x < W * 0.3 ? '0%' : '-50%'}, ${
                active.y < H * 0.3 ? '18px' : 'calc(-100% - 18px)'
              })`,
            }}
          >
            <p className="font-mono text-[10.5px]" style={{ color: CLUSTERS[active.cluster].color }}>
              {KIND_LABEL[active.kind]} · {CLUSTERS[active.cluster].label}
            </p>
            <p className="mt-0.5 line-clamp-2 text-[13px] leading-snug text-ink">{active.title}</p>
            <p className="mt-0.5 truncate font-mono text-[10.5px] text-faint">{active.meta}</p>
          </div>
        )}
      </div>

      <figcaption className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[11px] text-faint">
        <span className="flex items-center gap-1.5">
          <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden>
            <circle cx="5" cy="5" r="4" fill="var(--faint)" />
          </svg>
          project
        </span>
        <span className="flex items-center gap-1.5">
          <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden>
            <polygon points="5,0 10,5 5,10 0,5" fill="var(--faint)" />
          </svg>
          award
        </span>
        <span className="flex items-center gap-1.5">
          <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden>
            <circle cx="5" cy="5" r="3.5" fill="none" stroke="var(--faint)" strokeWidth="1.6" />
          </svg>
          role
        </span>
        <span className="ml-auto">hover or tap a point</span>
        <span className="sr-only">
          Map of {POINTS.length} projects, awards and roles grouped into{' '}
          {CLUSTER_KEYS.map((c) => `${CLUSTERS[c].label} (${POINTS.filter((p) => p.cluster === c).length})`).join(', ')}.
        </span>
      </figcaption>
    </figure>
  )
}
