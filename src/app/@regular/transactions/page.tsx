"use client";
import { transactionService } from "@/services/transaction.service";
import { useLanguageStore } from "@/stores/languageStore";
import React, { useEffect, useMemo } from "react";
import Loading from "@/components/custom/Loading";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/custom/DataTable";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { LuArrowUpDown as ArrowUpDownIcon } from "react-icons/lu";
import { Badge } from "@/components/ui/badge";
import { useAuthStore } from "@/stores/authStore";
import { FaUndo as RefundIcon } from "react-icons/fa";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { coinService } from "@/services/coin.service";
import { FaRegCopy as CopyIcon } from "react-icons/fa";
import { toast } from "sonner";
import { cn, isNavigator } from "@/lib/utils";
import { useLabel } from "@/lib/hooks/useLabel";

const TransactionsPage = () => {
  const { user } = useAuthStore();
  const { data: t } = useLanguageStore();
  const { data: allTransactions, status } =
    transactionService.useSelfTransactions();
  const { geTransactionType } = useLabel();

  const { data: coinsData } = coinService.useAllCoins();
  const coins = useMemo(
    () =>
      coinsData
        ? Object.fromEntries(coinsData.map((c) => [c.coin_id!, c.name!]))
        : null,
    [coinsData],
  );

  const pageTitle = t.transaction.title;

  const selfTransactions = useMemo(
    () =>
      !allTransactions
        ? null
        : allTransactions.filter(
            (tran) =>
              tran.participants?.consumer === user!.userName ||
              tran.participants?.merchant === user!.userName ||
              // @ts-ignore
              tran.participants?.sender === user!.userName ||
              // @ts-ignore
              tran.participants?.receiver === user!.userName,
          ),
    [allTransactions, user],
  );

  const columns: ColumnDef<NonNullable<typeof selfTransactions>[number]>[] =
    useMemo(
      () => [
        // {
        //   accessorKey: "tx_id",
        //   header: t.transaction.tx_id,
        // },
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
          cell: ({ row }) => {
            const senderId =
              row.original.participants?.consumer ??
              // @ts-ignore
              row.original.participants?.sender;
            if (senderId === user!.userName) {
              return (
                <Badge variant="outline" className="text-primary">
                  Me
                </Badge>
              );
            } else {
              return <p>{senderId}</p>;
            }
          },
        },
        {
          accessorKey: "participants.merchant",
          header: t.transaction.receiver,
          cell: ({ row }) => {
            const receiverId =
              row.original.participants?.merchant ??
              // @ts-ignore
              row.original.participants?.receiver ??
              "";
            if (receiverId === user!.userName) {
              return (
                <Badge variant="outline" className="text-primary">
                  Me
                </Badge>
              );
            } else {
              return <p>{receiverId}</p>;
            }
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
              <div className="flex justify-center">
                <Button
                  variant="ghost"
                  onClick={() =>
                    column.toggleSorting(column.getIsSorted() === "asc")
                  }
                >
                  {t.transaction.tx_date}
                  <ArrowUpDownIcon className="ml-2 h-4 w-4" />
                </Button>
              </div>
            );
          },
          cell: ({ row }) => {
            const formattedDate = format(
              // @ts-ignore
              new Date(row.original.created_at),
              "yyyy-MM-dd",
            );
            return <div className="text-center">{formattedDate}</div>;
          },
        },
        {
          accessorKey: "tx_id",
          header: "",
          cell: ({ row }) => {
            const receiverId =
              row.original.participants?.merchant ??
              // @ts-ignore
              row.original.participants?.receiver ??
              "";
            const coinId = Object.keys(row.original.currencies!)[0];
            const amount =
              row.original.currencies![
                coinId as keyof typeof row.original.currencies
              ];
            const coinName = coins ? coins[coinId] : null;
            return (
              <div className="flex gap-2 justify-center">
                <Dialog>
                  <DialogTrigger
                    className={cn("invisible", {
                      visible:
                        receiverId === user!.userName &&
                        geTransactionType(row.original).type === "payment",
                    })}
                  >
                    <Button size="icon" variant="ghost">
                      <RefundIcon />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>{t.transaction.refund_title}</DialogTitle>
                      <DialogDescription>
                        <p>{t.transaction.refund_desc}</p>

                        <div className="px-4 md:px-0 my-8 flex gap-8 justify-between md:justify-start">
                          <div>
                            <h4 className="text-sm leading-tight font-light">
                              {t.transaction.refund_sender_id}
                            </h4>
                            <div className="text-xl">
                              {row.original.participants?.consumer ??
                                // @ts-ignore
                                row.original.participants?.sender ??
                                ""}
                            </div>
                          </div>

                          <div>
                            <h4 className="text-sm leading-tight font-light">
                              {t.transaction.refund_coin_name}
                            </h4>
                            <div className="text-xl">{coinName ?? ""}</div>
                          </div>

                          <div>
                            <h4 className="text-sm leading-tight font-light">
                              {t.transaction.refund_amount}
                            </h4>
                            <div className="text-xl">{amount}</div>
                          </div>
                        </div>

                        {/* ACTIONS */}
                        <div className="flex justify-end gap-4">
                          <DialogClose asChild>
                            <Button type="submit" variant="default">
                              Cancel
                            </Button>
                          </DialogClose>
                          <DialogClose asChild>
                            <Button
                              type="submit"
                              onClick={() => console.log("OK")}
                              variant="destructive"
                            >
                              Confirm
                            </Button>
                          </DialogClose>
                        </div>
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Button
                        variant="ghost"
                        onClick={async () => {
                          if (isNavigator()) {
                            await navigator.clipboard.writeText(
                              row.original.tx_id!,
                            );
                            toast.success("Copied transaction ID to clipboard");
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
              </div>
            );
          },
        },
      ],
      [
        coins,
        geTransactionType,
        t.transaction.amount,
        t.transaction.coin_name,
        t.transaction.receiver,
        t.transaction.refund_amount,
        t.transaction.refund_coin_name,
        t.transaction.refund_desc,
        t.transaction.refund_sender_id,
        t.transaction.refund_title,
        t.transaction.sender,
        t.transaction.tx_date,
        t.transaction.type,
        user,
      ],
    );

  if (status === "pending" || status === "error") return <Loading />;
  else {
    return (
      <div className="px-4 md:px-0">
        <DataTable
          columns={columns}
          data={selfTransactions!}
          // searchParam={searchParam}
          pageTitle={pageTitle}
        />
      </div>
    );
  }
};

export default TransactionsPage;
