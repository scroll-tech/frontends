import { instrumentSerif } from "../fonts"
import { LEADERBOARD_ROWS, TOTAL_MODELS } from "./leaderboard-data"

/**
 * Phone layout for the Compass API panel — the 1220px table can't scale down to a phone
 * and stay readable, so the same rows are stacked. Presentational only, like the desktop
 * panel: the rows and the catalogue total are figma placeholders, not live data.
 */
const ROWS = LEADERBOARD_ROWS.slice(0, 6)
const SORTS = ["Tokens", "Price", "Latency"]

const ModelLeaderboardCompact = () => (
  <div className="pointer-events-none flex h-full w-full select-none flex-col px-[16px] pb-[52px] pt-[16px]">
    <div className="flex shrink-0 items-center gap-[20px] border-b border-solid border-[#EBE7E3] pb-[10px]">
      {SORTS.map((label, i) => (
        <span
          key={label}
          className={`relative pb-[4px] text-[10px] font-semibold uppercase leading-[12px] tracking-[0.8px] ${i === 0 ? "text-black" : "text-[#B0ACA6]"}`}
        >
          {label}
          {i === 0 && <span className="absolute inset-x-0 -bottom-[2px] h-[2px] rounded-full bg-black" />}
        </span>
      ))}
    </div>

    <div className="min-h-0 flex-1">
      {ROWS.map((row, i) => (
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

    <div className="mt-[12px] flex shrink-0 items-center justify-between">
      <p className="text-[11px] leading-[14px] text-[#B0ACA6]">
        showing {ROWS.length} of {TOTAL_MODELS}
      </p>
      <span className="rounded-[6px] border border-solid border-[#E6E6E6] px-[18px] py-[7px] text-[10px] font-medium uppercase leading-[12px] tracking-[0.8px] text-[#6B6B6B]">
        Load more
      </span>
    </div>
  </div>
)

export default ModelLeaderboardCompact
