export const isAboveScreen = element => {
  const rect = element.getBoundingClientRect()
  return rect.bottom < 0
}

export const isBelowScreen = element => {
  const rect = element.getBoundingClientRect()
  return rect.top > window.innerHeight
}
