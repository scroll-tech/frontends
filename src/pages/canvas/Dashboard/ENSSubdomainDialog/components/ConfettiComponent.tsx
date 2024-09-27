import confetti from "canvas-confetti"
import React, { useEffect, useRef } from "react"

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
    const count = 100

    const fire = (particleRatio: number, opts: object) => {
      myConfetti({
        ...opts,
        particleCount: Math.floor(count * particleRatio),
        origin: {
          y: 0.8,
        },
      })
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
    })
    fire(0.2, {
      spread: 60,
    })
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
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
