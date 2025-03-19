// global.d.ts 或任何.d.ts文件中
import "react"

declare module "react" {
  interface CSSProperties {
    [key: `--${string}`]: string | number
  }
}
