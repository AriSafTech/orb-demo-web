"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { z } from "zod";
import { authService } from "../../../services/auth.service";
import Loading from "@/components/custom/Loading";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useLanguageStore } from "@/stores/languageStore";

function PaymentPage() {
  const { data: userData, status } = authService.useProfile();

  // if (status !== "success") return <Loading />;
  // @ts-ignore
  return <PaymentForm coins={userData?.coins} />;
}

export default PaymentPage;

type CoinId = string;
type CoinData = {
  name: string;
  balance: number;
};

type ChargeFormProps = {
  coins: Record<CoinId, CoinData>;
};

function PaymentForm({ coins }: ChargeFormProps) {
  const { data: t } = useLanguageStore();
  const formSchema = z.object({
    coinId: z.string().min(1, "Coin ID is required"),
    receiverId: z.string().min(1, "Receiver ID is required"),
    amount: z.number().gt(0, "Amount must be more than 0"),
  });
  // .refine((data) => coins[data.coinId] != null, {
  //   message: "Coin ID invalid",
  // })
  // .refine((data) => coins[data.coinId].balance < data.amount, {
  //   message: "Transfer amount cannot be more than available",
  // });

  type FormData = z.infer<typeof formSchema>;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      coinId: "",
      receiverId: "",
      amount: 0,
    },
  });

  const onSubmit = async (values: FormData) => {
    console.log("VALUES:", values);
  };

  // TODO: complete after getting coin list
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t.payment.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t.payment.amount}</FormLabel>
                <FormControl>
                  <Input {...field} type="number" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </CardContent>
    </Card>
  );
}
