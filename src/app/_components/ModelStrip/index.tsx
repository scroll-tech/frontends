import { geistMono } from "../fonts"
import { PopIn } from "../motion"
import styles from "./strip.module.css"

/**
 * Glen 2026-09-09, pointing at monad.com's "TRUSTED BY SECURITY TEAMS AT" logo row under
 * their hero: "let's also do this part too, but we'll just use ai models instead.
 * 'access these models' will be the copy".
 *
 * Same shape as theirs, measured off monad.com: 100 between the hero graphic and the
 * eyebrow (50 of hero bottom + the slider's 50 top), eyebrow 16 / 20.8 with 0.8 of
 * tracking, uppercase, 30 under it, then one row of marks 20–30 tall spaced 100 apart
 * that slides sideways forever, all inside their 1352 content width. Ours fades at the
 * edges where theirs runs to the container. Their phone (390): 92 above the eyebrow,
 * eyebrow 14 / 18.2, marks 50 apart. Models, as he said — the
 * flagship line of each provider the Compass globe lists, named as a model (GPT-5, Claude,
 * Llama …) rather than as a company. Marks are the CC0 glyphs from simple-icons, rendered
 * black, with the name set beside each in mono. Grok is left out for now: simple-icons has
 * no xAI mark and the X logo is a different company's.
 */
const MODELS = [
  { name: "GPT-5", icon: "openai" },
  { name: "Claude", icon: "anthropic" },
  { name: "Gemini", icon: "gemini" },
  { name: "Llama", icon: "meta" },
  { name: "Mistral", icon: "mistral" },
  { name: "Qwen", icon: "qwen" },
  { name: "DeepSeek", icon: "deepseek" },
]

const Row = ({ duplicate = false }: { duplicate?: boolean }) => (
  <ul
    className={`flex shrink-0 items-center gap-[50px] pr-[50px] md:gap-[100px] md:pr-[100px] ${duplicate ? styles.dup : ""}`}
    aria-hidden={duplicate}
  >
    {MODELS.map(m => (
      <li key={m.name} className="flex shrink-0 items-center gap-[12px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`/imgs/landing/providers/${m.icon}.svg`} alt="" width={24} height={24} className="size-[24px]" />
        <span className={`${geistMono.className} whitespace-nowrap text-[18px] font-semibold leading-[24px] text-black`}>{m.name}</span>
      </li>
    ))}
  </ul>
)

const ModelStrip = () => (
  <section aria-label="Models available through Scroll" className="w-full px-[16px] pt-[92px] md:pt-[100px]">
    <div className="mx-auto w-full max-w-[1352px]">
      <PopIn>
        <p
          className={`${geistMono.className} text-[14px] uppercase leading-[18px] tracking-[0.8px] text-[#636363] md:text-[16px] md:leading-[20.8px]`}
        >
          Access these models
        </p>
        {/* the second row is what makes the loop seamless; under reduced motion the row
            stands still, wraps, and the copy is dropped (strip.module.css) */}
        <div className={`mt-[30px] flex overflow-hidden ${styles.fade}`}>
          <div className={`flex ${styles.track}`}>
            <Row />
            <Row duplicate />
          </div>
        </div>
      </PopIn>
    </div>
  </section>
)

export default ModelStrip
