"use client";
import Loading from "@/components/custom/Loading";
import { coinService } from "@/services/coin.service";
import { userService } from "@/services/user.service";
import { useRouter } from "next/navigation";
import React, { useMemo } from "react";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useLanguageStore } from "@/stores/languageStore";
import { Button } from "@/components/ui/button";
import LongPressButton from "@/components/custom/LongPressButton";
import { transactionService } from "@/services/transaction.service";

const PaymentDetailsItem = ({
  label,
  value,
}: {
  label: string;
  value: string;
}) => {
  return (
    <div className="flex flex-col">
      <h4 className="text-md">{label}</h4>
      <div className="text-xl">{value}</div>
    </div>
  );
};

type Props = {
  coinId: string;
  receiverId: string;
  senderId: string;
  amount: number;
};

function ConfirmPayment({ amount, coinId, receiverId, senderId }: Props) {
  const { data: t } = useLanguageStore();
  const { mutateAsync: makePayment } = transactionService.useMakePayment();

  // const { data: users, status: usersStatus } = userService.useAllUsers();
  const { data: coinsData, status: coinsStatus } = coinService.useAllCoins();
  const router = useRouter();

  const coins = useMemo(
    () =>
      coinsData != undefined
        ? Object.fromEntries(
            coinsData.map((cd) => [
              cd.coin_id!,
              { id: cd.coin_id!, name: cd.name! },
            ]),
          )
        : null,
    [coinsData],
  );

  const onSubmit = async () => {
    try {
      await makePayment({
        amount,
        coinId,
        receiverOrbId: receiverId,
        senderOrbId: senderId,
      });
      toast.success(t.info.payment_paymentSuccess_title, {
        description: t.info.payment_paymentSuccess_desc,
      });
    } catch (e) {
      toast.error(t.errors.payment_paymentFailed_title, {
        description: t.errors.payment_paymentFailed_desc,
      });
    }
  };

  // if (usersStatus === "error") {
  //   toast.error("Failed to fetch receiver data.");
  //   router.push("/");
  // }
  if (coinsStatus === "error") {
    toast.error("Failed to fetch coins data.");
    router.push("/");
  }

  // if (users == undefined || coins == undefined) {
  if (coins == null) {
    return <Loading />;
  }
  return (
    <div className="max-w-sm mx-auto flex flex-col items-center sm:items-stretch">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>{t.payment.confirm_title}</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>Please confirm payment details.</CardDescription>
          <div className="max-w-xs flex flex-col gap-8 my-8">
            {/* TODO: show receiver's name instead */}
            <PaymentDetailsItem
              label={t.payment.receiverId}
              value={receiverId}
            />
            <PaymentDetailsItem
              label={t.payment.coin}
              value={coins[coinId]?.name ?? ""}
            />
            <PaymentDetailsItem
              label={t.payment.amount}
              value={amount.toString()}
            />
          </div>
          <LongPressButton
            size="lg"
            className="mt-8 w-full mb-2"
            onLongPress={onSubmit}
          >
            Send
          </LongPressButton>
          <p className="text-xs text-center">{t.payment.submit_helper}</p>
        </CardContent>
      </Card>
    </div>
  );
}

export default ConfirmPayment;
