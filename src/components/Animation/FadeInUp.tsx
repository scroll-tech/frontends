import { keyframes } from "@emotion/react"
import Reveal from "react-awesome-reveal"

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translate3d(0, 30px, 0) scale3d(0.9, 0.9, 1);
  }

  to {
    opacity: 1;
    transform: translate3d(0, 0, 0)  scale3d(1, 1, 1);
  }
`

function FadeInUp({ children, ...rest }) {
  return (
    <Reveal {...rest} triggerOnce cascade keyframes={fadeInUp}>
      {children}
    </Reveal>
  )
}

export default FadeInUp
