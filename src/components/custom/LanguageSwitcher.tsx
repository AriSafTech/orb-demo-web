"use client";
import React, { useEffect } from "react";
import {
  useLanguageStore,
  getUserPreferredLanguage,
} from "@/stores/languageStore";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Import translationData to use its types
import enData from "@/dictionaries/en.json";
import jaData from "@/dictionaries/ja.json";

const translationData = {
  en: enData,
  jp: jaData,
};

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguageStore();

  useEffect(() => {
    const initialLang = getUserPreferredLanguage();

    setLanguage(initialLang);
  }, [setLanguage]);

  const handleChange = (val: string) => {
    setLanguage(val as keyof typeof translationData);
  };

  return (
    <Select value={language} onValueChange={handleChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Language" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="en">English</SelectItem>
        <SelectItem value="jp">日本語</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default LanguageSwitcher;
