"use client";
import { DataTable } from "@/components/custom/DataTable";
import { User, userService } from "@/services/user.service";
import Loading from "@/components/custom/Loading";
import { ColumnDef } from "@tanstack/react-table";
import { useLanguageStore } from "@/stores/languageStore";
import { ArrowUpDown, View, ViewIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import Pusher from "pusher-js";
// import { getFuzzyVectorFn } from "@tanstack/match-sorter-utils";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/lib/name-utils";
import Image from "next/image";
import { ViewGridIcon } from "@radix-ui/react-icons";
import { FaEye } from "react-icons/fa";
import { useEffect } from "react";
import { cn } from "@/lib/utils";
import { useLabel } from "@/lib/hooks/useLabel";

const UsersPage = () => {
  const { data: allUsers, status } = userService.useAllUsers();
  const { getGender, getRole } = useLabel();
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
          <Badge>{getRole("consumer")}</Badge>
        ) : //@ts-ignore
        row.original?.role?.name === "merchant" ? (
          <Badge variant={"secondary"}>{getRole("merchant")}</Badge>
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
      accessorKey: "username",
      header: t.users.userId,
    },
    {
      accessorKey: "is_active",
      header: t.users.status,
      cell: ActionsCell,
    },
    {
      accessorKey: "actions",
      header: " ",
      cell: UserViewActionsCell,
    },
  ];
  // User active status
  //@ts-ignore
  function ActionsCell({ row }) {
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

                            toast.success(t.success.user_status_update);
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
  // User profile view
  //@ts-ignore
  function UserViewActionsCell({ row }) {
    const { data: singleUser, isPending } = userService.useSingleUser(
      row.original?.id,
    );

    return (
      <Sheet>
        <SheetTrigger asChild>
          <Button className="cursor-pointer">
            <FaEye />
          </Button>
        </SheetTrigger>
        {/* <SheetComponent row={row} key={row.original?.id} /> */}
        <SheetContent
          className={cn("flex flex-col gap-6", {
            "overflow-y-auto": !!singleUser?.avatar,
          })}
        >
          <SheetHeader className="flex items-center gap-2">
            <SheetTitle>{t.users.user_profile}</SheetTitle>

            {row.original?.avatar ? (
              <Image
                src={row.original?.avatar}
                alt="User profile dropdown"
                width={200}
                height={200}
                className="object-cover h-[200px] rounded-sm"
              />
            ) : (
              <Avatar>
                <AvatarFallback>
                  {getInitials(row.original?.name ?? "")}
                </AvatarFallback>
              </Avatar>
            )}
          </SheetHeader>
          <div className="flex justify-start items-start mt-4 px-10">
            <div className="flex flex-col gap-4 !font-light">
              <div>
                <div className="mb-0 text-sm">{t.users.name} </div>
                <div className="mt-0 text-xl w-full">{singleUser?.name}</div>
              </div>
              <div>
                <div className="mb-0 text-sm">{t.users.email} </div>
                <div className="mt-0 text-xl">{singleUser?.email}</div>
              </div>
              <div>
                <div className="mb-0 text-sm">{t.users.address} </div>
                <div className="mt-0 text-xl">
                  {singleUser?.address ?? "N/A"}
                </div>
              </div>
              <div>
                <div className="mb-0 text-sm">{t.users.bank_details}</div>
                <div className="mt-0 text-xl">
                  {singleUser?.bank_details ?? "N/A"}
                </div>
              </div>
              <div>
                <div className="mb-0 text-sm">{t.users.gender} </div>
                <div className="mt-0 text-xl">
                  {getGender(singleUser?.gender)}
                </div>
              </div>
              <div>
                <div className="mb-0 text-sm">{t.users.role} </div>
                <div className="mt-0 text-xl">
                  {getRole(singleUser?.role?.name)}
                </div>
              </div>
              <div>
                <div className="mb-0 text-sm">{t.users.balance} </div>
                <div className="mt-0 text-xl">{singleUser?.balance?.total}</div>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
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
