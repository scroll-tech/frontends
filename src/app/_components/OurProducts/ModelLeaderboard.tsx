"use client"

import { useMemo, useState } from "react"

import { instrumentSerif } from "../fonts"
import { CEILING_MAX, CONTEXT_FILTERS, LEADERBOARD_ROWS, MODALITY_FILTERS, type Modality, POLICY_FILTERS, TOTAL_MODELS } from "./leaderboard-data"

type SortKey = "tokens" | "price" | "latency"

const SORTS: { key: SortKey; label: string; caption: string }[] = [
  { key: "tokens", label: "Tokens", caption: "Sorted by tokens routed, last seven days" },
  { key: "price", label: "Price", caption: "Sorted by output price, cheapest first" },
  { key: "latency", label: "Latency", caption: "Sorted by median latency, fastest first" },
]

const PAGE_SIZE = 8

const Checkbox = ({ checked }: { checked: boolean }) => (
  <span
    aria-hidden
    className={`flex size-[14px] shrink-0 items-center justify-center rounded-[3px] border border-solid transition-colors ${
      checked ? "border-black bg-black" : "border-[#DCD8D3] bg-white"
    }`}
  >
    {checked && (
      <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
        <path d="M1 3.4L3.3 5.7L8 1" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )}
  </span>
)

interface FilterRowProps {
  label: string
  count: number
  checked: boolean
  onToggle: () => void
}

const FilterRow = ({ label, count, checked, onToggle }: FilterRowProps) => (
  <button type="button" onClick={onToggle} className="flex w-full items-center gap-[10px] py-[5px] text-left">
    <Checkbox checked={checked} />
    <span className="flex-1 text-[12px] font-medium leading-[16px] text-black">{label}</span>
    <span className="text-[11px] tabular-nums leading-[16px] text-[#B0ACA6]">{count}</span>
  </button>
)

const GroupLabel = ({ children }: { children: string }) => (
  <p className="mb-[8px] text-[9px] font-semibold uppercase leading-[12px] tracking-[0.8px] text-[#B0ACA6]">{children}</p>
)

