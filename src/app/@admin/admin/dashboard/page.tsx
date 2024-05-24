"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useLanguageStore } from "@/stores/languageStore";
import React from "react";

function AdminDashboardPage() {
  const { data: t } = useLanguageStore();
  return (
    <div className="h-full w-full flex flex-col gap-8">
      {/* COINS SUMMARY */}
      <div id="coins" className="w-full flex flex-col gap-2">
        <h2 className="text-2xl uppercase">{t.adminLayout.coins}</h2>
        <div className="flex gap-2">
          {new Array(4).fill(0).map((_, ind) => (
            <Card key={ind} className="bg-secondary w-40 min-h-40">
              <CardHeader>{t.adminLayout.coinName}</CardHeader>
              <CardContent>[valid until, exchange rate]</CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* USAGE SUMMARY */}
      <div id="usage" className="w-full flex flex-col gap-2">
        <h2 className="text-2xl uppercase">{t.adminLayout.users}</h2>

        <div className="flex gap-2">
          {/* TOTAL ACTIVE USERS */}
          <Card className="bg-secondary w-40 min-h-40">
            <CardHeader>{t.adminLayout.totalActiveUsers}</CardHeader>
            <CardContent>[total users count]</CardContent>
          </Card>

          {/* TOTAL ISSUED COINS */}
          <Card className="bg-secondary w-40 min-h-40">
            <CardHeader>{t.adminLayout.totalIssuedCoins}</CardHeader>
            <CardContent>[total coins count]</CardContent>
          </Card>

          {/* TRANSACTIONS IN LAST 24 hours */}
          <Card className="bg-secondary w-40 min-h-40">
            <CardHeader>{t.adminLayout.lastDayTransactions}</CardHeader>
            <CardContent>[total transactions for last day]</CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboardPage;
