'use client'
import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { useInView } from 'framer-motion'
import { EDUCATION } from '@constants'
import { Code, Reveal, Section, SectionHeader, Tag } from '@elements'

const SERIES = ['var(--accent)', 'var(--series-2)', 'var(--series-3)', 'var(--muted)']

// Oldest first so the bars climb like a staircase.
const SCHOOLS = EDUCATION.map((education, index) => {
  const [start, end] = education.year.split('-').map(Number)
  return { ...education, start, end, color: SERIES[index % SERIES.length] }
}).sort((a, b) => a.start - b.start)
type School = (typeof SCHOOLS)[number]

const AXIS_START = Math.min(...SCHOOLS.map((s) => s.start))
const AXIS_END = Math.max(...SCHOOLS.map((s) => s.end)) + 1
const YEARS = Array.from({ length: AXIS_END - AXIS_START + 1 }, (_, i) => AXIS_START + i)

// Scene geometry, in unscaled px.
const UNIT = 36 // floor px per year
const PAD = 36
const FLOOR_W = (AXIS_END - AXIS_START) * UNIT + PAD * 2
const FLOOR_D = 240
const BAR_Y = 64
const BAR_D = 88
const LEVEL = (rank: number) => 48 + rank * 46
const SCENE_W = 760
const SCENE_H = 470
const STAGE_LEFT = (SCENE_W - FLOOR_W) / 2
const STAGE_TOP = 150
const PERSPECTIVE = 1900
const ORIGIN = { x: SCENE_W * 0.5, y: SCENE_H * 0.1 }
const VIEW = { yaw: -28, tilt: 58 }
type View = typeof VIEW

const xOf = (year: number) => PAD + (year - AXIS_START) * UNIT
const clamp = (n: number, min: number, max: number) => Math.min(max, Math.max(min, n))

// Mirrors the CSS chain (stage rotateX·rotateZ about its centre, then the scene's
// perspective) to place flat HTML labels over 3D points without them clipping into bars.
const project = (x: number, y: number, z: number, { yaw, tilt }: View) => {
  const a = (yaw * Math.PI) / 180
  const t = (tilt * Math.PI) / 180
  const px = x - FLOOR_W / 2
  const py = y - FLOOR_D / 2
  const rx = px * Math.cos(a) - py * Math.sin(a)
  const ry = px * Math.sin(a) + py * Math.cos(a)
  const qy = ry * Math.cos(t) - z * Math.sin(t)
  const qz = ry * Math.sin(t) + z * Math.cos(t)
  const sx = STAGE_LEFT + FLOOR_W / 2 + rx
  const sy = STAGE_TOP + FLOOR_D / 2 + qy
  const f = PERSPECTIVE / (PERSPECTIVE - qz)
  return { x: ORIGIN.x + (sx - ORIGIN.x) * f, y: ORIGIN.y + (sy - ORIGIN.y) * f, depth: qz }
}

// Fractional current year, resolved on the client so a statically built page
// never shows a stale "now". Null outside the axis range.
const useNowYear = () => {
  const [now, setNow] = useState<number | null>(null)
  useEffect(() => {
    const today = new Date()
    const year = today.getFullYear() + today.getMonth() / 12
    setNow(year >= AXIS_START && year <= AXIS_END ? year : null)
  }, [])
  return now
}

// Fits the fixed-size scene into its column.
const useFitScale = (ref: React.RefObject<HTMLDivElement>) => {
  const [scale, setScale] = useState(1)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new ResizeObserver(([entry]) => setScale(Math.min(1, entry.contentRect.width / SCENE_W)))
    observer.observe(el)
    return () => observer.disconnect()
  }, [ref])
  return scale
}

const shade = (color: string, amount: number) =>
  amount >= 0
    ? `color-mix(in srgb, ${color} ${100 - amount}%, white)`
    : `color-mix(in srgb, ${color} ${100 + amount}%, black)`

const FACE = 'absolute left-0 top-0 origin-top-left [backface-visibility:visible]'

