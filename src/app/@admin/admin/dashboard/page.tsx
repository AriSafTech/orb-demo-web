"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { coinService } from "@/services/coin.service";
import { transactionService } from "@/services/transaction.service";
import { userService } from "@/services/user.service";
import { useLanguageStore } from "@/stores/languageStore";
import { isWithinInterval, parseISO, subDays } from "date-fns";
import React, { useMemo } from "react";
import { GrEdit } from "react-icons/gr";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
// Calandar
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
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
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "sonner";

const FormSchema = z.object({
  validity: z.date({
    required_error: "A date of validity input is required.",
  }),
});

function AdminDashboardPage() {
  const { data: t } = useLanguageStore();
  const { data: coins } = coinService.useAllCoins();

  const { data: allUsers } = userService.useAllUsers();
  const { data: allTransactions } = transactionService.useAllTransactions();
  // calendar validity

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    // console.log(data);
    // toast.info(format(data.validity, "yyyy-MM-dd"));
  }
  // Last 24 hours transaction
  const recentTransactionCount = useMemo(() => {
    const now = new Date();
    const oneDayAgo = subDays(now, 1);

    const recentTransactions = allTransactions?.filter((transaction: any) => {
      const createdAt = parseISO(transaction.created_at);
      return isWithinInterval(createdAt, { start: oneDayAgo, end: now });
    });

    return recentTransactions?.length;
  }, [allTransactions]);

  // Issue coins
  const totalBalance = allUsers?.reduce(
    (sum, user) => sum + parseFloat(user?.balance as string),
    0,
  );

  return (
    <div className="h-full w-full flex flex-col gap-8">
      {/* COINS SUMMARY */}
      <div id="coins" className="w-full flex flex-col gap-2">
        <h2 className="text-2xl uppercase">{t.adminLayout.coins}</h2>
        <div className="flex gap-2">
          {/* {new Array(4).fill(0).map((_, ind) => (
            <Card key={ind} className="bg-secondary w-40 min-h-40">
              <CardHeader>{t.adminLayout.coinName}</CardHeader>
              <CardContent>[valid until, exchange rate]</CardContent>
            </Card>
          ))} */}

          {coins?.map((coin, ind) => (
            <Card key={ind} className="bg-secondary w-auto min-h-44 relative">
              <CardHeader className="font-bold text-center">
                {coin.name}
              </CardHeader>
              <CardContent>
                <div className="text-[13px] text-center">
                  {t.adminLayout.exchange_rate}:
                </div>{" "}
                <div className="font-bold text-center text-[25px]">
                  {coin.exchange_rate}
                </div>
              </CardContent>
              <CardContent>
                <div className="text-[13px] text-center">
                  {t.adminLayout.validity}:
                </div>
                <div className="font-bold text-center mb-2">
                  {coin.validity}
                </div>
                <Sheet>
                  <SheetTrigger asChild>
                    <div className="mt-2 absolute bottom-1 right-3 bg-primary text-white w-6 h-6 flex justify-center items-center rounded-full hover:bg-primary/85 cursor-pointer">
                      <GrEdit />
                    </div>
                  </SheetTrigger>
                  <SheetContent>
                    <SheetHeader>
                      {/* <SheetTitle>{t.adminLayout.validity}</SheetTitle> */}
                    </SheetHeader>
                    <div className="py-4">
                      <div className=" flex flex-col justify-center items-center h-[60vh]">
                        <Form {...form}>
                          <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-8"
                          >
                            <FormField
                              control={form.control}
                              name={`validity`}
                              defaultValue={
                                coin.validity
                                  ? new Date(coin.validity)
                                  : undefined
                              }
                              render={({ field }) => (
                                <FormItem className="flex flex-col">
                                  <FormLabel>
                                    {t.adminLayout.update_validity}
                                  </FormLabel>
                                  <Popover>
                                    <PopoverTrigger asChild>
                                      <FormControl>
                                        <Button
                                          variant={"outline"}
                                          className={cn(
                                            "w-[240px] pl-3 text-left font-normal",
                                            !field.value &&
                                              "text-muted-foreground",
                                          )}
                                        >
                                          {field.value ? (
                                            format(field.value, "yyyy-MM-dd")
                                          ) : (
                                            <span>Pick a date</span>
                                          )}
                                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                        </Button>
                                      </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent
                                      className="w-auto p-0"
                                      align="start"
                                    >
                                      <Calendar
                                        mode="single"
                                        selected={field.value}
                                        onSelect={field.onChange}
                                        // disabled={(date) =>
                                        //   date > new Date() ||
                                        //   date < new Date("1900-01-01")
                                        // }
                                        initialFocus
                                      />
                                    </PopoverContent>
                                  </Popover>

                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <Button type="submit">
                              {t.adminLayout.save_changes}
                            </Button>
                          </form>
                        </Form>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* USAGE SUMMARY */}
      <div id="usage" className="w-full flex flex-col gap-2">
        <h2 className="text-2xl uppercase">{t.adminLayout.users}</h2>

        <div className="flex gap-2">
          {/* TOTAL ACTIVE USERS */}
          <Card className="bg-secondary w-auto min-h-40">
            <CardHeader className="text-[13px] text-center">
              {t.adminLayout.totalActiveUsers}
            </CardHeader>
            <CardContent className="text-center font-bold text-[25px]">
              {allUsers?.length}
            </CardContent>
          </Card>

          {/* TOTAL ISSUED COINS */}
          <Card className="bg-secondary w-auto min-h-40">
            <CardHeader className="text-[13px] text-center">
              {t.adminLayout.totalIssuedCoins}
            </CardHeader>
            <CardContent className="text-center font-bold text-[25px]">
              {totalBalance}
            </CardContent>
          </Card>

          {/* TRANSACTIONS IN LAST 24 hours */}
          <Card className="bg-secondary w-auto min-h-40">
            <CardHeader className="text-[13px] text-center">
              {t.adminLayout.lastDayTransactions}
            </CardHeader>
            <CardContent className="text-center font-bold text-[25px]">
              {recentTransactionCount}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboardPage;
