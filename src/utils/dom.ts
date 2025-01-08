export const isAboveScreen = element => {
  const rect = element.getBoundingClientRect()
  return rect.bottom < 0
}

export const isBelowScreen = element => {
  const rect = element.getBoundingClientRect()
  return rect.top > window.innerHeight
}

export const scrollPageToElement = (targetEl, offsetScreenTop) => {
  const offsetTop = targetEl!.getBoundingClientRect().top + window.pageYOffset
  window.scrollTo({
    top: offsetTop - parseFloat(offsetScreenTop) * 10 - 20,
    behavior: "smooth",
  })
}
