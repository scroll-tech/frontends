import confetti from "canvas-confetti"
import React, { useEffect, useRef } from "react"

const ribbon = confetti.shapeFromPath({
  path: "M25.6153 6.22043L30.3054 1.53375L36.3336 7.57307L28.1322 15.7792C26.0707 17.8408 23.2724 19.0004 20.3577 19.0004C16.9081 19.0004 13.6011 20.3709 11.1646 22.8075L7.93287 26.0395L1.91259 20.001L10.106 11.7948L10.1065 11.7942C12.1679 9.73295 14.966 8.57353 17.8804 8.57353H19.9405C22.0687 8.57353 24.1104 7.72536 25.615 6.22072C25.6151 6.22063 25.6152 6.22053 25.6153 6.22043Z",
})
const shortRibbon = confetti.shapeFromPath({
  path: "M17.9416 23.6672L1.79087 7.51511L7.40444 1.90109L23.5552 18.0532L17.9416 23.6672Z",
})

const ConfettiComponent = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    fireConfetti()
  }, [])

  const fireConfetti = () => {
    const canvas = canvasRef.current

    if (!canvas) return

    canvas.width = 640
    canvas.height = 760

    const myConfetti = confetti.create(canvas, {
      resize: true,
    })
    const count = 60

    const fire = (particleRatio: number, opts: object) => {
      myConfetti({
        ...opts,
        particleCount: Math.floor(count * particleRatio),
        origin: {
          y: 0.8,
        },
        shapes: [ribbon, shortRibbon],
        colors: ["#FF684B", "#90F8EA", "#E8BF8B"],
      })
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
    })
    fire(0.2, {
      spread: 60,
      scalar: 1.4,
    })
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 1.8,
    })
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    })
    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    })
  }

  return <canvas ref={canvasRef} style={{ position: "absolute", top: 0, left: 0, pointerEvents: "none" }} />
}

export default ConfettiComponent
