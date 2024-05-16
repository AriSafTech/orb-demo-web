"use client";
import React, { useEffect } from "react";
import useLanguageStore from "@/stores/languageStore";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type languageType = {
  language: string;
  setLanguage: (lang: string) => void;
};

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguageStore();

  const handleChange = (val: string) => {
    setLanguage(val as typeof language);
  };

  return (
    // <Select value={language} onChange={handleChange}>
    <Select value={language} onValueChange={handleChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Language" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="en">English</SelectItem>
        <SelectItem value="ja">日本語</SelectItem>
      </SelectContent>
    </Select>

    // <select value={language} onChange={handleChange}>
    //   <option value="en">En</option>
    //   <option value="ja">Ja</option>
    // </select>
  );
};

export default LanguageSwitcher;
