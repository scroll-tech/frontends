"use client"

import { useMemo, useState } from "react"

import { instrumentSerif } from "../fonts"
import { LEADERBOARD_ROWS, TOTAL_MODELS } from "./leaderboard-data"

type SortKey = "tokens" | "price" | "latency"

const SORTS: { key: SortKey; label: string }[] = [
  { key: "tokens", label: "Tokens" },
  { key: "price", label: "Price" },
  { key: "latency", label: "Latency" },
]

const PAGE_SIZE = 6

/**
 * Phone layout for the Compass API panel. The 1220px table can't scale down to a phone
 * and still be readable, so the same rows are stacked instead; the sidebar filters are a
 * desktop affordance and drop away here.
 */
const ModelLeaderboardCompact = () => {
  const [sort, setSort] = useState<SortKey>("tokens")
  const [visible, setVisible] = useState(PAGE_SIZE)

  const rows = useMemo(() => {
    const sorted = [...LEADERBOARD_ROWS]
    if (sort === "tokens") sorted.sort((a, b) => b.tokens7d - a.tokens7d)
    if (sort === "price") sorted.sort((a, b) => (a.outPrice ?? Infinity) - (b.outPrice ?? Infinity))
    if (sort === "latency") sorted.sort((a, b) => a.latencyMs - b.latencyMs)
    return sorted
  }, [sort])

  const shown = rows.slice(0, visible)

  return (
    <div className="flex w-full flex-col px-[16px] pb-[64px] pt-[16px]">
      <div className="flex items-center gap-[20px] border-b border-solid border-[#EBE7E3] pb-[10px]">
        {SORTS.map(s => (
          <button
            key={s.key}
            type="button"
            onClick={() => setSort(s.key)}
            className={`relative pb-[4px] text-[10px] font-semibold uppercase leading-[12px] tracking-[0.8px] transition-colors ${
              sort === s.key ? "text-black" : "text-[#B0ACA6]"
            }`}
          >
            {s.label}
            {sort === s.key && <span className="absolute inset-x-0 -bottom-[2px] h-[2px] rounded-full bg-black" />}
          </button>
        ))}
      </div>

      <div className="flex flex-col">
        {shown.map((row, i) => (
          <div key={row.slug} className="flex items-center gap-[10px] border-b border-solid border-[#F2F0ED] py-[12px]">
            <span className="w-[18px] shrink-0 text-[11px] tabular-nums text-[#C4C0BB]">{String(i + 1).padStart(2, "0")}</span>
            <span className="size-[10px] shrink-0 rounded-full" style={{ backgroundColor: row.dot }} />
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-[6px]">
                <span className={`${instrumentSerif.className} truncate text-[15px] leading-[18px] text-black`}>{row.name}</span>
                <span className="shrink-0 rounded-[4px] border border-solid border-[#DCD8D3] px-[4px] text-[8px] font-medium uppercase leading-[13px] tracking-[0.4px] text-[#8C8C8C]">
                  {row.badge}
                </span>
              </div>
              <span className="block truncate text-[11px] leading-[15px] text-[#B0ACA6]">{row.slug}</span>
            </div>
            <div className="shrink-0 text-right">
              <span className="block text-[13px] font-semibold tabular-nums leading-[16px] text-black">{row.outLabel}</span>
              <span className="block text-[10px] tabular-nums leading-[14px] text-[#B0ACA6]">
                {row.tokens7d}B · {row.contextLabel}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-[16px] flex items-center justify-between">
        <p className="text-[11px] leading-[14px] text-[#B0ACA6]">
          showing {shown.length} of {TOTAL_MODELS}
        </p>
        <button
          type="button"
          disabled={visible >= rows.length}
          onClick={() => setVisible(v => v + PAGE_SIZE)}
          className="rounded-[6px] border border-solid border-[#E6E6E6] px-[18px] py-[7px] text-[10px] font-medium uppercase leading-[12px] tracking-[0.8px] text-[#6B6B6B] disabled:opacity-40"
        >
          Load more
        </button>
      </div>
    </div>
  )
}

export default ModelLeaderboardCompact
