declare module "*.css" {
  const content: { [className: string]: string }
  export default content
}

declare module "*.scss" {
  const content: { [className: string]: string }
  export default content
}

declare module "*.sass" {
  const content: { [className: string]: string }
  export default content
}

// declarations for third-party library CSS imports
declare module "swiper/css" {
  const content: any
  export default content
}

declare module "swiper/css/*" {
  const content: any
  export default content
}
