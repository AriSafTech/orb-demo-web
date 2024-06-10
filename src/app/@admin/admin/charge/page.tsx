"use client";
import React, { useMemo, useRef } from "react";
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

function AdminChargePage() {
  const { data: coinsData, status: coinsStatus } = coinService.useAllCoins();
  const { data: usersData, status: usersStatus } = userService.useAllUsers();
  // console.log("cm", coinsData);

  const coins = useMemo(
    () =>
      coinsData?.map((coin) => ({ id: coin.coin_id, name: coin.name })) ?? [],
    [coinsData],
  );

  const users = useMemo(
    () =>
      // TODO: filter out non-admins
      usersData?.map((user) => ({ orbId: user.username!, name: user.name! })) ??
      [],
    [usersData],
  );

  if (coinsStatus !== "success" || usersStatus !== "success") {
    return <Loading />;
  } else {
    return <PaymentForm coins={coins!} users={users!} />;
  }
}

export default AdminChargePage;

type CoinData = {
  id: string;
  name: string;
};

type UserData = {
  orbId: string;
  name: string;
};

type ChargeFormProps = {
  coins: CoinData[];
  users: UserData[];
};

function PaymentForm({ coins, users }: ChargeFormProps) {
  const { data: t } = useLanguageStore();
  const { mutateAsync: charge } = transactionService.useChargeAccount();
  const formSchema = z.object({
    coinId: z.string().min(1, "Coin ID is required"),
    receiverId: z.string().min(1, "Receiver ID is required"),
    amount: z.coerce.number().gt(0, "Amount must be more than 0"),
  });
  // .refine((data) => coins[data.coinId] != null, {
  //   message: "Coin ID invalid",
  // })
  // .refine((data) => coins[data.coinId].balance < data.amount, {
  //   message: "Transfer amount cannot be more than available",
  // });

  // console.log("COINS:", coins);
  // console.log("USERS:", users);

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
    const { amount, coinId, receiverId } = values;
    try {
      await charge({ amount, coinId, receiverOrbId: receiverId });
      toast.success(t.info.charge_chargeSuccess_title, {
        description: t.info.charge_chargeSuccess_desc,
      });
    } catch (e) {
      toast.error(t.errors.charge_chargeFailed_title, {
        description: t.errors.charge_chargeFailed_desc,
      });
    }
  };

  return (
    <>
      <div className="flex items-center py-4 justify-between">
        <h2 className="text-xl font-bold mb-2">{`${t.charge.title}`}</h2>
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
                  <FormLabel>{t.charge.coin}</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="max-w-xs">
                        <SelectValue placeholder={t.charge.coin_placeholder} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {coins.map((coin) => (
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
                <FormItem className="flex flex-col">
                  <FormLabel>{t.charge.receiver}</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "justify-between",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          {field.value
                            ? `${
                                users.find((user) => user.orbId === field.value)
                                  ?.name
                              } (${field.value})`
                            : t.charge.receiver_placeholder}
                          <ChevronUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="p-0">
                      <Command
                        // @ts-ignore
                        filter={(value, search, keywords) => {
                          const extendedValue =
                            value + " " + keywords.join(" ");
                          if (extendedValue.includes(search)) return 1;
                          return 0;
                        }}
                      >
                        <CommandInput placeholder={t.charge.receiver_search} />
                        <CommandEmpty>
                          {t.errors.charge_accountNotFound}
                        </CommandEmpty>
                        <CommandList>
                          <CommandGroup>
                            {users.map((user) => (
                              <CommandItem
                                key={user.orbId}
                                value={user.orbId}
                                // @ts-ignore
                                keywords={[user.name]}
                                onSelect={() => {
                                  form.setValue("receiverId", user.orbId);
                                }}
                              >
                                <PopoverClose>
                                  <div className="w-full flex gap-2 justify-start">
                                    <CheckIcon
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        user.orbId === field.value
                                          ? "opacity-100"
                                          : "opacity-0",
                                      )}
                                    />
                                    {user.name} ({user.orbId})
                                  </div>
                                </PopoverClose>
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
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
                  <FormLabel>{t.charge.amount}</FormLabel>
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
