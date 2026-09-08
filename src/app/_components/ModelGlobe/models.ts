// Model list + palette ported from Glen's "Compass asset" prototype (Slack, 2026-09-07),
// which replaced the first globe with an interactive one — hence the added `modality`
// (drives the filter) and `open` (badge in the selected list) fields.
// These are DESIGN PLACEHOLDERS — swap for the real Compass catalogue (names + $/1M).
export type Modality = "Text" | "Video" | "Image" | "Audio"

export const MODALITY_ORDER: Modality[] = ["Text", "Video", "Image", "Audio"]

export interface ModelCardData {
  provider: string
  initials: string
  name: string
  inPrice: string
  outPrice: string
  modality: Modality
  open: boolean
}

export const MODELS: ModelCardData[] = [
  { provider: "OpenAI", initials: "O", name: "GPT-5", inPrice: "5.00", outPrice: "15.00", modality: "Text", open: false },
  { provider: "OpenAI", initials: "O", name: "GPT-5 mini", inPrice: "0.60", outPrice: "2.40", modality: "Text", open: false },
  { provider: "OpenAI", initials: "O", name: "o4", inPrice: "10.00", outPrice: "40.00", modality: "Text", open: false },
  { provider: "OpenAI", initials: "O", name: "o4-mini", inPrice: "1.10", outPrice: "4.40", modality: "Text", open: false },
  { provider: "OpenAI", initials: "O", name: "o3", inPrice: "8.00", outPrice: "24.00", modality: "Text", open: false },
  { provider: "OpenAI", initials: "O", name: "GPT-4.5", inPrice: "10.00", outPrice: "30.00", modality: "Text", open: false },
  { provider: "OpenAI", initials: "O", name: "GPT-4.1", inPrice: "3.00", outPrice: "12.00", modality: "Text", open: false },
  { provider: "OpenAI", initials: "O", name: "GPT-4o", inPrice: "2.50", outPrice: "10.00", modality: "Audio", open: false },
  { provider: "Anthropic", initials: "A", name: "Claude Mythos 5.1", inPrice: "15.00", outPrice: "75.00", modality: "Text", open: false },
  { provider: "Anthropic", initials: "A", name: "Claude Opus 5", inPrice: "12.00", outPrice: "60.00", modality: "Text", open: false },
  { provider: "Anthropic", initials: "A", name: "Claude Sonnet 5", inPrice: "3.00", outPrice: "15.00", modality: "Text", open: false },
  { provider: "Anthropic", initials: "A", name: "Claude Fable 5.1", inPrice: "5.00", outPrice: "25.00", modality: "Text", open: false },
  { provider: "Anthropic", initials: "A", name: "Claude Haiku 4.5", inPrice: "0.80", outPrice: "4.00", modality: "Text", open: false },
  { provider: "Google", initials: "G", name: "Gemini 3 Pro", inPrice: "3.50", outPrice: "14.00", modality: "Image", open: false },
  { provider: "Google", initials: "G", name: "Gemini 3 Flash", inPrice: "0.20", outPrice: "0.80", modality: "Text", open: false },
  { provider: "Google", initials: "G", name: "Gemini 2.5 Flash", inPrice: "0.30", outPrice: "1.20", modality: "Text", open: false },
  { provider: "Google", initials: "G", name: "Gemini 2.0 Flash", inPrice: "0.10", outPrice: "0.40", modality: "Text", open: false },
  { provider: "Google", initials: "G", name: "Gemini Nano", inPrice: "0.05", outPrice: "0.20", modality: "Text", open: false },
  { provider: "Meta", initials: "Me", name: "Llama 4 Maverick", inPrice: "0.35", outPrice: "1.40", modality: "Text", open: true },
  { provider: "Meta", initials: "Me", name: "Llama 4 Scout", inPrice: "0.20", outPrice: "0.80", modality: "Text", open: true },
  { provider: "Meta", initials: "Me", name: "Llama 3.3 70B", inPrice: "0.40", outPrice: "1.60", modality: "Text", open: true },
  { provider: "Mistral", initials: "Mi", name: "Mistral Large 2", inPrice: "2.00", outPrice: "6.00", modality: "Text", open: true },
  { provider: "Mistral", initials: "Mi", name: "Mistral Small 3", inPrice: "0.20", outPrice: "0.60", modality: "Text", open: true },
  { provider: "Mistral", initials: "Mi", name: "Codestral", inPrice: "0.30", outPrice: "0.90", modality: "Text", open: true },
  { provider: "Alibaba", initials: "Qw", name: "Qwen 3 235B", inPrice: "0.40", outPrice: "1.60", modality: "Video", open: true },
  { provider: "Alibaba", initials: "Qw", name: "Qwen 2.5 Max", inPrice: "0.30", outPrice: "1.20", modality: "Text", open: true },
  { provider: "xAI", initials: "X", name: "Grok 4", inPrice: "5.00", outPrice: "15.00", modality: "Image", open: false },
  { provider: "xAI", initials: "X", name: "Grok 3 mini", inPrice: "0.30", outPrice: "0.90", modality: "Text", open: false },
  { provider: "Cohere", initials: "Co", name: "Command R+", inPrice: "2.50", outPrice: "10.00", modality: "Text", open: false },
  { provider: "Cohere", initials: "Co", name: "Command R", inPrice: "0.15", outPrice: "0.60", modality: "Text", open: false },
  { provider: "Perplexity", initials: "Pe", name: "Sonar Pro", inPrice: "3.00", outPrice: "15.00", modality: "Audio", open: false },
  { provider: "Perplexity", initials: "Pe", name: "Sonar", inPrice: "1.00", outPrice: "1.00", modality: "Text", open: false },
  { provider: "DeepSeek", initials: "De", name: "DeepSeek V3", inPrice: "0.27", outPrice: "1.10", modality: "Text", open: true },
  { provider: "DeepSeek", initials: "De", name: "DeepSeek R1", inPrice: "0.55", outPrice: "2.19", modality: "Text", open: true },
  { provider: "Amazon", initials: "Az", name: "Nova Pro", inPrice: "0.80", outPrice: "3.20", modality: "Text", open: false },
  { provider: "Amazon", initials: "Az", name: "Nova Micro", inPrice: "0.035", outPrice: "0.14", modality: "Text", open: false },
  { provider: "Microsoft", initials: "Ms", name: "Phi-4", inPrice: "0.10", outPrice: "0.40", modality: "Text", open: true },
  { provider: "AI21", initials: "21", name: "Jamba 1.6 Large", inPrice: "2.00", outPrice: "8.00", modality: "Text", open: true },
  { provider: "Databricks", initials: "Db", name: "DBRX", inPrice: "0.75", outPrice: "2.25", modality: "Text", open: true },
  { provider: "01.AI", initials: "01", name: "Yi-Large", inPrice: "0.60", outPrice: "2.40", modality: "Text", open: true },
  { provider: "Google", initials: "G", name: "Gemini 3 Ultra", inPrice: "7.00", outPrice: "28.00", modality: "Video", open: false },
]

