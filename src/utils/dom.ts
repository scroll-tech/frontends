export const isAboveScreen = element => {
  const rect = element.getBoundingClientRect()
  return rect.bottom < 0
}

export const isBelowScreen = element => {
  const rect = element.getBoundingClientRect()
  return rect.top > window.innerHeight
}

export const lockBodyScroll = (lock: boolean) => {
  if (lock) {
    const scrollbarWidth = window.innerWidth - document.body.offsetWidth
    document.body.style.overflow = "hidden"
    document.body.style.paddingRight = `${scrollbarWidth}px`
  } else {
    document.body.style.overflow = "auto"
    document.body.style.paddingRight = "0px"
  }
}