const ModelLeaderboard = () => {
  const [sort, setSort] = useState<SortKey>("tokens")
  const [modalities, setModalities] = useState<Modality[]>([])
  const [policies, setPolicies] = useState<("unrestricted" | "standard")[]>([])
  const [contexts, setContexts] = useState<("128k" | "1m")[]>([])
  const [ceiling, setCeiling] = useState(CEILING_MAX)
  const [visible, setVisible] = useState(PAGE_SIZE)

  const toggle = <T,>(list: T[], value: T, set: (next: T[]) => void) => set(list.includes(value) ? list.filter(v => v !== value) : [...list, value])

  const rows = useMemo(() => {
    const contextMin = contexts.length ? Math.min(...CONTEXT_FILTERS.filter(c => contexts.includes(c.key)).map(c => c.min)) : 0
    const filtered = LEADERBOARD_ROWS.filter(row => {
      if (modalities.length && !modalities.includes(row.modality)) return false
      if (policies.length) {
        const key = row.unrestricted ? "unrestricted" : "standard"
        if (!policies.includes(key)) return false
      }
      if (contextMin && (row.contextTokens ?? 0) < contextMin) return false
      if (row.outPrice !== null && row.outPrice > ceiling) return false
      return true
    })
    const sorted = [...filtered]
    if (sort === "tokens") sorted.sort((a, b) => b.tokens7d - a.tokens7d)
    if (sort === "price") sorted.sort((a, b) => (a.outPrice ?? Infinity) - (b.outPrice ?? Infinity))
    if (sort === "latency") sorted.sort((a, b) => a.latencyMs - b.latencyMs)
    return sorted
  }, [sort, modalities, policies, contexts, ceiling])

  const shown = rows.slice(0, visible)
  const maxTokens = Math.max(...LEADERBOARD_ROWS.map(r => r.tokens7d))
  const caption = SORTS.find(s => s.key === sort)!.caption

  return (
    <div className="flex size-full overflow-hidden rounded-[12px] border border-solid border-[#EDEDED] bg-white">
      {/* ---- filters ---------------------------------------------------- */}
      <aside className="w-[240px] shrink-0 border-r border-solid border-[#EBE7E3] px-[24px] py-[32px]">
        <GroupLabel>Modality</GroupLabel>
        {MODALITY_FILTERS.map(f => (
          <FilterRow
            key={f.key}
            label={f.label}
            count={f.count}
            checked={modalities.includes(f.key)}
            onToggle={() => toggle(modalities, f.key, setModalities)}
          />
        ))}

        <div className="h-[28px]" />
        <GroupLabel>Policy</GroupLabel>
        {POLICY_FILTERS.map(f => (
          <FilterRow
            key={f.key}
            label={f.label}
            count={f.count}
            checked={policies.includes(f.key)}
            onToggle={() => toggle(policies, f.key, setPolicies)}
          />
        ))}

        <div className="h-[28px]" />
        <GroupLabel>Context</GroupLabel>
        {CONTEXT_FILTERS.map(f => (
          <FilterRow
            key={f.key}
            label={f.label}
            count={f.count}
            checked={contexts.includes(f.key)}
            onToggle={() => toggle(contexts, f.key, setContexts)}
          />
        ))}

        <div className="h-[28px]" />
        <GroupLabel>Ceiling, $ / 1M out</GroupLabel>
        <input
          type="range"
          min={0}
          max={CEILING_MAX}
          step={0.1}
          value={ceiling}
          aria-label="Maximum output price per 1M tokens"
          onChange={e => setCeiling(Number(e.target.value))}
          className="h-[4px] w-full cursor-pointer appearance-none rounded-full bg-[#E7E1DA] accent-black outline-none [&::-webkit-slider-thumb]:size-[12px] [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-black"
          style={{ background: `linear-gradient(to right, #000 ${(ceiling / CEILING_MAX) * 100}%, #E7E1DA ${(ceiling / CEILING_MAX) * 100}%)` }}
        />
        <div className="mt-[12px] flex items-center justify-between text-[11px] tabular-nums leading-[14px] text-[#B0ACA6]">
          <span>$0.00</span>
          <span>-</span>
          <span>${ceiling.toFixed(2)}</span>
        </div>
      </aside>

      {/* ---- table ------------------------------------------------------ */}
      <div className="flex min-w-0 flex-1 flex-col px-[32px] py-[32px]">
        <div className="flex h-[20px] items-center justify-between">
          <p className="text-[12px] leading-[16px] text-[#8C8C8C]">{caption}</p>
          <div className="flex items-center gap-[24px]">
            {SORTS.map(s => (
              <button
                key={s.key}
                type="button"
                onClick={() => setSort(s.key)}
                className={`relative pb-[4px] text-[10px] font-semibold uppercase leading-[12px] tracking-[0.8px] transition-colors ${
                  sort === s.key ? "text-black" : "text-[#B0ACA6] hover:text-[#6B6B6B]"
                }`}
              >
                {s.label}
                {sort === s.key && <span className="absolute inset-x-0 -bottom-[2px] h-[2px] rounded-full bg-black" />}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-[20px] grid grid-cols-[44px_minmax(0,1fr)_112px_124px_104px_92px_56px] items-center gap-x-[8px] border-b border-solid border-[#EBE7E3] pb-[8px] text-[9px] font-medium uppercase leading-[12px] tracking-[0.6px] text-[#B0ACA6]">
          <span>№</span>
          <span>Model</span>
          <span>In / 1M</span>
          <span>Out / 1M</span>
          <span className="text-right">Context</span>
          <span />
          <span className="text-right">Tokens 7D</span>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto">
          {shown.map((row, i) => (
            <div
              key={row.slug}
              className="grid h-[65px] grid-cols-[44px_minmax(0,1fr)_112px_124px_104px_92px_56px] items-center gap-x-[8px] border-b border-solid border-[#F2F0ED]"
            >
              <span className="text-[11px] tabular-nums text-[#C4C0BB]">{String(i + 1).padStart(2, "0")}</span>
              <div className="flex min-w-0 items-center gap-[12px]">
                <span className="size-[12px] shrink-0 rounded-full" style={{ backgroundColor: row.dot }} />
                <div className="min-w-0">
                  <div className="flex items-center gap-[8px]">
                    <span className={`${instrumentSerif.className} truncate text-[15px] leading-[18px] text-black`}>{row.name}</span>
                    <span className="shrink-0 rounded-[4px] border border-solid border-[#DCD8D3] px-[5px] py-[1px] text-[8px] font-medium uppercase leading-[11px] tracking-[0.4px] text-[#8C8C8C]">
                      {row.badge}
                    </span>
                  </div>
                  <span className="block truncate text-[11px] leading-[15px] text-[#B0ACA6]">{row.slug}</span>
                </div>
              </div>
              <span className="text-[13px] font-semibold tabular-nums text-black">{row.inLabel}</span>
              <span className="text-[13px] font-semibold tabular-nums text-black">{row.outLabel}</span>
              <span className="text-right text-[12px] tabular-nums text-[#B0ACA6]">{row.contextLabel}</span>
              <span className="block h-[3px] w-full rounded-full bg-[#E7E1DA]">
                <span className="block h-full rounded-full bg-black" style={{ width: `${Math.max(6, (row.tokens7d / maxTokens) * 100)}%` }} />
              </span>
              <span className="text-right text-[13px] font-semibold tabular-nums text-black">{row.tokens7d}B</span>
            </div>
          ))}
          {!shown.length && <p className="py-[40px] text-center text-[12px] text-[#B0ACA6]">No models match these filters.</p>}
        </div>

        <div className="mt-[16px] flex h-[32px] shrink-0 items-center justify-between">
          <p className="text-[11px] leading-[14px] text-[#B0ACA6]">
            showing {shown.length} of {TOTAL_MODELS}
          </p>
          <button
            type="button"
            disabled={visible >= rows.length}
            onClick={() => setVisible(v => v + PAGE_SIZE)}
            className="rounded-[6px] border border-solid border-[#E6E6E6] px-[24px] py-[8px] text-[10px] font-medium uppercase leading-[12px] tracking-[0.8px] text-[#6B6B6B] transition-colors hover:border-[#C4C0BB] hover:text-black disabled:cursor-not-allowed disabled:opacity-40"
          >
            Load more
          </button>
        </div>
      </div>
    </div>
  )
}

export default ModelLeaderboard
