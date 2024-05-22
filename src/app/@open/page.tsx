"use client";
import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

function OpenRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/login");
  }, [router]);
  return <></>;
}

export default OpenRedirect;
