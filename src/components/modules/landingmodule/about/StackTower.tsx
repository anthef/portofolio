'use client'
import React, { useRef } from 'react'
import { useInView } from 'framer-motion'
import { STACK, STACK_LAYERS, StackLayer } from '@constants'
import { IsoBox, PRESERVE, makeProjector, round2, useElementWidth } from '@elements'

// `from anthony import stack`, taken literally: an exploded stack of layers, models on top and
// infrastructure at the bottom, each carrying its modules as upright tiles.

const YAW = -8
const TILT = 58
const COS_T = Math.cos((TILT * Math.PI) / 180)
const SIN_T = Math.sin((TILT * Math.PI) / 180)

const TILE = { d: 26, h: 36, minW: 118, maxW: 138 }
const GAP = 10
// Rows of tiles step back far enough that a back row clears the row in front (its face and its
// top), like bleachers.
const ROW_D = Math.ceil(TILE.h * Math.tan((TILT * Math.PI) / 180)) + TILE.d - 6
const PAD_X = 16
const PAD_Y = 16
const SLAB_T = 18
// Screen px kept free between a layer's tallest tiles and the slab above.
const CLEAR = 30

const LAYER_COLOR: Record<StackLayer, string> = {
  ml: 'var(--series-2)',
  apps: 'var(--series-3)',
  backend: 'var(--accent)',
  data: 'var(--live)',
  infra: 'var(--faint)',
}

const LAYERS = STACK_LAYERS.map((id) => ({ id, items: STACK.filter((item) => item.layer === id) }))

// Lays the stack out for a container width: as many tiles per row as fit at a readable width
// (tiles shrink before a column is dropped), then each layer's depth and height from its rows.
const layout = (width: number) => {
  const yaw = (YAW * Math.PI) / 180
  // Widest tile that fits `cols` per row, given the deepest layer that column count produces.
  const tileWidthFor = (cols: number) => {
    const rows = Math.max(...LAYERS.map((layer) => Math.ceil(layer.items.length / cols)))
    const depth = PAD_Y * 2 + (rows - 1) * ROW_D + TILE.d
    const slabW = (width - 8 - depth * Math.sin(-yaw)) / Math.cos(yaw)
    return Math.floor((slabW - (cols - 1) * GAP - PAD_X * 2) / cols)
  }
  let cols = Math.max(...LAYERS.map((layer) => layer.items.length))
  while (cols > 1 && tileWidthFor(cols) < TILE.minW) cols--
  const tileW = Math.min(TILE.maxW, tileWidthFor(cols))

  const slabW = cols * tileW + (cols - 1) * GAP + PAD_X * 2
  const sized = LAYERS.map((layer) => {
    const rows = Math.ceil(layer.items.length / cols)
    return { ...layer, rows, depth: PAD_Y * 2 + (rows - 1) * ROW_D + TILE.d }
  })
  const front = Math.max(...sized.map((layer) => layer.depth))

  let z = 0
  const placed = [...sized].reverse().map((layer) => {
    const slab = { z, y: front - layer.depth }
    const tiles = layer.items.map((item, k) => {
      // Fill from the back row so reading order runs top to bottom on screen.
      const back = Math.floor(k / cols)
      const inRow = Math.min(cols, layer.items.length - back * cols)
      const col = k % cols
      return {
        item,
        x: (slabW - (inRow * tileW + (inRow - 1) * GAP)) / 2 + col * (tileW + GAP),
        y: front - PAD_Y - TILE.d - (layer.rows - 1 - back) * ROW_D,
        z: z + SLAB_T,
      }
    })
    z = round2(z + SLAB_T + TILE.h + ((layer.rows - 1) * ROW_D * COS_T + PAD_Y * COS_T + CLEAR) / SIN_T)
    return { ...layer, slab, tiles }
  })

  // Screen bounds of every slab corner and tile top, to size and centre the scene.
  const project = makeProjector({
    yaw: YAW,
    tilt: TILT,
    center: { x: slabW / 2, y: front / 2 },
    origin: { x: 0, y: 0 },
  })
  const points = placed.flatMap(({ slab, depth, tiles }) => [
    ...[0, slabW].flatMap((x) =>
      [slab.y, front].flatMap((y) => [project(x, y, slab.z), project(x, y, slab.z + SLAB_T)]),
    ),
    ...tiles.flatMap((tile) => [
      project(tile.x, tile.y, tile.z + TILE.h),
      project(tile.x + tileW, tile.y, tile.z + TILE.h),
    ]),
    project(0, front - depth, slab.z + SLAB_T),
  ])
  const minX = Math.min(...points.map((p) => p.x))
  const maxX = Math.max(...points.map((p) => p.x))
  const minY = Math.min(...points.map((p) => p.y))
  const maxY = Math.max(...points.map((p) => p.y))

  return {
    tileW,
    slabW,
    front,
    top: placed[placed.length - 1].slab.z,
    layers: placed,
    height: Math.ceil(maxY - minY) + 24,
    // Where the stage centre lands so the bounds sit centred, 12px from the top.
    origin: { x: round2(width / 2 - (minX + maxX) / 2), y: round2(12 - minY) },
  }
}

