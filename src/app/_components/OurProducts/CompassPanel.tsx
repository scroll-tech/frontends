"use client"

import { useEffect, useState } from "react"

import ModelGlobe from "../ModelGlobe/lazy"
import { MODALITY_COUNTS, MODALITY_ORDER, type Modality, SPHERE_MODELS, modelSlug, providerColor } from "../ModelGlobe/models"

/**
 * Compass panel — the interactive globe from Glen's "Compass asset" prototype (Slack,
 * 2026-09-07): click a card to pin it, tick the modalities to filter what's on the sphere.
 *
 * The 2026-09-08 frame (DESIGN-CONTENT 591:20506) drops the boxed list that used to hold
 * the pinned models and floats each one straight on the card instead — a provider dot,
 * the name with its badge, the slug underneath — parked in three fixed slots around the
 * globe. Slot coordinates below are that frame's, as a fraction of its 886 x 572 card.
 */
const DESKTOP_SLOTS = [
  { left: "7.2%", top: "12.4%" }, // 64 / 71
  { left: "71.4%", top: "11.4%" }, // 633 / 65
  { left: "71.7%", top: "64.9%" }, // 635 / 371
]

// Glen's prototype has no cap — his panel is a full window tall and fits ~8. Ours has
// three slots on the card, and a pin that silently lands nowhere is worse than a limit,
// so picking a fourth drops the oldest. The phone frame draws one row; two still read
// cleanly stacked at the top, which is the count settled on earlier.
const MAX_DESKTOP = DESKTOP_SLOTS.length
const MAX_COMPACT = 2

// the phone has no slots to scatter into, so pinned models stack down from the frame's
// single row (594:20828, at 5.5% / 4.7% of its 311 x 550 card)
const compactSlot = (i: number) => ({ left: "5.5%", top: `calc(4.7% + ${i * 46}px)` })

