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

// 为第三方库的 CSS 导入添加声明
declare module "swiper/css" {
  const content: any
  export default content
}

declare module "swiper/css/*" {
  const content: any
  export default content
}
