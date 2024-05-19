import { create } from "zustand";
import { persist, PersistOptions } from "zustand/middleware";
import enData from "@/dictionaries/en.json";
import jaData from "@/dictionaries/ja.json";

// Utility function to get the user's preferred language
export const getUserPreferredLanguage = () => {
  // Check localStorage first
  // const storedLanguage = localStorage.getItem("preferredLanguage");
  // if (storedLanguage === "jp" || storedLanguage === "en") {
  //   return storedLanguage;
  // }

  // Fallback to browser settings
  const browserLanguage = navigator.language || navigator.languages[0];
  if (browserLanguage.startsWith("ja")) {
    return "jp";
  }
  return "en"; // Default to English
};

const translationData = {
  en: enData,
  jp: jaData, // Ensure consistent use of 'jp' for Japanese
};

type TranslationData = typeof translationData;

interface LanguageStore {
  language: keyof TranslationData;
  data: TranslationData[keyof TranslationData];
  setLanguage: (lang: keyof TranslationData) => void;
}

const initialLanguage = getUserPreferredLanguage();

export const useLanguageStore = create(
  persist<LanguageStore>(
    (set) => ({
      language: initialLanguage,
      data: translationData[initialLanguage],
      setLanguage: (lang) => {
        if (lang !== "jp" && lang !== "en") {
          lang = "en"; // Default to English if the provided language is invalid
        }
        const data = translationData[lang];
        set({ language: lang, data });
        // Save the preferred language to localStorage
        // localStorage.setItem("preferredLanguage", lang);
      },
    }),
    {
      name: "language-store",
    } as PersistOptions<LanguageStore>,
  ),
);
