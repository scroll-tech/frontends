import useStorage from "squirrel-gill"

import { BLOG_LANGUAGE } from "@/constants/storageKey"

function getUserLanguage() {
  // Get the user's primary language preference
  const userLanguage = navigator.language || "en"

  // Check if the language is Turkish
  if (userLanguage.startsWith("tr")) {
    return "tr" // Return 'tr' for Turkish
  } else {
    return "en" // Return 'en' for any other language
  }
}

export default function useUserLanguage() {
  return useStorage(localStorage, BLOG_LANGUAGE, getUserLanguage())
}
