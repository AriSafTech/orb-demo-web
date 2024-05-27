"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { coinService } from "@/services/coin.service";
import { transactionService } from "@/services/transaction.service";
import { userService } from "@/services/user.service";
import { useLanguageStore } from "@/stores/languageStore";
import React from "react";

function AdminDashboardPage() {
  const { data: t } = useLanguageStore();
  const { data: coins } = coinService.useAllCoins();
  const { data: allUsers } = userService.useAllUsers();
  // const { data: allTransactions, status } =
  //   transactionService.useAllTransactions();

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
              <CardHeader>
                <div className="font-bold">{t.adminLayout.coinName}:</div>
                {coin.name}
              </CardHeader>
              <CardContent>
                <div className="font-bold">{t.adminLayout.exchange_rate}:</div>{" "}
                {coin.exchange_rate}
              </CardContent>
              <CardContent>
                <div className="font-bold">{t.adminLayout.validity}:</div>
                {coin.validity}
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
            <CardHeader>{t.adminLayout.totalActiveUsers}</CardHeader>
            <CardContent>{allUsers?.length}</CardContent>
          </Card>

          {/* TOTAL ISSUED COINS */}
          <Card className="bg-secondary w-auto min-h-40">
            <CardHeader>{t.adminLayout.totalIssuedCoins}</CardHeader>
            <CardContent>{totalBalance}</CardContent>
          </Card>

          {/* TRANSACTIONS IN LAST 24 hours */}
          <Card className="bg-secondary w-auto min-h-40">
            <CardHeader>{t.adminLayout.lastDayTransactions}</CardHeader>
            <CardContent>[total transactions for last day]</CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboardPage;
