// Model list + palette ported verbatim from Glen's "Globe model for Landing + Compass page"
// prototype (Slack, 2026-09-05). These are DESIGN PLACEHOLDERS — swap for the real Compass
// catalogue (names + $/1M pricing) before this goes live.
export interface ModelCardData {
  provider: string
  initials: string
  name: string
  inPrice: string
  outPrice: string
}

export const MODELS: ModelCardData[] = [
  { provider: "OpenAI", initials: "O", name: "GPT-5", inPrice: "5.00", outPrice: "15.00" },
  { provider: "OpenAI", initials: "O", name: "GPT-5 mini", inPrice: "0.60", outPrice: "2.40" },
  { provider: "OpenAI", initials: "O", name: "o4", inPrice: "10.00", outPrice: "40.00" },
  { provider: "OpenAI", initials: "O", name: "o4-mini", inPrice: "1.10", outPrice: "4.40" },
  { provider: "OpenAI", initials: "O", name: "o3", inPrice: "8.00", outPrice: "24.00" },
  { provider: "OpenAI", initials: "O", name: "GPT-4.5", inPrice: "10.00", outPrice: "30.00" },
  { provider: "OpenAI", initials: "O", name: "GPT-4.1", inPrice: "3.00", outPrice: "12.00" },
  { provider: "OpenAI", initials: "O", name: "GPT-4o", inPrice: "2.50", outPrice: "10.00" },
  { provider: "Anthropic", initials: "A", name: "Claude Mythos 5.1", inPrice: "15.00", outPrice: "75.00" },
  { provider: "Anthropic", initials: "A", name: "Claude Opus 5", inPrice: "12.00", outPrice: "60.00" },
  { provider: "Anthropic", initials: "A", name: "Claude Sonnet 5", inPrice: "3.00", outPrice: "15.00" },
  { provider: "Anthropic", initials: "A", name: "Claude Fable 5.1", inPrice: "5.00", outPrice: "25.00" },
  { provider: "Anthropic", initials: "A", name: "Claude Haiku 4.5", inPrice: "0.80", outPrice: "4.00" },
  { provider: "Google", initials: "G", name: "Gemini 3 Pro", inPrice: "3.50", outPrice: "14.00" },
  { provider: "Google", initials: "G", name: "Gemini 3 Flash", inPrice: "0.20", outPrice: "0.80" },
  { provider: "Google", initials: "G", name: "Gemini 2.5 Flash", inPrice: "0.30", outPrice: "1.20" },
  { provider: "Google", initials: "G", name: "Gemini 2.0 Flash", inPrice: "0.10", outPrice: "0.40" },
  { provider: "Google", initials: "G", name: "Gemini Nano", inPrice: "0.05", outPrice: "0.20" },
  { provider: "Meta", initials: "Me", name: "Llama 4 Maverick", inPrice: "0.35", outPrice: "1.40" },
  { provider: "Meta", initials: "Me", name: "Llama 4 Scout", inPrice: "0.20", outPrice: "0.80" },
  { provider: "Meta", initials: "Me", name: "Llama 3.3 70B", inPrice: "0.40", outPrice: "1.60" },
  { provider: "Mistral", initials: "Mi", name: "Mistral Large 2", inPrice: "2.00", outPrice: "6.00" },
  { provider: "Mistral", initials: "Mi", name: "Mistral Small 3", inPrice: "0.20", outPrice: "0.60" },
  { provider: "Mistral", initials: "Mi", name: "Codestral", inPrice: "0.30", outPrice: "0.90" },
  { provider: "Alibaba", initials: "Qw", name: "Qwen 3 235B", inPrice: "0.40", outPrice: "1.60" },
  { provider: "Alibaba", initials: "Qw", name: "Qwen 2.5 Max", inPrice: "0.30", outPrice: "1.20" },
  { provider: "xAI", initials: "X", name: "Grok 4", inPrice: "5.00", outPrice: "15.00" },
  { provider: "xAI", initials: "X", name: "Grok 3 mini", inPrice: "0.30", outPrice: "0.90" },
  { provider: "Cohere", initials: "Co", name: "Command R+", inPrice: "2.50", outPrice: "10.00" },
  { provider: "Cohere", initials: "Co", name: "Command R", inPrice: "0.15", outPrice: "0.60" },
  { provider: "Perplexity", initials: "Pe", name: "Sonar Pro", inPrice: "3.00", outPrice: "15.00" },
  { provider: "Perplexity", initials: "Pe", name: "Sonar", inPrice: "1.00", outPrice: "1.00" },
  { provider: "DeepSeek", initials: "De", name: "DeepSeek V3", inPrice: "0.27", outPrice: "1.10" },
  { provider: "DeepSeek", initials: "De", name: "DeepSeek R1", inPrice: "0.55", outPrice: "2.19" },
  { provider: "Amazon", initials: "Az", name: "Nova Pro", inPrice: "0.80", outPrice: "3.20" },
  { provider: "Amazon", initials: "Az", name: "Nova Micro", inPrice: "0.035", outPrice: "0.14" },
  { provider: "Microsoft", initials: "Ms", name: "Phi-4", inPrice: "0.10", outPrice: "0.40" },
  { provider: "AI21", initials: "21", name: "Jamba 1.6 Large", inPrice: "2.00", outPrice: "8.00" },
  { provider: "Databricks", initials: "Db", name: "DBRX", inPrice: "0.75", outPrice: "2.25" },
  { provider: "01.AI", initials: "01", name: "Yi-Large", inPrice: "0.60", outPrice: "2.40" },
  { provider: "Google", initials: "G", name: "Gemini 3 Ultra", inPrice: "7.00", outPrice: "28.00" },
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
