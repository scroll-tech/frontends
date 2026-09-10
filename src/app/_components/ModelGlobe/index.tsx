"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { createPortal } from "react-dom"
import * as THREE from "three"
import { CSS3DObject, CSS3DRenderer } from "three/examples/jsm/renderers/CSS3DRenderer.js"

import ScrollMarkSvg from "@/assets/svgs/landingpage/scroll-mark.svg"

import styles from "./globe.module.css"
import { LOGO_SVGS } from "./logos"
import { type Modality, SPHERE_MODELS, providerColor } from "./models"

/**
 * Glen's compass-interactive (2).html (2026-09-10). Geometry stays in his world units so the
 * proportions match his file; on-screen size is driven by `fit` instead of his fixed camera
 * distance, because the globe sits in a card here rather than filling a window.
 *
 * What changed from his 2026-09-07 prototype, all carried here: the cards are 150px square
 * logo tiles ("now a square logo tile, not a text card"), the centre node is a 220px square
 * with the Scroll mark, the sphere drifts instead of spinning ("much slower, lazy drift"),
 * the wheel and a two-finger pinch zoom the camera, and hovering the globe eases it forward
 * a touch ("subtle come-forward, not a lunge"). His three depth bands are back as written —
 * a tile has nothing to read, so the far face can dim and blur again.
 */
const RADIUS = 900
const CARD = 150
const CORE = 220
const FOV = 42
// visible world height at the sphere's centre plane, per unit of camera distance
const VIEW_PER_DISTANCE = 2 * Math.tan((FOV / 2) * (Math.PI / 180))

const AUTO_ROTATE_SPEED = 0.00025
const MAX_SPEED = 0.008
// his zoom range, 900–4200 of camera distance, as a factor of his 2200 resting distance
const ZOOM_MIN = 900 / 2200
const ZOOM_MAX = 4200 / 2200
const ZOOM_WHEEL = 0.6 / 2200

const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v))

// Glen's computeUIScale: full size from 900px, down to half on a small phone. His
// prototype measured the window; the globe sits in a card here, so measure that.
const computeUiScale = (w: number) => (w >= 900 ? 1 : w <= 360 ? 0.5 : 0.5 + ((w - 360) / 540) * 0.5)

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
  /** sphere diameter as a fraction of the container's shorter side */
  fit?: number
  /** `fit` below the md breakpoint. Omit to reuse `fit`. */
  fitCompact?: number
  /** pushes the sphere down by this fraction of the container height */
  offsetY?: number
  /** `offsetY` below the md breakpoint */
  offsetYCompact?: number
  /** multiplies the computed tile scale — `fit` moves the sphere and the tiles together,
   *  so only this can make a tile bigger relative to the sphere */
  cardScale?: number
  /** `cardScale` below the md breakpoint */
  cardScaleCompact?: number
  /** a floor for a tile's on-screen size: where the sphere is small (a phone's square
   *  figure) the tiles are scaled up until they reach this many pixels, and left alone
   *  where they already exceed it. Glen's own scale leaves a 13px tile on a phone. */
  minTilePx?: number
  /** drag to rotate + hover highlight; off and the globe is decorative */
  interactive?: boolean
  /** show the centre Scroll node */
  showCore?: boolean
  /** indices of the selected tiles; the panel beside the globe owns this state */
  selected?: number[]
  /** click a tile. Omit and the tiles are inert. */
  onToggle?: (index: number) => void
  /** modalities currently ticked in the filter. Omit to show everything. */
  visibleModalities?: Modality[]
  /**
   * The wheel zooms the camera and a one-finger drag rotates it instead of scrolling the
   * page. Off by default: in a page a globe that eats the wheel is a trap, so the panel
   * turns this on only after the visitor has clicked into it (its "Click to explore").
   */
  zoomable?: boolean
  /** the pointer is over the globe — eases the camera forward, as his hover does */
  hovered?: boolean
}

