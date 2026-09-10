"use client"

import GraphicFrame from "../GraphicFrame"
import styles from "../landing.module.css"

/**
 * Glen 2026-09-09 ("ai hardware animation", device_layout_v7.html): his three.js exploded
 * view — the housing, board and storage layers spin slowly and lift apart when clicked,
 * with a legend of pulsing chips under them. It ships as a standalone page under
 * /public/graphics like the hero files, so it is hosted the same way. Interactive, because
 * the click-to-open is part of the piece. His scroll.html (2026-09-10) gives it a 1 / 1.05
 * figure capped at 560 and centred; the button that used to share the frame's corner now
 * sits in the panel's foot, so nothing is held clear for it any more.
 */
const AIHardwarePanel = () => (
  <div className={`${styles.figure} ${styles.figureDevice}`}>
    <GraphicFrame src="ai-hardware-device.html" title="Scroll AI hardware — device layout" interactive className="size-full" />
  </div>
)

export default AIHardwarePanel
