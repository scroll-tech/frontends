import { Flip } from "number-flip"
import { useEffect, useRef } from "react"
import { usePrevious } from "react-use"

const Counter = props => {
  const { number } = props
  const numberNodeRef = useRef<HTMLDivElement | null>(null)
  const numberFlipRef = useRef<any>()
  const preNumber = usePrevious(number)

  useEffect(() => {
    numberFlipRef.current = new Flip({
      node: numberNodeRef.current,
      from: 0,
      to: number,
      duration: 1,
      separator: ",",
    })
  }, [])

  useEffect(() => {
    if (numberFlipRef.current && numberNodeRef.current) {
      if (String(number).length === String(preNumber).length) {
        numberFlipRef.current.flipTo({
          to: number,
        })
      } else {
        numberNodeRef.current.querySelectorAll("*").forEach(n => n.remove())
        numberFlipRef.current = new Flip({
          node: numberNodeRef.current,
          from: Number("1" + new Array(String(number).length - 1).fill("0").join("")),
          to: number,
          duration: 1,
          separator: ",",
        })
      }
    }
  }, [number])

  return <div ref={numberNodeRef}></div>
}

export default Counter
