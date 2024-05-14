"use client";
import React from "react";
import useLanguageStore from "@/stores/languageStore";

type languageType = {
  language: string;
  setLanguage: (lang: string) => void;
};

const LanguageSwitcher = () => {
  const { language, setLanguage }: any = useLanguageStore();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value);
    // const selectedLanguage = e.target.value;
    // setLanguage(selectedLanguage);
    // localStorage.setItem("selectedLanguage", selectedLanguage);
  };

  return (
    <select value={language} onChange={handleChange}>
      <option value="en">En</option>
      <option value="ja">Ja</option>
    </select>
  );
};

export default LanguageSwitcher;
