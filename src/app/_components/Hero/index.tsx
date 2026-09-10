import { COMPASS_API_URL } from "@/constants/link"

import Button from "../Button"
import GraphicFrame from "../GraphicFrame"
import ModelStrip from "../ModelStrip"
import styles from "../landing.module.css"
import { Reveal, Typed, WordsIn } from "../motion"
import Floaters from "./Floaters"

/**
 * Glen's hero (scroll.html, 2026-09-10): five model marks drifting around the headline
 * (Floaters), the headline in Instrument Serif, the sub-head typing in, two buttons, then
 * his routing animation in a 1200 / 520 frame and the model band under it. Copy, sizes and
 * gaps are his — see landing.module.css.
 *
 * The motion is not his: his headline blurred in and then scrambled into symbols every
 * few seconds, and the whole block replayed whenever it scrolled back in. Zhengqi
 * 2026-09-10 asked for the calm, common version instead — the words rise out of clipped
 * lines once (WordsIn, see motion.tsx), the sub-head starts typing as the last word lands,
 * the buttons and graphic fade up after, and nothing in the hero ever replays (`once`).
 *
 * Links are ours where his are placeholders: his "Check it out" only scrolls to the
 * products, ours opens Compass; his "ZK API keys" goes to the API panel, and so does ours.
 * The graphics are his own hero files, hosted the way they were before (GraphicFrame),
 * swapped at his 820px break.
 */
const LandingHero = () => (
  <section className={`${styles.hero} w-full`}>
    <Floaters />

    <div className={`${styles.container} ${styles.heroInner}`}>
      <h1 className={styles.display}>
        <WordsIn text="Your gateway to frontier models" />
      </h1>
      <p className={styles.lede}>
        <Typed text="Switch between 30+ providers through a single unified interface." delay={1000} />
      </p>
      <Reveal once delay={500} className={styles.heroActions}>
        <Button href={COMPASS_API_URL} external solid>
          Check it out
        </Button>
        <Button href="/#compass-api">ZK API keys</Button>
      </Reveal>
    </div>

    <Reveal once plain delay={600} className={styles.heroFigure}>
      <div className={`${styles.figure} ${styles.figureHero}`}>
        <GraphicFrame
          src="landing-hero-desktop.html"
          title="How a model request is routed, proved and verified"
          className={`${styles.heroDesktop} size-full`}
        />
        <GraphicFrame
          src="landing-hero-mobile.html"
          title="How a model request is routed, proved and verified"
          className={`${styles.heroMobile} size-full`}
        />
      </div>
    </Reveal>

    <ModelStrip />
  </section>
)

export default LandingHero
