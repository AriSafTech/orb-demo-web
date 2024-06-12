"use client";

import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

function AdminClosedRedirect() {
  console.log("ADMIN CLOSED REDIRECT");
  const router = useRouter();
  useEffect(() => router.replace("/admin/dashboard"), [router]);
  return <></>;
}

export default AdminClosedRedirect;
