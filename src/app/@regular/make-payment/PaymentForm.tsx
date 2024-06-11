"use client";
import React, { useEffect, useMemo, useRef } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { z } from "zod";
import { authService } from "@/services/auth.service";
import Loading from "@/components/custom/Loading";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
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
import ConfirmPayment from "./ConfirmPayment";
import LongPressButton from "@/components/custom/LongPressButton";
import Vendors from "./Vendors";
import { Separator } from "@radix-ui/react-select";
import { ScrollArea } from "@/components/ui/scroll-area";

type CoinId = string;

type CoinData = {
  id: string;
  name: string;
  balance: number;
};

type ChargeFormProps = {
  amount: number;
  senderId: string;
  receiverId: string;
  coinId: string;
  coins: Record<CoinId, CoinData>;
};

function PaymentForm({
  coins,
  amount,
  receiverId,
  senderId,
  coinId,
}: ChargeFormProps) {
  const { data: t } = useLanguageStore();
  const { mutateAsync: makePayment } = transactionService.useMakePayment();
  const formRef = useRef<HTMLFormElement>(null);
  const formSchema = z
    .object({
      coinId: z.string().min(1, "Coin ID is required"),
      receiverId: z.string().min(1, "Receiver ID is required"),
      amount: z.coerce.number().gt(0, "Amount must be more than 0"),
    })
    // .refine((data) => coins[data.coinId] != null, {
    //   message: "Coin ID invalid",
    // })
    .refine((data) => coins[data.coinId]?.balance ?? 0 < data.amount, {
      message: "Transfer amount cannot be more than available",
    });

  // console.log("COINS:", coins);
  // console.log("USERS:", users);

  type FormData = z.infer<typeof formSchema>;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      coinId,
      receiverId,
      amount,
    },
  });

  const onSubmit = async (values: FormData) => {
    console.log("VALUES:", values);
    const { amount, coinId, receiverId } = values;
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

  return (
    // <div className="max-w-sm flex flex-col items-center sm:items-stretch py-4">
    <div className="w-full h-full flex flex-col md:flex-row gap-10 md:gap-4 py-4 overflow-y-auto">
      {/* <h2 className="text-xl font-bold mb-8">{t.payment.title}</h2> */}
      <Card className="min-w-[300px] max-w-[300px] w-[300px] flex-grow mx-auto h-fit">
        <CardHeader>
          <CardTitle>{t.payment.form_title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="max-w-xs">
            <Form {...form}>
              <form
                ref={formRef}
                className="space-y-4"
                onSubmit={form.handleSubmit(onSubmit)}
              >
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
                            <SelectValue
                              placeholder={t.payment.coin_placeholder}
                            />
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
                      <FormDescription
                        className={cn("invisible", { visible: !!field.value })}
                      >
                        Balance: {coins[field.value]?.balance}
                      </FormDescription>
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

                <div>
                  <LongPressButton
                    className="w-full mb-2 mt-8"
                    onStart={() => form.trigger()}
                    enabled={form.formState.isValid}
                    onLongPress={() => formRef.current!.requestSubmit()}
                  >
                    Send
                  </LongPressButton>
                  <p className="text-xs text-center">
                    {t.payment.submit_helper}
                  </p>
                </div>
              </form>
            </Form>
          </div>
        </CardContent>
      </Card>
      <Vendors
        onSelect={(merchantOrbId) => form.setValue("receiverId", merchantOrbId)}
      />
    </div>
  );
}

export default PaymentForm;
