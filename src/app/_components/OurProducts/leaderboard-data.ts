// Rows 01–08 are transcribed from the SCROLL/Compass API frame in DESIGN-CONTENT;
// rows 09–16 reuse Glen's own model/pricing list from the globe prototype so LOAD MORE
// has something to reveal. All of it is DESIGN PLACEHOLDER DATA — replace with the live
// Compass catalogue before launch.
export type Modality = "text" | "video" | "image" | "audio"

export interface LeaderboardRow {
  name: string
  slug: string
  badge: string
  dot: string
  /** display strings keep the design's exact formatting ("—", "$0.03 / img") */
  inLabel: string
  outLabel: string
  inPrice: number | null
  outPrice: number | null
  contextLabel: string
  contextTokens: number | null
  tokens7d: number
  latencyMs: number
  modality: Modality
  unrestricted: boolean
}

export const CEILING_MAX = 9.2

export const LEADERBOARD_ROWS: LeaderboardRow[] = [
  // prettier-ignore
  { name: "Llama 4 405B Instruct", slug: "meta/llama-4-405b-instruct", badge: "Open", dot: "#7F8FE7", inLabel: "$0.90", outLabel: "$2.70", inPrice: 0.9, outPrice: 2.7, contextLabel: "256k", contextTokens: 256_000, tokens7d: 18.4, latencyMs: 620, modality: "text", unrestricted: true },
  // prettier-ignore
  { name: "Qwen3 Max", slug: "alibaba/qwen3-max", badge: "1M ctx", dot: "#F79F79", inLabel: "$0.55", outLabel: "$2.20", inPrice: 0.55, outPrice: 2.2, contextLabel: "1M", contextTokens: 1_000_000, tokens7d: 11.2, latencyMs: 780, modality: "text", unrestricted: false },
  // prettier-ignore
  { name: "DeepSeek V4 Chat", slug: "deepseek/v4-chat", badge: "Open", dot: "#548CFF", inLabel: "$0.24", outLabel: "$0.98", inPrice: 0.24, outPrice: 0.98, contextLabel: "164k", contextTokens: 164_000, tokens7d: 9.7, latencyMs: 540, modality: "text", unrestricted: true },
  // prettier-ignore
  { name: "Uncensored 70B v2", slug: "community/unc-70b-v2", badge: "No filter", dot: "#C85C5C", inLabel: "$0.18", outLabel: "$0.82", inPrice: 0.18, outPrice: 0.82, contextLabel: "128k", contextTokens: 128_000, tokens7d: 6.1, latencyMs: 430, modality: "text", unrestricted: true },
  // prettier-ignore
  { name: "Mistral Large 3", slug: "mistral/large-3", badge: "Hosted", dot: "#FBB454", inLabel: "$1.80", outLabel: "$5.40", inPrice: 1.8, outPrice: 5.4, contextLabel: "128k", contextTokens: 128_000, tokens7d: 4.3, latencyMs: 660, modality: "text", unrestricted: false },
  // prettier-ignore
  { name: "Gemma 3 27B", slug: "google/gemma-3-27b", badge: "Cheapest", dot: "#59C197", inLabel: "$0.04", outLabel: "$0.11", inPrice: 0.04, outPrice: 0.11, contextLabel: "128k", contextTokens: 128_000, tokens7d: 3.8, latencyMs: 310, modality: "text", unrestricted: false },
  // prettier-ignore
  { name: "Kimi K2 Thinking", slug: "moonshot/kimi-k2-thinking", badge: "Reasoning", dot: "#9973F5", inLabel: "$0.60", outLabel: "$2.50", inPrice: 0.6, outPrice: 2.5, contextLabel: "256k", contextTokens: 256_000, tokens7d: 2.9, latencyMs: 1_240, modality: "text", unrestricted: false },
  // prettier-ignore
  { name: "Flux 2 Pro", slug: "bfl/flux-2-pro", badge: "Image", dot: "#E86F9A", inLabel: "—", outLabel: "$0.03 / img", inPrice: null, outPrice: 0.03, contextLabel: "—", contextTokens: null, tokens7d: 1.4, latencyMs: 2_100, modality: "image", unrestricted: false },
  // prettier-ignore
  { name: "Grok 4", slug: "xai/grok-4", badge: "Hosted", dot: "#6B7280", inLabel: "$5.00", outLabel: "$15.00", inPrice: 5, outPrice: 15, contextLabel: "256k", contextTokens: 256_000, tokens7d: 1.1, latencyMs: 700, modality: "text", unrestricted: false },
  // prettier-ignore
  { name: "Claude Sonnet 5", slug: "anthropic/claude-sonnet-5", badge: "Hosted", dot: "#D97757", inLabel: "$3.00", outLabel: "$15.00", inPrice: 3, outPrice: 15, contextLabel: "1M", contextTokens: 1_000_000, tokens7d: 0.9, latencyMs: 590, modality: "text", unrestricted: false },
  // prettier-ignore
  { name: "GPT-5 mini", slug: "openai/gpt-5-mini", badge: "Hosted", dot: "#10B981", inLabel: "$0.60", outLabel: "$2.40", inPrice: 0.6, outPrice: 2.4, contextLabel: "400k", contextTokens: 400_000, tokens7d: 0.8, latencyMs: 380, modality: "text", unrestricted: false },
  // prettier-ignore
  { name: "Nova Pro", slug: "amazon/nova-pro", badge: "Hosted", dot: "#F97316", inLabel: "$0.80", outLabel: "$3.20", inPrice: 0.8, outPrice: 3.2, contextLabel: "300k", contextTokens: 300_000, tokens7d: 0.6, latencyMs: 520, modality: "text", unrestricted: false },
  // prettier-ignore
  { name: "Command R+", slug: "cohere/command-r-plus", badge: "Hosted", dot: "#06B6D4", inLabel: "$2.50", outLabel: "$10.00", inPrice: 2.5, outPrice: 10, contextLabel: "128k", contextTokens: 128_000, tokens7d: 0.5, latencyMs: 640, modality: "text", unrestricted: false },
  // prettier-ignore
  { name: "Sonar Pro", slug: "perplexity/sonar-pro", badge: "Search", dot: "#14B8A6", inLabel: "$3.00", outLabel: "$15.00", inPrice: 3, outPrice: 15, contextLabel: "200k", contextTokens: 200_000, tokens7d: 0.4, latencyMs: 1_500, modality: "text", unrestricted: false },
  // prettier-ignore
  { name: "Codestral", slug: "mistral/codestral", badge: "Code", dot: "#F59E0B", inLabel: "$0.30", outLabel: "$0.90", inPrice: 0.3, outPrice: 0.9, contextLabel: "256k", contextTokens: 256_000, tokens7d: 0.3, latencyMs: 290, modality: "text", unrestricted: false },
  // prettier-ignore
  { name: "Phi-4", slug: "microsoft/phi-4", badge: "Cheapest", dot: "#0EA5E9", inLabel: "$0.10", outLabel: "$0.40", inPrice: 0.1, outPrice: 0.4, contextLabel: "16k", contextTokens: 16_000, tokens7d: 0.2, latencyMs: 210, modality: "text", unrestricted: false },
]

// Counts shown in the sidebar are the catalogue-wide figures from the design, not the
// length of the sample above.
export const MODALITY_FILTERS: { key: Modality; label: string; count: number }[] = [
  { key: "text", label: "Text", count: 284 },
  { key: "video", label: "Video", count: 96 },
  { key: "image", label: "Image", count: 31 },
  { key: "audio", label: "Audio", count: 12 },
]

export const POLICY_FILTERS: { key: "unrestricted" | "standard"; label: string; count: number }[] = [
  { key: "unrestricted", label: "Unrestricted", count: 48 },
  { key: "standard", label: "Standard safety", count: 264 },
]

export const CONTEXT_FILTERS: { key: "128k" | "1m"; label: string; count: number; min: number }[] = [
  { key: "128k", label: "128k and up", count: 141, min: 128_000 },
  { key: "1m", label: "1M and up", count: 9, min: 1_000_000 },
]

export const TOTAL_MODELS = 312
