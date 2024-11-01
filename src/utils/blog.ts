export const filterBlogsByLanguage = (blogJson, language) => {
  if (language === "en") {
    return blogJson.filter(item => item.language === language)
  }
  const suffix = `_lang_${language}`
  return blogJson.filter((item, _index, arr) => {
    if (item.language === language) {
      return true
    } else if (item.language !== "en") {
      return false
    } else if (!arr.find(i => i.slug.slice(0, -suffix.length) === item.slug)) {
      return true
    }
    return false
  })
}
