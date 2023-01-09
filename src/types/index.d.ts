export {}

declare global {
  interface Window {
    scrollRequest: (url: string, options?: object) => Promise<T>
  }

  interface Error {
    message: string
    stack?: string
    status: number
  }
}