export const StackTower: React.FC = () => {
  const boxRef = useRef<HTMLDivElement>(null)
  // Before measuring, lay out for a desktop column so the server render is sensible.
  const width = useElementWidth(boxRef) ?? 1000
  const landed = useInView(boxRef, { once: true, margin: '0px 0px -80px 0px' })
  const { tileW, slabW, front, top, layers, height, origin } = layout(width)

  return (
    <div ref={boxRef} className="relative w-full" style={{ height }}>
      <div
        role="list"
        aria-label="Tech stack"
        className="absolute [transform-style:preserve-3d]"
        style={{
          left: origin.x - slabW / 2,
          top: origin.y - front / 2,
          width: slabW,
          height: front,
          transform: `rotateX(${TILT}deg) rotateZ(${YAW}deg)`,
        }}
      >
        {/* Dashed posts up the front corners, like an assembly drawing */}
        {[0, slabW].map((x) => (
          <div
            key={x}
            aria-hidden
            className="absolute left-0 top-0 w-0 origin-top-left border-l border-dashed border-line-strong"
            style={{ height: top, transform: `translate3d(${x}px, ${front}px, ${top}px) rotateX(-90deg)` }}
          />
        ))}
        {layers.map(({ id, items, slab, depth, tiles }, i) => {
          const color = LAYER_COLOR[id]
          return (
            // Layers drop into place bottom-first, then keep floating out of step.
            <div
              key={id}
              className={`${PRESERVE} transition-transform duration-[900ms] ease-out`}
              style={{ transform: `translateZ(${landed ? 0 : 60 + i * 30}px)`, transitionDelay: `${i * 0.09}s` }}
            >
              <div className={`${PRESERVE} animate-bob`} style={{ animationDelay: `${-i * 0.9}s` }}>
                <IsoBox
                  x={0}
                  y={slab.y}
                  z={slab.z}
                  w={slabW}
                  d={depth}
                  h={SLAB_T}
                  top={<div aria-hidden className="dot-paper h-full w-full opacity-70" />}
                  front={
                    <div
                      aria-hidden
                      className="flex h-full items-center gap-2 whitespace-nowrap px-3 font-mono text-[10px] leading-none text-muted"
                    >
                      <span className="h-[5px] w-[5px] rounded-full" style={{ background: color }} />
                      <span className="text-ink">stack.{id}</span>
                      <span className="ml-auto text-faint">{items.length} modules</span>
                    </div>
                  }
                />
                {tiles.map(({ item: { skill, icon: Icon, hover }, x, y, z }) => (
                  <div
                    key={skill.name}
                    role="listitem"
                    className={PRESERVE}
                    style={{ transform: `translate3d(${x}px, ${y}px, ${z}px)` }}
                  >
                    <a
                      href={skill.link}
                      target="_blank"
                      rel="noreferrer"
                      className={`${PRESERVE} group/tile outline-none`}
                      style={{ '--brand': hover ?? skill.color } as React.CSSProperties}
                    >
                      {/* Fixed hit area where the tile rests, so lifting on hover can't flicker */}
                      <span
                        className="absolute left-0 top-0 origin-top-left"
                        style={{
                          width: tileW,
                          height: TILE.h,
                          transform: `translate3d(0, ${TILE.d}px, ${TILE.h}px) rotateX(-90deg)`,
                        }}
                      />
                      <span
                        className={`${PRESERVE} transition-transform duration-300 ease-out group-hover/tile:[transform:translateZ(10px)] group-focus-visible/tile:[transform:translateZ(10px)]`}
                      >
                        <IsoBox
                          x={0}
                          y={0}
                          w={tileW}
                          d={TILE.d}
                          h={TILE.h}
                          faceClassName="border-line-strong transition-colors duration-300 group-hover/tile:border-[var(--brand)] group-focus-visible/tile:border-accent"
                          front={
                            <span className="flex h-full items-center gap-2 px-3">
                              <Icon
                                size={15}
                                className="shrink-0 text-muted transition-colors duration-300 group-hover/tile:text-[var(--brand)]"
                              />
                              <span className={`truncate text-ink ${tileW < 136 ? 'text-[12px]' : 'text-[13px]'}`}>
                                {skill.name}
                              </span>
                            </span>
                          }
                        />
                      </span>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
