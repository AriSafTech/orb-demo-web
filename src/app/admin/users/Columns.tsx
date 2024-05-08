"use client";

import { ColumnDef } from "@tanstack/react-table";

export type User = {
  name: string;
  email: string;
  phone: string;
  userId: string;
};

export const columns: ColumnDef<User>[] = [
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
