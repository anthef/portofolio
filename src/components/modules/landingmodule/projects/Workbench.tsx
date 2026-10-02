'use client'
import React, { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'
import { IsoBox, PRESERVE, makeProjector, tint, useFitScale } from '@elements'

export type Filter = 'all' | 'DS' | 'SE'

// Scene geometry, in unscaled px. The stage is a flat plane turned 45° and tilted 60° with no
// perspective, so everything on it reads like an isometric technical drawing.
const STAGE = 440
const SCENE_W = 520
const SCENE_H = 330
const ORIGIN = { x: SCENE_W / 2, y: SCENE_H / 2 + 30 }
const project = makeProjector({ yaw: -45, tilt: 60, center: { x: STAGE / 2, y: STAGE / 2 }, origin: ORIGIN })

// Everything starts in the notebook at the back, then branches out to a model or an app.
const STATIONS: Record<Filter, { label: string; color: string; x: number; y: number }> = {
  all: { label: 'All projects', color: 'var(--accent)', x: 300, y: 140 },
  DS: { label: 'Data science', color: 'var(--series-2)', x: 100, y: 140 },
  SE: { label: 'Software', color: 'var(--series-3)', x: 300, y: 340 },
}
const ORDER: Filter[] = ['all', 'DS', 'SE']
const SHEET = { w: 110, d: 84 }
const BASE = 120

// Fixed hit area per station: the screen silhouette of its footprint raised to the tallest the
// station gets when open. Objects move on hover, so hit-testing them directly would flicker.
const HIT_HEIGHT: Record<Filter, number> = { all: 42, DS: 136, SE: 84 }
const silhouette = (id: Filter) => {
  const { x, y } = STATIONS[id]
  const h = BASE / 2
  const top = HIT_HEIGHT[id]
  return [
    project(x - h, y - h),
    project(x - h, y + h),
    project(x + h, y + h),
    project(x + h, y + h, top),
    project(x + h, y - h, top),
    project(x - h, y - h, top),
  ]
    .map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`)
    .join(' ')
}

// Front edge of a station base: a status light in the station colour and a row of vents.
const BaseTrim: React.FC<{ color: string }> = ({ color }) => (
  <div className="flex h-full items-center gap-[3px] px-[8px]">
    <span className="h-[3px] w-[14px] rounded-full" style={{ background: color }} />
    <span className="ml-auto flex gap-[2px]">
      {Array.from({ length: 6 }, (_, i) => (
        <span key={i} className="h-[4px] w-[1px] bg-line-strong" />
      ))}
    </span>
  </div>
)

// Stack of notebook cells, fanning out when open.
const Notebook: React.FC<{ open: boolean }> = ({ open }) => {
  const { x, y } = STATIONS.all
  const sheets = [
    { z: 0, rotate: open ? -14 : -8 },
    { z: open ? 14 : 8, rotate: open ? 9 : 4 },
  ]
  return (
    <>
      {sheets.map((sheet, i) => (
        <IsoBox
          key={i}
          x={x - SHEET.w / 2}
          y={y - SHEET.d / 2}
          z={sheet.z}
          w={SHEET.w}
          d={SHEET.d}
          h={3}
          rotate={sheet.rotate}
          className="transition-transform duration-700 ease-out"
        />
      ))}
      <div className={`${PRESERVE} animate-bob`}>
        <IsoBox
          x={x - SHEET.w / 2}
          y={y - SHEET.d / 2}
          z={open ? 30 : 17}
          w={SHEET.w}
          d={SHEET.d}
          h={3}
          className="transition-transform duration-700 ease-out"
          top={
            <div className="flex h-full flex-col gap-[5px] p-[8px]">
              <span className="font-mono text-[7px] leading-none text-accent">In [*]:</span>
              {[
                [18, 30, 22],
                [26, 14],
                [12, 34, 16],
                [22, 20],
              ].map((tokens, row) => (
                <span key={row} className="flex gap-[3px]" style={{ paddingLeft: row % 2 ? 8 : 0 }}>
                  {tokens.map((width, i) => (
                    <span
                      key={i}
                      className="h-[3px] rounded-full"
                      style={{ width, background: i === 1 ? 'var(--series-2)' : i === 2 ? 'var(--series-3)' : 'var(--accent)' }}
                    />
                  ))}
                </span>
              ))}
              <span className="h-[6px] w-[3px] animate-blink bg-ink" />
            </div>
          }
        />
      </div>
    </>
  )
}

// Exploded view of a small network: an input grid, a hidden layer and one output node.
const PLATES = [
  { size: 100, z: 34, spread: 44, grid: 4 },
  { size: 78, z: 60, spread: 86, grid: 3 },
  { size: 52, z: 86, spread: 128, grid: 1 },
]

const Model: React.FC<{ open: boolean }> = ({ open }) => {
  const { x, y, color } = STATIONS.DS
  const top = open ? PLATES[PLATES.length - 1].spread : PLATES[PLATES.length - 1].z
  return (
    <>
      <IsoBox x={x - BASE / 2} y={y - BASE / 2} w={BASE} d={BASE} h={12} front={<BaseTrim color={color} />} />
      {/* Dashed spindle through the layers, like an assembly guide */}
      <div
        className="absolute left-0 top-0 w-0 origin-top-left border-l border-dashed transition-all duration-700 ease-out"
        style={{ height: top - 12, borderColor: tint(color, 70), transform: `translate3d(${x}px, ${y}px, ${top}px) rotateX(-90deg)` }}
      />
      {PLATES.map((plate, i) => {
        const z = open ? plate.spread : plate.z
        const step = plate.size / (plate.grid + 1)
        return (
          <div
            key={i}
            className={`${PRESERVE} transition-transform duration-700 ease-out`}
            style={{ transform: `translate3d(${x - plate.size / 2}px, ${y - plate.size / 2}px, ${z}px)` }}
          >
            <div className="animate-bob" style={{ animationDelay: `${-i * 0.5}s` }}>
              <svg
                width={plate.size}
                height={plate.size}
                className="block rounded-[12px] border"
                style={{ borderColor: tint(color, 55), background: tint(color, 8) }}
              >
                {Array.from({ length: plate.grid * plate.grid }, (_, n) => (
                  <circle
                    key={n}
                    cx={step * ((n % plate.grid) + 1)}
                    cy={step * (Math.floor(n / plate.grid) + 1)}
                    r={plate.grid === 1 ? 7 : 3.4}
                    fill={color}
                  />
                ))}
                {plate.grid === 1 && <circle cx={step} cy={step} r={13} fill="none" stroke={color} strokeWidth={1.2} />}
              </svg>
            </div>
          </div>
        )
      })}
    </>
  )
}

// A browser window and a phone standing on a base, the window pair sliding apart when open.
const App: React.FC<{ open: boolean }> = ({ open }) => {
  const { x, y, color } = STATIONS.SE
  const bx = x - BASE / 2
  const by = y - BASE / 2
  const browser = (faded?: boolean) => (
    <div className={`flex h-full flex-col ${faded ? 'opacity-40' : ''}`}>
      <div className="flex h-[9px] items-center gap-[2px] border-b border-line-strong px-[4px]">
        {[0, 1, 2].map((dot) => (
          <span key={dot} className="h-[3px] w-[3px] rounded-full bg-line-strong" />
        ))}
      </div>
      <div className="flex flex-1 flex-col gap-[4px] p-[6px]">
        <span className="h-[7px] w-[58%] rounded-[2px]" style={{ background: tint(color, 70) }} />
        <span className="h-[2px] w-[80%] rounded-full bg-line-strong" />
        <span className="h-[2px] w-[64%] rounded-full bg-line-strong" />
        <span className="mt-auto flex gap-[3px]">
          {[0, 1, 2].map((card) => (
            <span key={card} className="h-[14px] flex-1 rounded-[2px] border border-line-strong bg-well" />
          ))}
        </span>
      </div>
    </div>
  )
  return (
    <>
      <IsoBox x={bx} y={by} w={BASE} d={BASE} h={10} front={<BaseTrim color={color} />} />
      <IsoBox
        x={bx + 12}
        y={by + (open ? 6 : 18)}
        z={open ? 16 : 10}
        w={92}
        d={4}
        h={64}
        front={browser(true)}
        className="transition-transform duration-700 ease-out"
      />
      <IsoBox x={bx + 22} y={by + 38} z={10} w={92} d={4} h={64} front={browser()} />
      <div className={`${PRESERVE} animate-bob`} style={{ animationDelay: '-1.2s' }}>
        <IsoBox
          x={bx + 88}
          y={by + 74}
          z={open ? 18 : 10}
          w={28}
          d={4}
          h={54}
          className="transition-transform duration-700 ease-out"
          front={
            <div className="flex h-full flex-col items-center gap-[3px] p-[3px]">
              <span className="h-[2px] w-[8px] rounded-full bg-line-strong" />
              <span className="h-[12px] w-full rounded-[2px]" style={{ background: tint(color, 45) }} />
              <span className="h-[2px] w-full rounded-full bg-line-strong" />
              <span className="h-[2px] w-[70%] self-start rounded-full bg-line-strong" />
              <span className="mt-auto h-[5px] w-full rounded-full" style={{ background: color }} />
            </div>
          }
        />
      </div>
    </>
  )
}

// Dashed track from the notebook to a station, with packets riding along it.
const Track: React.FC<{ to: 'DS' | 'SE' }> = ({ to }) => {
  const hub = STATIONS.all
  const { color } = STATIONS[to]
  // DS sits along -x from the notebook, SE along +y; tracks run edge to edge.
  const from = to === 'DS' ? { x: hub.x - SHEET.w / 2, y: hub.y } : { x: hub.x, y: hub.y + SHEET.d / 2 }
  const end =
    to === 'DS' ? { x: STATIONS.DS.x + BASE / 2, y: hub.y } : { x: hub.x, y: STATIONS.SE.y - BASE / 2 }
  const length = Math.abs(end.x - from.x) + Math.abs(end.y - from.y)
  return (
    <>
      <div
        className={`absolute left-0 top-0 border-dashed ${to === 'DS' ? 'h-0 border-t-[1.5px]' : 'w-0 border-l-[1.5px]'}`}
        style={{
          borderColor: tint(color, 60),
          width: to === 'DS' ? length : undefined,
          height: to === 'SE' ? length : undefined,
          transform: `translate3d(${Math.min(from.x, end.x)}px, ${Math.min(from.y, end.y)}px, 1px)`,
        }}
      />
      {[0, 1].map((n) => (
        <div
          key={n}
          className={`${PRESERVE} animate-travel`}
          style={
            {
              '--fx': `${from.x - 4}px`,
              '--fy': `${from.y - 4}px`,
              '--tx': `${end.x - 4}px`,
              '--ty': `${end.y - 4}px`,
              animationDelay: `${-n * 1.6 - (to === 'SE' ? 0.8 : 0)}s`,
            } as React.CSSProperties
          }
        >
          <IsoBox x={0} y={0} w={8} d={8} h={8} tone={color} />
        </div>
      ))}
    </>
  )
}

// Drives the live captions while the scene is on screen and motion is allowed.
const useTicker = (running: boolean) => {
  const [tick, setTick] = useState(0)
  useEffect(() => {
    if (!running || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = setInterval(() => setTick((t) => t + 1), 900)
    return () => clearInterval(id)
  }, [running])
  return tick
}

const DEPLOY = ['$ git push', 'building…', '✓ deployed']

interface WorkbenchProps {
  filter: Filter
  counts: Record<Filter, number>
  onSelect: (filter: Filter) => void
}

export const Workbench: React.FC<WorkbenchProps> = ({ filter, counts, onSelect }) => {
  const boxRef = useRef<HTMLDivElement>(null)
  const scale = useFitScale(boxRef, SCENE_W, 1.2)
  const inView = useInView(boxRef, { margin: '120px 0px' })
  const tick = useTicker(inView)
  const [hovered, setHovered] = useState<Filter | null>(null)

  // Labels stay readable when the scene is shrunk on small screens.
  const zoom = Math.min(1 / scale, 1.5)
  const epoch = (tick % 20) + 1
  const status: Record<Filter, string> = {
    all: 'projects.ipynb',
    DS: `epoch ${String(epoch).padStart(2, '0')}/20 · loss ${(0.06 + 0.9 * Math.exp(-epoch / 5)).toFixed(3)}`,
    SE: DEPLOY[Math.floor(tick / 2) % DEPLOY.length],
  }
  // Clicking the active branch again goes back to everything.
  const select = (id: Filter) => onSelect(id === filter ? 'all' : id)
  const hover = (id: Filter | null) => (e: React.PointerEvent) => e.pointerType === 'mouse' && setHovered(id)

  const labels: Record<Filter, { x: number; y: number; above?: boolean }> = {
    all: { x: project(STATIONS.all.x, STATIONS.all.y).x, y: project(355, 98, 34).y - 10, above: true },
    DS: { x: project(STATIONS.DS.x, STATIONS.DS.y).x, y: project(40, 200).y + 14 },
    SE: { x: project(STATIONS.SE.x, STATIONS.SE.y).x, y: project(240, 400).y + 14 },
  }

  return (
    <div ref={boxRef} className="relative w-full select-none" style={{ height: SCENE_H * scale }}>
      <div
        role="group"
        aria-label="Project workbench: pick a branch to filter the projects below"
        className={`absolute left-1/2 top-0 ${inView ? '' : '[&_*]:[animation-play-state:paused]'}`}
        style={{ width: SCENE_W, height: SCENE_H, transform: `translateX(-50%) scale(${scale})`, transformOrigin: 'top center' }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute [transform-style:preserve-3d]"
          style={{
            left: ORIGIN.x - STAGE / 2,
            top: ORIGIN.y - STAGE / 2,
            width: STAGE,
            height: STAGE,
            transform: 'rotateX(60deg) rotateZ(-45deg)',
          }}
        >
          <div
            className="dot-paper absolute inset-0"
            style={{
              maskImage: 'radial-gradient(closest-side, #000 45%, transparent)',
              WebkitMaskImage: 'radial-gradient(closest-side, #000 45%, transparent)',
            }}
          />
          {ORDER.map((id) => {
            const { x, y, color } = STATIONS[id]
            const lit = filter === id ? 1 : hovered === id ? 0.7 : 0.28
            return (
              <div
                key={id}
                className="absolute left-0 top-0 h-[260px] w-[260px] rounded-full transition-opacity duration-700"
                style={{
                  opacity: lit,
                  background: `radial-gradient(closest-side, ${tint(color, 34)}, transparent)`,
                  transform: `translate3d(${x - 130}px, ${y - 130}px, 0.5px)`,
                }}
              />
            )
          })}
          <Track to="DS" />
          <Track to="SE" />

          {ORDER.map((id) => {
            const open = filter === id || hovered === id
            return (
              <div
                key={id}
                className={`${PRESERVE} transition-transform duration-700 ease-out`}
                style={{ transform: `translateZ(${filter === id && id !== 'all' ? 8 : 0}px)` }}
              >
                {id === 'all' ? <Notebook open={open} /> : id === 'DS' ? <Model open={open} /> : <App open={open} />}
              </div>
            )
          })}
        </div>

        <svg aria-hidden width={SCENE_W} height={SCENE_H} className="absolute left-0 top-0">
          {ORDER.map((id) => (
            <polygon
              key={id}
              points={silhouette(id)}
              fill="transparent"
              className="cursor-pointer"
              onClick={() => select(id)}
              onPointerEnter={hover(id)}
              onPointerLeave={hover(null)}
            />
          ))}
        </svg>

        {ORDER.map((id) => {
          const { label, color } = STATIONS[id]
          const at = labels[id]
          const active = filter === id
          return (
            <div
              key={id}
              className="absolute left-0 top-0"
              style={{
                transform: `translate(${at.x}px, ${at.y}px) translate(-50%, ${at.above ? '-100%' : '0'}) scale(${zoom})`,
                transformOrigin: at.above ? '50% 100%' : '50% 0',
              }}
            >
              <div className={`flex items-center gap-1.5 ${at.above ? 'flex-col-reverse' : 'flex-col'}`}>
                <button
                  type="button"
                  aria-pressed={active}
                  onClick={() => select(id)}
                  onPointerEnter={hover(id)}
                  onPointerLeave={hover(null)}
                  className={`card-shadow flex items-center gap-2 whitespace-nowrap rounded-full py-1 pl-2.5 pr-3 text-[12px] transition-colors ${
                    active ? 'bg-inverse text-on-inverse' : 'bg-surface text-ink hover:text-accent'
                  }`}
                >
                  <span className="h-2 w-2 rounded-full" style={{ background: color }} />
                  {label}
                  <span className={`font-mono text-[10.5px] ${active ? 'opacity-70' : 'text-faint'}`}>{counts[id]}</span>
                </button>
                <span className="whitespace-nowrap font-mono text-[10.5px] text-faint">{status[id]}</span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
