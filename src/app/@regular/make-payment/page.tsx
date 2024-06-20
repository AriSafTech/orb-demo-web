"use client";
import React, { useMemo } from "react";
import { authService } from "@/services/auth.service";
import Loading from "@/components/custom/Loading";
import { useSearchParams } from "next/navigation";

import ConfirmPayment from "./ConfirmPayment";
import PaymentForm from "./PaymentForm";

function MakePaymentPage() {
  const {
    balance,
    status: profileStatus,
    data: profile,
  } = authService.useProfile();

  const searchParams = useSearchParams();
  const coinId = searchParams.get("coinId") ?? "";
  const amount = parseInt(searchParams.get("amount") ?? "0");
  const receiverId = searchParams.get("receiverId") ?? "";
  const confirmOnly = searchParams.get("confirmOnly") === "true" || false;

  const coins = useMemo(
    () =>
      Object.fromEntries(
        Object.entries(balance ?? {}).map(([coinId, coin]) => [
          coinId,
          { id: coinId, name: coin.name, balance: coin.balance },
        ]),
      ),
    [balance],
  );

  if (profileStatus !== "success" || !profile) {
    return <Loading />;
  } else if (confirmOnly) {
    return (
      <ConfirmPayment
        coinId={coinId}
        amount={amount}
        receiverId={receiverId}
        senderId={profile.username!}
      />
    );
  } else {
    return (
      <PaymentForm
        coins={coins!}
        coinId={coinId}
        amount={amount}
        receiverId={receiverId}
        senderId={profile.username!}
      />
    );
  }
}

export default MakePaymentPage;