const CompassPanel = () => {
  // click order is what the slots show, so an array rather than a Set
  const [selected, setSelected] = useState<number[]>([])
  const [visible, setVisible] = useState<Modality[]>(MODALITY_ORDER)
  const [isDesktop, setIsDesktop] = useState(true)

  // md is 900px in this project
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 900px)")
    const sync = () => setIsDesktop(mq.matches)
    sync()
    mq.addEventListener("change", sync)
    return () => mq.removeEventListener("change", sync)
  }, [])

  const maxSelected = isDesktop ? MAX_DESKTOP : MAX_COMPACT

  // shrinking the window past the breakpoint shouldn't leave a pin with nowhere to sit
  useEffect(() => setSelected(prev => prev.slice(-maxSelected)), [maxSelected])

  const toggleModel = (index: number) =>
    setSelected(prev => {
      if (prev.includes(index)) return prev.filter(i => i !== index)
      return [...prev, index].slice(-maxSelected)
    })

  const toggleModality = (key: Modality) =>
    setVisible(prev => {
      const next = prev.includes(key) ? prev.filter(m => m !== key) : [...prev, key]
      // a card that just got filtered out shouldn't stay pinned
      setSelected(sel => sel.filter(i => next.includes(SPHERE_MODELS[i].modality)))
      return next
    })

  return (
    <div className="relative size-full">
      {/* Glen's 0.68 / 1.0 drew a front-facing card 70px wide, so its 14px name landed at
          3.9px on screen and the prices at 3.3px — unreadable (Tommy, 2026-09-08). `fit`
          alone can't fix it: it scales the sphere and the cards together, and past ~0.85 the
          sphere reaches under the slots on the right anyway. So most of the gain comes from
          the card being tighter and its type bigger (see CARD_H in ../ModelGlobe), and
          `cardScale` only has to carry the rest — 1.7 keeps the card at ~160px on screen
          instead of the 216px that 2.3 gave, which read as cards wearing the sphere.
          Result: name ~12px, prices ~10px, and the cards cover about the same 30% of their
          share of the sphere that Glen's 41 tiny ones did. */}
      {/* The phone needs its own cardScale, because `compact` reads cardScaleCompact and
          falls back to 1 when it is unset — which is why the desktop fix above skipped the
          phone entirely and left the names at about 1.6px there.

          3.4 is not a look, it is 1.7 / 0.5: computeUiScale already halves everything on a
          panel this narrow, so this cancels that out and nothing more, giving the phone the
          same card-to-sphere ratio the desktop has. Aiming for readable text here instead
          (3.5 with a cropped fitCompact 1.2) put a card at 40% of the panel's width against
          desktop's 18%, and it looked exactly as bad as that sounds.

          Which is the real constraint: on a ~358px panel a card cannot be both in
          proportion and legible. This picks proportion, and the phone reads the model off
          the pinned slot at 14px instead — the design's own answer. */}
      <ModelGlobe
        className="size-full"
        fit={0.82}
        cardScale={1.7}
        cardScaleCompact={3.4}
        interactive
        selected={selected}
        onToggle={toggleModel}
        visibleModalities={visible}
      />

      {/* ---- pinned models, floating in the frame's slots ------------------- */}
      {selected.map((index, i) => {
        const model = SPHERE_MODELS[index]
        return (
          <button
            key={model.name}
            type="button"
            onClick={() => toggleModel(index)}
            title={`Unpin ${model.name}`}
            style={isDesktop ? DESKTOP_SLOTS[i] : compactSlot(i)}
            className="absolute flex max-w-[62%] items-center gap-[12px] text-left transition-opacity hover:opacity-60 md:max-w-[220px]"
          >
            <span className="size-[12px] shrink-0 rounded-full md:size-[16px]" style={{ backgroundColor: providerColor(model.provider) }} />
            <span className="min-w-0">
              <span className="flex items-center gap-[8px]">
                <span className="truncate text-[12px] font-semibold leading-[16px] text-[#111] md:text-[14px] md:leading-[18px]">{model.name}</span>
                <span className="shrink-0 rounded-[4px] border border-solid border-[rgba(17,17,17,0.22)] px-[5px] py-[1px] text-[8px] font-bold uppercase leading-[12px] tracking-[0.3px] text-[rgba(17,17,17,0.55)] md:text-[9px]">
                  {model.open ? "OPEN" : model.modality}
                </span>
              </span>
              <span className="mt-[2px] block truncate font-mono text-[9.5px] leading-[14px] text-[rgba(17,17,17,0.38)] md:text-[11px]">
                {modelSlug(model)}
              </span>
            </span>
          </button>
        )
      })}

      {/* the frame draws no hint, but without one nothing says the sphere is clickable */}
      {selected.length === 0 && (
        <p
          style={isDesktop ? DESKTOP_SLOTS[0] : compactSlot(0)}
          className="absolute max-w-[58%] text-[11.5px] leading-[1.5] text-[rgba(17,17,17,0.35)] md:max-w-[200px] md:text-[12.5px]"
        >
          Click any card in the sphere to pin it here.
        </p>
      )}

      {/* ---- modality filter ---------------------------------------------- */}
      <div className="absolute bottom-[24px] left-[24px] flex w-[44%] max-w-[190px] flex-col gap-[11px] md:bottom-[32px] md:left-[29px] md:w-[34%]">
        <p className="text-[9.5px] font-bold uppercase leading-[13px] tracking-[1px] text-[rgba(17,17,17,0.4)] md:text-[11px]">Modality</p>
        {MODALITY_ORDER.map(key => {
          const on = visible.includes(key)
          return (
            <button
              key={key}
              type="button"
              onClick={() => toggleModality(key)}
              className={`flex items-center gap-[9px] text-left transition-opacity ${on ? "opacity-100" : "opacity-[0.38]"}`}
            >
              <span
                className={`flex size-[13px] shrink-0 items-center justify-center rounded-[3px] border border-solid transition-colors ${
                  on ? "border-black bg-black" : "border-[#B9B9B9] bg-white"
                }`}
              >
                {on && (
                  <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
                    <path d="M1 3.4L3.3 5.7L8 1" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </span>
              <span className="flex-1 text-[12.5px] text-[#111] md:text-[14px]">{key}</span>
              <span className="text-[11.5px] tabular-nums text-[rgba(17,17,17,0.4)] md:text-[13px]">{MODALITY_COUNTS[key]}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default CompassPanel
