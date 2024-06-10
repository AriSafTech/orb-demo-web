"use client";
import { transactionService } from "@/services/transaction.service";
import { useLanguageStore } from "@/stores/languageStore";
import React, { useEffect } from "react";
import Loading from "@/components/custom/Loading";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/custom/DataTable";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useAuthStore } from "@/stores/authStore";

const TransactionsPage = () => {
  const { user } = useAuthStore();
  const { data: t } = useLanguageStore();
  const { data: selfTransactions, status } =
    transactionService.useSelfTransactions();

  const pageTitle = t.transaction.title;
  const columns: ColumnDef<NonNullable<typeof selfTransactions>[number]>[] = [
    {
      accessorKey: "tx_id",
      header: t.transaction.tx_id,
    },
    {
      accessorKey: "participants.consumer",
      header: t.transaction.sender,
      cell: ({ row }) => {
        const senderId = row.original.participants?.consumer;
        if (senderId === user!.userName) {
          return <Badge>Me</Badge>;
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
          return <Badge>Me</Badge>;
        } else {
          return <p>{receiverId}</p>;
        }
      },
    },
    {
      accessorKey: "type",
      header: t.transaction.type,
      cell: ({ row }) => {
        return row.original.group == "payment" ? (
          <Badge variant="secondary">{t.transaction.payment}</Badge>
        ) : row.original.group == "charge" ? (
          <Badge>{t.transaction.charge}</Badge>
        ) : (
          ""
        );
      },
    },
    // {
    //   accessorKey: "type",
    //   header: t.transaction.type
    // },
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
          "yyyy-MM-dd",
        );
        return formattedDate;
      },
    },
  ];

  if (status === "pending" || status === "error") return <Loading />;
  else {
    return (
      <div>
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
