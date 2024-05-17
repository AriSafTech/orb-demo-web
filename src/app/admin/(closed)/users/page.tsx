"use client";
import { DataTable } from "@/components/custom/DataTable";
import { DummyUser, userService } from "@/services/user.service";
import { useEffect } from "react";
import Loading from "@/components/custom/Loading";
import { ColumnDef } from "@tanstack/react-table";

const UsersPage = () => {
  const { data, status } = userService.useAllUsers();
  //   console.log("data", data);
  const searchParam = "name";
  const pageTitle = "All Users";

  useEffect(() => console.log("USERS:", data), [data]);

  const columns: ColumnDef<DummyUser>[] = [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "phone",
      header: "Phone No",
    },
    {
      accessorKey: "userId",
      header: "User Id",
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
