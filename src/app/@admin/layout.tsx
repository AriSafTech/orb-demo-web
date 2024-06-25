import React, { PropsWithChildren } from "react";
import AdminLayout from "./AdminLayout";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "AST Wallet Admin",
};

function Layout({ children }: PropsWithChildren) {
  return <AdminLayout>{children}</AdminLayout>;
}

export default Layout;
