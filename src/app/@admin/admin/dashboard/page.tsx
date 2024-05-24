"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import React from "react";

function AdminDashboardPage() {
  return (
    <div className="h-full w-full flex flex-col gap-8">
      {/* COINS SUMMARY */}
      <div id="coins" className="w-full flex flex-col gap-2">
        <h2 className="text-2xl uppercase">Coins</h2>
        <div className="flex gap-2">
          {new Array(4).fill(0).map((_, ind) => (
            <Card key={ind} className="bg-secondary w-40 min-h-40">
              <CardHeader>Coin name</CardHeader>
              <CardContent>[valid until, exchange rate]</CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* USAGE SUMMARY */}
      <div id="usage" className="w-full flex flex-col gap-2">
        <h2 className="text-2xl uppercase">Users</h2>

        <div className="flex gap-2">
          {/* TOTAL ACTIVE USERS */}
          <Card className="bg-secondary w-40 min-h-40">
            <CardHeader>Total active users</CardHeader>
            <CardContent>[total users count]</CardContent>
          </Card>

          {/* TOTAL ISSUED COINS */}
          <Card className="bg-secondary w-40 min-h-40">
            <CardHeader>Total issued coins</CardHeader>
            <CardContent>[total coins count]</CardContent>
          </Card>

          {/* TRANSACTIONS IN LAST 24 hours */}
          <Card className="bg-secondary w-40 min-h-40">
            <CardHeader>Total transactions in last 24 hours</CardHeader>
            <CardContent>[total transactions for last day]</CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboardPage;
