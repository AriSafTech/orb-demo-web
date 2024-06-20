"use client";
import { transactionService } from "@/services/transaction.service";
import { useLanguageStore } from "@/stores/languageStore";
import React, { useEffect, useMemo } from "react";
import Loading from "@/components/custom/Loading";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/custom/DataTable";
import { format } from "date-fns";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { coinService } from "@/services/coin.service";
import { useLabel } from "@/lib/hooks/useLabel";
import { cn } from "@/lib/utils";

const TransactionPage = () => {
  const { data: t } = useLanguageStore();
  const { geTransactionType } = useLabel();
  const { data: allTransactions, status } =
    transactionService.useAllTransactions();
  //   useEffect(() => console.log("Lists:", data), [data]);
  // const searchParam = "tx_id";

  const { data: coinsData } = coinService.useAllCoins();

  const coins = useMemo(
    () =>
      coinsData
        ? Object.fromEntries(coinsData.map((c) => [c.coin_id!, c.name!]))
        : null,
    [coinsData],
  );

  const pageTitle = t.transaction.title;

  const columns: ColumnDef<NonNullable<typeof allTransactions>[number]>[] = [
    {
      accessorKey: "tx_id",
      header: t.transaction.tx_id,
    },
    {
      accessorKey: "tx_id",
      header: ({ column }) => (
        <div className="text-center">{t.transaction.amount}</div>
      ),
      cell: ({ row }) => {
        const coinId = Object.keys(row.original.currencies!)[0];
        const amount =
          row.original.currencies![
            coinId as keyof typeof row.original.currencies
          ];
        return <p className="text-center">{amount}</p>;
      },
    },
    {
      accessorKey: "tx_id",
      header: ({ column }) => (
        <div className="text-center">{t.transaction.coin_name}</div>
      ),
      cell: ({ row }) => {
        const coinId = Object.keys(row.original.currencies!)[0];
        const coinName = coins ? coins[coinId] : null;
        return (
          <div className="w-full">
            <Badge
              variant="secondary"
              className="mx-auto flex justify-center items-center text-center w-16 h-12 text-xs leading-none"
            >
              {coinName}
            </Badge>
          </div>
        );
      },
    },
    {
      accessorKey: "participants.consumer",
      header: t.transaction.sender,
    },
    {
      accessorKey: "participants.merchant",
      header: t.transaction.receiver,
      cell: ({ row }) => {
        return (
          row.original.participants?.merchant ??
          // @ts-ignore
          row.original.participants?.receiver ??
          ""
        );
      },
    },
    {
      accessorKey: "type",
      header: ({ column }) => (
        <div className="text-center">{t.transaction.type}</div>
      ),
      cell: ({ row }) => {
        const tt = geTransactionType(row.original);
        return (
          <div className="flex justify-center items-center">
            <Badge
              variant={tt.type === "others" ? "outline" : "default"}
              className={cn(
                "text-center max-w-20 flex justify-center select-none",
                {
                  "bg-primary hover:bg-primary": tt.type === "charge",
                  "bg-accent hover:bg-accent text-primary":
                    tt.type === "payment",
                  "bg-accent hover:bg-accent text-primary/70":
                    tt.type === "paymentRefunded",
                  "bg-accent hover:bg-accent text-red-400":
                    tt.type === "refund",
                },
              )}
            >
              {tt.label}
            </Badge>
          </div>
        );
      },
    },
    {
      accessorKey: "created_at",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            {t.transaction.tx_date}
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const formattedDate = format(
          // @ts-ignore
          new Date(row.original.created_at),
          "yyyy-MM-dd HH:mm:ss",
        );
        return <div className="text-center">{formattedDate}</div>;
      },
    },
  ];

  if (status === "pending" || status === "error") return <Loading />;
  else {
    return (
      <DataTable
        columns={columns}
        data={allTransactions!}
        // searchParam={searchParam}
        pageTitle={pageTitle}
      />
    );
  }
};

export default TransactionPage;
