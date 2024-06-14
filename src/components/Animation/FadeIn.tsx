import { keyframes } from "@emotion/react"
import Reveal from "react-awesome-reveal"

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

function FadeIn({ children, ...rest }) {
  return (
    <Reveal {...rest} triggerOnce keyframes={fadeIn}>
      {children}
    </Reveal>
  )
}

export default FadeIn
