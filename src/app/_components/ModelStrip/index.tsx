import styles from "../landing.module.css"
import { MARKS } from "./marks"

const Track = ({ duplicate = false }: { duplicate?: boolean }) => (
  <div className={styles.track} aria-hidden={duplicate}>
    {MARKS.map(mark => (
      <span key={mark.name} className={styles.mark}>
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d={mark.d} />
        </svg>
        {mark.name}
      </span>
    ))}
  </div>
)

/**
 * Glen's "Access these models" band (scroll.html, 2026-09-10): the mono label at the
 * page gutter, then one row of fifteen brand marks in the ink colour, each with its name
 * set in JetBrains Mono, sliding left for 46 seconds a loop behind a soft fade at both
 * edges and pausing under the pointer. The second copy of the track is what makes the loop
 * seamless. Marks are his — simple-icons glyphs copied out of the file (./marks).
 */
const ModelStrip = () => (
  <div className={styles.band}>
    <span className={`${styles.label} ${styles.bandLabel}`}>Access these models</span>
    <div className={styles.marquee} aria-label="Models available through Scroll">
      <Track />
      <Track duplicate />
    </div>
  </div>
)

export default ModelStrip