// A box standing on the floor at (x, y) with footprint w×d and height h; faces are shaded
// as if lit from the front-left so it reads as solid from any angle.
const Cuboid: React.FC<{ x: number; y: number; w: number; d: number; h: number; color: string; ghost?: boolean; ring?: boolean }> = ({
  x,
  y,
  w,
  d,
  h,
  color,
  ghost,
  ring,
}) => {
  const paint = (amount: number): React.CSSProperties =>
    ghost
      ? {
          background: `repeating-linear-gradient(-45deg, color-mix(in srgb, ${color} 42%, transparent) 0 6px, color-mix(in srgb, ${color} 14%, transparent) 6px 12px)`,
          boxShadow: `inset 0 0 0 1px color-mix(in srgb, ${color} 60%, transparent)`,
        }
      : { background: shade(color, amount) }

  return (
    <div className="absolute left-0 top-0 [transform-style:preserve-3d]" style={{ transform: `translate3d(${x}px, ${y}px, 0)` }}>
      <div
        className={FACE}
        style={{
          width: w,
          height: d,
          transform: `translateZ(${h}px)`,
          ...paint(22),
          outline: ring ? '2px solid var(--ink)' : undefined,
          outlineOffset: -2,
        }}
      />
      <div className={FACE} style={{ width: w, height: h, transform: 'rotateX(90deg)', ...paint(-30) }} />
      <div className={FACE} style={{ width: w, height: h, transform: `translateY(${d}px) rotateX(90deg)`, ...paint(0) }} />
      <div className={FACE} style={{ width: h, height: d, transform: 'rotateY(-90deg)', ...paint(-12) }} />
      <div className={FACE} style={{ width: h, height: d, transform: `translateX(${w}px) rotateY(-90deg)`, ...paint(-24) }} />
    </div>
  )
}

// Flat label pinned to a projected 3D point (bottom-centre anchored), counter-scaled to stay legible.
// Stacked by depth, except `front` labels which stay on top when rotated views make them overlap.
const Label: React.FC<{
  at: ReturnType<typeof project>
  zoom: number
  smooth: boolean
  front?: boolean
  children: React.ReactNode
}> = ({ at, zoom, smooth, front, children }) => (
  <div
    className={`absolute left-0 top-0 ${smooth ? 'transition-transform duration-[900ms] ease-out' : ''}`}
    style={{ transform: `translate(${at.x}px, ${at.y}px)`, zIndex: Math.round(1000 + at.depth) + (front ? 2000 : 0) }}
  >
    <div
      className="pointer-events-auto absolute left-0 top-0"
      style={{ transform: `translate(-50%, -100%) scale(${zoom})`, transformOrigin: '50% 100%' }}
    >
      {children}
    </div>
  </div>
)

const DetailCard: React.FC<{ school: School; now: number | null }> = ({ school, now }) => {
  const expected = now !== null && school.end > now
  return (
    <div className="card-shadow animate-rise rounded-[28px] bg-surface p-6 md:p-7">
      <p className="text-[12px]">
        <Code>{`schools.loc["${school.short}"]`}</Code>
      </p>
      <div className="mt-5 flex items-center gap-4">
        <span className="card-shadow relative h-14 w-14 shrink-0 overflow-hidden rounded-full bg-white">
          <Image src={school.image} alt="" fill sizes="56px" className="object-cover" />
        </span>
        <div className="min-w-0">
          <h3 className="text-[19px] font-medium leading-snug text-ink">{school.title}</h3>
          <p className="mt-0.5 text-[14px] text-muted">{school.institution}</p>
        </div>
      </div>
      <dl className="mt-6 grid grid-cols-3 gap-2 font-mono text-[11.5px]">
        {[
          ['start', school.start],
          ['end', expected ? `${school.end}*` : school.end],
          ['years', school.end - school.start],
        ].map(([label, value]) => (
          <div key={label} className="rounded-[16px] bg-well px-3.5 py-3">
            <dt className="text-faint">{label}</dt>
            <dd className="mt-1 text-[16px] text-ink">{value}</dd>
          </div>
        ))}
      </dl>
      {(school.detail || expected) && (
        <p className="mt-4 font-mono text-[11.5px] text-accent">{school.detail ?? '* expected'}</p>
      )}
      {school.courses && (
        <div className="mt-5 flex flex-wrap gap-1.5">
          {school.courses.map((course) => (
            <Tag key={course}>{course}</Tag>
          ))}
        </div>
      )}
    </div>
  )
}

