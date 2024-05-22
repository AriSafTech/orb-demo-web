"use client";

import { IconType } from "react-icons";
import { GrTransaction as PaymentIcon } from "react-icons/gr";
import { CiBoxList as TransactionListIcon } from "react-icons/ci";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LanguageSwitcher from "@/components/custom/LanguageSwitcher";
import { usePageStore } from "@/stores/pageStore";
import { authService } from "@/services/auth.service";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

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

  const { title } = usePageStore();
  const { mutateAsync: logout } = authService.useLogout();
  const router = useRouter();

  return (
    <div className="h-full w-full grid grid-cols-12">
      <aside className="bg-primary/10 col col-span-10 sm:col-span-3 lg:col-span-2 flex flex-col items-start justify-start">
        <Link
          href="/"
          className="py-4 w-full px-4 text-2xl transition-all leading-none uppercase tracking-tighter font-black"
        >
          Orb Wallet
        </Link>
        <div className="flex-grow w-full">
          {NAV_ITEMS.map((navItem) => (
            <Link
              key={navItem.path}
              href={navItem.path}
              className={cn(
                "w-full px-4 py-2 flex gap-2 items-center justify-start hover:bg-primary/35",
                {
                  "bg-primary/25": isActive(navItem.path),
                },
              )}
            >
              <navItem.icon /> {navItem.label}
            </Link>
          ))}
        </div>
        <Button
          className="my-2 mx-auto w-40 max-w-[80%]"
          onClick={() => {
            console.log("LOGGING OUT");
            logout();
            // router.push("/login");
          }}
        >
          Logout
        </Button>
      </aside>
      <div className="col-span-2 sm:col-span-9 lg:col-span-10 flex flex-col">
        <div className="h-14 items-center px-2 flex justify-between bg-primary/5">
          <div className="min-w-2">{title}</div>
          {/* TODO: create Avatar dropdown */}
          {/* TODO: create initials from user's name */}
          <LanguageSwitcher />
        </div>
        <div className="flex-grow">{children}</div>
      </div>
    </div>
  );
}
