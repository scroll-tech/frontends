// in global.d.ts or any .d.ts file
import "react"

declare module "react" {
  interface CSSProperties {
    [key: `--${string}`]: string | number
  }
}
