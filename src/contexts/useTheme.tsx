export type Theme = {
  prefixCls: string
}

const useTheme = (): Theme => {
  return {
    prefixCls: (process.env.REACT_APP_PREFIX_CLS as string) || "scroll",
  }
}

export default useTheme
