export const filterBlogsByLanguage = (blogJson, language) => {
  if (language === "en") {
    return blogJson.filter(item => item.language === language)
  }
  return blogJson.filter((item, index, arr) => {
    const suffix = `_lang_${language}`
    if (item.language === language) {
      return true
    } else if (!arr.find(i => i.slug.slice(0, -suffix.length) === item.slug)) {
      return true
    }
    return false
  })
}
