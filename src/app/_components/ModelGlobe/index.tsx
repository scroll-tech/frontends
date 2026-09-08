"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { createPortal } from "react-dom"
import * as THREE from "three"
import { CSS3DObject, CSS3DRenderer } from "three/examples/jsm/renderers/CSS3DRenderer.js"

import { type Modality, SPHERE_MODELS, providerColor } from "./models"

// Geometry is kept in the same world units as Glen's prototype so the card proportions
// match his reference exactly; on-screen size is driven by `fit` instead of a fixed camera.
const RADIUS = 900
const CARD_W = 250
// 118, not Glen's 168. His card was mostly air below the prices, which only showed up once
// the whole card was scaled to make the text readable — a big empty plate. Tightening the
// box instead of scaling it means `cardScale` can stay modest (1.7, not 2.3) and the card
// still reads, and the surface it frees is what pays for the extra models in SPHERE_MODELS.
const CARD_H = 118
const CORE_W = 300
const CORE_H = 122
const FOV = 42
// visible world height at the sphere's centre plane, per unit of camera distance
const VIEW_PER_DISTANCE = 2 * Math.tan((FOV / 2) * (Math.PI / 180))

const AUTO_ROTATE_SPEED = 0.0015
const MAX_SPEED = 0.008

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
  /** sphere diameter as a fraction of the container's shorter side, so portrait phone
   *  cards don't clip the globe left and right */
  fit?: number
  /** `fit` below the md breakpoint. The design crops the globe at the card's edges on a
   *  phone — half-cards at the left, right and bottom — so it reads as something you can
   *  keep spinning rather than a shrunken sphere sitting in the middle. Omit to reuse `fit`. */
  fitCompact?: number
  /** pushes the sphere down by this fraction of the container height (for the cropped hero) */
  offsetY?: number
  /** `offsetY` below the md breakpoint; pair it with `fitCompact` to keep the enlarged
   *  sphere's top cap inside the window instead of cutting it off in mid-air */
  offsetYCompact?: number
  /** multiplies the computed card scale. `fit` moves the sphere and the cards together, so
   *  it can't make the text on a card bigger relative to the sphere — only this can, and
   *  the sphere's surface is what pays for it: see SPHERE_MODELS in ./models. */
  cardScale?: number
  /** `cardScale` below the md breakpoint. Pulling the camera in (`fitCompact`) enlarges the
   *  cards but leaves fewer of them in frame; the design wants both, which only a bigger
   *  card relative to the sphere gives. */
  cardScaleCompact?: number
  /** drag to rotate + hover highlight; the hero copy is decorative only */
  interactive?: boolean
  /** show the centre COMPASS node */
  showCore?: boolean
  /** indices of the selected cards; the panel beside the globe owns this state */
  selected?: number[]
  /** click a card. Omit and the cards are inert. */
  onToggle?: (index: number) => void
  /** modalities currently ticked in the filter. Omit to show everything. */
  visibleModalities?: Modality[]
}

