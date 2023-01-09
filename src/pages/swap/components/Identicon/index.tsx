import Jazzicon from "jazzicon"
import React, { useEffect, useRef } from "react"
import styled from "styled-components"

import { useWeb3Context } from "@/contexts/Web3ContextProvider"

const StyledIdenticonContainer = styled.div`
  height: 1.6rem;
  width: 1.6rem;
  border-radius: 1.8rem;
  background-color: ${({ theme }) => theme.bg4};
`

export default function Identicon() {
  const ref = useRef<HTMLDivElement>()

  const { walletCurrentAddress } = useWeb3Context()

  useEffect(() => {
    if (walletCurrentAddress && ref.current) {
      ref.current.innerHTML = ""
      ref.current.appendChild(Jazzicon(16, parseInt(walletCurrentAddress.slice(2, 10), 16)))
    }
  }, [walletCurrentAddress])

  // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/30451
  return <StyledIdenticonContainer ref={ref as any} />
}
