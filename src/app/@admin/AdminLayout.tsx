"use client";

import { IconType } from "react-icons";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LanguageSwitcher from "@/components/custom/LanguageSwitcher";
import { usePageStore } from "@/stores/pageStore";
import { authService } from "@/services/auth.service";

import { FaCoins as ChargeIcon } from "react-icons/fa6";
import { CiBoxList as TransactionListIcon } from "react-icons/ci";
import { HiOutlineUsers as UsersIcon } from "react-icons/hi";
import { MdSpaceDashboard as DashboardIcon } from "react-icons/md";
import { cn } from "@/lib/utils";
import { useLanguageStore } from "@/stores/languageStore";
import { useRouter } from "next/navigation";
import { MdLogout as LogoutIcon } from "react-icons/md";

type NavItem = {
  label: string;
  path: string;
  icon: IconType;
};

export default function AdminClosedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data: t } = useLanguageStore();
  const ADMIN_NAV_ITEMS = [
    {
      label: t.adminLayout.dashboard,
      path: "/admin/dashboard",
      icon: DashboardIcon,
    },
    { label: t.adminLayout.users, path: "/admin/users", icon: UsersIcon },
    {
      label: t.adminLayout.transactions,
      path: "/admin/transactions",
      icon: TransactionListIcon,
    },
    {
      label: t.adminLayout.chargeAccount,
      path: "/admin/charge",
      icon: ChargeIcon,
    },
  ];
  const pathname = usePathname();
  const isActive = (path: string) => path === pathname;

  const { title } = usePageStore();
  const { mutateAsync: logout } = authService.useLogout();
  const router = useRouter();

  return (
    <div className="h-full w-full grid grid-cols-12">
      <aside className="bg-primary/10 col col-span-2 sm:col-span-3 lg:col-span-2 flex flex-col items-start justify-start">
        <Link
          href="/admin"
          className="py-4 w-full px-4 text-2xl transition-all leading-none uppercase tracking-tighter font-black text-center sm:text-left"
        >
          <p className="sm:hidden">{t.adminLayout.appName[0]}</p>
          <p className="hidden sm:block">{t.adminLayout.appName}</p>
        </Link>
        <div className="flex-grow w-full">
          {ADMIN_NAV_ITEMS.map((navItem) => (
            <Link
              key={navItem.path}
              href={navItem.path}
              className={cn(
                "w-full px-4 py-2 flex gap-2 items-center justify-center sm:justify-start hover:bg-primary/35",
                {
                  "bg-primary/25": isActive(navItem.path),
                },
              )}
            >
              <navItem.icon />
              <p className="hidden sm:inline-block">{navItem.label}</p>
            </Link>
          ))}
        </div>
        <Button
          className="my-2 mx-auto w-40 max-w-[80%] gap-2"
          onClick={async () => {
            console.log("LOGGING OUT");
            await logout();
            router.push("/admin/login");
          }}
        >
          <LogoutIcon />
          <p className="hidden sm:block">{t.adminLayout.logOut}</p>
        </Button>
      </aside>
      <div className="col-span-10 sm:col-span-9 lg:col-span-10 flex flex-col">
        <div className="h-14 items-center px-2 flex justify-between bg-primary/5">
          <div className="min-w-2">{title}</div>
          <LanguageSwitcher />
        </div>
        <div
          className={`overflow-y-auto flex flex-col h-[calc(100vh-3.5rem)] w-full container mx-auto py-10 `}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
