import { usePathname } from "next/navigation"

import { checkMatchPath } from "@/utils"

const useMatch = pathReg => {
  const pathname = usePathname()
  return checkMatchPath(pathReg, pathname)
}

export default useMatch
