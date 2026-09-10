"use client"

import { CSSProperties, useEffect, useRef, useState } from "react"

import ModelGlobe from "../ModelGlobe/lazy"
import { MODALITY_COUNTS, MODALITY_ORDER, type Modality, SPHERE_MODELS, modelSlug, providerColor } from "../ModelGlobe/models"
import styles from "./compass.module.css"

type RowState = "entering" | "in" | "leaving"
interface Row {
  index: number
  state: RowState
}

/**
 * Glen's selected list slides each row in from the left as it is picked and folds it away
 * when it is removed. React drops a row the moment it leaves the array, so this keeps a
 * shadow list: a new index mounts as `entering` and is promoted a frame later, a removed one
 * is marked `leaving` and dropped once its transition has run. Picking a model again while
 * it is still leaving simply brings it back.
 */
const useAnimatedRows = (selected: number[]) => {
  const [rows, setRows] = useState<Row[]>([])
  const timers = useRef(new Map<number, ReturnType<typeof setTimeout>>())

  useEffect(() => {
    setRows(prev => {
      const next: Row[] = prev.map(r => {
        if (selected.includes(r.index)) return r.state === "leaving" ? { ...r, state: "in" } : r
        return r.state === "leaving" ? r : { ...r, state: "leaving" }
      })
      selected.forEach(i => {
        if (!next.some(r => r.index === i)) next.push({ index: i, state: "entering" })
      })
      return next
    })
  }, [selected])

  useEffect(() => {
    let raf = 0
    if (rows.some(r => r.state === "entering")) {
      // two frames, like his prototype: the row has to paint hidden once before the transition
      raf = requestAnimationFrame(() => {
        raf = requestAnimationFrame(() => setRows(rs => rs.map(r => (r.state === "entering" ? { ...r, state: "in" } : r))))
      })
    }
    rows.forEach(r => {
      const pending = timers.current.get(r.index)
      if (r.state === "leaving" && !pending) {
        timers.current.set(
          r.index,
          setTimeout(() => {
            timers.current.delete(r.index)
            setRows(rs => rs.filter(x => !(x.index === r.index && x.state === "leaving")))
          }, 400),
        )
      } else if (r.state !== "leaving" && pending) {
        clearTimeout(pending)
        timers.current.delete(r.index)
      }
    })
    return () => cancelAnimationFrame(raf)
  }, [rows])

  useEffect(() => {
    const map = timers.current
    return () => map.forEach(clearTimeout)
  }, [])

  return rows
}

/**
 * Compass panel: Glen's compass-interactive (2).html (2026-09-10) inside the sphere figure
 * of his scroll.html. His file fills a window; here the globe fills the figure and the
 * chrome floats over it the way his does — selected models top left with their slug and
 * prices, the modality filter bottom left, a hint along the bottom — and hovering the globe
 * eases it forward while the filter and hint blur out of the way.
 *
 * His figure sits under a "Click to explore" wash until it is clicked (scroll.html's
 * `.figure--live`), because the sphere zooms on the wheel and would otherwise stop the page
 * scrolling the moment the pointer crossed it. The wash comes back when the pointer leaves
 * the figure or it scrolls mostly out of view, as his does. The globe still rotates on its
 * own and reacts to the pointer underneath; only the wheel and touch gestures wait.
 *
 * Sizing: his iframe renders the sphere at 1.07× the figure's height, so `fit` says so. His
 * tile scale is left alone on desktop; on the phone his formula leaves a 13px tile, which
 * cannot be what he meant, so `cardScaleCompact` brings it back to roughly a 36px tile.
 */
