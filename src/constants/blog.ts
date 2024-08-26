export const BLOG_LANGUAGE_LIST = [
  { label: "English", key: "en" },
  { label: "Türkçe", key: "tr" },
]

export const getBlogCategoryList = lang => [
  {
    label: LANGUAGE_MAP[lang].all,
    key: "All",
  },
  {
    label: LANGUAGE_MAP[lang].announcement,
    key: "Announcement",
  },
  {
    label: LANGUAGE_MAP[lang].general,
    key: "General",
  },
  {
    label: LANGUAGE_MAP[lang].technical,
    key: "Technical",
  },
  {
    label: LANGUAGE_MAP[lang].ecosystem_highlights,
    key: "Ecosystem highlights",
  },
]

export const getBlogSortList = lang => [
  {
    label: LANGUAGE_MAP[lang].newest,
    key: "Newest",
  },
  {
    label: LANGUAGE_MAP[lang].oldest,
    key: "Oldest",
  },
]

export const LANGUAGE_MAP = {
  en: {
    title: "Scroll Blog",
    sub_title: "Learn about Scroll’s technology, research, and latest developments.",
    category: "Category",
    all: "All",
    announcement: "Announcement",
    general: "General",
    technical: "Technical",
    ecosystem_highlights: "Ecosystem highlights",
    sort: "Order by",
    newest: "Newest",
    oldest: "Oldest",
    filters: "Filters",
    more_articles: "More articles from Scroll",
  },
  tr: {
    title: "Scroll Blog",
    sub_title: "Scroll teknolojisini, son gelişmeleri ve araştırmaları öğrenin.",
    category: "Kategori",
    all: "Tümü",
    announcement: "Duyuru",
    general: "Genel",
    technical: "Teknik",
    ecosystem_highlights: "Ekosistem vurguları",
    sort: "Şuna göre sırala",
    newest: "En yeni",
    oldest: "En eski",
    filters: "Filtreler",
    more_articles: "Scroll'dan daha fazla makale",
  },
}
