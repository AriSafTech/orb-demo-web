import { create } from "zustand";
import { persist, PersistOptions } from "zustand/middleware";
import enData from "@/dictionaries/en.json";
import jaData from "@/dictionaries/ja.json";

const translationData = {
  en: enData,
  ja: jaData,
};

type TranslationData = typeof translationData;

interface LanguageStore {
  language: keyof TranslationData;
  data: TranslationData[keyof TranslationData];
  setLanguage: (lang: keyof TranslationData) => void;
}

const useLanguageStore = create(
  persist<LanguageStore>(
    (set) => ({
      language: "en",
      data: enData,
      setLanguage: (lang) => {
        const data = translationData[lang];
        set({ language: lang, data });
      },
    }),
    {
      name: "language-store",
    } as PersistOptions<LanguageStore>,
  ),
);

export default useLanguageStore;