const CompassPanel = () => {
  const rootRef = useRef<HTMLDivElement>(null)
  // click order is what the list shows, so an array rather than a Set
  const [selected, setSelected] = useState<number[]>([])
  const [visible, setVisible] = useState<Modality[]>(MODALITY_ORDER)
  const [live, setLive] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [touch, setTouch] = useState(false)
  const rows = useAnimatedRows(selected)

  useEffect(() => {
    setTouch("ontouchstart" in window)
  }, [])

  // scrolled mostly away → hand the wheel back to the page
  useEffect(() => {
    const el = rootRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      entries => {
        if (!entries[0].isIntersecting) setLive(false)
      },
      { threshold: 0.25 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const toggleModel = (index: number) => setSelected(prev => (prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]))

  const toggleModality = (key: Modality) =>
    setVisible(prev => {
      const next = prev.includes(key) ? prev.filter(m => m !== key) : [...prev, key]
      // deselect cards that get filtered out so the side panel stays consistent
      setSelected(sel => sel.filter(i => next.includes(SPHERE_MODELS[i].modality)))
      return next
    })

  const mouseOnly = (on: boolean) => (e: React.PointerEvent) => {
    if (e.pointerType && e.pointerType !== "mouse") return
    setHovered(on)
  }

  return (
    <div ref={rootRef} className="relative size-full" onMouseLeave={() => setLive(false)}>
      {/* the scene: globe plus its shield. The panels are siblings above it, so moving onto
          one of them counts as leaving the globe, as in his file */}
      <div className="absolute inset-0" onPointerEnter={mouseOnly(true)} onPointerLeave={mouseOnly(false)}>
        <ModelGlobe
          className="size-full"
          fit={1.07}
          cardScale={1}
          cardScaleCompact={2.75}
          interactive
          selected={selected}
          onToggle={toggleModel}
          visibleModalities={visible}
          zoomable={live}
          hovered={hovered}
        />
        <button type="button" className={`${styles.shield} ${live ? styles.shieldOff : ""}`} onClick={() => setLive(true)} tabIndex={live ? -1 : 0}>
          <span className={styles.shieldPill}>Click to explore</span>
        </button>
      </div>
      <div className={`${styles.ring} ${live ? styles.ringOn : ""}`} aria-hidden="true" />

      {/* ---- selected models ------------------------------------------------ */}
      <div className={styles.selectedPanel}>
        <p className={styles.panelLabel}>Selected models</p>
        <div>
          {rows.map(({ index, state }) => {
            const model = SPHERE_MODELS[index]
            const color = providerColor(model.provider)
            return (
              <div
                key={index}
                className={`${styles.item} ${state === "entering" ? styles.entering : ""} ${state === "leaving" ? styles.leaving : ""}`}
                aria-hidden={state === "leaving"}
              >
                <div className={styles.itemTop}>
                  <span className={styles.dot} style={{ background: color }} />
                  <span className={styles.name}>{model.name}</span>
                  {model.open && <span className={styles.badge}>OPEN</span>}
                  <button type="button" className={styles.remove} onClick={() => toggleModel(index)} aria-label={`Remove ${model.name}`}>
                    &times;
                  </button>
                </div>
                <div className={styles.slug}>{modelSlug(model)}</div>
                <div className={styles.prices}>
                  <div className={styles.price}>
                    <span className={styles.priceLabel}>IN / 1M</span>
                    <span className={styles.priceValue}>${model.inPrice}</span>
                  </div>
                  <div className={styles.price}>
                    <span className={styles.priceLabel}>OUT / 1M</span>
                    <span className={styles.priceValue}>${model.outPrice}</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        {selected.length === 0 && <p className={styles.selectedEmpty}>Click any card in the sphere to see its details here.</p>}
      </div>

      {/* ---- modality filter ---------------------------------------------- */}
      <div className={`${styles.modalityPanel} ${hovered ? styles.dim : ""}`}>
        <p className={styles.panelLabel}>Modality</p>
        {MODALITY_ORDER.map(key => {
          const on = visible.includes(key)
          return (
            <label key={key} className={`${styles.modalityRow} ${on ? "" : styles.disabled}`}>
              <input type="checkbox" checked={on} onChange={() => toggleModality(key)} />
              <span className={styles.modalityName}>{key}</span>
              <span className={styles.modalityCount}>{MODALITY_COUNTS[key]}</span>
            </label>
          )
        })}
      </div>

      <div className={`${styles.hint} ${hovered ? styles.dim : ""}`} style={{ "--placeholder": 0 } as CSSProperties}>
        {touch ? "drag to rotate · pinch to zoom · tap a model" : "drag to rotate · scroll to zoom · hover a model"}
      </div>
    </div>
  )
}

export default CompassPanel
