"use client";
import React, { useEffect, useMemo, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { z } from "zod";
import { authService } from "@/services/auth.service";
import Loading from "@/components/custom/Loading";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useLanguageStore } from "@/stores/languageStore";
import { coinService } from "@/services/coin.service";
import { useSearchParams } from "next/navigation";
import { userService } from "@/services/user.service";

import { LuChevronsUpDown as ChevronUpDownIcon } from "react-icons/lu";
import { FaCheck as CheckIcon } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { transactionService } from "@/services/transaction.service";
import { toast } from "sonner";

function PaymentPage() {
  const { balance, status: profileStatus } = authService.useProfile();

  const searchParams = useSearchParams();
  const amount = parseInt(searchParams.get("amount") ?? "0");
  const receiverId = searchParams.get("receiverId") ?? "";

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

  if (profileStatus !== "success") {
    return <Loading />;
  } else {
    return (
      <PaymentForm coins={coins!} amount={amount} receiverId={receiverId} />
    );
  }
}

export default PaymentPage;

type CoinId = string;

type CoinData = {
  id: string;
  name: string;
  balance: number;
};

type UserData = {
  orbId: string;
  name: string;
};

type ChargeFormProps = {
  amount: number;
  receiverId: string;
  coins: Record<CoinId, CoinData>;
};

function PaymentForm({ coins, amount, receiverId }: ChargeFormProps) {
  const { data: t } = useLanguageStore();
  const { mutateAsync: charge } = transactionService.useChargeAccount();
  const formSchema = z
    .object({
      coinId: z.string().min(1, "Coin ID is required"),
      receiverId: z.string().min(1, "Receiver ID is required"),
      amount: z.coerce.number().gt(0, "Amount must be more than 0"),
    })
    // .refine((data) => coins[data.coinId] != null, {
    //   message: "Coin ID invalid",
    // })
    .refine((data) => coins[data.coinId].balance < data.amount, {
      message: "Transfer amount cannot be more than available",
    });

  // console.log("COINS:", coins);
  // console.log("USERS:", users);

  type FormData = z.infer<typeof formSchema>;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      coinId: "",
      receiverId,
      amount,
    },
  });

  const onSubmit = async (values: FormData) => {
    console.log("VALUES:", values);
    const { amount, coinId, receiverId } = values;
    try {
      await charge({ amount, coinId, receiverOrbId: receiverId });
      toast.success(t.info.payment_paymentSuccess_title, {
        description: t.info.payment_paymentSuccess_desc,
      });
    } catch (e) {
      toast.error(t.errors.payment_paymentFailed_title, {
        description: t.errors.payment_paymentFailed_desc,
      });
    }
  };

  return (
    <>
      <div className="flex items-center py-4 justify-between">
        <h2 className="text-xl font-bold mb-2">{`${t.payment.title}`}</h2>
      </div>
      <div className="max-w-xs">
        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            {/* COIN */}
            <FormField
              control={form.control}
              name="coinId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t.payment.coin}</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="max-w-xs">
                        <SelectValue placeholder={t.payment.coin_placeholder} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.values(coins).map((coin) => (
                        <SelectItem key={coin.id} value={coin.id}>
                          {coin.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* RECEIVER ID */}
            <FormField
              control={form.control}
              name="receiverId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t.payment.receiverId}</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* AMOUNT */}
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

            {/* SUBMIT */}
            <Button variant="destructive" className="w-full" type="submit">
              Send
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
}
