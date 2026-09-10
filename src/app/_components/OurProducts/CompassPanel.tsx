"use client"

import { ReactNode, useEffect, useRef, useState } from "react"

import ModelGlobe from "../ModelGlobe/lazy"
import { MODALITY_COUNTS, MODALITY_ORDER, type Modality, SPHERE_MODELS, modelSlug, providerColor } from "../ModelGlobe/models"
import landing from "../landing.module.css"
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
 * of his scroll.html. His file fills a window; here the globe fills the figure and, on a
 * desktop, the chrome floats over it the way his does — selected models top left with
 * their slug and prices, the modality filter bottom left, a hint along the bottom — and
 * hovering the globe eases it forward while the filter and hint blur out of the way.
 *
 * On a phone that arrangement fails, in his file as much as here (Zhengqi 2026-09-10:
 * "Compass 在移动端好像不能用了"): the figure is a 318px square the sphere fills edge to
 * edge, and two panels laid over it cover most of the tiles and sit on top of the artwork.
 * So under 640px the figure holds the sphere alone and the same two blocks — Modality
 * first, then Selected models — stack under it in the panel's flow, where they can be read
 * and tapped. The sphere also draws a little smaller there so its tiles clear the edges.
 *
 * His figure sits under a "Click to explore" wash until it is clicked (scroll.html's
 * `.figure--live`), because the sphere zooms on the wheel and would otherwise stop the page
 * scrolling the moment the pointer crossed it. The wash comes back when the pointer leaves
 * the figure or it scrolls mostly out of view, as his does. The globe still rotates on its
 * own and reacts to the pointer underneath; only the wheel and touch gestures wait.
 *
 * Sizing: his iframe renders the sphere at 1.07× the figure's height, so `fit` says so. His
 * tile scale is left alone wherever it gives a tile of 36px or more (desktop, tablet); on
 * the phone his formula leaves a 13px tile, which cannot be what he meant, so `minTilePx`
 * lifts it to 36 there and nowhere else.
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

  // the two blocks of chrome, rendered once over the sphere (desktop) and once under it (phone)
  const selectedList: ReactNode = (
    <>
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
      {selected.length === 0 && (
        <p className={styles.selectedEmpty}>
          {touch ? "Tap any card in the sphere to see its details here." : "Click any card in the sphere to see its details here."}
        </p>
      )}
    </>
  )

  const modalityRows: ReactNode = MODALITY_ORDER.map(key => {
    const on = visible.includes(key)
    return (
      <label key={key} className={`${styles.modalityRow} ${on ? "" : styles.disabled}`}>
        <input type="checkbox" checked={on} onChange={() => toggleModality(key)} />
        <span className={styles.modalityName}>{key}</span>
        <span className={styles.modalityCount}>{MODALITY_COUNTS[key]}</span>
      </label>
    )
  })

  return (
    <>
      <div ref={rootRef} className={`${landing.figure} ${landing.figureSphere}`} onMouseLeave={() => setLive(false)}>
        {/* the scene: globe plus its shield. The panels are siblings above it, so moving onto
            one of them counts as leaving the globe, as in his file */}
        <div className="absolute inset-0" onPointerEnter={mouseOnly(true)} onPointerLeave={mouseOnly(false)}>
          <ModelGlobe
            className="size-full"
            fit={1.07}
            fitCompact={0.92}
            cardScale={1}
            minTilePx={36}
            interactive
            selected={selected}
            onToggle={toggleModel}
            visibleModalities={visible}
            zoomable={live}
            hovered={hovered}
          />
          <button type="button" className={`${styles.shield} ${live ? styles.shieldOff : ""}`} onClick={() => setLive(true)} tabIndex={live ? -1 : 0}>
            <span className={styles.shieldPill}>{touch ? "Tap to explore" : "Click to explore"}</span>
          </button>
        </div>
        <div className={`${styles.ring} ${live ? styles.ringOn : ""}`} aria-hidden="true" />

        {/* ---- desktop chrome, floating over the sphere ---------------------- */}
        <div className={`${styles.selectedPanel} ${styles.overlayOnly}`}>
          <p className={styles.panelLabel}>Selected models</p>
          {selectedList}
        </div>
        <div className={`${styles.modalityPanel} ${styles.overlayOnly} ${hovered ? styles.dim : ""}`}>
          <p className={styles.panelLabel}>Modality</p>
          {modalityRows}
        </div>
        <div className={`${styles.hint} ${hovered ? styles.dim : ""}`}>
          {touch ? "drag to rotate · pinch to zoom · tap a model" : "drag to rotate · scroll to zoom · hover a model"}
        </div>
      </div>

      {/* ---- phone chrome, stacked under the sphere ---------------------------- */}
      <div className={styles.stack}>
        <div>
          <p className={styles.panelLabel}>Modality</p>
          <div className={styles.modalityGrid}>{modalityRows}</div>
        </div>
        <div>
          <p className={styles.panelLabel}>Selected models</p>
          {selectedList}
        </div>
      </div>
    </>
  )
}

export default CompassPanel
