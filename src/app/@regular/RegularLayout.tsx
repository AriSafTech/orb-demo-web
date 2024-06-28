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
import { LuCodesandbox as PlaygroundIcon } from "react-icons/lu";
import { RiMoneyCnyCircleLine as SettlementsIcon } from "react-icons/ri";
import { getInitials } from "@/lib/name-utils";
import { useLanguageStore } from "@/stores/languageStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuthStore } from "@/stores/authStore";
import { userService } from "@/services/user.service";
import PusherComponent from "@/components/custom/Echo";
import { ScrollArea } from "@/components/ui/scroll-area";
import { coinService } from "@/services/coin.service";
import { useMemo, useState } from "react";
import {
  getNotificationMessage,
  NotificationItem,
} from "@/lib/notirfication-utils";
import NotificationScrollItem from "@/components/custom/NotificationItemScroll";
import { ChevronDown, Ghost } from "lucide-react";

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
  const { data: t } = useLanguageStore();
  const NAV_ITEMS = [
    { label: t.layout.make_payment, path: "/make-payment", icon: PaymentIcon },
    {
      label: t.layout.receive_payment,
      path: "/receive-payment",
      icon: QR,
    },
    {
      label: t.layout.transactions,
      path: "/transactions",
      icon: TransactionListIcon,
    },
    {
      label: t.layout.settlements,
      path: "/settlements",
      icon: SettlementsIcon,
    },
    { label: t.layout.profile, path: "/profile", icon: UserIcon },
    // {
    //   label: "Playground (dev)",
    //   path: "/playground",
    //   icon: PlaygroundIcon,
    // },
  ];
  const pathname = usePathname();
  const isActive = (path: string) => path === pathname;

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
  const { data: coinsData } = coinService.useAllCoins();
  const coins = useMemo(
    () =>
      coinsData
        ? Object.fromEntries(coinsData.map((c) => [c.coin_id!, c.name!]))
        : null,
    [coinsData],
  );

  const { data: userNotifications, status } =
    userService.useUserNotifications();

  // const notificationRef = useUpdateIsSeenStatus(userNotifications, userService);

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

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const unseenCount = userNotifications
    ? userNotifications.filter((notification) => !notification.is_seen).length
    : 0;

  return (
    <div className="h-full w-full grid grid-cols-12">
      <aside className="bg-primary/10 col col-span-0 hidden sm:col-span-3 lg:col-span-2 sm:flex flex-col items-start justify-start">
        <Link
          href="/"
          className="py-4 w-full px-4 text-2xl transition-all leading-none uppercase tracking-tighter font-black"
        >
          {t.layout.appName}
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
                      {t.layout.appName}
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
              {t.layout.appName}
            </Link>
          </div>
          {/* TODO: create Avatar dropdown */}
          {/* TODO: create initials from user's name */}
          <div className="flex justify-between gap-8 items-center">
            <div className="flex">
              <div className="relative">
                <>
                  <DropdownMenu
                    onOpenChange={(open) => setIsDropdownOpen(open)}
                  >
                    <DropdownMenuTrigger className="outline-none">
                      <Button
                        size="icon"
                        variant="ghost"
                        className={cn(
                          "rounded-full",
                          isDropdownOpen && "bg-secondary",
                        )}
                      >
                        <RxBell className="w-10" size={30} />
                      </Button>
                      {unseenCount > 0 && (
                        <div className="absolute top-[-8px] right-[-13px] bg-primary text-white w-7 h-7 rounded-full flex justify-center items-center p-2">
                          <div className="text-xs">
                            {unseenCount > 99 ? "99+" : unseenCount}
                          </div>
                        </div>
                      )}
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="mr-8 z-50 shadow-xl w-screen sm:w-[400px]">
                      <ScrollArea className="h-72 w-auto rounded-md">
                        <div className="p-4">
                          <h4 className="mb-4 text-xl font-medium leading-none text-center">
                            {t.layout.notifications}
                          </h4>
                          <div className="border border-dashed p-2 rounded-md">
                            {userNotifications &&
                              userNotifications.map((notification) => (
                                <NotificationScrollItem
                                  key={notification.id}
                                  notification={notification}
                                  // @ts-ignore
                                  coins={coins}
                                  isDropdownOpen={isDropdownOpen}
                                />
                              ))}
                          </div>
                        </div>
                      </ScrollArea>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              </div>
            </div>

            {userProfileFetchStatus === "success" && (
              <DropdownMenu>
                <DropdownMenuTrigger className="outline-none select-none">
                  <Avatar className="relative">
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
                  <div className="absolute right-2.5 top-[35px] bg-primary rounded-full">
                    <div className="relative top-[0.7] text-white">
                      <ChevronDown size={13} />
                    </div>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="backdrop-blur-md w-screen sm:w-auto">
                  <DropdownMenuLabel>
                    <div className="flex flex-col w-full">
                      <h2 className="text-lg">{userProfile?.name!}</h2>
                      <div className="my-4">
                        <h3 className="text-md mb-2 font-normal text-black">
                          {t.layout.balance}
                        </h3>
                        <div className="grid grid-cols-2 gap-2">
                          {Object.entries(balance!).map(([id, coin]) => (
                            <Card
                              key={id}
                              className="col-span-1 bg-primary/5 text-neutral-900 font-light uppercase"
                            >
                              <CardHeader>
                                <h4 className="text-sm tracking-tighter text-center">
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
                  <DropdownMenuItem
                    onClick={async () => {
                      console.log("LOGGING OUT");
                      await logout();
                      router.push("/login");
                    }}
                  >
                    <LogoutIcon />
                    {t.layout.logout}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>

        <div className="flex flex-col items-stretch h-[calc(100vh-3.5rem)] w-full mx-auto py-10 px-0 sm:px-4 md:px-8">
          {children}
        </div>
      </div>
      {/* push notifications */}
      <PusherComponent />
    </div>
  );
}
