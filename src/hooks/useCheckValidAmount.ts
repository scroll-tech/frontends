import { useEffect, useState } from "react"

import { checkAmountOverflow } from "@/utils"

const useCheckValidAmount = amount => {
  const [isValid, setIsValid] = useState(true)
  const [message, setMessage] = useState("")
  useEffect(() => {
    const isZero = amount && Number(amount) === 0
    const valid = checkAmountOverflow(amount)
    setIsValid(!isZero && valid)

    let errorMsg = ""
    if (isZero) {
      errorMsg = "The amount should be greater than 0!"
    } else if (!valid) {
      errorMsg = "The amount exceeds the maximum value!"
    }
    setMessage(errorMsg)
  }, [amount])

  return { isValid, message }
}

export default useCheckValidAmount
