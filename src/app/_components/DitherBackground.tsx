"use client"

import { useEffect, useRef } from "react"

import styles from "./landing.module.css"

// 8 x 8 Bayer threshold matrix
const BAYER = [
  [0, 32, 8, 40, 2, 34, 10, 42],
  [48, 16, 56, 24, 50, 18, 58, 26],
  [12, 44, 4, 36, 14, 46, 6, 38],
  [60, 28, 52, 20, 62, 30, 54, 22],
  [3, 35, 11, 43, 1, 33, 9, 41],
  [51, 19, 59, 27, 49, 17, 57, 25],
  [15, 47, 7, 39, 13, 45, 5, 37],
  [63, 31, 55, 23, 61, 29, 53, 21],
]
// one canvas pixel per 3 screen pixels — the dither is meant to look coarse
const SCALE = 3
// redraw interval; the waves move slowly enough that ~11 fps reads as continuous
const INTERVAL = 90

const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v))

/**
 * Glen's page background (scroll.html, 2026-09-10): a violet ordered dither, fixed behind
 * the page and masked so it only shows across the lower part of the viewport, with two
 * slow sine waves rolling through the density. This is the version Zhengqi had already
 * tuned for performance — a third-resolution canvas redrawn every 90ms, not every frame —
 * with the pixel buffer reused between draws on top. Under reduced motion it is drawn once.
 */
const DitherBackground = () => {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas?.getContext("2d")
    if (!canvas || !ctx) return
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    let cols = 0
    let rows = 0
    let image: ImageData | null = null
    let last = 0
    let frame = 0

    const size = () => {
      cols = Math.max(1, Math.ceil(window.innerWidth / SCALE))
      rows = Math.max(1, Math.ceil(window.innerHeight / SCALE))
      canvas.width = cols
      canvas.height = rows
      image = ctx.createImageData(cols, rows)
    }

    const draw = (t: number) => {
      if (!image) return
      const d = image.data
      const T = t * 0.00006
      for (let y = 0; y < rows; y++) {
        const g = clamp(y / rows, 0, 1)
        const base = Math.pow(g, 2.6) * 0.55 - 0.02
        for (let x = 0; x < cols; x++) {
          const wave = 0.16 * Math.sin(x * 0.03 + y * 0.075 + T * 6.5) + 0.11 * Math.sin(x * 0.013 - y * 0.03 - T * 4.0)
          const v = clamp(base + wave * g * 0.9, 0, 1)
          const th = (BAYER[y & 7][x & 7] + 0.5) / 64
          const i = (y * cols + x) * 4
          d[i] = 133 // Scroll violet
          d[i + 1] = 118
          d[i + 2] = 208
          d[i + 3] = v > th ? 255 : 0
        }
      }
      ctx.putImageData(image, 0, 0)
    }

    const loop = (t: number) => {
      frame = requestAnimationFrame(loop)
      if (t - last < INTERVAL) return
      last = t
      draw(t)
    }

    const onResize = () => {
      size()
      draw(performance.now())
    }

    size()
    window.addEventListener("resize", onResize)
    if (reduced) draw(0)
    else frame = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("resize", onResize)
    }
  }, [])

  return <canvas ref={ref} className={styles.dither} aria-hidden="true" />
}

export default DitherBackground
