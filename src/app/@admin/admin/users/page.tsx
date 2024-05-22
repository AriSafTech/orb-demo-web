"use client";
import { DataTable } from "@/components/custom/DataTable";
import { DummyUser, userService } from "@/services/user.service";
import Loading from "@/components/custom/Loading";
import { ColumnDef } from "@tanstack/react-table";
import { useLanguageStore } from "@/stores/languageStore";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";

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
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            {t.users.email}
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
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

  if (status === "pending" || status === "error") return <Loading />;
  else {
    return (
      <DataTable
        columns={columns}
        data={data}
        searchParam={searchParam}
        pageTitle={pageTitle}
      />
    );
  }
};

export default UsersPage;
