"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

function AdminOpenRedirect() {
  console.log("ADMIN OPEN REDIRECT");
  const router = useRouter();
  useEffect(() => router.replace("/admin/login"), [router]);
  return <></>;
}

export default AdminOpenRedirect;
