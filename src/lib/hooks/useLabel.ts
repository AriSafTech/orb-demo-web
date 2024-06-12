import { useLanguageStore } from "@/stores/languageStore";

export const useLabel = () => {
  const { data: t } = useLanguageStore();

  const getGender = (
    genderStr: "male" | "female" | "other" | string | null | undefined,
  ) => {
    switch (genderStr) {
      case "female":
        return t.enums.gender_female;
      case "male":
        return t.enums.gender_male;
      case "other":
        return t.enums.gender_other;
      default:
        return t.enums.none;
    }
  };

  const getRole = (
    roleStr: "admin" | "consumer" | "merchant" | string | null | undefined,
  ) => {
    switch (roleStr) {
      case "admin":
        return t.enums.role_admin;
      case "consumer":
        return t.enums.role_consumer;
      case "merchant":
        return t.enums.role_merchant;
      default:
        return t.enums.none;
    }
  };

  return { getGender, getRole };
};
