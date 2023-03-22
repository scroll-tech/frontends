import { requireEnv } from "@/utils"

export type Theme = {
  prefixCls: string
}

const useTheme = (): Theme => {
  return {
    prefixCls: (requireEnv("REACT_APP_PREFIX_CLS") as string) || "scroll",
  }
}

export default useTheme
