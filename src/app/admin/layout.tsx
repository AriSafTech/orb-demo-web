"use client";
import { useAuthStore } from "@/stores/authStore";
import React, { useEffect } from "react";

function AdminLayout({
  open,
  closed,
}: {
  open: React.ReactNode;
  closed: React.ReactNode;
}) {
  const { tokens } = useAuthStore();

  useEffect(() => {
    console.log("TOKENS:", tokens);
  }, [tokens]);

  return <>{!!tokens ? closed : open}</>;
}

export default AdminLayout;
