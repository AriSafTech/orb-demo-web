"use client";

import { IconType } from "react-icons";
import { GrTransaction as PaymentIcon } from "react-icons/gr";
import { GrUser as UserIcon } from "react-icons/gr";
import { CiBoxList as TransactionListIcon } from "react-icons/ci";
import { GrQr as QR } from "react-icons/gr";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LanguageSwitcher from "@/components/custom/LanguageSwitcher";
import { usePageStore } from "@/stores/pageStore";
import { authService } from "@/services/auth.service";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { RxBell } from "react-icons/rx";
import { MdLogout as LogoutIcon } from "react-icons/md";
import { RxHamburgerMenu as MenuIcon } from "react-icons/rx";

import { getInitials } from "@/lib/name-utils";
import { useLanguageStore } from "@/stores/languageStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuthStore } from "@/stores/authStore";
import { userService } from "@/services/user.service";
import LaravelEcho from "@/components/custom/Echo";
import PusherComponent from "@/components/custom/Echo";

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
    { label: "Me", path: "/me", icon: UserIcon },
    { label: "Payment", path: "/payment", icon: PaymentIcon },
    {
      label: "Transactions",
      path: "/transactions",
      icon: TransactionListIcon,
    },
    {
      label: "QR",
      path: "/qr",
      icon: QR,
    },
  ];
  const pathname = usePathname();
  const isActive = (path: string) => path === pathname;
  const { data: t } = useLanguageStore();
  const { tokens, user } = useAuthStore();
  // console.log("user", user);

  const { title } = usePageStore();
  const {
    data: userProfile,
    balance,
    status: userProfileFetchStatus,
  } = authService.useProfile();

  const { mutateAsync: logout } = authService.useLogout();
  // notifications
  const { data: userNotifications, status } =
    userService.useUserNotifications();
  // if (userNotifications) {
  //   console.log("notifications", userNotifications.length);
  // }

  const router = useRouter();
  const renderNavItems = (inSheet?: boolean) => {
    if (inSheet) {
      return (
        <div className="flex-grow w-full">
          {NAV_ITEMS.map((navItem) => (
            <SheetClose key={navItem.path} asChild>
              <Link
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
            </SheetClose>
          ))}
        </div>
      );
    } else {
      return (
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
      );
    }
  };
  const handlePushEvent = (event: any) => {
    console.log("Received event:", event);
  };
  return (
    <div className="h-full w-full grid grid-cols-12">
      <aside className="bg-primary/10 col col-span-0 hidden sm:col-span-3 lg:col-span-2 sm:flex flex-col items-start justify-start">
        <Link
          href="/"
          className="py-4 w-full px-4 text-2xl transition-all leading-none uppercase tracking-tighter font-black"
        >
          Orb Wallet
        </Link>
        {renderNavItems()}
      </aside>
      <div className="col-span-12 sm:col-span-9 lg:col-span-10 flex flex-col">
        <div className="h-14 items-center px-2 flex justify-between bg-primary/5">
          <div className="hidden sm:block min-w-2"></div>
          <div className="flex items-center sm:hidden">
            <Sheet>
              <SheetTrigger>
                {" "}
                <Button variant="ghost">
                  <MenuIcon />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="px-0">
                <SheetHeader>
                  <SheetTitle>
                    <Link
                      href="/"
                      className="py-4 w-full px-4 text-2xl transition-all leading-none uppercase tracking-tighter font-black"
                    >
                      Orb Wallet
                    </Link>
                  </SheetTitle>
                  {renderNavItems(true)}
                </SheetHeader>
              </SheetContent>
            </Sheet>

            <Link
              href="/"
              className="py-4 w-full px-4 text-2xl transition-all leading-none uppercase tracking-tighter font-black"
            >
              Orb Wallet
            </Link>
          </div>
          {/* TODO: create Avatar dropdown */}
          {/* TODO: create initials from user's name */}
          <div className="flex justify-between gap-8 items-center">
            <div className="flex">
              <div className="relative">
                <RxBell className="w-10" size={30} />
              </div>
              <div className="absolute top-[1px] right-[66px] bg-primary text-white w-7 h-7 rounded-full flex justify-center items-center p-2">
                {userNotifications && (
                  <div className="text-xs">
                    {userNotifications?.length > 99
                      ? "99+"
                      : userNotifications?.length}
                  </div>
                )}
              </div>
            </div>

            {userProfileFetchStatus === "success" && (
              <DropdownMenu>
                <DropdownMenuTrigger className="outline-none select-none">
                  <Avatar>
                    {userProfile?.avatar ? (
                      <AvatarImage
                        src={userProfile.avatar}
                        alt="User profile dropdown"
                      />
                    ) : (
                      <AvatarFallback>
                        {getInitials(userProfile?.name ?? "")}
                      </AvatarFallback>
                    )}
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>
                    <div className="flex flex-col w-full">
                      <h2 className="text-lg">{userProfile?.name!}</h2>
                      <div className="my-4">
                        <h3 className="text-md mb-2">{t.layout.balance}</h3>
                        <div className="grid grid-cols-2 gap-2">
                          {Object.entries(balance!).map(([id, coin]) => (
                            <Card key={id} className="col-span-1">
                              <CardHeader>
                                <h4 className="text-sm text-primary font-bold tracking-tighter">
                                  {coin.name}
                                </h4>
                                <p className="text-center text-2xl">
                                  {coin.balance}
                                </p>
                              </CardHeader>
                            </Card>
                          ))}
                        </div>
                      </div>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {/* <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuItem>Team</DropdownMenuItem> */}
                  <DropdownMenuItem
                    onClick={async () => {
                      console.log("LOGGING OUT");
                      await logout();
                      router.push("/login");
                    }}
                  >
                    <LogoutIcon />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>

        <div className="flex flex-col h-[calc(100vh-3.5rem)] w-full container mx-auto py-10">
          {children}
        </div>
      </div>
      {/* push notifications */}
      <PusherComponent />
    </div>
  );
}
