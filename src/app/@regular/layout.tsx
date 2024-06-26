import React, { PropsWithChildren } from "react";
import RegularLayout from "./RegularLayout";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "AST Wallet App",
};

function Layout({ children }: PropsWithChildren) {
  return <RegularLayout>{children}</RegularLayout>;
}

export default Layout;