const ModelGlobe = ({
  className = "",
  fit = 0.66,
  fitCompact,
  offsetY = 0,
  offsetYCompact,
  cardScale,
  cardScaleCompact,
  minTilePx,
  interactive = true,
  showCore = true,
  selected,
  onToggle,
  visibleModalities,
  zoomable = false,
  hovered = false,
}: ModelGlobeProps) => {
  const hostRef = useRef<HTMLDivElement>(null)
  const glRef = useRef<HTMLCanvasElement>(null)
  const cssHostRef = useRef<HTMLDivElement>(null)
  const [ready, setReady] = useState(false)
  const [uiScale, setUiScale] = useState(1)

  // the animation loop is set up once; these let it read current state each frame
  const selectedRef = useRef<number[]>([])
  selectedRef.current = selected ?? []
  const visibleRef = useRef<Modality[] | undefined>(undefined)
  visibleRef.current = visibleModalities
  const zoomableRef = useRef(false)
  zoomableRef.current = zoomable
  const hoveredRef = useRef(false)
  hoveredRef.current = hovered

  // one detached div per model; React renders the real markup into them through a portal
  const cardEls = useMemo(() => {
    if (typeof document === "undefined") return []
    return SPHERE_MODELS.map(() => document.createElement("div"))
  }, [])
  const coreEl = useMemo(() => (typeof document === "undefined" ? null : document.createElement("div")), [])

  // His `touch-action: none` — only while the visitor has opted in, or the globe would
  // swallow every swipe over it. And `pan-y` rather than his `none`: on a phone the figure
  // is most of the screen, and with `none` a visitor who has tapped in can no longer scroll
  // past it. Sideways swipes still rotate the sphere and a pinch still zooms it; an
  // up-or-down swipe scrolls the page, as it should.
  useEffect(() => {
    const host = hostRef.current
    if (host) host.style.touchAction = zoomable ? "pan-y" : ""
  }, [zoomable])

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

    const positions = fibonacciSphere(SPHERE_MODELS.length, RADIUS)
    const cards = cardEls.map((div, i) => {
      div.style.pointerEvents = interactive ? "auto" : "none"
      div.style.transition = "opacity .18s ease, filter .18s ease"

      const basePos = positions[i].clone()
      const obj = new CSS3DObject(div)
      obj.position.copy(basePos)
      obj.lookAt(0, 0, 0)
      obj.rotateY(Math.PI)
      cssGroup.add(obj)

      const lineGeo = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0, 0), basePos.clone().multiplyScalar(0.985)])
      const line = new THREE.Line(lineGeo, new THREE.LineBasicMaterial({ color: 0xbbbbbb, transparent: true, opacity: 0.35 }))
      glGroup.add(line)

      return { div, obj, basePos, line, modality: SPHERE_MODELS[i].modality, phase: Math.random() * Math.PI * 2, speed: 0.3 + Math.random() * 0.08 }
    })

    let coreObj: CSS3DObject | null = null
    if (showCore) {
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

      const compact = !window.matchMedia("(min-width: 900px)").matches
      const activeFit = (compact ? fitCompact : undefined) ?? fit
      let scale = computeUiScale(width) * ((compact ? cardScaleCompact : cardScale) ?? 1)
      if (minTilePx) {
        // the sphere is drawn `activeFit` × the shorter side wide, so a tile's on-screen size
        // follows from its share of the sphere's diameter
        const tilePx = (CARD * scale * activeFit * Math.min(width, height)) / (2 * RADIUS)
        if (tilePx < minTilePx) scale *= minTilePx / tilePx
      }
      setUiScale(scale)
      cards.forEach(({ div }) => {
        div.style.width = `${CARD * scale}px`
        div.style.height = `${CARD * scale}px`
      })
      if (showCore) {
        coreEl.style.width = `${CORE * scale}px`
        coreEl.style.height = `${CORE * scale}px`
      }

      const activeOffsetY = (compact ? offsetYCompact : undefined) ?? offsetY

      // distance that renders the sphere at `activeFit` × the container's shorter side
      const distance = (2 * RADIUS * height) / (VIEW_PER_DISTANCE * activeFit * Math.min(width, height))
      const worldOffset = activeOffsetY * VIEW_PER_DISTANCE * distance

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
    let zoom = 1
    let hoverAmount = 0

    // Drag exactly the way Glen's prototype does: pointerdown on the globe, move/up on
    // the window. Do NOT setPointerCapture here — capturing retargets the whole pointer
    // sequence to the host, and the card underneath never gets its click.
    const onPointerDown = (e: PointerEvent) => {
      dragging = true
      prevX = e.clientX
      prevY = e.clientY
      // lastInteraction deliberately untouched: selecting a card shouldn't pause the
      // auto-rotate, only actual dragging should (his comment says the same)
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
    const onPointerUp = () => {
      dragging = false
    }

    // his wheel zoom, but only once the visitor has clicked in — and then it has to eat
    // the event, or the page scrolls away under the zoom
    const onWheel = (e: WheelEvent) => {
      if (!zoomableRef.current) return
      e.preventDefault()
      zoom = clamp(zoom + e.deltaY * ZOOM_WHEEL, ZOOM_MIN, ZOOM_MAX)
      lastInteraction = performance.now()
    }

    // pinch-to-zoom for touch, where the wheel never fires
    let pinchStart: number | null = null
    let pinchZoom = 1
    const touchDist = (a: Touch, b: Touch) => Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY)
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length !== 2) return
      pinchStart = touchDist(e.touches[0], e.touches[1])
      pinchZoom = zoom
      dragging = false // a two-finger gesture is a zoom, not a rotate-drag
    }
    const onTouchMove = (e: TouchEvent) => {
      if (!zoomableRef.current || e.touches.length !== 2 || pinchStart === null) return
      const ratio = pinchStart / Math.max(touchDist(e.touches[0], e.touches[1]), 1) // fingers apart → zoom in
      zoom = clamp(pinchZoom * ratio, ZOOM_MIN, ZOOM_MAX)
      lastInteraction = performance.now()
      e.preventDefault()
    }
    const onTouchEnd = (e: TouchEvent) => {
      if (e.touches.length < 2) pinchStart = null
    }

    if (interactive) {
      host.addEventListener("pointerdown", onPointerDown)
      window.addEventListener("pointermove", onPointerMove)
      window.addEventListener("pointerup", onPointerUp)
      window.addEventListener("pointercancel", onPointerUp)
      host.addEventListener("wheel", onWheel, { passive: false })
      host.addEventListener("touchstart", onTouchStart, { passive: true })
      host.addEventListener("touchmove", onTouchMove, { passive: false })
      host.addEventListener("touchend", onTouchEnd)
    }

    // ---- render loop -------------------------------------------------------
    // only render while on screen
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

      // his numbers, read at his 2200 distance: 90 / 60 of parallax, a slow 0.035 ease on
      // the hover, and 4.5% closer at most
      hoverAmount += ((hoveredRef.current && interactive ? 1 : 0) - hoverAmount) * 0.035
      const distance = baseDistance * zoom * (1 - hoverAmount * 0.045)
      if (interactive) {
        const parallaxX = pointerNX * baseDistance * (90 / 2200)
        const parallaxY = -pointerNY * baseDistance * (60 / 2200)
        camera.position.x += (parallaxX - camera.position.x) * 0.02
        camera.position.y += (worldOffset + parallaxY - camera.position.y) * 0.02
      }
      camera.position.z = distance
      camera.lookAt(0, worldOffset, 0)

      const visible = visibleRef.current
      const selectedNow = selectedRef.current

      for (const [i, card] of cards.entries()) {
        // filtered-out cards fade away and take their spoke with them
        const shown = !visible || visible.includes(card.modality)
        card.line.visible = shown
        if (!shown) {
          card.div.style.opacity = "0"
          card.div.style.pointerEvents = "none"
          continue
        }
        card.div.style.pointerEvents = interactive ? "auto" : "none"

        const float = reduceMotion ? 0 : Math.sin(t * card.speed + card.phase) * 6
        const dir = card.basePos.clone().normalize()
        const floated = card.basePos.clone().add(dir.multiplyScalar(float))
        card.obj.position.copy(floated)
        card.obj.lookAt(0, 0, 0)
        card.obj.rotateY(Math.PI)

        // his three depth bands: sharp in front, dimmed in the middle, faded at the back
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

        if (card.div.dataset.hovered === "true" || selectedNow.includes(i)) {
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
      window.removeEventListener("pointermove", onPointerMove)
      window.removeEventListener("pointerup", onPointerUp)
      window.removeEventListener("pointercancel", onPointerUp)
      host.removeEventListener("wheel", onWheel)
      host.removeEventListener("touchstart", onTouchStart)
      host.removeEventListener("touchmove", onTouchMove)
      host.removeEventListener("touchend", onTouchEnd)
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
  }, [cardEls, coreEl, fit, fitCompact, offsetY, offsetYCompact, cardScale, cardScaleCompact, minTilePx, interactive, showCore])

  return (
    <div
      ref={hostRef}
      className={`relative size-full ${interactive ? "cursor-grab active:cursor-grabbing" : ""} ${className}`}
      style={{ opacity: ready ? 1 : 0, transition: "opacity 600ms ease" }}
    >
      <canvas ref={glRef} className="pointer-events-none absolute inset-0 size-full" />
      <div ref={cssHostRef} className="pointer-events-none absolute inset-0 overflow-hidden" />
      {cardEls.map((el, i) => {
        const model = SPHERE_MODELS[i]
        const color = providerColor(model.provider)
        const mark = LOGO_SVGS[model.icon]
        const isSelected = (selected ?? []).includes(i)
        return createPortal(
          // authored at the base 150px square and scaled as a whole
          <div style={{ width: CARD, height: CARD, transform: `scale(${uiScale})`, transformOrigin: "top left" }}>
            <button
              type="button"
              disabled={!onToggle}
              aria-label={`${model.name} by ${model.provider}${isSelected ? ", selected" : ""}`}
              aria-pressed={isSelected}
              onPointerEnter={() => {
                el.dataset.hovered = "true"
              }}
              onPointerLeave={() => {
                el.dataset.hovered = "false"
              }}
              onClick={e => {
                // restart the pop even on a rapid second click, the way his prototype
                // forces a reflow between removing and re-adding the class
                const btn = e.currentTarget
                btn.classList.remove("model-card-pop")
                void btn.offsetWidth
                btn.classList.add("model-card-pop")
                onToggle?.(i)
              }}
              onAnimationEnd={e => e.currentTarget.classList.remove("model-card-pop")}
              style={{ "--ring": color } as React.CSSProperties}
              className={`${styles.tile} ${isSelected ? styles.selected : ""}`}
            >
              {mark ? (
                // the marks are static SVG from lobe-icons, copied out of Glen's file (see ./logos)
                <span className={styles.badge} style={{ color }} dangerouslySetInnerHTML={{ __html: mark }} />
              ) : (
                <span className={styles.badge} style={{ color }}>
                  {model.initials}
                </span>
              )}
            </button>
          </div>,
          el,
          `card-${i}`,
        )
      })}
      {showCore &&
        coreEl &&
        createPortal(
          <div style={{ width: CORE, height: CORE, transform: `scale(${uiScale})`, transformOrigin: "top left" }}>
            <div className={styles.core}>
              <ScrollMarkSvg aria-hidden="true" />
            </div>
          </div>,
          coreEl,
          "core",
        )}
    </div>
  )
}

export default ModelGlobe