export const PROVIDER_COLORS: Record<string, string> = {
  OpenAI: "#10b981",
  Anthropic: "#d97757",
  Google: "#4285f4",
  Meta: "#7c3aed",
  Mistral: "#f59e0b",
  Alibaba: "#ec4899",
  xAI: "#6b7280",
  Cohere: "#06b6d4",
  Perplexity: "#14b8a6",
  DeepSeek: "#ef4444",
  Amazon: "#f97316",
  Microsoft: "#0ea5e9",
  AI21: "#a855f7",
  Databricks: "#dc2626",
  "01.AI": "#65a30d",
}

export const providerColor = (provider: string) => PROVIDER_COLORS[provider] ?? "#111111"

/** slug shown under a model in the selected list */
export const modelSlug = (m: ModelCardData) =>
  `${m.provider.toLowerCase().replace(/[^a-z0-9]+/g, "-")}/${m.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`

/**
 * What actually goes on the sphere.
 *
 * All 41 wouldn't read: a card has to be enough bigger for its name to clear ~12px on
 * screen, and a sphere's surface is fixed, so at that size 41 of them pile onto each other.
 * 20 lands at roughly the 30% coverage Glen's 41 tiny cards had — the same crowding, legible
 * — once the card box itself is tightened rather than just scaled up (see CARD_H in ./index).
 *
 * Flagships first, one or two per provider, then every non-Text model so all four modality
 * filters still do something. `MODELS` stays the full catalogue.
 */
const FEATURED = [
  "GPT-5",
  "o4",
  "Claude Opus 5",
  "Claude Sonnet 5",
  "Gemini 3 Flash",
  "Gemini 2.5 Flash",
  "Llama 4 Maverick",
  "Llama 3.3 70B",
  "Mistral Large 2",
  "DeepSeek R1",
  "DeepSeek V3",
  "Qwen 2.5 Max",
  "Command R+",
  "Nova Pro",
  // non-Text, so Video / Image / Audio aren't empty checkboxes
  "Gemini 3 Pro",
  "Grok 4",
  "Qwen 3 235B",
  "Gemini 3 Ultra",
  "GPT-4o",
  "Sonar Pro",
]

export const SPHERE_MODELS = FEATURED.map(name => {
  const m = MODELS.find(x => x.name === name)
  if (!m) throw new Error(`FEATURED lists "${name}", which is not in MODELS`)
  return m
})

// counted off the sphere, not the catalogue — a checkbox reading 35 next to 8 visible
// cards is just wrong. The catalogue-size claim belongs in the copy, not here.
export const MODALITY_COUNTS = MODALITY_ORDER.reduce<Record<Modality, number>>(
  (acc, key) => ({ ...acc, [key]: SPHERE_MODELS.filter(m => m.modality === key).length }),
  {} as Record<Modality, number>,
)
