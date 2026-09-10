import styles from "../landing.module.css"

/**
 * Glen 2026-09-08 replaced the leaderboard mock-up here with two animations: the routing
 * hub up top and the AI MODEL → ZK API KEY → COMPASS chain under it. His scroll.html
 * (2026-09-10) stacks them the same way at every width — hub capped at 430 and centred,
 * chain 150 tall (120 on a small phone) — so the portrait hub the phone used to get is
 * retired. Both are pure SVG + CSS, so a plain <img> renders them and still runs their
 * animations.
 */
const CompassApiPanel = () => (
  <div className={styles.apiStack}>
    <div className={`${styles.figure} ${styles.figureHub}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/graphics/compass-api-hub-desktop.svg" alt="" className="size-full object-cover object-top" />
    </div>
    <div className={`${styles.figure} ${styles.figureChain}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/graphics/compass-api-chain.svg" alt="" className="size-full object-contain" />
    </div>
  </div>
)

export default CompassApiPanel
