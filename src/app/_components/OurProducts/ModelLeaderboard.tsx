import { instrumentSerif } from "../fonts"
import { CEILING_MAX, CONTEXT_FILTERS, LEADERBOARD_ROWS, MODALITY_FILTERS, POLICY_FILTERS, TOTAL_MODELS } from "./leaderboard-data"

/**
 * PRESENTATIONAL ONLY. Everything in this panel — the 312 catalogue total, the sidebar
 * counts, the eight rows and their prices — is transcribed from the Compass API frame in
 * the figma. None of it is wired to Compass, so the controls are drawn as static art
 * rather than working inputs: sorting or filtering placeholder rows would just be
 * theatre. Make them real when the panel is fed by the live catalogue.
 */

// checked states as the design draws them
const CHECKED = new Set(["text", "unrestricted", "1m"])
// slider thumb position in the design, ~58% of the track
const CEILING_THUMB = 0.58

const ROWS = LEADERBOARD_ROWS.slice(0, 8)
const MAX_TOKENS = Math.max(...ROWS.map(r => r.tokens7d))

const SORTS = ["Tokens", "Price", "Latency"]

const Checkbox = ({ checked }: { checked: boolean }) => (
  <span
    className={`flex size-[14px] shrink-0 items-center justify-center rounded-[3px] border border-solid ${
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

const FilterRow = ({ label, count, checked }: { label: string; count: number; checked: boolean }) => (
  <div className="flex w-full items-center gap-[10px] py-[5px]">
    <Checkbox checked={checked} />
    <span className="flex-1 text-[12px] font-medium leading-[16px] text-black">{label}</span>
    <span className="text-[11px] tabular-nums leading-[16px] text-[#B0ACA6]">{count}</span>
  </div>
)

const GroupLabel = ({ children }: { children: string }) => (
  <p className="mb-[8px] text-[9px] font-semibold uppercase leading-[12px] tracking-[0.8px] text-[#B0ACA6]">{children}</p>
)

const ModelLeaderboard = () => (
  <div className="pointer-events-none flex size-full select-none overflow-hidden rounded-[12px] border border-solid border-[#E6E6E6] bg-white shadow-[0_2px_12px_rgba(17,17,17,0.06)]">
    {/* ---- filters ------------------------------------------------------ */}
    <aside className="w-[240px] shrink-0 border-r border-solid border-[#EBE7E3] px-[24px] py-[32px]">
      <GroupLabel>Modality</GroupLabel>
      {MODALITY_FILTERS.map(f => (
        <FilterRow key={f.key} label={f.label} count={f.count} checked={CHECKED.has(f.key)} />
      ))}

      <div className="h-[28px]" />
      <GroupLabel>Policy</GroupLabel>
      {POLICY_FILTERS.map(f => (
        <FilterRow key={f.key} label={f.label} count={f.count} checked={CHECKED.has(f.key)} />
      ))}

      <div className="h-[28px]" />
      <GroupLabel>Context</GroupLabel>
      {CONTEXT_FILTERS.map(f => (
        <FilterRow key={f.key} label={f.label} count={f.count} checked={CHECKED.has(f.key)} />
      ))}

      <div className="h-[28px]" />
      <GroupLabel>Ceiling, $ / 1M out</GroupLabel>
      <div className="relative h-[4px] w-full rounded-full bg-[#E7E1DA]">
        <span className="absolute inset-y-0 left-0 rounded-full bg-black" style={{ width: `${CEILING_THUMB * 100}%` }} />
        <span
          className="absolute top-1/2 size-[12px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-black"
          style={{ left: `${CEILING_THUMB * 100}%` }}
        />
      </div>
      <div className="mt-[12px] flex items-center justify-between text-[11px] tabular-nums leading-[14px] text-[#B0ACA6]">
        <span>$0.00</span>
        <span>-</span>
        <span>${CEILING_MAX.toFixed(2)}</span>
      </div>
    </aside>

    {/* ---- table -------------------------------------------------------- */}
    <div className="flex min-w-0 flex-1 flex-col px-[32px] py-[32px]">
      <div className="flex h-[20px] items-center justify-between">
        <p className="text-[12px] leading-[16px] text-[#8C8C8C]">Sorted by tokens routed, last seven days</p>
        <div className="flex items-center gap-[24px]">
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

      <div className="min-h-0 flex-1">
        {ROWS.map((row, i) => (
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
              <span className="block h-full rounded-full bg-black" style={{ width: `${Math.max(6, (row.tokens7d / MAX_TOKENS) * 100)}%` }} />
            </span>
            <span className="text-right text-[13px] font-semibold tabular-nums text-black">{row.tokens7d}B</span>
          </div>
        ))}
      </div>

      <div className="mt-[16px] flex h-[32px] shrink-0 items-center justify-between">
        <p className="text-[11px] leading-[14px] text-[#B0ACA6]">
          showing {ROWS.length} of {TOTAL_MODELS}
        </p>
        <span className="rounded-[6px] border border-solid border-[#E6E6E6] px-[24px] py-[8px] text-[10px] font-medium uppercase leading-[12px] tracking-[0.8px] text-[#6B6B6B]">
          Load more
        </span>
      </div>
    </div>
  </div>
)

export default ModelLeaderboard
