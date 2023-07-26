import { keyframes } from "@emotion/react"
import React from "react"
import Reveal from "react-awesome-reveal"

const customAnimation = keyframes`
  from {
    opacity: 0;
    transform: translate3d(0, 30px, 0) scale3d(0.9, 0.9, 1);
  }

  to {
    opacity: 1;
    transform: translate3d(0, 0, 0)  scale3d(1, 1, 1);
  }
`

function CustomAnimation({ children, ...rest }) {
  return (
    <Reveal {...rest} keyframes={customAnimation}>
      {children}
    </Reveal>
  )
}

export default CustomAnimation
