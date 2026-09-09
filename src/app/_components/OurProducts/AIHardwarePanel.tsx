"use client"

import GraphicFrame from "../GraphicFrame"

/**
 * Glen 2026-09-09 ("ai hardware animation", device_layout_v7.html): the static render of
 * the device gives way to his three.js exploded-view — the housing, board and storage
 * layers spin slowly and lift apart when clicked, with a legend of pulsing chips under
 * them. It ships as a standalone page under /public/graphics like the hero files, so it
 * is hosted the same way. Interactive, because the click-to-open is part of the piece.
 *
 * His frame carries its own white card, border and legend, so the panel is just the
 * frame filling the sheet plus the "coming soon" line the old composition had.
 */
const AIHardwarePanel = () => (
  <div className="relative size-full">
    <GraphicFrame
      src="ai-hardware-device.html"
      title="Scroll AI hardware — device layout"
      interactive
      className="absolute inset-x-0 bottom-[44px] top-0 md:bottom-[40px]"
    />
    <p className="absolute inset-x-0 bottom-[16px] text-center text-[13px] leading-[17px] text-[#636363] md:bottom-[22px] md:text-[15px] md:leading-[19px]">
      *COMING SOON*
    </p>
  </div>
)

export default AIHardwarePanel
