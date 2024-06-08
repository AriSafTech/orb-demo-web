"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { coinService } from "@/services/coin.service";
import { transactionService } from "@/services/transaction.service";
import { userService } from "@/services/user.service";
import { useLanguageStore } from "@/stores/languageStore";
import { isWithinInterval, parseISO, subDays } from "date-fns";
import React, { useMemo } from "react";

function AdminDashboardPage() {
  const { data: t } = useLanguageStore();
  const { data: coins } = coinService.useAllCoins();
  const { data: allUsers } = userService.useAllUsers();
  const { data: allTransactions } = transactionService.useAllTransactions();
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
            <Card key={ind} className="bg-secondary w-auto min-h-40">
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
                <div className="font-bold text-center">{coin.validity}</div>
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
