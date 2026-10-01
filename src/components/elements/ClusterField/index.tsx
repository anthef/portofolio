'use client'
import React, { useEffect, useRef } from 'react'

export interface ClusterStats {
  iter: number
  inertia: number
  converged: boolean
}

interface ClusterFieldProps {
  k?: number
  className?: string
  onStats?: (stats: ClusterStats) => void
}

interface Point {
  x: number
  y: number
  phase: number
  cluster: number
}

interface Centroid {
  x: number
  y: number
  tx: number
  ty: number
}

const STEP_MS = 900
const HOLD_MS = 3200
const FADE_MS = 600

const gaussian = () => {
  const u = 1 - Math.random()
  const v = Math.random()
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v)
}

// A live k-means run: points from a few gaussian blobs, centroids stepping
// toward their cluster means until convergence, then a fresh dataset.
export const ClusterField: React.FC<ClusterFieldProps> = ({ k = 3, className = '', onStats }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const statsRef = useRef(onStats)
  statsRef.current = onStats

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let width = 0
    let height = 0
    let points: Point[] = []
    let centroids: Centroid[] = []
    let iter = 0
    let converged = false
    let lastStep = 0
    let convergedAt = 0
    let bornAt = 0
    let raf = 0
    let visible = true
    let colors: string[] = []
    let faint = '#888'

    const readColors = () => {
      const css = getComputedStyle(document.documentElement)
      colors = ['--accent', '--series-2', '--series-3'].map((v) => css.getPropertyValue(v).trim())
      faint = css.getPropertyValue('--faint').trim()
    }

    const generate = (now: number) => {
      const pad = Math.min(width, height) * 0.14
      const spread = Math.min(width, height) * 0.1
      const count = Math.round(Math.min(220, Math.max(70, (width * height) / 2600)))
      const centers = Array.from({ length: k }, () => ({
        x: pad + Math.random() * (width - pad * 2),
        y: pad + Math.random() * (height - pad * 2),
      }))
      points = Array.from({ length: count }, () => {
        const noise = Math.random() < 0.12
        const c = centers[(Math.random() * k) | 0]
        return {
          x: noise ? Math.random() * width : Math.min(width - 4, Math.max(4, c.x + gaussian() * spread)),
          y: noise ? Math.random() * height : Math.min(height - 4, Math.max(4, c.y + gaussian() * spread)),
          phase: Math.random() * Math.PI * 2,
          cluster: -1,
        }
      })
      // Forgy initialisation: k random observations.
      centroids = Array.from({ length: k }, () => {
        const p = points[(Math.random() * points.length) | 0]
        return { x: p.x, y: p.y, tx: p.x, ty: p.y }
      })
      iter = 0
      converged = false
      lastStep = now
      bornAt = now
      statsRef.current?.({ iter, inertia: 0, converged })
    }

    const step = () => {
      const sums = centroids.map(() => ({ x: 0, y: 0, n: 0 }))
      let inertia = 0
      for (const p of points) {
        let best = 0
        let bestD = Infinity
        centroids.forEach((c, j) => {
          const d = (p.x - c.tx) ** 2 + (p.y - c.ty) ** 2
          if (d < bestD) {
            bestD = d
            best = j
          }
        })
        p.cluster = best
        sums[best].x += p.x
        sums[best].y += p.y
        sums[best].n++
        inertia += bestD
      }
      let shift = 0
      centroids.forEach((c, j) => {
        if (!sums[j].n) return
        const nx = sums[j].x / sums[j].n
        const ny = sums[j].y / sums[j].n
        shift = Math.max(shift, Math.hypot(nx - c.tx, ny - c.ty))
        c.tx = nx
        c.ty = ny
      })
      iter++
      converged = shift < 0.5
      // Report inertia in a resolution-independent unit (coords scaled to 0–100).
      const scale = 100 / Math.max(width, height)
      statsRef.current?.({ iter, inertia: inertia * scale * scale, converged })
    }

    const draw = (now: number) => {
      ctx.clearRect(0, 0, width, height)
      const fadeIn = Math.min(1, (now - bornAt) / FADE_MS)
      const fadeOut = converged ? 1 - Math.max(0, (now - convergedAt - HOLD_MS) / FADE_MS) : 1
      const alpha = Math.max(0, Math.min(fadeIn, fadeOut))
      const t = now / 1000

      for (const c of centroids) {
        c.x += (c.tx - c.x) * 0.12
        c.y += (c.ty - c.y) * 0.12
      }

      // Assignment spokes.
      ctx.lineWidth = 1
      for (const p of points) {
        if (p.cluster < 0) continue
        const c = centroids[p.cluster]
        ctx.globalAlpha = 0.09 * alpha
        ctx.strokeStyle = colors[p.cluster % colors.length]
        ctx.beginPath()
        ctx.moveTo(p.x, p.y)
        ctx.lineTo(c.x, c.y)
        ctx.stroke()
      }

      // Observations.
      for (const p of points) {
        const jx = reduceMotion ? 0 : Math.sin(t * 0.9 + p.phase) * 0.8
        const jy = reduceMotion ? 0 : Math.cos(t * 0.7 + p.phase) * 0.8
        ctx.globalAlpha = (p.cluster < 0 ? 0.45 : 0.85) * alpha
        ctx.fillStyle = p.cluster < 0 ? faint : colors[p.cluster % colors.length]
        ctx.beginPath()
        ctx.arc(p.x + jx, p.y + jy, 2, 0, Math.PI * 2)
        ctx.fill()
      }

      // Centroids.
      centroids.forEach((c, j) => {
        const color = iter === 0 ? faint : colors[j % colors.length]
        ctx.globalAlpha = alpha
        ctx.strokeStyle = color
        ctx.lineWidth = 1.5
        ctx.beginPath()
        ctx.moveTo(c.x - 7, c.y)
        ctx.lineTo(c.x + 7, c.y)
        ctx.moveTo(c.x, c.y - 7)
        ctx.lineTo(c.x, c.y + 7)
        ctx.stroke()
        ctx.globalAlpha = 0.5 * alpha
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.arc(c.x, c.y, 11, 0, Math.PI * 2)
        ctx.stroke()
        ctx.globalAlpha = 0.9 * alpha
        ctx.fillStyle = color
        ctx.font = '10px ui-monospace, monospace'
        ctx.fillText(`c${j}`, c.x + 13, c.y - 9)
      })
      ctx.globalAlpha = 1
    }

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = rect.width
      height = rect.height
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const now = performance.now()
      generate(now)
      if (reduceMotion) {
        while (!converged && iter < 50) step()
        bornAt = now - FADE_MS
        convergedAt = Infinity
        draw(now)
      }
    }

    const loop = (now: number) => {
      raf = requestAnimationFrame(loop)
      if (!visible || document.hidden) return
      if (converged && now - convergedAt > HOLD_MS + FADE_MS) generate(now)
      else if (!converged && now - lastStep > STEP_MS) {
        step()
        lastStep = now
        if (converged) convergedAt = now
      }
      draw(now)
    }

    readColors()
    resize()

    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
    })
    io.observe(canvas)
    const mo = new MutationObserver(() => {
      readColors()
      if (reduceMotion) draw(performance.now())
    })
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
    if (!reduceMotion) raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      mo.disconnect()
    }
  }, [k])

  return <canvas ref={canvasRef} aria-hidden className={`block h-full w-full ${className}`} />
}