export const Education: React.FC = () => {
  const now = useNowYear()
  const boxRef = useRef<HTMLDivElement>(null)
  const scale = useFitScale(boxRef)
  const grown = useInView(boxRef, { once: true, margin: '0px 0px -120px 0px' })
  // Staggered growth only for the intro; later lifts respond immediately.
  const [introDone, setIntroDone] = useState(false)
  useEffect(() => {
    if (!grown) return
    const t = setTimeout(() => setIntroDone(true), 1600)
    return () => clearTimeout(t)
  }, [grown])
  const [view, setView] = useState(VIEW)
  const [selected, setSelected] = useState(SCHOOLS.length - 1)
  const [dragging, setDragging] = useState(false)
  const drag = useRef<{ id: number; x: number; y: number; view: typeof VIEW; captured: boolean } | null>(null)

  // Labels stay readable when the scene is shrunk on small screens.
  const zoom = Math.min(1 / scale, 1.9)
  const moved = view.yaw !== VIEW.yaw || view.tilt !== VIEW.tilt

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return
    drag.current = { id: e.pointerId, x: e.clientX, y: e.clientY, view, captured: false }
  }
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = drag.current
    if (!d || d.id !== e.pointerId) return
    const dx = e.clientX - d.x
    const dy = e.clientY - d.y
    // Capture only once it's clearly a drag, so plain clicks still reach the bars.
    if (!d.captured) {
      if (Math.hypot(dx, dy) < 5) return
      e.currentTarget.setPointerCapture(e.pointerId)
      d.captured = true
      setDragging(true)
    }
    setView({
      yaw: d.view.yaw + dx * 0.4,
      tilt: e.pointerType === 'mouse' ? clamp(d.view.tilt - dy * 0.25, 28, 76) : d.view.tilt,
    })
  }
  const endDrag = () => {
    drag.current = null
    setDragging(false)
  }

  return (
    <Section id="education">
      <Reveal>
        <SectionHeader
          cell={7}
          code={`ax.bar3d(start, 0, 0, duration, 1, level)`}
          title="Where I studied."
          description="From SDN Pondok Labu to the Faculty of Computer Science at Universitas Indonesia — one step up at a time."
        />
      </Reveal>

      <div className="mt-10 grid grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,1.45fr)_minmax(0,0.75fr)]">
        <Reveal delay={0.1}>
          <div ref={boxRef} className="relative w-full select-none" style={{ height: SCENE_H * scale }}>
            <div
              role="img"
              aria-label={`3D bar chart of education from ${AXIS_START} to ${AXIS_END - 1}: ${SCHOOLS.map((s) => `${s.short} ${s.start}–${s.end}`).join(', ')}`}
              className="absolute left-1/2 top-0 cursor-grab touch-pan-y active:cursor-grabbing"
              style={{
                width: SCENE_W,
                height: SCENE_H,
                transform: `translateX(-50%) scale(${scale})`,
                transformOrigin: 'top center',
                perspective: `${PERSPECTIVE}px`,
                perspectiveOrigin: `${ORIGIN.x}px ${ORIGIN.y}px`,
              }}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={endDrag}
              onPointerCancel={endDrag}
            >
              <div
                className="absolute [transform-style:preserve-3d]"
                style={{
                  left: STAGE_LEFT,
                  top: STAGE_TOP,
                  width: FLOOR_W,
                  height: FLOOR_D,
                  transform: `rotateX(${view.tilt}deg) rotateZ(${view.yaw}deg)`,
                }}
              >
                {/* Floor with a year grid */}
                <div
                  className="absolute inset-0 rounded-[26px]"
                  style={{
                    background: 'color-mix(in srgb, var(--surface) 92%, transparent)',
                    backgroundImage: `linear-gradient(90deg, var(--grid-major) 1px, transparent 1px), linear-gradient(var(--grid-minor) 1px, transparent 1px)`,
                    backgroundSize: `${UNIT}px 100%, 100% 24px`,
                    backgroundPosition: `${PAD}px 0, 0 0`,
                    boxShadow: '0 40px 80px -40px rgba(0, 0, 0, 0.35)',
                  }}
                />
                {YEARS.map((year) => (
                  <span
                    key={year}
                    className={`absolute -translate-x-1/2 font-mono text-[11px] text-faint ${
                      scale < 0.7 && (year - AXIS_START) % 2 ? 'hidden' : ''
                    }`}
                    style={{ left: xOf(year), top: BAR_Y + BAR_D + 26, fontSize: 11 * Math.min(zoom, 1.5) }}
                  >
                    &apos;{String(year).slice(2)}
                  </span>
                ))}
                <span
                  className="absolute font-mono text-faint"
                  style={{ right: PAD, top: FLOOR_D - 34, fontSize: 11 * Math.min(zoom, 1.5) }}
                >
                  year →
                </span>

                {SCHOOLS.map((school, rank) => {
                  const active = rank === selected
                  const h = LEVEL(rank)
                  const x = xOf(school.start) + 2
                  const solidEnd = now !== null ? clamp(now, school.start, school.end) : school.end
                  const w = (solidEnd - school.start) * UNIT - (solidEnd === school.end ? 4 : 0)
                  const ghostW = (school.end - solidEnd) * UNIT - 4
                  const lift = active ? 14 : 0
                  return (
                    <div
                      key={school.institution}
                      className="absolute left-0 top-0 cursor-pointer transition-transform duration-[900ms] ease-out [transform-style:preserve-3d]"
                      style={{
                        transform: `translateZ(${lift}px) scaleZ(${grown ? 1 : 0.001})`,
                        transformOrigin: '0 0 0',
                        transitionDelay: introDone ? '0s' : `${rank * 0.12}s`,
                      }}
                      onPointerEnter={(e) => e.pointerType === 'mouse' && !drag.current?.captured && setSelected(rank)}
                      onClick={() => setSelected(rank)}
                    >
                      {w > 0 && <Cuboid x={x} y={BAR_Y} w={w} d={BAR_D} h={h} color={school.color} ring={active} />}
                      {ghostW > 0 && <Cuboid x={x + w} y={BAR_Y} w={ghostW} d={BAR_D} h={h} color={school.color} ghost />}
                    </div>
                  )
                })}

                {now !== null && (
                  <div
                    aria-hidden
                    className="absolute left-0 top-0 h-[290px] w-0 origin-top-left border-l-[1.5px] border-dashed border-accent"
                    style={{ transform: `translate3d(${xOf(now)}px, ${BAR_Y + BAR_D + 10}px, 0) rotateX(90deg)` }}
                  />
                )}
              </div>

              <div className="pointer-events-none absolute inset-0">
                {SCHOOLS.map((school, rank) => {
                  const active = rank === selected
                  const z = (grown ? LEVEL(rank) : 0) + (active ? 14 : 0) + 14
                  const at = project(xOf(school.start) + ((school.end - school.start) * UNIT) / 2, BAR_Y + BAR_D / 2, z, view)
                  return (
                    <Label key={school.institution} at={at} zoom={zoom} smooth={!dragging} front={active}>
                      <button
                        type="button"
                        onClick={() => setSelected(rank)}
                        onPointerEnter={(e) => e.pointerType === 'mouse' && !dragging && setSelected(rank)}
                        className={`card-shadow flex items-center gap-2 whitespace-nowrap rounded-full py-1 pl-1 pr-3 text-[12px] transition-colors ${
                          active ? 'bg-inverse text-on-inverse' : 'bg-surface text-ink'
                        }`}
                      >
                        <span className="relative h-6 w-6 overflow-hidden rounded-full bg-white">
                          <Image src={school.image} alt="" fill sizes="24px" className="object-cover" />
                        </span>
                        {school.short}
                        <span className={`font-mono text-[10.5px] ${active ? 'opacity-70' : 'text-faint'}`}>
                          {String(school.start).slice(2)}–{String(school.end).slice(2)}
                        </span>
                      </button>
                    </Label>
                  )
                })}
                {now !== null && (
                  <Label at={project(xOf(now), BAR_Y + BAR_D + 10, 296, view)} zoom={zoom} smooth={!dragging}>
                    <span className="rounded-full bg-accent px-2 py-0.5 font-mono text-[10.5px] text-on-inverse">now</span>
                  </Label>
                )}
              </div>
            </div>
          </div>

          <div className="mt-3 flex h-7 items-center gap-3 font-mono text-[11px] text-faint">
            <span>↻ drag to rotate</span>
            {moved && (
              <button
                type="button"
                onClick={() => setView(VIEW)}
                className="rounded-full bg-well px-2.5 py-1 text-muted transition-colors hover:text-ink"
              >
                reset view
              </button>
            )}
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mb-4 flex flex-wrap gap-1.5 lg:hidden">
            {SCHOOLS.map((school, rank) => (
              <button
                key={school.institution}
                type="button"
                onClick={() => setSelected(rank)}
                className={`rounded-full px-3.5 py-1.5 text-[13px] transition-colors ${
                  rank === selected ? 'bg-inverse text-on-inverse' : 'bg-well text-muted hover:text-ink'
                }`}
              >
                {school.short}
              </button>
            ))}
          </div>
          {/* Every card is laid out invisibly in the same cell so the column keeps the tallest card's
              height, and the chart beside it doesn't shift under the cursor as the selection changes. */}
          <div className="grid">
            {SCHOOLS.map((school) => (
              <div key={school.institution} className="invisible [grid-area:1/1]">
                <DetailCard school={school} now={now} />
              </div>
            ))}
            <div className="[grid-area:1/1]">
              <DetailCard key={selected} school={SCHOOLS[selected]} now={now} />
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
