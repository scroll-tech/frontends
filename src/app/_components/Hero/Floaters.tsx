import { CSSProperties } from "react"

import styles from "./floaters.module.css"

/**
 * The five marks from Glen's file, in his order and at his sizes: Codex, Kimi, Gemini,
 * Claude, Qwen. He ships them as small palette PNGs (230–250px, 2–8KB each), copied out
 * of the file as they were; two of them are square tiles and get a rounded corner. The
 * layout — where each one sits, how it bobs — lives in floaters.module.css.
 */
const MARKS = [
  { name: "Codex", file: "codex.png", size: 62, radius: "0" },
  { name: "Kimi", file: "kimi.png", size: 60, radius: "14%" },
  { name: "Gemini", file: "gemini.png", size: 66, radius: "0" },
  { name: "Claude", file: "claude.png", size: 66, radius: "21%" },
  { name: "Qwen", file: "qwen.png", size: 70, radius: "0" },
]

const Floaters = () => (
  <div className={styles.layer} aria-hidden="true">
    {MARKS.map((mark, i) => (
      <span key={mark.name} className={`${styles.floater} ${styles[`f${i + 1}`]}`} style={{ "--sz": `${mark.size}px` } as CSSProperties}>
        <span className={styles.inner}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`/imgs/landing/floaters/${mark.file}`}
            alt=""
            width={mark.size}
            height={mark.size}
            draggable={false}
            style={{ borderRadius: mark.radius }}
          />
        </span>
      </span>
    ))}
  </div>
)

export default Floaters
