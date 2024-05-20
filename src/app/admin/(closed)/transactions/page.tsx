"use client";
import { transactionService } from "@/services/transaction.service";
import { useLanguageStore } from "@/stores/languageStore";
import React, { useEffect } from "react";
import Loading from "@/components/custom/Loading";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/custom/DataTable";

const TransactionPage = () => {
  const { data: t } = useLanguageStore();
  //   const { data, status } = transactionService.useTransactionList();
  //   useEffect(() => console.log("Lists:", data), [data]);

  const searchParam = "tx_id";
  const pageTitle = t.transaction.title;
  const columns: ColumnDef<any>[] = [
    {
      accessorKey: "tx_id",
      header: t.transaction.tx_id,
    },
    {
      accessorKey: "participants",
      header: t.transaction.participants,
    },
    {
      accessorKey: "group",
      header: t.transaction.group,
    },
    {
      accessorKey: "type",
      header: t.transaction.type,
    },
    {
      accessorKey: "tx_date",
      header: t.transaction.tx_date,
    },
  ];

  const data: any = [];

  return (
    <DataTable
      columns={columns}
      data={data}
      searchParam={searchParam}
      pageTitle={pageTitle}
    />
  );
};

export default TransactionPage;
