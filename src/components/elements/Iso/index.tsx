'use client'
import React, { useEffect, useState } from 'react'

// Building blocks for the CSS-3D scenes: a stage div styled `rotateX(tilt) rotateZ(yaw)` with
// `preserve-3d`, and children positioned on it in plane px (x right, y down, z up off the plane).

export const PRESERVE = 'absolute left-0 top-0 [transform-style:preserve-3d]'
const FACE = 'absolute left-0 top-0 origin-top-left overflow-hidden border'

// A darker shade of an opaque face tone, and a see-through tint of a colour.
export const shade = (tone: string, amount: number) => `color-mix(in srgb, ${tone}, #000 ${amount}%)`
export const tint = (color: string, amount: number) => `color-mix(in srgb, ${color} ${amount}%, transparent)`

interface IsoBoxProps {
  x: number
  y: number
  z?: number
  w: number
  d: number
  h: number
  // Turn about the box's own centre, in degrees.
  rotate?: number
  tone?: string
  top?: React.ReactNode
  front?: React.ReactNode
  className?: string
  style?: React.CSSProperties
  // Replaces the default hairline border colour on every face.
  faceClassName?: string
}

// A box resting at (x, y, z) with footprint w×d and height h. Only the faces a viewer above and
// in front sees are drawn (top, -x side, +y front); `top` and `front` take content for those faces.
export const IsoBox: React.FC<IsoBoxProps> = ({
  x,
  y,
  z = 0,
  w,
  d,
  h,
  rotate = 0,
  tone = 'var(--surface)',
  top,
  front,
  className = '',
  style,
  faceClassName = 'border-line-strong',
}) => (
  <div
    className={`${PRESERVE} ${className}`}
    style={{
      transform: `translate3d(${x + w / 2}px, ${y + d / 2}px, ${z}px) rotateZ(${rotate}deg) translate(${-w / 2}px, ${-d / 2}px)`,
      ...style,
    }}
  >
    <div
      className={`${FACE} ${faceClassName}`}
      style={{ width: w, height: d, transform: `translateZ(${h}px)`, background: tone }}
    >
      {top}
    </div>
    <div
      className={`${FACE} ${faceClassName}`}
      style={{
        width: d,
        height: h,
        transform: `translateZ(${h}px) rotateZ(90deg) rotateX(-90deg)`,
        background: shade(tone, 4),
      }}
    />
    <div
      className={`${FACE} ${faceClassName}`}
      style={{
        width: w,
        height: h,
        transform: `translate3d(0, ${d}px, ${h}px) rotateX(-90deg)`,
        background: shade(tone, 9),
      }}
    >
      {front}
    </div>
  </div>
)

// A vertical cylinder standing at centre (cx, cy, z): a ring of thin facets plus a round top.
// Facets facing away are culled, so it reads as solid without depth-sorting help.
export const IsoCylinder: React.FC<{
  cx: number
  cy: number
  z?: number
  r: number
  h: number
  tone?: string
  top?: React.ReactNode
  className?: string
  style?: React.CSSProperties
}> = ({ cx, cy, z = 0, r, h, tone = 'var(--surface)', top, className = '', style }) => {
  const facets = 40
  const width = (2 * Math.PI * r) / facets + 0.6
  return (
    <div
      className={`${PRESERVE} ${className}`}
      style={{ transform: `translate3d(${cx}px, ${cy}px, ${z}px)`, ...style }}
    >
      {Array.from({ length: facets }, (_, i) => {
        const angle = (360 / facets) * i
        // Darker towards the right, as if lit from the front-left.
        const light = Math.round((4 + 7 * (1 + Math.sin(((angle + 45) * Math.PI) / 180))) * 10) / 10
        return (
          <div
            key={i}
            className="absolute left-0 top-0 origin-top-left [backface-visibility:hidden]"
            style={{
              width,
              height: h,
              background: shade(tone, light),
              transform: `rotateZ(${angle}deg) translate3d(${-width / 2}px, ${r}px, ${h}px) rotateX(-90deg)`,
            }}
          />
        )
      })}
      <div
        className="absolute left-0 top-0 overflow-hidden rounded-full border border-line-strong"
        style={{ width: r * 2, height: r * 2, background: tone, transform: `translate3d(${-r}px, ${-r}px, ${h}px)` }}
      >
        {top}
      </div>
    </div>
  )
}

// Server and browser trig can differ in the last bits; round so hydration matches.
export const round2 = (n: number) => Math.round(n * 100) / 100

// Orthographic projection matching a stage styled `rotateX(tilt) rotateZ(yaw)` about its centre,
// for pinning flat HTML labels to points on the stage. `origin` is where the centre lands.
export const makeProjector =
  ({ yaw, tilt, center, origin }: { yaw: number; tilt: number; center: Point; origin: Point }) =>
  (x: number, y: number, z = 0): Point => {
    const a = (yaw * Math.PI) / 180
    const t = (tilt * Math.PI) / 180
    const dx = x - center.x
    const dy = y - center.y
    const rx = dx * Math.cos(a) - dy * Math.sin(a)
    const ry = dx * Math.sin(a) + dy * Math.cos(a)
    return { x: round2(origin.x + rx), y: round2(origin.y + ry * Math.cos(t) - z * Math.sin(t)) }
  }
type Point = { x: number; y: number }

// Content width of an element, tracked as it resizes. Null until measured.
export const useElementWidth = (ref: React.RefObject<HTMLElement>) => {
  const [width, setWidth] = useState<number | null>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width))
    observer.observe(el)
    return () => observer.disconnect()
  }, [ref])
  return width
}

// Scale that fits a fixed-width scene into its container, growing up to `max` when there's room.
export const useFitScale = (ref: React.RefObject<HTMLElement>, sceneWidth: number, max = 1) => {
  const width = useElementWidth(ref)
  return width === null ? 1 : Math.min(max, width / sceneWidth)
}
