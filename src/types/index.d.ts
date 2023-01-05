export {}

declare global {
  interface Window {
    scrollRequest: (url: string, options?: object) => Promise<T>
  }
}
