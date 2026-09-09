"use client"

import GraphicFrame from "../GraphicFrame"

/**
 * Glen 2026-09-09 ("ai hardware animation", device_layout_v7.html): the static render of
 * the device gives way to his three.js exploded-view — the housing, board and storage
 * layers spin slowly and lift apart when clicked, with a legend of pulsing chips under
 * them. It ships as a standalone page under /public/graphics like the hero files, so it
 * is hosted the same way. Interactive, because the click-to-open is part of the piece.
 *
 * His frame's own card chrome is overridden inside the file — the sheet is the frame.
 * The "coming soon" line that used to sit under it is gone (Glen 2026-09-09 21:23:
 * "let's remove 'coming soon' from ai hardware"); the band it occupied stays clear so
 * the legend never runs into the arrow in the corner.
 */
const AIHardwarePanel = () => (
  <div className="relative size-full">
    <GraphicFrame
      src="ai-hardware-device.html"
      title="Scroll AI hardware — device layout"
      interactive
      className="absolute inset-x-0 bottom-[44px] top-0 md:bottom-[40px]"
    />
  </div>
)

export default AIHardwarePanel
