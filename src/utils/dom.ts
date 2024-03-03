export const isAboveScreen = (element: Element): boolean => {
  const rect = element.getBoundingClientRect()
  return rect.bottom < 0
}

export const isBelowScreen = (element: Element): boolean => {
  const rect = element.getBoundingClientRect()
  return rect.top > window.innerHeight
}
