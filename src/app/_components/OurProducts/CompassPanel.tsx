"use client"

import { useState } from "react"

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
const MAX_SELECTED = 3

const CompassPanel = () => {
  // click order is what the list shows, so an array rather than a Set
  const [selected, setSelected] = useState<number[]>([])
  const [visible, setVisible] = useState<Modality[]>(MODALITY_ORDER)

  const toggleModel = (index: number) =>
    setSelected(prev => {
      if (prev.includes(index)) return prev.filter(i => i !== index)
      return [...prev, index].slice(-MAX_SELECTED)
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
      <div className="absolute left-[24px] top-[24px] flex max-h-[64%] w-[58%] max-w-[230px] flex-col overflow-y-auto md:left-[32px] md:top-[32px] md:w-[38%]">
        <p className="mb-[10px] shrink-0 text-[11px] font-bold uppercase leading-[13px] tracking-[1px] text-[rgba(17,17,17,0.4)]">Selected models</p>

        {selected.length === 0 ? (
          <p className="text-[12.5px] leading-[1.5] text-[rgba(17,17,17,0.35)]">Click any card in the sphere to see its details here.</p>
        ) : (
          <div className="flex flex-col">
            {selected.map(index => {
              const model = MODELS[index]
              return (
                <div key={model.name} className="border-b border-solid border-[rgba(17,17,17,0.09)] pb-[12px] not-last:mb-[12px] last:border-none">
                  <div className="flex items-center gap-[8px]">
                    <span className="size-[9px] shrink-0 rounded-full" style={{ backgroundColor: providerColor(model.provider) }} />
                    <span className="min-w-0 flex-1 truncate text-[16px] font-semibold text-[#111]">{model.name}</span>
                    {model.open && (
                      <span className="shrink-0 rounded-[5px] border border-solid border-[rgba(17,17,17,0.22)] px-[6px] py-[2px] text-[9.5px] font-bold tracking-[0.3px] text-[rgba(17,17,17,0.55)]">
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
                  <p className="ml-[17px] mt-[3px] truncate font-mono text-[12px] text-[rgba(17,17,17,0.38)]">{modelSlug(model)}</p>
                  <div className="ml-[17px] mt-[9px] flex gap-[18px]">
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
        <p className="text-[11px] font-bold uppercase leading-[13px] tracking-[1px] text-[rgba(17,17,17,0.4)]">Modality</p>
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
              <span className="flex-1 text-[14px] text-[#111]">{key}</span>
              <span className="text-[13px] tabular-nums text-[rgba(17,17,17,0.4)]">{MODALITY_COUNTS[key]}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default CompassPanel
