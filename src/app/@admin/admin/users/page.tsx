"use client";
import { DataTable } from "@/components/custom/DataTable";
import { User, userService } from "@/services/user.service";
import Loading from "@/components/custom/Loading";
import { ColumnDef } from "@tanstack/react-table";
import { useLanguageStore } from "@/stores/languageStore";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
// import { getFuzzyVectorFn } from "@tanstack/match-sorter-utils";
interface UseAllUsersResponse {
  data: User[];
  status: string;
}

const UsersPage = () => {
  const { data, status }: any = userService.useAllUsers();
  const { data: t } = useLanguageStore();
  const pageTitle = t.users.title;
  const columns: ColumnDef<User>[] = [
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
      accessorKey: "balance",
      header: t.users.balance,
    },
    {
      accessorKey: "id",
      header: t.users.userId,
    },
  ];

  if (status === "pending" || status === "error") return <Loading />;
  else {
    return (
      <DataTable
        columns={columns}
        data={data}
        // searchParam={searchParam}
        pageTitle={pageTitle}
      />
    );
  }
};

export default UsersPage;
