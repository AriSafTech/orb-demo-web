"use client";
import { Inter as FontSans } from "next/font/google";
import "@/app/globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import { useAuthStore } from "@/stores/authStore";
import { useMemo } from "react";
import NextTopLoader from "nextjs-toploader";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({
  open,
  admin,
  regular,
}: Readonly<{
  open: React.ReactNode;
  admin: React.ReactNode;
  regular: React.ReactNode;
}>) {
  const { tokens, user } = useAuthStore();

  const isLoggedIn = useMemo(() => !!tokens && !!user, [tokens, user]);

  const isAdmin = useMemo(() => user && user.role === "admin", [user]);

  return (
    <html lang="en">
      <body
        className={cn(
          "h-screen bg-background font-sans antialiased overflow-hidden",
          fontSans.variable,
        )}
      >
        <NextTopLoader showSpinner={false} color="#20808D" />
        <ReactQueryProvider>
          <main className="h-full w-full">
            {isLoggedIn ? (isAdmin ? admin : regular) : open}
          </main>
          <Toaster />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
