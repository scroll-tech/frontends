"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { createPortal } from "react-dom"
import * as THREE from "three"
import { CSS3DObject, CSS3DRenderer } from "three/examples/jsm/renderers/CSS3DRenderer.js"

import { MODELS, providerColor } from "./models"

// Geometry is kept in the same world units as Glen's prototype so the card proportions
// match his reference exactly; on-screen size is driven by `fit` instead of a fixed camera.
const RADIUS = 900
const CARD_W = 250
const CARD_H = 168
const CORE_W = 300
const CORE_H = 122
const FOV = 42
// visible world height at the sphere's centre plane, per unit of camera distance
const VIEW_PER_DISTANCE = 2 * Math.tan((FOV / 2) * (Math.PI / 180))

const AUTO_ROTATE_SPEED = 0.0015
const MAX_SPEED = 0.008

const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v))

const fibonacciSphere = (n: number, r: number) => {
  const pts: THREE.Vector3[] = []
  const offset = 2 / n
  const increment = Math.PI * (3 - Math.sqrt(5))
  for (let i = 0; i < n; i++) {
    const y = i * offset - 1 + offset / 2
    const rad = Math.sqrt(Math.max(0, 1 - y * y))
    const phi = i * increment
    pts.push(new THREE.Vector3(Math.cos(phi) * rad * r, y * r, Math.sin(phi) * rad * r))
  }
  return pts
}

interface ModelGlobeProps {
  className?: string
  /** sphere diameter as a fraction of the container's shorter side, so portrait phone
   *  cards don't clip the globe left and right */
  fit?: number
  /** pushes the sphere down by this fraction of the container height (for the cropped hero) */
  offsetY?: number
  /** drag to rotate + hover highlight; the hero copy is decorative only */
  interactive?: boolean
  /** show the centre COMPASS node */
  showCore?: boolean
}

