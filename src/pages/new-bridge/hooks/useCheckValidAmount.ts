import { useEffect, useState } from "react"

import { checkAmountOverflow } from "@/utils"

const useCheckValidAmount = amount => {
  const [invalidMessage, setInvalidMessage] = useState("")
  useEffect(() => {
    const isZero = amount && Number(amount) === 0
    const valid = checkAmountOverflow(amount)

    let errorMsg = ""
    if (isZero) {
      errorMsg = "The amount should be greater than 0!"
    } else if (!valid) {
      errorMsg = "The amount exceeds the maximum value!"
    }
    setInvalidMessage(errorMsg)
  }, [amount])

  return invalidMessage
}

export default useCheckValidAmount
