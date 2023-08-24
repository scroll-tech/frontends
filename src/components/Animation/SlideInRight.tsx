import { keyframes } from "@emotion/react"
import Reveal from "react-awesome-reveal"

const slideInRight = keyframes`
  from {
    opacity: 0;
    transform: translate3d(100px, 0, 0);
  }

  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
`

function SlideInRight({ children, ...rest }) {
  return (
    <Reveal {...rest} keyframes={slideInRight}>
      {children}
    </Reveal>
  )
}

export default SlideInRight
