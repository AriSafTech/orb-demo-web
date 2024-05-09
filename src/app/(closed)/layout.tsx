"use client";

import { IconType } from "react-icons";
import { GrTransaction as PaymentIcon } from "react-icons/gr";
import { CiBoxList as TransactionListIcon } from "react-icons/ci";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavItem = {
  label: string;
  path: string;
  icon: IconType;
};

export default function RegularLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const NAV_ITEMS = [
    { label: "Payment", path: "/payment", icon: PaymentIcon },
    {
      label: "Transactions",
      path: "/transactions",
      icon: TransactionListIcon,
    },
  ];
  const pathname = usePathname();
  const isActive = (path: string) => path === pathname;

  return (
    <div className="h-full w-full grid grid-cols-12">
      <aside className="bg-primary/10 col col-span-10 sm:col-span-3 md:col-span-2 px-4 flex flex-col items-start justify-start">
        <Link href="/" className="text-2xl py-4 w-full">
          Orb Wallet
        </Link>
        <div className="flex-grow">
          {NAV_ITEMS.map((navItem) => (
            <Link
              key={navItem.path}
              href={navItem.path}
              className="w-full py-2 flex gap-2 items-center justify-start"
            >
              <navItem.icon /> {navItem.label}
            </Link>
          ))}
        </div>
        <Button
          className="w-full my-2"
          onClick={() => console.log("LOGGING OUT")}
        >
          Logout
        </Button>
      </aside>
      <div></div>
    </div>
  );
}
