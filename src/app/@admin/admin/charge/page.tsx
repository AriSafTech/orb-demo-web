import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { z } from "zod";

function ChargePage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Charge account</CardTitle>
      </CardHeader>
      <CardContent></CardContent>
    </Card>
  );
}

export default ChargePage;

type CoinId = string;
type CoinData = {
  name: string;
  balance: number;
};

type ChargeFormProps = {
  coins: Record<CoinId, CoinData>;
};

// TODO: complete after getting coin list (refer to payment)
function ChargeForm({ coins }: ChargeFormProps) {
  const formSchema = z
    .object({
      coinId: z.string().min(1, "Coin ID is required"),
      receiverId: z.string().min(1, "Receiver ID is required"),
      amount: z.number().gt(0, "Amount must be more than 0"),
    })
    .refine((data) => coins[data.coinId] != null, {
      message: "Coin ID invalid",
    })
    .refine((data) => coins[data.coinId].balance < data.amount, {
      message: "Transfer amount cannot be more than available",
    });
}
