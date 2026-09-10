// Model list + palette from Glen's compass-interactive (2).html (2026-09-10), which
// replaces the text cards of his 2026-09-07 "Compass asset" prototype with square logo
// tiles: 16 models, one per provider — "no two from the same brand" — so every tile is a
// different mark. `modality` drives the filter, `open` the badge in the selected list,
// `icon` picks the mark in ./logos.
// These are DESIGN PLACEHOLDERS — swap for the real Compass catalogue (names + $/1M).
export type Modality = "Text" | "Video" | "Image" | "Audio"

export const MODALITY_ORDER: Modality[] = ["Text", "Video", "Image", "Audio"]

export interface ModelCardData {
  provider: string
  /** drawn on the tile if the mark is missing — coloured initials, never a broken image */
  initials: string
  /** lobe-icons slug, the key into LOGO_SVGS */
  icon: string
  name: string
  inPrice: string
  outPrice: string
  modality: Modality
  open: boolean
}

export const MODELS: ModelCardData[] = [
  { provider: "OpenAI", initials: "O", icon: "openai", name: "GPT-5", inPrice: "5.00", outPrice: "15.00", modality: "Text", open: false },
  {
    provider: "Anthropic",
    initials: "A",
    icon: "anthropic",
    name: "Claude Sonnet 5",
    inPrice: "3.00",
    outPrice: "15.00",
    modality: "Text",
    open: false,
  },
  {
    provider: "Google",
    initials: "G",
    icon: "google-color",
    name: "Gemini 3 Pro",
    inPrice: "3.50",
    outPrice: "14.00",
    modality: "Image",
    open: false,
  },
  { provider: "Meta", initials: "Me", icon: "meta-color", name: "Llama 4 Maverick", inPrice: "0.35", outPrice: "1.40", modality: "Text", open: true },
  {
    provider: "Mistral",
    initials: "Mi",
    icon: "mistral-color",
    name: "Mistral Large 2",
    inPrice: "2.00",
    outPrice: "6.00",
    modality: "Text",
    open: true,
  },
  {
    provider: "DeepSeek",
    initials: "De",
    icon: "deepseek-color",
    name: "DeepSeek V3",
    inPrice: "0.27",
    outPrice: "1.10",
    modality: "Text",
    open: true,
  },
  { provider: "Alibaba", initials: "Qw", icon: "qwen-color", name: "Qwen 3 235B", inPrice: "0.40", outPrice: "1.60", modality: "Video", open: true },
  { provider: "xAI", initials: "X", icon: "grok", name: "Grok 4", inPrice: "5.00", outPrice: "15.00", modality: "Video", open: false },
  {
    provider: "Cohere",
    initials: "Co",
    icon: "cohere-color",
    name: "Command R+",
    inPrice: "2.50",
    outPrice: "10.00",
    modality: "Image",
    open: false,
  },
  {
    provider: "Perplexity",
    initials: "Pe",
    icon: "perplexity-color",
    name: "Sonar Pro",
    inPrice: "3.00",
    outPrice: "15.00",
    modality: "Audio",
    open: false,
  },
  { provider: "Amazon", initials: "Az", icon: "nova-color", name: "Nova Pro", inPrice: "0.80", outPrice: "3.20", modality: "Video", open: false },
  { provider: "Microsoft", initials: "Ms", icon: "microsoft-color", name: "Phi-4", inPrice: "0.10", outPrice: "0.40", modality: "Text", open: true },
  { provider: "AI21", initials: "21", icon: "ai21", name: "Jamba 1.6 Large", inPrice: "2.00", outPrice: "8.00", modality: "Audio", open: true },
  { provider: "Databricks", initials: "Db", icon: "dbrx-color", name: "DBRX", inPrice: "0.75", outPrice: "2.25", modality: "Audio", open: true },
  { provider: "01.AI", initials: "01", icon: "yi-color", name: "Yi-Large", inPrice: "0.60", outPrice: "2.40", modality: "Image", open: true },
  { provider: "IBM", initials: "IB", icon: "ibm", name: "Granite 3", inPrice: "0.20", outPrice: "0.80", modality: "Video", open: true },
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
  IBM: "#4338ca",
}

export const providerColor = (provider: string) => PROVIDER_COLORS[provider] ?? "#111111"

/** slug shown under a model in the selected list */
export const modelSlug = (m: ModelCardData) =>
  `${m.provider.toLowerCase().replace(/[^a-z0-9]+/g, "-")}/${m.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`

// One tile per model and one model per provider, so the whole list goes on the sphere.
// (The 41-model catalogue this used to carry only worked as text cards; a logo tile has
// nothing to read, so it can be small, and 16 of them leave the sphere legible.)
export const SPHERE_MODELS = MODELS

// counted off the sphere, so the checkbox count matches what filtering it does
export const MODALITY_COUNTS = MODALITY_ORDER.reduce<Record<Modality, number>>(
  (acc, key) => ({ ...acc, [key]: SPHERE_MODELS.filter(m => m.modality === key).length }),
  {} as Record<Modality, number>,
)
