"use client";
import { transactionService } from "@/services/transaction.service";
import { useLanguageStore } from "@/stores/languageStore";
import React, { useEffect } from "react";
import Loading from "@/components/custom/Loading";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/custom/DataTable";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuthStore } from "@/stores/authStore";
import { DUMMY_SETTLEMENTS_DATA, getDummySettlementsData } from "./data";
import { coinService } from "@/services/coin.service";
import { useMemo } from "react";
import { cn, isNavigator } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "sonner";
import { FaRegCopy as CopyIcon } from "react-icons/fa";

type CoinData = {
  id: string;
  name: string;
  rate: number; // jpy/coin
};
type Props = {
  coins: Record<string, CoinData>;
};

const SettlementsTable = ({ coins }: Props) => {
  const { data: t } = useLanguageStore();
  const pageTitle = t.settlements.title;

  const data = useMemo(
    () =>
      getDummySettlementsData(
        Object.fromEntries(
          Object.values(coins).map((c: CoinData) => [c.id, c.rate]),
        ),
      ),
    [coins],
  );

  console.log("DATA:", data);

  const columns: ColumnDef<NonNullable<typeof data>[number]>[] = [
    // {
    //   accessorKey: "id",
    //   header: t.settlements.id,
    // },
    {
      accessorKey: "coinAmount",
      header: ({ column }) => (
        <div className="text-center">{t.settlements.coinAmount}</div>
      ),
      cell: ({ row }) => (
        <p className="text-center">{row.original.coinAmount}</p>
      ),
    },
    {
      accessorKey: "coinId",
      header: ({ column }) => (
        <div className="text-center">{t.settlements.coin}</div>
      ),

      // accessorFn: ({ coinId }) => coins[coinId as keyof typeof coins].name!,
      cell: ({ row }) => (
        <div className="w-full">
          <Badge
            variant="secondary"
            className="mx-auto flex justify-center items-center text-center w-16 h-12 text-xs leading-none"
          >
            {coins[row.original.coinId as keyof typeof coins].name!}
          </Badge>
        </div>
      ),
    },
    {
      accessorKey: "currencyAmount",
      header: t.settlements.currencyAmount,
    },
    {
      accessorKey: "currencyCode",
      header: t.settlements.currency,
      accessorFn: ({ currencyCode }) => currencyCode.toUpperCase(),
    },
    {
      accessorKey: "status",
      header: t.settlements.status,
      cell: ({ row }) => (
        <Badge
          variant={row.original.status === "pending" ? "outline" : "default"}
          // className={cn({
          //   "bg-accent text-": row.original.status === "pending",
          // })}
        >
          {row.original.status.toUpperCase()}
        </Badge>
      ),
    },
    {
      accessorKey: "createdAt",
      header: t.settlements.createdAt,
      accessorFn: ({ createdAt }) => format(createdAt, "yyyy-MM-dd HH:mm:ss"),
    },
    {
      accessorKey: "settledAt",
      header: t.settlements.settledAt,
      accessorFn: ({ settledAt }) =>
        settledAt ? format(settledAt, "yyyy-MM-dd HH:mm:ss") : "",
    },
    {
      accessorKey: "id",
      header: "",
      cell: ({ row }) => (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Button
                variant="ghost"
                onClick={async () => {
                  if (isNavigator()) {
                    await navigator.clipboard.writeText(row.original.id);
                    toast.success(t.success.copied_settlement_to_clip_board);
                  }
                }}
              >
                <CopyIcon />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Copy transaction ID</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ),
    },
  ];

  return (
    <div>
      <DataTable
        columns={columns}
        data={data}
        // searchParam={searchParam}
        pageTitle={pageTitle}
      />
    </div>
  );
};

const SettlementsPage = () => {
  const { data: coinsData, status } = coinService.useAllCoins();

  const coins: Record<string, CoinData> | null = useMemo(
    () =>
      coinsData
        ? Object.fromEntries(
            coinsData.map((cd) => [
              cd.coin_id!,
              {
                id: cd.coin_id!,
                name: cd.name!,
                rate: parseInt(cd.exchange_rate!, 10),
              },
            ]),
          )
        : null,
    [coinsData],
  );

  if (status === "pending" || status === "error" || coins == null)
    return <Loading />;
  else {
    return <SettlementsTable coins={coins} />;
  }
};

export default SettlementsPage;
