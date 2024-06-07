"use client";
import { DataTable } from "@/components/custom/DataTable";
import { User, userService } from "@/services/user.service";
import Loading from "@/components/custom/Loading";
import { ColumnDef } from "@tanstack/react-table";
import { useLanguageStore } from "@/stores/languageStore";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
// import { getFuzzyVectorFn } from "@tanstack/match-sorter-utils";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
interface UseAllUsersResponse {
  data: User[];
  status: string;
}
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";

const UsersPage = () => {
  const { data: allUsers, status } = userService.useAllUsers();
  const { data: t } = useLanguageStore();
  const pageTitle = t.users.title;

  const columns: ColumnDef<NonNullable<typeof allUsers>[number]>[] = [
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
      accessorKey: "role.name",
      header: t.users.role,
      cell: ({ row }) => {
        //@ts-ignore
        return row.original.role?.name === "consumer" ? (
          <Badge>{t.users.consumer}</Badge>
        ) : //@ts-ignore
        row.original?.role?.name === "merchant" ? (
          <Badge variant={"secondary"}>{t.users.merchant}</Badge>
        ) : (
          ""
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
    {
      accessorKey: "is_active",
      header: t.users.status,
      //   cell: ({ row }) => {
      //     const FormSchema = z.object({
      //       is_active: z.boolean(),
      //     });
      //     const form = useForm<z.infer<typeof FormSchema>>({
      //       resolver: zodResolver(FormSchema),
      //       defaultValues: {
      //         is_active: row.original?.is_active,
      //       },
      //     });

      //     const { mutateAsync: updateUserStatus } =
      //       userService.useUpdateUserStatus(row.original?.id as string);

      //     return (
      //       <Form {...form}>
      //         <form className="w-full">
      //           <div>
      //             <div className="space-y-4">
      //               <FormField
      //                 control={form.control}
      //                 name="is_active"
      //                 render={({ field }) => (
      //                   <FormItem className="">
      //                     <FormControl>
      //                       <Switch
      //                         checked={field.value}
      //                         onCheckedChange={(value: boolean) => {
      //                           field.onChange(value);
      //                           try {
      //                             updateUserStatus({
      //                               is_active: value,
      //                             });

      //                             toast.success(t.success.success_message);
      //                           } catch (e) {
      //                             //@ts-ignore
      //                             if (e.response.status === 422) {
      //                               toast.error(t.errors.unprocessableContent);
      //                             }
      //                           }
      //                         }}
      //                       />
      //                     </FormControl>
      //                   </FormItem>
      //                 )}
      //               />
      //             </div>
      //           </div>
      //         </form>
      //       </Form>
      //     );
      //   },
      cell: ActionsCell,
    },
  ];

  function ActionsCell({ row }: any) {
    const FormSchema = z.object({
      is_active: z.boolean(),
    });
    const form = useForm<z.infer<typeof FormSchema>>({
      resolver: zodResolver(FormSchema),
      defaultValues: {
        is_active: row.original?.is_active,
      },
    });

    const { mutateAsync: updateUserStatus } = userService.useUpdateUserStatus(
      row.original?.id as string,
    );

    return (
      <Form {...form}>
        <form className="w-full">
          <div>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="is_active"
                render={({ field }) => (
                  <FormItem className="">
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={(value: boolean) => {
                          field.onChange(value);
                          try {
                            updateUserStatus({
                              is_active: value,
                            });

                            toast.success(t.success.success_message);
                          } catch (e) {
                            //@ts-ignore
                            if (e.response.status === 422) {
                              toast.error(t.errors.unprocessableContent);
                            }
                          }
                        }}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>
        </form>
      </Form>
    );
  }

  if (status === "pending" || status === "error") return <Loading />;
  else {
    return (
      <DataTable
        columns={columns}
        data={allUsers!}
        // searchParam={searchParam}
        pageTitle={pageTitle}
      />
    );
  }
};

export default UsersPage;
