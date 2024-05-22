"use client";
import { transactionService } from "@/services/transaction.service";
import { useLanguageStore } from "@/stores/languageStore";
import React, { useEffect } from "react";
import Loading from "@/components/custom/Loading";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/custom/DataTable";

const TransactionPage = () => {
  const { data: t } = useLanguageStore();
  const { data: allTransactions, status } =
    transactionService.useTransactionList();
  //   useEffect(() => console.log("Lists:", data), [data]);

  // const searchParam = "tx_id";
  const pageTitle = t.transaction.title;
  const columns: ColumnDef<NonNullable<typeof allTransactions>[number]>[] = [
    {
      accessorKey: "tx_id",
      header: t.transaction.tx_id,
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
      accessorKey: "group",
      header: t.transaction.group,
    },
    {
      accessorKey: "type",
      header: t.transaction.type,
      // TODO: custom render base on type
    },
    {
      accessorKey: "tx_date",
      header: t.transaction.tx_date,
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