const ModelGlobe = ({ className = "", fit = 0.66, offsetY = 0, interactive = true, showCore = true }: ModelGlobeProps) => {
  const hostRef = useRef<HTMLDivElement>(null)
  const glRef = useRef<HTMLCanvasElement>(null)
  const cssHostRef = useRef<HTMLDivElement>(null)
  const [ready, setReady] = useState(false)

  // one detached div per model; React renders the real markup into them through a portal
  const cardEls = useMemo(() => {
    if (typeof document === "undefined") return []
    return MODELS.map(() => document.createElement("div"))
  }, [])
  const coreEl = useMemo(() => (typeof document === "undefined" ? null : document.createElement("div")), [])

  useEffect(() => {
    const host = hostRef.current
    const canvas = glRef.current
    const cssHost = cssHostRef.current
    if (!host || !canvas || !cssHost || !cardEls.length || !coreEl) return

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    const glScene = new THREE.Scene()
    const cssScene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(FOV, 1, 1, 20000)

    const glRenderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
    glRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    glRenderer.setClearColor(0x000000, 0)

    const cssRenderer = new CSS3DRenderer()
    cssRenderer.domElement.style.position = "absolute"
    cssRenderer.domElement.style.top = "0"
    cssRenderer.domElement.style.left = "0"
    cssHost.appendChild(cssRenderer.domElement)

    const glGroup = new THREE.Group()
    const cssGroup = new THREE.Group()
    glScene.add(glGroup)
    cssScene.add(cssGroup)

    const positions = fibonacciSphere(MODELS.length, RADIUS)
    const cards = cardEls.map((div, i) => {
      div.style.width = `${CARD_W}px`
      div.style.height = `${CARD_H}px`
      div.style.pointerEvents = interactive ? "auto" : "none"

      const basePos = positions[i].clone()
      const obj = new CSS3DObject(div)
      obj.position.copy(basePos)
      obj.lookAt(0, 0, 0)
      obj.rotateY(Math.PI)
      cssGroup.add(obj)

      const lineGeo = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0, 0), basePos.clone().multiplyScalar(0.985)])
      glGroup.add(new THREE.Line(lineGeo, new THREE.LineBasicMaterial({ color: 0xbbbbbb, transparent: true, opacity: 0.35 })))

      return { div, obj, basePos, phase: Math.random() * Math.PI * 2, speed: 0.3 + Math.random() * 0.08 }
    })

    let coreObj: CSS3DObject | null = null
    if (showCore) {
      coreEl.style.width = `${CORE_W}px`
      coreEl.style.height = `${CORE_H}px`
      coreEl.style.pointerEvents = "none"
      coreObj = new CSS3DObject(coreEl)
      // parented to the scene rather than the group so it stays upright while the sphere spins
      cssScene.add(coreObj)
    }

    let width = 0
    let height = 0

    const layout = () => {
      const rect = host.getBoundingClientRect()
      width = Math.max(1, Math.round(rect.width))
      height = Math.max(1, Math.round(rect.height))

      // distance that renders the sphere at `fit` × the container's shorter side
      const distance = (2 * RADIUS * height) / (VIEW_PER_DISTANCE * fit * Math.min(width, height))
      const worldOffset = offsetY * VIEW_PER_DISTANCE * distance

      camera.aspect = width / height
      camera.position.set(0, worldOffset, distance)
      camera.lookAt(0, worldOffset, 0)
      camera.updateProjectionMatrix()

      glRenderer.setSize(width, height)
      cssRenderer.setSize(width, height)
      return { distance, worldOffset }
    }

    let { distance: baseDistance, worldOffset } = layout()
    const resizeObserver = new ResizeObserver(() => {
      const next = layout()
      baseDistance = next.distance
      worldOffset = next.worldOffset
    })
    resizeObserver.observe(host)

    // ---- interaction -------------------------------------------------------
    let dragging = false
    let prevX = 0
    let prevY = 0
    let velX = 0
    let velY = 0
    let rotX = 0.18
    let rotY = 0.3
    let pointerNX = 0
    let pointerNY = 0
    let lastInteraction = performance.now()

    const onPointerDown = (e: PointerEvent) => {
      dragging = true
      prevX = e.clientX
      prevY = e.clientY
      host.setPointerCapture(e.pointerId)
      lastInteraction = performance.now()
    }
    const onPointerMove = (e: PointerEvent) => {
      const rect = host.getBoundingClientRect()
      pointerNX = ((e.clientX - rect.left) / rect.width) * 2 - 1
      pointerNY = ((e.clientY - rect.top) / rect.height) * 2 - 1
      if (!dragging) return
      velY = clamp((e.clientX - prevX) * 0.0028, -MAX_SPEED, MAX_SPEED)
      velX = clamp((e.clientY - prevY) * 0.0028, -MAX_SPEED, MAX_SPEED)
      prevX = e.clientX
      prevY = e.clientY
      rotY += velY
      rotX = clamp(rotX + velX, -1.1, 1.1)
      lastInteraction = performance.now()
    }
    const onPointerUp = (e: PointerEvent) => {
      dragging = false
      if (host.hasPointerCapture(e.pointerId)) host.releasePointerCapture(e.pointerId)
    }

    if (interactive) {
      host.addEventListener("pointerdown", onPointerDown)
      host.addEventListener("pointermove", onPointerMove)
      host.addEventListener("pointerup", onPointerUp)
      host.addEventListener("pointercancel", onPointerUp)
      host.addEventListener("pointerleave", onPointerUp)
    }

    // ---- render loop -------------------------------------------------------
    // two globes live on the page — only render the one you can actually see
    let onScreen = true
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting
    })
    visibilityObserver.observe(host)

    const clock = new THREE.Clock()
    let frame = 0
    const animate = () => {
      frame = requestAnimationFrame(animate)
      if (!onScreen) return
      const t = clock.getElapsedTime()
      const idle = performance.now() - lastInteraction > 400 && !dragging

      if (!dragging) {
        rotY += velY
        rotX = clamp(rotX + velX, -1.1, 1.1)
        velX *= 0.92
        velY *= 0.92
        if (Math.abs(velX) < 0.00002) velX = 0
        if (Math.abs(velY) < 0.00002) velY = 0
        if (idle && velX === 0 && velY === 0 && !reduceMotion) rotY += AUTO_ROTATE_SPEED
      }

      glGroup.rotation.set(rotX, rotY, 0)
      cssGroup.rotation.set(rotX, rotY, 0)

      if (interactive) {
        const parallaxX = pointerNX * baseDistance * 0.04
        const parallaxY = -pointerNY * baseDistance * 0.027
        camera.position.x += (parallaxX - camera.position.x) * 0.02
        camera.position.y += (worldOffset + parallaxY - camera.position.y) * 0.02
        camera.lookAt(0, worldOffset, 0)
      }

      for (const card of cards) {
        const float = reduceMotion ? 0 : Math.sin(t * card.speed + card.phase) * 6
        const dir = card.basePos.clone().normalize()
        const floated = card.basePos.clone().add(dir.multiplyScalar(float))
        card.obj.position.copy(floated)
        card.obj.lookAt(0, 0, 0)
        card.obj.rotateY(Math.PI)

        const rotatedZ = floated.clone().applyEuler(cssGroup.rotation).z
        const nz = clamp((rotatedZ + RADIUS) / (RADIUS * 2), 0, 1)
        let opacity = 0.28
        let blur = 1.6
        if (nz > 0.66) {
          opacity = 1
          blur = 0
        } else if (nz > 0.33) {
          opacity = 0.75
          blur = 0.6
        }

        if (card.div.dataset.hovered === "true") {
          card.div.style.opacity = "1"
          card.div.style.filter = "none"
        } else {
          card.div.style.opacity = `${opacity}`
          card.div.style.filter = blur > 0 ? `blur(${blur}px)` : "none"
        }
      }

      glRenderer.render(glScene, camera)
      cssRenderer.render(cssScene, camera)
    }
    animate()
    setReady(true)

    return () => {
      cancelAnimationFrame(frame)
      resizeObserver.disconnect()
      visibilityObserver.disconnect()
      host.removeEventListener("pointerdown", onPointerDown)
      host.removeEventListener("pointermove", onPointerMove)
      host.removeEventListener("pointerup", onPointerUp)
      host.removeEventListener("pointercancel", onPointerUp)
      host.removeEventListener("pointerleave", onPointerUp)
      cards.forEach(c => cssGroup.remove(c.obj))
      if (coreObj) cssScene.remove(coreObj)
      glGroup.traverse(o => {
        if (o instanceof THREE.Line) {
          o.geometry.dispose()
          ;(o.material as THREE.Material).dispose()
        }
      })
      glRenderer.dispose()
      cssRenderer.domElement.remove()
    }
  }, [cardEls, coreEl, fit, offsetY, interactive, showCore])

  return (
    <div
      ref={hostRef}
      className={`relative size-full ${interactive ? "cursor-grab active:cursor-grabbing" : ""} ${className}`}
      style={{ opacity: ready ? 1 : 0, transition: "opacity 600ms ease" }}
    >
      <canvas ref={glRef} className="pointer-events-none absolute inset-0 size-full" />
      <div ref={cssHostRef} className="pointer-events-none absolute inset-0 overflow-hidden" />
      {cardEls.map((el, i) =>
        createPortal(
          <div
            onPointerEnter={() => {
              el.dataset.hovered = "true"
            }}
            onPointerLeave={() => {
              el.dataset.hovered = "false"
            }}
            className="flex size-full select-none flex-col justify-center gap-[8px] rounded-[16px] bg-white px-[18px] py-[14px] shadow-[0_10px_24px_rgba(0,0,0,0.16),0_2px_6px_rgba(0,0,0,0.08)] transition-shadow duration-200 hover:shadow-[0_16px_34px_rgba(0,0,0,0.22),0_4px_10px_rgba(0,0,0,0.1)]"
          >
            <div className="flex min-w-0 items-center gap-[8px]">
              <span className="size-[6px] shrink-0 rounded-full" style={{ backgroundColor: providerColor(MODELS[i].provider) }} />
              <span className="flex size-[20px] shrink-0 items-center justify-center rounded-full bg-[#F2F2F2] text-[9px] font-bold tracking-[0.2px] text-[#111] shadow-[0_1px_3px_rgba(0,0,0,0.15)]">
                {MODELS[i].initials}
              </span>
              <span className="truncate text-[14px] font-semibold tracking-[-0.1px] text-[#111]">{MODELS[i].name}</span>
            </div>
            <div className="flex gap-[14px] pl-[2px]">
              <div className="flex flex-col gap-[1px]">
                <span className="text-[9px] tracking-[0.3px] text-[rgba(17,17,17,0.55)]">IN / 1M</span>
                <span className="text-[11.5px] font-medium tabular-nums text-[#111]">${MODELS[i].inPrice}</span>
              </div>
              <div className="flex flex-col gap-[1px]">
                <span className="text-[9px] tracking-[0.3px] text-[rgba(17,17,17,0.55)]">OUT / 1M</span>
                <span className="text-[11.5px] font-medium tabular-nums text-[#111]">${MODELS[i].outPrice}</span>
              </div>
            </div>
          </div>,
          el,
          `card-${i}`,
        ),
      )}
      {showCore &&
        coreEl &&
        createPortal(
          <div className="flex size-full items-center justify-center rounded-[26px] bg-white shadow-[0_10px_26px_rgba(0,0,0,0.10),0_2px_6px_rgba(0,0,0,0.05)]">
            <span className="text-[20px] font-bold tracking-[3px] text-[#111]">COMPASS</span>
          </div>,
          coreEl,
          "core",
        )}
    </div>
  )
}

export default ModelGlobe