const ModelGlobe = ({
  className = "",
  fit = 0.66,
  fitCompact,
  offsetY = 0,
  offsetYCompact,
  cardScale,
  cardScaleCompact,
  interactive = true,
  showCore = true,
  selected,
  onToggle,
  visibleModalities,
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

  // one detached div per model; React renders the real markup into them through a portal
  const cardEls = useMemo(() => {
    if (typeof document === "undefined") return []
    return SPHERE_MODELS.map(() => document.createElement("div"))
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
      const scale = computeUiScale(width) * ((compact ? cardScaleCompact : cardScale) ?? 1)
      setUiScale(scale)
      cards.forEach(({ div }) => {
        div.style.width = `${CARD_W * scale}px`
        div.style.height = `${CARD_H * scale}px`
      })
      if (showCore) {
        coreEl.style.width = `${CORE_W * scale}px`
        coreEl.style.height = `${CORE_H * scale}px`
      }

      const activeFit = (compact ? fitCompact : undefined) ?? fit
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

    if (interactive) {
      host.addEventListener("pointerdown", onPointerDown)
      window.addEventListener("pointermove", onPointerMove)
      window.addEventListener("pointerup", onPointerUp)
      window.addEventListener("pointercancel", onPointerUp)
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

        const rotatedZ = floated.clone().applyEuler(cssGroup.rotation).z
        const nz = clamp((rotatedZ + RADIUS) / (RADIUS * 2), 0, 1)
        // Tommy 2026-09-08: "it'd be ideal if we could read whats on the cards that are
        // moving around". Glen's depth cue was three bands at 0.28/0.75/1 opacity with up
        // to 1.6px of blur, which left everything off the front face unreadable. Same
        // three bands, but the sharp one starts halfway back, nothing between is blurred
        // at all, and the far face only dims — depth still reads from scale and dimming.
        let opacity = 0.5
        let blur = 0.7
        if (nz > 0.5) {
          opacity = 1
          blur = 0
        } else if (nz > 0.28) {
          opacity = 0.85
          blur = 0
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
  }, [cardEls, coreEl, fit, fitCompact, offsetY, offsetYCompact, cardScale, cardScaleCompact, interactive, showCore])

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
        const isSelected = (selected ?? []).includes(i)
        return createPortal(
          // authored at the base 250x168 and scaled as a whole, so every size inside the
          // card follows the responsive scale without restating it
          <div style={{ width: CARD_W, height: CARD_H, transform: `scale(${uiScale})`, transformOrigin: "top left" }}>
            <button
              type="button"
              disabled={!onToggle}
              onPointerEnter={() => {
                el.dataset.hovered = "true"
              }}
              onPointerLeave={() => {
                el.dataset.hovered = "false"
              }}
              onClick={e => {
                // restart the pop even on a rapid second click, the way his prototype
                // forces a reflow between removing and re-adding the class
                const el = e.currentTarget
                el.classList.remove("model-card-pop")
                void el.offsetWidth
                el.classList.add("model-card-pop")
                onToggle?.(i)
              }}
              onAnimationEnd={e => e.currentTarget.classList.remove("model-card-pop")}
              style={isSelected ? { boxShadow: `0 0 0 2.5px ${providerColor(model.provider)}, 0 16px 34px rgba(0,0,0,0.24)` } : undefined}
              className={`flex size-full select-none flex-col justify-center gap-[8px] rounded-[16px] bg-white px-[18px] py-[14px] text-left transition-[transform,box-shadow] duration-200 ${
                isSelected ? "" : "shadow-[0_10px_24px_rgba(0,0,0,0.16),0_2px_6px_rgba(0,0,0,0.08)]"
              } ${onToggle ? "cursor-pointer hover:scale-[1.035] hover:shadow-[0_16px_34px_rgba(0,0,0,0.22),0_4px_10px_rgba(0,0,0,0.1)]" : "cursor-default"}`}
            >
              {/* Type is sized against the 250px card, not Glen's original ratios: the same
                  layout with the name at 19 instead of 14 and the prices at 15 instead of
                  11.5. That is what lets the card itself stay small on the sphere. */}
              <div className="flex min-w-0 items-center gap-[8px]">
                <span className="size-[8px] shrink-0 rounded-full" style={{ backgroundColor: providerColor(model.provider) }} />
                <span className="flex size-[22px] shrink-0 items-center justify-center rounded-full bg-[#F2F2F2] text-[10px] font-bold tracking-[0.2px] text-[#111] shadow-[0_1px_3px_rgba(0,0,0,0.15)]">
                  {model.initials}
                </span>
                <span className="truncate text-[19px] font-semibold tracking-[-0.3px] text-[#111]">{model.name}</span>
              </div>
              <div className="flex gap-[16px] pl-[2px]">
                <div className="flex flex-col gap-[1px]">
                  <span className="text-[11px] tracking-[0.3px] text-[rgba(17,17,17,0.55)]">IN / 1M</span>
                  <span className="text-[15px] font-medium tabular-nums text-[#111]">${model.inPrice}</span>
                </div>
                <div className="flex flex-col gap-[1px]">
                  <span className="text-[11px] tracking-[0.3px] text-[rgba(17,17,17,0.55)]">OUT / 1M</span>
                  <span className="text-[15px] font-medium tabular-nums text-[#111]">${model.outPrice}</span>
                </div>
              </div>
            </button>
          </div>,
          el,
          `card-${i}`,
        )
      })}
      {showCore &&
        coreEl &&
        createPortal(
          <div style={{ width: CORE_W, height: CORE_H, transform: `scale(${uiScale})`, transformOrigin: "top left" }}>
            <div className="flex size-full items-center justify-center rounded-[26px] bg-white shadow-[0_10px_26px_rgba(0,0,0,0.10),0_2px_6px_rgba(0,0,0,0.05)]">
              <span className="whitespace-nowrap text-[20px] font-bold tracking-[3px] text-[#111]">COMPASS</span>
            </div>
          </div>,
          coreEl,
          "core",
        )}
    </div>
  )
}

export default ModelGlobe
