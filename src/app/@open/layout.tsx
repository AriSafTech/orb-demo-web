import React, { PropsWithChildren } from "react";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "AST Wallet App",
};

function Layout({ children }: PropsWithChildren) {
  return <>{children}</>;
}

export default Layout;
