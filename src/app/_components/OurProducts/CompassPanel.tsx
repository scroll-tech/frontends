"use client"

import { useEffect, useState } from "react"

import ModelGlobe from "../ModelGlobe/lazy"
import { MODALITY_COUNTS, MODALITY_ORDER, MODELS, type Modality, modelSlug, providerColor } from "../ModelGlobe/models"

/**
 * Compass panel — the interactive globe from Glen's second "Compass asset" prototype
 * (Slack, 2026-09-07): click a card to pin it to the list on the left, tick the
 * modalities at the bottom to filter what's on the sphere.
 */
// Glen's prototype has no cap — his panel is a full window tall and fits ~8. Ours lives
// in a 572px card that shows 3, and a list that silently clips is worse than a limit, so
// picking a fourth drops the oldest.
// how many fit, so it follows the layout: a column of 3 beside the globe on desktop,
// a row of 2 across the top on a phone, where a 3-tall column ate 40% of the card
const MAX_DESKTOP = 3
const MAX_COMPACT = 2

const CompassPanel = () => {
  // click order is what the list shows, so an array rather than a Set
  const [selected, setSelected] = useState<number[]>([])
  const [visible, setVisible] = useState<Modality[]>(MODALITY_ORDER)
  const [maxSelected, setMaxSelected] = useState(MAX_DESKTOP)

  // md is 900px in this project
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 900px)")
    const sync = () => setMaxSelected(mq.matches ? MAX_DESKTOP : MAX_COMPACT)
    sync()
    mq.addEventListener("change", sync)
    return () => mq.removeEventListener("change", sync)
  }, [])

  // shrinking the window past the breakpoint shouldn't leave a hidden third row
  useEffect(() => setSelected(prev => prev.slice(-maxSelected)), [maxSelected])

  const toggleModel = (index: number) =>
    setSelected(prev => {
      if (prev.includes(index)) return prev.filter(i => i !== index)
      return [...prev, index].slice(-maxSelected)
    })

  const toggleModality = (key: Modality) =>
    setVisible(prev => {
      const next = prev.includes(key) ? prev.filter(m => m !== key) : [...prev, key]
      // a card that just got filtered out shouldn't stay pinned in the list
      setSelected(sel => sel.filter(i => next.includes(MODELS[i].modality)))
      return next
    })

  return (
    <div className="relative size-full">
      <ModelGlobe className="size-full" fit={0.68} interactive selected={selected} onToggle={toggleModel} visibleModalities={visible} />

      {/* ---- selected models ---------------------------------------------- */}
      <div className="absolute inset-x-[16px] top-[16px] flex flex-col md:inset-x-auto md:left-[32px] md:top-[32px] md:max-h-[64%] md:w-[38%] md:max-w-[230px] md:overflow-y-auto">
        <p className="mb-[10px] shrink-0 text-[9.5px] font-bold uppercase leading-[13px] tracking-[1px] text-[rgba(17,17,17,0.4)] md:text-[11px]">
          Selected models
        </p>

        {selected.length === 0 ? (
          <p className="text-[12.5px] leading-[1.5] text-[rgba(17,17,17,0.35)]">Click any card in the sphere to see its details here.</p>
        ) : (
          <div className="grid grid-cols-2 gap-x-[12px] md:flex md:flex-col">
            {selected.map(index => {
              const model = MODELS[index]
              return (
                <div
                  key={model.name}
                  className="md:border-b md:border-solid md:border-[rgba(17,17,17,0.09)] md:pb-[12px] md:not-last:mb-[12px] md:last:border-none"
                >
                  <div className="flex items-center gap-[8px]">
                    <span className="size-[9px] shrink-0 rounded-full" style={{ backgroundColor: providerColor(model.provider) }} />
                    <span className="min-w-0 flex-1 truncate text-[13px] font-semibold text-[#111] md:text-[16px]">{model.name}</span>
                    {model.open && (
                      <span className="shrink-0 rounded-[5px] border border-solid border-[rgba(17,17,17,0.22)] px-[5px] py-[1px] text-[8.5px] font-bold tracking-[0.3px] text-[rgba(17,17,17,0.55)] md:px-[6px] md:py-[2px] md:text-[9.5px]">
                        OPEN
                      </span>
                    )}
                    <button
                      type="button"
                      onClick={() => toggleModel(index)}
                      aria-label={`Remove ${model.name}`}
                      className="shrink-0 px-[2px] text-[17px] leading-none text-[rgba(17,17,17,0.32)] transition-transform hover:rotate-90 hover:scale-125 hover:text-[#111]"
                    >
                      ×
                    </button>
                  </div>
                  <p className="ml-[15px] mt-[3px] truncate font-mono text-[10px] text-[rgba(17,17,17,0.38)] md:ml-[17px] md:text-[12px]">
                    {modelSlug(model)}
                  </p>
                  <div className="ml-[15px] mt-[7px] flex gap-[14px] md:ml-[17px] md:mt-[9px] md:gap-[18px]">
                    <div className="flex flex-col gap-[1px]">
                      <span className="text-[9px] tracking-[0.3px] text-[rgba(17,17,17,0.55)]">IN / 1M</span>
                      <span className="text-[11.5px] font-medium tabular-nums text-[#111]">${model.inPrice}</span>
                    </div>
                    <div className="flex flex-col gap-[1px]">
                      <span className="text-[9px] tracking-[0.3px] text-[rgba(17,17,17,0.55)]">OUT / 1M</span>
                      <span className="text-[11.5px] font-medium tabular-nums text-[#111]">${model.outPrice}</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* ---- modality filter ---------------------------------------------- */}
      <div className="absolute bottom-[24px] left-[24px] flex w-[44%] max-w-[190px] flex-col gap-[11px] md:bottom-[32px] md:left-[32px] md:w-[34%]">
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
