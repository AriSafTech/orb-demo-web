"use client";
import { DataTable } from "@/components/custom/DataTable";
import { DummyUser, userService } from "@/services/user.service";
import { useEffect } from "react";
import Loading from "@/components/custom/Loading";
import { ColumnDef } from "@tanstack/react-table";
import { useLanguageStore } from "@/stores/languageStore";

const UsersPage = () => {
  const { data, status } = userService.useAllUsers();
  const { data: t } = useLanguageStore();
  const searchParam = "name";
  const pageTitle = t.users.title;

  // useEffect(() => console.log("USERS:", data), [data]);
  const columns: ColumnDef<DummyUser>[] = [
    {
      accessorKey: "name",
      header: t.users.name,
    },
    {
      accessorKey: "email",
      header: t.users.email,
    },
    {
      accessorKey: "phone",
      header: t.users.phone,
    },
    {
      accessorKey: "userId",
      header: t.users.userId,
    },
  ];

  return (
    <div className="w-full h-full container mx-auto py-10">
      {status === "pending" && <Loading />}
      {status === "success" && (
        <DataTable
          columns={columns}
          data={data}
          searchParam={searchParam}
          pageTitle={pageTitle}
        />
      )}
    </div>
  );
};

export default UsersPage;
