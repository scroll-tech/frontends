import i18next from "i18next"
import LanguageDetector from "i18next-browser-languagedetector"
import XHR from "i18next-xhr-backend"
import { initReactI18next } from "react-i18next"

i18next
  .use(XHR)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    whitelist: ["en", "de", "es-AR", "es-US", "it-IT", "iw", "ro", "ru", "vi", "zh", "zh-CN", "zh-TW"],
    backend: {
      loadPath: "/swap/locales/{{lng}}.json",
    },
    react: {
      useSuspense: true,
    },
    fallbackLng: "en",
    preload: ["en"],
    keySeparator: false,
    interpolation: { escapeValue: false },
  })

export default i18next
