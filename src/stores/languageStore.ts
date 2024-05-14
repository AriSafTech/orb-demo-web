import { create } from "zustand";
import { persist } from "zustand/middleware";
import enData from "@/dictionaries/en.json";
import jaData from "@/dictionaries/ja.json";

const useLanguageStore = create(
  persist(
    (set) => ({
      language: "en",
      data: enData,
      setLanguage: (lang: string) => {
        const data = lang === "en" ? enData : lang === "ja" ? jaData : enData;
        set({ language: lang, data });
      },
    }),
    {
      name: "language-store",
    },
  ),
);

export default useLanguageStore;
