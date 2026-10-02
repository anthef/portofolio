'use client'
import React, { useRef, useState } from 'react'
import Image from 'next/image'
import { PROJECTS } from '@constants'
import { IsoBox, IsoCylinder, PRESERVE, makeProjector, round2, shade, tint, useFitScale } from '@elements'

type Project = (typeof PROJECTS)[number]

const SERIES = ['var(--accent)', 'var(--series-2)', 'var(--series-3)']
// Placeholder artwork in /public/projects that reads better as a drawn cover.
const PLACEHOLDERS = ['tba.png', 'coming_soon.jpeg']

const Chip: React.FC<{ index: number; style?: React.CSSProperties }> = ({ index, style }) => (
  <span
    className="absolute left-4 top-4 rounded-full bg-[color-mix(in_srgb,var(--surface)_86%,transparent)] px-3 py-1 font-mono text-[11.5px] text-ink backdrop-blur"
    style={style}
  >
    projects<span className="text-faint">[</span>
    <span className="text-series-2">{index}</span>
    <span className="text-faint">]</span>
  </span>
)

// Projects with artwork: the image as a thick print, turned towards the text and tipping
// after the cursor. Thickness comes from stacked copies so the rounded corners stay rounded.
const LAYERS = 9

const PrintCover: React.FC<{ project: Project; image: string; index: number; flip: boolean }> = ({
  project,
  image,
  index,
  flip,
}) => {
  const color = SERIES[index % SERIES.length]
  const [pointer, setPointer] = useState<{ x: number; y: number } | null>(null)
  const turn = flip ? -1 : 1
  const rotateX = pointer ? -pointer.y * 9 : 7
  const rotateY = pointer ? pointer.x * 12 : 15 * turn

  return (
    <div
      className="relative aspect-[16/10] [perspective:1500px]"
      onPointerMove={(e) => {
        if (e.pointerType !== 'mouse') return
        const box = e.currentTarget.getBoundingClientRect()
        setPointer({ x: (e.clientX - box.left) / box.width - 0.5, y: (e.clientY - box.top) / box.height - 0.5 })
      }}
      onPointerLeave={() => setPointer(null)}
    >
      <span aria-hidden className="absolute inset-x-[14%] -bottom-2 h-10 rounded-full bg-ink opacity-[0.16] blur-2xl" />
      <div
        className="absolute inset-[5%] transition-transform duration-500 ease-out [transform-style:preserve-3d]"
        style={{ transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(${pointer ? 20 : 0}px)` }}
      >
        {/* The next sheet in the pile, floating behind */}
        <span
          aria-hidden
          className="absolute inset-0 rounded-[28px] transition-transform duration-700 ease-out"
          style={{
            background: tint(color, 24),
            transform: `translate3d(${-30 * turn}px, 20px, ${pointer ? -130 : -90}px)`,
          }}
        />
        {Array.from({ length: LAYERS }, (_, i) => (
          <span
            key={i}
            aria-hidden
            className="absolute inset-0 rounded-[24px]"
            style={{
              background: i === LAYERS - 1 ? shade(color, 30) : `color-mix(in srgb, ${color} 62%, var(--surface))`,
              transform: `translateZ(${-(i + 1) * 2}px)`,
            }}
          />
        ))}
        <div className="absolute inset-0 overflow-hidden rounded-[24px] bg-surface">
          <Image
            src={`/projects/${image}`}
            alt={project.name}
            fill
            sizes="(min-width: 1024px) 560px, 100vw"
            className="object-cover"
          />
        </div>
        <Chip index={index} style={{ transform: 'translateZ(36px)' }} />
      </div>
    </div>
  )
}

// Projects without artwork get an exploded isometric drawing of what was built. Hovering the row
// (the article is the `group`) sets --open to 1, which spreads the layers apart.
const KIT = { w: 430, h: 270, stage: 320 }
const KIT_ORIGIN = { x: 185, y: 188 }
const project3d = makeProjector({
  yaw: -45,
  tilt: 60,
  center: { x: KIT.stage / 2, y: KIT.stage / 2 },
  origin: KIT_ORIGIN,
})
const SIN_TILT = round2(Math.sin((60 * Math.PI) / 180))

interface Note {
  // Plane point the note points at, and how far it rises when open.
  at: [number, number, number]
  rise?: number
  text: string
  // Which side of the point the note sits on.
  side?: 'left' | 'right'
}
interface Kit {
  body: React.ReactNode
  notes: Note[]
}

// Wraps a part so it rises by `rise` px when the row is hovered.
const Rise: React.FC<{ rise: number; bob?: number; children: React.ReactNode }> = ({ rise, bob, children }) => (
  <div
    className={`${PRESERVE} transition-transform duration-700 ease-out`}
    style={{ transform: `translateZ(calc(var(--open) * ${rise}px))` }}
  >
    {bob === undefined ? (
      children
    ) : (
      <div className={`${PRESERVE} animate-bob`} style={{ animationDelay: `${bob}s` }}>
        {children}
      </div>
    )}
  </div>
)

// Dashed vertical guide from the floor up to a part, like an assembly drawing.
const Guide: React.FC<{ x: number; y: number; from: number; to: number; rise: number; color: string }> = ({
  x,
  y,
  from,
  to,
  rise,
  color,
}) => (
  <div
    className="absolute left-0 top-0 w-0 origin-top-left border-l border-dashed transition-all duration-700 ease-out"
    style={{
      height: `calc(${to - from}px + var(--open) * ${rise}px)`,
      borderColor: tint(color, 55),
      transform: `translate3d(${x}px, ${y}px, calc(${to}px + var(--open) * ${rise}px)) rotateX(-90deg)`,
    }}
  />
)

// A web app pulled apart: window, nav, hero, cards and a call to action.
const webKit = (color: string): Kit => {
  const lines = (count: number) => (
    <div className="flex h-full flex-col justify-center gap-[4px] px-[8px]">
      {Array.from({ length: count }, (_, i) => (
        <span key={i} className="h-[3px] rounded-full bg-line-strong" style={{ width: `${80 - i * 22}%` }} />
      ))}
    </div>
  )
  return {
    body: (
      <>
        <IsoBox
          x={50}
          y={80}
          w={220}
          d={160}
          h={6}
          top={
            <div className="flex h-[14px] items-center gap-[3px] border-b border-line-strong px-[6px]">
              {[0, 1, 2].map((dot) => (
                <span key={dot} className="h-[4px] w-[4px] rounded-full bg-line-strong" />
              ))}
              <span className="ml-[8px] h-[5px] w-[90px] rounded-full bg-well" />
            </div>
          }
        />
        <Guide x={62} y={240} from={6} to={80} rise={26} color={color} />
        <Guide x={258} y={92} from={6} to={40} rise={12} color={color} />
        <Rise rise={12} bob={0}>
          <IsoBox x={62} y={92} z={40} w={196} d={14} h={3} tone="var(--raised)" />
          <IsoBox x={62} y={116} z={40} w={108} d={54} h={4} tone={tint(color, 30)} top={lines(3)} />
        </Rise>
        <Rise rise={26} bob={-0.8}>
          {[62, 126, 190].map((x) => (
            <IsoBox
              key={x}
              x={x}
              y={182}
              z={80}
              w={56}
              d={46}
              h={4}
              top={
                <div className="flex h-full flex-col gap-[4px] p-[5px]">
                  <span className="h-[16px] rounded-[2px]" style={{ background: tint(color, 35) }} />
                  <span className="h-[3px] w-[70%] rounded-full bg-line-strong" />
                </div>
              }
            />
          ))}
        </Rise>
        <Rise rise={40} bob={-1.6}>
          <IsoBox x={196} y={128} z={120} w={60} d={22} h={7} tone={color} faceClassName="border-transparent" />
        </Rise>
      </>
    ),
    notes: [
      { at: [256, 128, 127], rise: 40, text: '<Button/>' },
      { at: [62, 92, 43], rise: 12, text: '<nav/>', side: 'left' },
      { at: [246, 228, 84], rise: 26, text: '<Card/> ×3' },
    ],
  }
}

// A database pulled apart into three platters, with the table on top.
const databaseKit = (color: string): Kit => {
  const platters = [
    { z: 0, rise: 0 },
    { z: 52, rise: 16 },
    { z: 104, rise: 32 },
  ]
  return {
    body: (
      <>
        <Guide x={160} y={160} from={28} to={104} rise={32} color={color} />
        {platters.map((platter, i) => (
          <Rise key={i} rise={platter.rise} bob={i === 0 ? undefined : -i * 0.7}>
            <IsoCylinder
              cx={160}
              cy={160}
              z={platter.z}
              r={66}
              h={28}
              tone={i === platters.length - 1 ? `color-mix(in srgb, ${color} 18%, var(--surface))` : 'var(--surface)'}
              top={
                i === platters.length - 1 ? (
                  <div className="grid h-full grid-rows-[repeat(6,minmax(0,1fr))] px-[22px] py-[18px]">
                    <span className="rounded-[2px]" style={{ background: tint(color, 60) }} />
                    {[0, 1, 2, 3, 4].map((row) => (
                      <span key={row} className="border-b border-line-strong" />
                    ))}
                  </div>
                ) : (
                  <span className="absolute inset-[30%] rounded-full border border-dashed border-line-strong" />
                )
              }
            />
          </Rise>
        ))}
      </>
    ),
    notes: [
      { at: [226, 160, 132], rise: 32, text: 'schema' },
      { at: [226, 160, 80], rise: 16, text: 'triggers' },
      { at: [226, 160, 28], text: 'procedures' },
    ],
  }
}

// A model pulled apart into its layers: input grid, hidden layer, one output.
const modelKit = (color: string): Kit => {
  const plates = [
    { size: 150, z: 22, rise: 0, grid: 5 },
    { size: 112, z: 66, rise: 18, grid: 3 },
    { size: 70, z: 110, rise: 36, grid: 1 },
  ]
  return {
    body: (
      <>
        <IsoBox x={75} y={75} w={170} d={170} h={10} />
        <Guide x={160} y={160} from={10} to={110} rise={36} color={color} />
        {plates.map((plate, i) => {
          const step = plate.size / (plate.grid + 1)
          return (
            <Rise key={i} rise={plate.rise} bob={-i * 0.6}>
              <div
                className="absolute left-0 top-0"
                style={{ transform: `translate3d(${160 - plate.size / 2}px, ${160 - plate.size / 2}px, ${plate.z}px)` }}
              >
                <svg
                  width={plate.size}
                  height={plate.size}
                  className="block rounded-[14px] border"
                  style={{ borderColor: tint(color, 55), background: tint(color, 9) }}
                >
                  {Array.from({ length: plate.grid * plate.grid }, (_, n) => (
                    <circle
                      key={n}
                      cx={step * ((n % plate.grid) + 1)}
                      cy={step * (Math.floor(n / plate.grid) + 1)}
                      r={plate.grid === 1 ? 9 : 4}
                      fill={color}
                    />
                  ))}
                </svg>
              </div>
            </Rise>
          )
        })}
      </>
    ),
    notes: [
      { at: [195, 125, 110], rise: 36, text: 'ŷ' },
      { at: [216, 104, 66], rise: 18, text: 'hidden' },
      { at: [235, 85, 22], text: 'input' },
    ],
  }
}

const kitFor = (project: Project) => {
  if (project.skills.some((skill) => /sql/i.test(skill.name))) return databaseKit
  return project.type === 'DS' ? modelKit : webKit
}

const KitCover: React.FC<{ project: Project; index: number }> = ({ project, index }) => {
  const boxRef = useRef<HTMLDivElement>(null)
  const scale = useFitScale(boxRef, KIT.w, 1.25)
  const color = SERIES[index % SERIES.length]
  const { body, notes } = kitFor(project)(color)
  // Notes keep their size when the drawing is shrunk on small screens.
  const zoom = Math.min(1 / scale, 1.4)

  return (
    <div
      ref={boxRef}
      role="img"
      aria-label={`Drawing for ${project.name}`}
      className="relative aspect-[16/10] [--open:0] group-hover:[--open:1]"
    >
      <div
        className="absolute left-1/2 top-1/2"
        style={{ width: KIT.w, height: KIT.h, transform: `translate(-50%, -50%) scale(${scale})` }}
      >
        <div
          className="absolute [transform-style:preserve-3d]"
          style={{
            left: KIT_ORIGIN.x - KIT.stage / 2,
            top: KIT_ORIGIN.y - KIT.stage / 2,
            width: KIT.stage,
            height: KIT.stage,
            transform: 'rotateX(60deg) rotateZ(-45deg)',
          }}
        >
          <div
            className="dot-paper absolute -inset-16"
            style={{
              maskImage: 'radial-gradient(closest-side, #000 40%, transparent)',
              WebkitMaskImage: 'radial-gradient(closest-side, #000 40%, transparent)',
            }}
          />
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: `radial-gradient(closest-side, ${tint(color, 26)}, transparent)`,
              transform: 'translateZ(0.5px)',
            }}
          />
          {body}
        </div>
        {notes.map(({ at, rise = 0, text, side = 'right' }) => {
          const point = project3d(...at)
          const left = side === 'left'
          return (
            <span
              key={text}
              aria-hidden
              className={`absolute left-0 top-0 flex items-center gap-1.5 whitespace-nowrap font-mono text-[10.5px] text-muted transition-transform duration-700 ease-out ${
                left ? 'flex-row-reverse' : ''
              }`}
              style={{
                transform: `translate(${point.x}px, calc(${point.y}px - var(--open) * ${rise * SIN_TILT}px)) translate(${
                  left ? 'calc(-100% - 10px)' : '10px'
                }, -50%) scale(${zoom})`,
                transformOrigin: left ? '100% 50%' : '0 50%',
              }}
            >
              <span className="h-px w-4 bg-line-strong" />
              {text}
            </span>
          )
        })}
      </div>
      <Chip index={index} />
    </div>
  )
}

export const Cover: React.FC<{ project: Project; index: number; flip: boolean }> = ({ project, index, flip }) => {
  const image = 'image' in project && project.image && !PLACEHOLDERS.includes(project.image) ? project.image : undefined
  return (
    <div className={flip ? 'lg:order-last' : ''}>
      {image ? (
        <PrintCover project={project} image={image} index={index} flip={flip} />
      ) : (
        <KitCover project={project} index={index} />
      )}
    </div>
  )
}
