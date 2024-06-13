import { Components } from "@/api/generated-api-types";
import { useLanguageStore } from "@/stores/languageStore";
import { Label } from "@radix-ui/react-select";

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

  type TransactionType = {
    type: "charge" | "payment" | "refund" | "paymentRefunded" | "others";
    label: string;
  };

  const geTransactionType = (
    transaction: Components.Schemas.TransactionResponse,
  ): TransactionType => {
    if (transaction.type!.includes("charge")) {
      return { type: "charge", label: t.enums.transaction_type_charge };
    } else if (transaction.type === "ctom-payment") {
      // @ts-ignore
      if (transaction["reversed_by_id"]) {
        return {
          type: "paymentRefunded",
          label: t.enums.transaction_type_payment_refunded,
        };
      } else {
        return { type: "payment", label: t.enums.transaction_type_payment };
      }
    } else if (transaction.type === "reversal") {
      return { type: "refund", label: t.enums.transaction_type_refund };
    } else {
      return { type: "others", label: t.enums.transaction_type_others };
    }
  };

  return { getGender, getRole, geTransactionType };
};
